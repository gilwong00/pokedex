import React from 'react';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import {
  StyleSheet,
  Text,
  View,
  Platform,
  ActivityIndicator,
} from 'react-native';
import { GET_CAPTURED_POKEMON } from '../graphql/queries';
import { useQuery } from '@apollo/react-hooks';
import CustomHeaderButton from '../components/UI/CustomHeaderButton';
import PokemonList from '../components/Pokemon/PokemonList';

const MyPokemonScreen = ({ navigation }) => {
  const { loading, error, data } = useQuery(GET_CAPTURED_POKEMON);

  if (loading) {
    return <ActivityIndicator size='large' color='red' />;
  }
  return (
    <View>
      {!data.getCapturedPokemon ? (
        <Text>None Captured. Go and catch em all!</Text>
      ) : (
        <PokemonList
          pokemons={data.getCapturedPokemon}
          loading={loading}
          navigation={navigation}
        />
      )}
    </View>
  );
};

MyPokemonScreen.navigationOptions = ({ navigation }) => {
  return {
    headerTitle: 'My Pokemon',
    headerLeft: () => (
      <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
        <Item
          title='Menu'
          iconName={Platform.OS === 'android' ? 'md-menu' : 'ios-menu'}
          onPress={() => navigation.toggleDrawer()}
        />
      </HeaderButtons>
    ),
  };
};

export default MyPokemonScreen;

const styles = StyleSheet.create({});
