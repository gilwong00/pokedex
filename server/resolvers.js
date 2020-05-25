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
  id = parseInt(id);

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
      try {
        let pokemons = [];
        const { offset, group } = args;

        const interval = {
          limit: 20,
          offset,
        };

        const hasKey = await redisGet(group.toString());

        if (!hasKey) {
          const { results } = await P.getPokemonsList(interval);

          for (let result of results) {
            const { data } = await axios.get(`${BASE_URL}/${result.name}`);
            const fullPokemon = {
              id: data.id,
              name: data.name,
              image: `${BASE_POKEMON_IMAGE_URL}/${padId(data.id)}.png`,
            };

            pokemons.push(fullPokemon);
          }
          await redisSet(group.toString(), JSON.stringify(pokemons));
        }

        if (group === 1 && !hasKey) {
          return pokemons;
        } else {
          let results = [];

          for (let i = group; i > 0; i--) {
            const res = await redisGet(i.toString());

            if (res) {
              results = [...JSON.parse(res), ...results];
            }
          }
          return results;
        }
      } catch (err) {
        return err;
      }
    },
    getPokemonDetails: async (_, args) => {
      const { name } = args;
      const { data } = await axios.get(`${BASE_URL}/${name}`);

      const res = {
        id: data.id,
        name: data.name,
        weight: data.weight,
        height: data.height,
        order: data.order,
        image: `${BASE_POKEMON_IMAGE_URL}/${padId(data.id)}.png`,
        type: data.types.map(
          (t) => t.type.name.charAt(0).toUpperCase() + t.type.name.slice(1)
        ),
        captured: false,
        stats: data.stats.sort((a, b) => (a.stat.name > b.stat.name ? 1 : -1)),
      };

      // set redis cache
      return res;
    },
  },
};
