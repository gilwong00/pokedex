import React, { useState } from 'react';
import { View, StyleSheet, ActivityIndicator, Alert } from 'react-native';
import PokemonList from '../components/Pokemon/PokemonList';
import { FETCH_POKEMON } from '../graphql/queries';
import { useQuery } from '@apollo/react-hooks';

const HomeScreen = () => {
  const [offset, setOffset] = useState(0);
  const [group, setGroup] = useState(1);
  const { loading, error, data } = useQuery(FETCH_POKEMON, {
    variables: { offset, group },
  });

  const loadMore = () => {
		setOffset((prevState) => {
      return prevState === 0 ? (prevState += 22) : (prevState += 21);
		});
		
		setGroup(prevState => prevState += 1);
	}
    

  if (error) {
    return Alert.alert(
      'Error fetching data',
      `${error.message}`[{ text: 'Okay' }]
    );
  }
	
  return (
    <View>
      {loading ? (
        <ActivityIndicator size='large' />
      ) : (
        <PokemonList
          pokemons={data.fetchPokemon}
          loadMore={loadMore}
          offset={offset}
        />
      )}
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({});
