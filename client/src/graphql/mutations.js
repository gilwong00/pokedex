import gql from 'graphql-tag';

export const CAPTURE_POKEMON = gql`
  mutation(
    $id: Int!
    $name: String!
    $weight: Int!
    $height: Int!
    $image: String!
    $type: [String!]
  ) {
    capturePokemon(pokemon: {
			id: $id,
			name: $name,
			weight: $weight,
			height: $height,
			image: $image,
			type: $type,
		})
  }
`;
