import React from 'react';
import { 
  StyleSheet, 
  Text, 
  View 
} from 'react-native';

class PetHome extends React.Component {
  static navigationOptions = {
    title: 'Pet Home'
  };

  render() {
    return (
      <View style={styles.container}>
        <Text>This is Pet Home Page!</Text>
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

export default PetHome;
