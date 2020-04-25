import React from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
});

const Loader = () => (
  <View style={styles.container}>
    <ActivityIndicator size="large" color="#999" />
  </View>
);

export default Loader;
