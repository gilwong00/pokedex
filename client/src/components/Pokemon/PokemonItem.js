import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';

const PokemonItem = ({ item, onSelect }) => {
  return (
    <TouchableOpacity onPress={onSelect} style={styles.card}>
      <Image style={styles.image} source={{ uri: item.image }} />
      <View style={styles.infoContainer}>
        <Text style={styles.name}>{item.name.charAt(0).toUpperCase() + item.name.slice(1)}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default PokemonItem;

const styles = StyleSheet.create({
  card: {
    display: 'flex',
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
    paddingVertical: 15,
    paddingHorizontal: 30,
    flexDirection: 'row',
		alignItems: 'center',

  },
  statsContainer: {
    marginLeft: 25,
    width: 250,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  image: {
    width: 85,
    height: 85,
    borderRadius: 50,
    backgroundColor: '#ccc',
    borderWidth: 1,
	},
	name: {
		paddingLeft: 30,
		fontSize: 18
	}
});
