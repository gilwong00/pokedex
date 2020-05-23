import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import PokemonItem from './PokemonItem';

const PokemonList = ({ pokemons, loadMore, loading }) => {
  return (
    <View>
      <FlatList
        data={pokemons}
        keyExtractor={(item) => item.name}
        renderItem={({ item }) => (
          <PokemonItem item={item} onSelect={() => {}} />
        )}
        onEndReached={loadMore}
        onEndReachedThreshold={0}
        ListFooterComponent={
          loading ? (
            <View style={styles.loader}>
              <ActivityIndicator size='large' color='red' />
            </View>
          ) : null
        }
      />
    </View>
  );
};

export default PokemonList;

const styles = StyleSheet.create({
  loader: {
    marginTop: 10,
    alignItems: 'center',
  },
});
