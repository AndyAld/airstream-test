import React from 'react';
import { View, StyleSheet } from 'react-native';
import TagCount from './components/TagCount';

const App = () => {
  return (
    <View style={styles.container}>
      <TagCount />
    </View>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
     marginTop: "10%",
  },
});
