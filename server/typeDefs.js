const { gql } = require('apollo-server');

module.exports = gql`
  type Pokemon {
    id: Int
    name: String
    image: String
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

	input PokemonInput {
		id: Int
    name: String
    weight: Int
    height: Float
    image: String
    type: [String]
	}

  type Query {
    fetchPokemon(offset: Int!, group: Int!): [Pokemon!]
    getPokemonDetails(name: String!): PokemonDetails!,
		getCapturedPokemon: [PokemonDetails!]
  }

  type Mutation {
    capturePokemon(pokemon: PokemonInput!): Boolean!
  }
`;
