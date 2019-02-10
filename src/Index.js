import React from 'react';
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
        
        <TouchableOpacity onPress={() => navigate('PetHome')}>
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
