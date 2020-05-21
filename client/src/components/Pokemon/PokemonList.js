import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import PokemonItem from './PokemonItem'

const PokemonList = ({ pokemons, updateOffset }) => {
	const [loading, setLoading] = useState(false);
	
	const fetchMorePokemon = () => {
		setLoading(true);
		updateOffset();
		// make a hook that gets pokemon
	}

  return (
    <View>
      <FlatList
				data={pokemons}
				keyExtractor={item => item.name}
				renderItem={({ item }) => <PokemonItem item={item} onSelect={() => {}}/>}
        onEndReached={fetchMorePokemon}
        onEndReachedThreshold={0}
        ListEmptyComponent={loading ? <ActivityIndicator size='large' /> : null}
      />
    </View>
  );
};

export default PokemonList;

const styles = StyleSheet.create({});
