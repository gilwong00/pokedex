import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import PokemonItem from './PokemonItem';

const PokemonList = ({ pokemons, loadMore }) => {
	const [loading, setLoading] = useState(false);
	
  // turn this into a hook?
  const fetchMorePokemon = () => {
    setLoading(true);
    loadMore();
    setLoading(false);
  };
	
  return (
    <View>
      <FlatList
        data={pokemons}
        keyExtractor={(item) => item.name}
        renderItem={({ item }) => (
          <PokemonItem item={item} onSelect={() => {}} />
        )}
        onEndReached={fetchMorePokemon}
        onEndReachedThreshold={0}
        ListEmptyComponent={loading ? <ActivityIndicator size='large' /> : null}
      />
    </View>
  );
};

export default PokemonList;

const styles = StyleSheet.create({});
