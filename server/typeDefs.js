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

	type Query {
		fetchPokemon(offset: Int!, group: Int!): [Pokemon!]
	}

	type Mutation {
		capturePokemon: [Pokemon]
	}
`;

