import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createDrawerNavigator } from 'react-navigation-drawer';

//Screens
import CapturedScreen from '../screens/CapturedScreen';
import HomeScreen from '../screens/HomeScreen';
import PokemonScreen from '../screens/PokemonScreen';

const defaultNavigationOptions = {
  headerStyle: {
    backgroundColor: 'red',
  },
  headerTintColor: '#fff',
};

const CapturedNavigator = createStackNavigator(
  {
    Captured: CapturedScreen,
  },
  {
    defaultNavigationOptions,
  }
);

const HomeNavigator = createStackNavigator(
  {
    Home: HomeScreen,
    Pokemon: PokemonScreen,
  },
  { defaultNavigationOptions }
);

const MainNavigator = createDrawerNavigator(
  {
    Home: HomeNavigator,
    'My Pokemon': CapturedNavigator,
  },
  {
    defaultNavigationOptions,
  }
);

export default createAppContainer(MainNavigator);
