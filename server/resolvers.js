const { BASE_URL, BASE_POKEMON_IMAGE_URL } = require('./constants');
const axios = require('axios');
const Pokedex = require('pokedex-promise-v2');
const redis = require('redis');
const { promisify } = require('util');
const { padId, startCase } = require('./utils');
const P = new Pokedex();

const client = redis.createClient({
  host: process.env.REDIS_HOST,
  port: process.env.REDIS_PORT,
});

const redisGet = promisify(client.get).bind(client);
const redisSet = promisify(client.set).bind(client);
const redisExist = promisify(client.exists).bind(client);
const redisSMember = promisify(client.smembers).bind(client);
// const redisSAdd = promisify(client.sadd).bind(client);

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

        const hasKey = await redisExist(group.toString());

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
        type: data.types.map((t) => startCase(t.type.name)),
        captured: false,
        stats: data.stats
          .map((s) => {
            return { ...s, stat: { ...s.stat, name: startCase(s.stat.name) } };
          })
          .sort((a, b) => (a.stat.name > b.stat.name ? 1 : -1)),
      };

      // set redis cache
      return res;
    },
    getCapturedPokemon: async () => {
      try {
        const captured = await redisSMember('captured');
        const parsed = JSON.parse(captured);

        if (Array.isArray(parsed)) {
          return parsed;
        } else {
          return [parsed];
        }
      } catch (err) {
        throw err;
      }
    },
  },
  Mutation: {
    capturePokemon: (_, args) => {
      const capturedPokemon = { ...args.pokemon, captured: true };
      // maybe add a set size?
      return client.sadd('captured', JSON.stringify(capturedPokemon), (err) => {
        if (err) {
          return err;
        } else {
          return res;
        }
      });
    },
  },
};
