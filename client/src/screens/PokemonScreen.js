import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  Image,
  Button,
  Alert,
} from 'react-native';
import Detail from '../components/UI/Detail';
import { GET_POKEMON_DETAILS } from '../graphql/queries';
import { useQuery } from '@apollo/react-hooks';

const Pokemon = ({ navigation }) => {
  const name = navigation.getParam('name');
  const { loading, error, data } = useQuery(GET_POKEMON_DETAILS, {
    variables: { name },
  });

  if (error) {
    Alert.alert(`Error getting details for ${name}`, error.message, [
      { text: 'Okay', onPress: () => navigation.goBack() },
    ]);
  }
  return (
    <View>
      {loading ? (
        <ActivityIndicator size='large' color='red' />
      ) : (
        <View style={styles.card}>
          <Text style={styles.name}>
            {data.getPokemonDetails.name.charAt(0).toUpperCase() +
              data.getPokemonDetails.name.slice(1)}
          </Text>

          <View style={styles.imageContainer}>
            <Image
              style={styles.image}
              source={{ uri: data.getPokemonDetails.image }}
            />
          </View>

          <View style={styles.detailsContainer}>
            <Detail label='Pokemon No' text={data.getPokemonDetails.id} />
            <Detail label='Height' text={data.getPokemonDetails.height} />
            <Detail label='Weight' text={data.getPokemonDetails.weight} />
            <Detail
              label='Type(s)'
              text={data.getPokemonDetails.type.join(', ')}
            />
          </View>
          <View>
            <Button title='Try to Capture' color='red' />
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
    height: 700,
  },
  name: {
    fontWeight: 'bold',
    fontSize: 30,
    textAlign: 'center',
  },
  imageContainer: {
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    alignItems: 'center',
  },
  image: {
    width: 300,
    height: 300,
  },
  detailsContainer: {
    borderColor: '#ccc',
    borderWidth: 0.5,
    width: '70%',
    left: 70,
  },
});
