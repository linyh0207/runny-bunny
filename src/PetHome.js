import React from 'react';
import {
  Image,
  LayoutAnimation,
  NativeModules, 
  StyleSheet, 
  Text,
  TouchableOpacity, 
  View 
} from 'react-native';

const { UIManager} = NativeModules;

UIManager.setLayoutAnimationEnabledExperimental &&
  UIManager.setLayoutAnimationEnabledExperimental(true);


class PetHome extends React.Component {
  static navigationOptions = {
    title: 'Pet Home',
  };
  constructor(props){
    super(props);
    this.state = {
      w: 100,
      h: 100,
    }
  }
  onPress = () => {
    // Animate the update
    LayoutAnimation.spring();
    this.setState({w: this.state.width + 15, h: this.state.height + 15})
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>This is Pet Home Page!</Text>
        <Image
          style={{
            alignSelf: 'center',
            height: 150,
            width: 150,
            borderWidth: 1,
            borderRadius: 75
          }}
          source={require('../images/bunny.png')}
          resizeMode="stretch"
        />  
          <TouchableOpacity onPress={this.onPress}>
            <View style={styles.button}>
              <Text style={styles.buttonText}>Press me!</Text>
            </View>
          </TouchableOpacity>
        </View>
    );
  }
}

//<View style={[styles.box, {width: this.state.w, height: this.state.h}]} />

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  box: {
    width: 100,
    height: 100,
  },
  button: {
    backgroundColor: 'black',
    paddingHorizontal: 20,
    paddingVertical: 15,
    marginTop: 15,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  }
});

export default PetHome;
