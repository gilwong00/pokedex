import gql from 'graphql-tag';

export const FETCH_POKEMON = gql`
  query($offset: Int!, $group: Int!) {
    fetchPokemon(offset: $offset, group: $group) {
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
