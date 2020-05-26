import gql from 'graphql-tag';

export const FETCH_POKEMON = gql`
  query($offset: Int!, $group: Int!) {
    fetchPokemon(offset: $offset, group: $group) {
      id
      name
      image
    }
  }
`;

export const GET_POKEMON_DETAILS = gql`
  query($name: String!) {
    getPokemonDetails(name: $name) {
      id
      name
      weight
      height
      image
      type
      captured
      stats {
        base_stat
        effort
        stat {
          name
        }
      }
    }
  }
`;

export const GET_CAPTURED_POKEMON = gql`
	query {
		getCapturedPokemon {
			id
			name
			height
			weight
			image
			type
		}
	}
`;