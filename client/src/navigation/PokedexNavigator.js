import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createDrawerNavigator } from 'react-navigation-drawer';

//Screens
import CapturedScreen from '../screens/CapturedScreen';
import KantoScreen from '../screens/KantoScreen';
import JohtoScreen from '../screens/JohtoScreen';
import HomeScreen from '../screens/HomeScreen';

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
