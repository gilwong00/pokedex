import gql from 'graphql-tag';

export const FETCH_POKEMON = gql`
  query($offset: Int!) {
    fetchPokemon(offset: $offset) {
      id
      name
			weight
			height
			image
			type 
			captured
    }
  }
`;
