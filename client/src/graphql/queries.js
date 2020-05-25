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
