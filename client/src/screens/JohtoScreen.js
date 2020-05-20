import React from 'react';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { StyleSheet, Text, View, Platform } from 'react-native';

const JohtoScreen = ({ navigation }) => {
  return (
    <View>
      <Text>Johto Pokemon</Text>
    </View>
  );
};

JohtoScreen.navigationOptions = ({ navigation }) => {
  return {
    headerTitle: 'Kanto Pokemon',
    headerLeft: () => (
      <HeaderButtons>
        <Item
          title='Menu'
          iconName={Platform.OS === 'android' ? 'md-menu' : 'ios-menu'}
          onPress={() => navigation.toggleDrawer()}
          color='#fff'
        />
      </HeaderButtons>
    ),
  };
};

export default JohtoScreen;

const styles = StyleSheet.create({});
