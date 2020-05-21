import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { View, StyleSheet, ActivityIndicator } from 'react-native';
import { fetchPokemon } from '../store/actions/pokemon';
import PokemonList from '../components/Pokemon/PokemonList';

const HomeScreen = () => {
  const [loading, setLoading] = useState(false);
  const [offset, setOffset] = useState(0);
  const pokemons = useSelector((state) => state.pokemons.pokemons);
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      setLoading(true);
      await dispatch(fetchPokemon(offset));
      setLoading(false);
    })();
  }, []);

  return (
    <View>
      {loading ? (
        <ActivityIndicator size='large' />
      ) : (
        <PokemonList pokemons={pokemons} />
      )}
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({});
