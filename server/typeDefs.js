const { gql } = require('apollo-server');

module.exports = gql`
  type Pokemon {
    id: Int
    name: String
    weight: Int
    height: Float
    image: String
    type: [String]
    captured: Boolean
  }

	type StatName {
    name: String
    url: String
  }


	type Stats {
    base_stat: Int
    effort: Int
    stat: StatName
  }


  type PokemonDetails {
    id: Int
    name: String
    weight: Int
    height: Float
    image: String
    type: [String]
    captured: Boolean
    stats: [Stats]
  }

  type Query {
    fetchPokemon(offset: Int!, group: Int!): [Pokemon!]
    getPokemonDetails(name: String!): PokemonDetails
  }

  type Mutation {
    capturePokemon: [Pokemon]
  }
`;
