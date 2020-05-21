import { FETCH_POKEMON } from '../actions/pokemon';

const INITIAL_STATE = {
  pokemons: [],
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FETCH_POKEMON:
      return {
        ...state,
        pokemons: [...state.pokemons, ...action.payload],
      };
    default:
      return state;
  }
};
