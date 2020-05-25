import React, { useState } from 'react';
import { View, Alert, Platform } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { FETCH_POKEMON } from '../graphql/queries';
import { useQuery } from '@apollo/react-hooks';
import CustomHeaderButton from '../components/UI/CustomHeaderButton';
import PokemonList from '../components/Pokemon/PokemonList';

const HomeScreen = ({ navigation }) => {
  const [offset, setOffset] = useState(0);
  const [group, setGroup] = useState(1);
  const { loading, error, data } = useQuery(FETCH_POKEMON, {
    variables: { offset, group },
  });

  const loadMore = () => {
    setOffset((prevState) => {
      return prevState === 0 ? (prevState += 22) : (prevState += 21);
    });

    setGroup((prevState) => (prevState += 1));
  };

  if (error) {
    Alert.alert('Error fetching data', `${error.message}`, [{ text: 'Okay' }]);
  }

  return (
    <View>
      {data && data.fetchPokemon && (
        <PokemonList
          pokemons={data.fetchPokemon}
          loadMore={loadMore}
          offset={offset}
					loading={loading}
					navigation={navigation}
        />
      )}
    </View>
  );
};

HomeScreen.navigationOptions = ({ navigation }) => {
  return {
    headerTitle: 'Pokedex',
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

export default HomeScreen;
