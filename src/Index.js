import React from 'react';
import {AsyncStorage} from 'react-native';
import { 
  StyleSheet, 
  Text, 
  View,
  Image,
  TouchableOpacity
} from 'react-native';

class Index extends React.Component {
  render() {
    const { navigate } = this.props.navigation;
    return (
      <View style={styles.container}>
        <Image
          source={require('../img/logo.png')}
          style={{width: 450, height: 450}}
        />
        <Image
          source={require('../img/trans_bunny.gif')}
          style={{width: 100, height: 100}}
        />

        <TouchableOpacity onPress={() => {
            AsyncStorage.setItem('@funnybunny:fitbit_access_token', 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyMkRDMk4iLCJzdWIiOiI3Qkc5VE0iLCJpc3MiOiJGaXRiaXQiLCJ0eXAiOiJhY2Nlc3NfdG9rZW4iLCJzY29wZXMiOiJ3aHIgd3BybyB3c2xlIHdhY3QiLCJleHAiOjE1ODEzMDc4MTcsImlhdCI6MTU0OTgxODkxMX0.FUE8PBSc3jHBfD-JgEjn7hHlTqVIodFH5Prp5BADrIY');
            navigate('PetHome')
        }}>
        <Text style={{fontSize: 20, color: '#8C8B8B', textAlign: 'center'}}>Start</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default Index;
