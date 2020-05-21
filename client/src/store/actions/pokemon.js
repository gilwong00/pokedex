import axios from 'axios';

export const FETCH_POKEMON = 'FETCH_POKEMON';

export const fetchPokemon = (offset = 0) => async (dispatch) => {
  const { data } = await axios.get(
    `http://localhost:5000/api/pokemon?limit=20&offset=${offset}`
  );
  dispatch({ type: FETCH_POKEMON, payload: data });
};
