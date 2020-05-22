const axios = require('axios');
const Pokedex = require('pokedex-promise-v2');
const redis = require('redis');
const P = new Pokedex();

// const client = redis.createClient({
//   host: process.env.REDIS_HOST,
//   port: process.env.REDIS_PORT,
// });

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
      const interval = {
        limit: 20,
        offset: args.offset,
      };

      const { results } = await P.getPokemonsList(interval);

      let pokemons = [];

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
					captured: false
        };

        pokemons.push(fullPokemon);
      }
      return pokemons;
    },
  },
};
