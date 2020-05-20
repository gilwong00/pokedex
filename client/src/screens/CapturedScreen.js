import React from 'react';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { StyleSheet, Text, View, Platform } from 'react-native';
import CustomHeaderButton from '../components/CustomHeaderButton';

const CapturedScreen = ({ navigation }) => {
  return (
    <View>
      <Text>Pokemon I've captured</Text>
    </View>
  );
};

CapturedScreen.navigationOptions = ({ navigation }) => {
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

export default CapturedScreen;

const styles = StyleSheet.create({});
