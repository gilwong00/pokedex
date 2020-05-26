import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import PokemonItem from './PokemonItem';

const PokemonList = ({ pokemons, loadMore, loading, navigation }) => {
  const navigateToDetails = (pokemon) =>
    navigation.navigate('Pokemon', { name: pokemon.name });

  return (
    <View>
      <FlatList
        data={pokemons}
        keyExtractor={(item) => item.name}
        renderItem={({ item }) => (
          <PokemonItem item={item} onSelect={() => navigateToDetails(item)} />
        )}
        onEndReached={loadMore}
        onEndReachedThreshold={0}
        ListFooterComponent={
          loading && (
            <View style={styles.loader}>
              <ActivityIndicator size='large' color='red' />
            </View>
          )
        }
      />
    </View>
  );
};

export default PokemonList;

const styles = StyleSheet.create({
  loader: {
    alignItems: 'center',
  },
});
