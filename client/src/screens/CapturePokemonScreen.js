import React, { useState } from 'react';
import { StyleSheet, Text, View, Button, Image, Alert } from 'react-native';
import { useMutation } from '@apollo/react-hooks';

const CapturePokemonScreen = ({ navigation }) => {
  const [attempts, setAttempts] = useState(3);
  const pokemon = navigation.getParam('pokemon');

  const getRandomNumber = () => Math.floor(Math.random() * 100) + 1;

  const capturePokemon = () => {
    if (attempts === 0) {
      Alert.alert('No more attempts', 'Please try again in 5 minutes', [
        { text: 'Ok', onPress: () => navigation.goBack() },
      ]);
    }

    const pokemonHp =
      pokemon.stats.find((stat) => stat.stat.name.toLowerCase() === 'hp') ||
      getRandomNumber();

    if (pokemonHp > getRandomNumber()) {
      Alert.alert(`Failed to capture ${pokemon.name}`, 'Want to try again?', [
        { text: 'No', onPress: () => navigation.goBack() },
        {
          text: 'Yes!',
          onPress: () => {
            setAttempts((prevState) => (prevState -= 1));
          },
        },
      ]);
    } else {
      Alert.alert('Success!', `You captured ${pokemon.name}`, [
        {
          text: 'Ok',
          onPress: () => {
            // call mutation
          },
        },
      ]);
    }
  };

  return (
    <View style={styles.card}>
      <View style={styles.imageContainer}>
        <Image style={styles.image} source={{ uri: pokemon.image }} />
      </View>
      <View style={styles.attemptsContainer}>
        <Text style={styles.label}>
          Attempts: <Text style={styles.attempts}>{attempts}</Text>
        </Text>
      </View>
      <View>
        <Button title='Capture!' color='red' onPress={capturePokemon} />
      </View>
    </View>
  );
};

export default CapturePokemonScreen;

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
    marginTop: 20,
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
  attemptsContainer: {
    alignItems: 'center',
    paddingBottom: 10,
  },
  label: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  attempts: {
    fontWeight: 'normal',
  },
});
