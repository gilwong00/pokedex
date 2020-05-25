import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  Image,
  Button,
} from 'react-native';
import { GET_POKEMON_DETAILS } from '../graphql/queries';
import { useQuery } from '@apollo/react-hooks';

const Pokemon = ({ navigation }) => {
  const name = navigation.getParam('name');
  const { loading, error, data } = useQuery(GET_POKEMON_DETAILS, {
    variables: { name },
  });

  return (
    <View>
      {loading ? (
        <ActivityIndicator size='large' color='red' />
      ) : (
        <View style={styles.card}>
          {/* maybe put the name up here? */}
          <View style={styles.container}>
            <Image
              style={styles.image}
              source={{ uri: data.getPokemonDetails.image }}
            />
            <View style={styles.details}>
              <Text>{data.getPokemonDetails.name}</Text>
              <Text>{data.getPokemonDetails.height}</Text>
              <Text>{data.getPokemonDetails.weight}</Text>
              <Text>{data.getPokemonDetails.type.join(', ')}</Text>
              <View>
                <Button title='Capture?' color='red' />
              </View>
            </View>
          </View>
        </View>
      )}
    </View>
  );
};

export default Pokemon;

const styles = StyleSheet.create({
  card: {
    shadowColor: 'black',
    shadowOpacity: 0.26,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 5,
    borderRadius: 10,
    backgroundColor: 'white',
    paddingTop: 20,
    height: 250,
  },
  container: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  imageContainer: {
    height: '60%',
    width: '80%',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  image: {
    width: 200,
    height: 200,
    borderRadius: 50,
    backgroundColor: '#ccc',
    borderWidth: 0.5,
  },
  details: {
    borderColor: '#ccc',
    width: '50%',
    alignItems: 'center',
  },
});
