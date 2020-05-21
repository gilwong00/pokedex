import React from 'react';
import { Provider } from 'react-redux';
import store from './src/store';
import PokedexNavigator from './src/navigation/PokedexNavigator';

export default function App() {
  return (
    <Provider store={store}>
      <PokedexNavigator />
    </Provider>
  );
}
