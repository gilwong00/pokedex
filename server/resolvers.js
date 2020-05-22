const axios = require('axios');
const Pokedex = require('pokedex-promise-v2');
const redis = require('redis');
const { promisify } = require('util');
const P = new Pokedex();

const client = redis.createClient({
  host: process.env.REDIS_HOST,
  port: process.env.REDIS_PORT,
});

const redisGet = promisify(client.get).bind(client);
const redisSet = promisify(client.set).bind(client);

const BASE_URL = 'https://pokeapi.co/api/v2/pokemon';
const BASE_POKEMON_IMAGE_URL =
  'https://assets.pokemon.com/assets/cms2/img/pokedex/detail';

function padId(id) {
  id = parseInt(id, 10);

  if (id < 10) {
    return `00${id}`;
  } else if (id >= 10 && id < 100) {
    return `0${id}`;
  } else {
    return id;
  }
}

module.exports = {
  Query: {
    fetchPokemon: async (root, args, ctx) => {
      console.log('hit');
      let pokemons = [];
      let offset = args.offset;

      const interval = {
        limit: 20,
        offset,
      };

      // check if redis contains offset
      const hasKey = await redisGet(offset.toString());

      if (!hasKey) {
        const { results } = await P.getPokemonsList(interval);

        for (let result of results) {
          const { data } = await axios.get(`${BASE_URL}/${result.name}`);
          const fullPokemon = {
            id: data.id,
            name: data.name,
            weight: data.weight,
            height: data.height,
            order: data.order,
            image: `${BASE_POKEMON_IMAGE_URL}/${padId(data.id)}.png`,
            type: data.types.map((t) => t.type.name),
            captured: false,
          };

          pokemons.push(fullPokemon);
        }
        await redisSet(offset.toString(), JSON.stringify(pokemons));
      }

      // initial get, we dont need to loop to create a large list
      if (offset === 0 && hasKey) {
        return JSON.parse(hasKey);
      } else {
        let index = 0;
        while (index <= offset) {
          // get pokemons from set
          const res = await redisGet(index.toString());
          pokemons = [...pokemons, ...JSON.parse(res)];
          index += 20;
        }
      }
      return pokemons;
    },
  },
};
