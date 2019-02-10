import React from 'react';
import { 
  StyleSheet, 
  Text, 
  View 
} from 'react-native';

class Index extends React.Component {
  static navigationOptions = {
    title: 'Index'
  };

  render() {
    return (
      <View style={styles.container}>
        <Text>This is the index page! </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default Index;
