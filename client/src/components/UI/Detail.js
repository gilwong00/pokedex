import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const Detail = ({ label, text }) => (
  <View style={styles.detail}>
    <Text style={styles.label}>{label}:</Text>
    <Text style={styles.text}>{text}</Text>
  </View>
);

export default Detail;

const styles = StyleSheet.create({
  detail: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
		paddingHorizontal: 10,
		paddingVertical: 7
  },
  label: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  text: {
    fontSize: 16,
  },
});
