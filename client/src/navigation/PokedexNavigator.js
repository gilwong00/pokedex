import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createDrawerNavigator } from 'react-navigation-drawer';

//Screens
import MyPokemon from '../screens/MyPokemonScreen';
import HomeScreen from '../screens/HomeScreen';
import PokemonScreen from '../screens/PokemonScreen';
import CapturePokemonScreen from '../screens/CapturePokemonScreen';

const defaultNavigationOptions = {
  headerStyle: {
    backgroundColor: 'red',
  },
  headerTintColor: '#fff',
};

const PokemonNavigator = createStackNavigator(
  {
    'My Pokemon': MyPokemon,
  },
  {
    defaultNavigationOptions,
  }
);

const HomeNavigator = createStackNavigator(
  {
		Home: HomeScreen,
		Pokemon: PokemonScreen,
    CapturePokemon: CapturePokemonScreen,
  },
  { defaultNavigationOptions }
);

const MainNavigator = createDrawerNavigator(
  {
    Home: HomeNavigator,
    'My Pokemon': PokemonNavigator,
  },
  {
    defaultNavigationOptions,
  }
);

export default createAppContainer(MainNavigator);
