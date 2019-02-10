import React from 'react';
import {AsyncStorage} from 'react-native';
import { 
  StyleSheet, 
  Text, 
  View,
  Image,
  TouchableOpacity,
  Modal,
  TextInput
} from 'react-native';

class Index extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      username: 'XdHacks',
      password: '2019',
      loginModalVisible: false,
    }
  }

  setLoginModalVisible(visible) {
    this.setState({loginModalVisible: visible});
  }

  render() {
    const { navigate } = this.props.navigation;
    return (
      <View style={styles.container}>    
            <Modal
              animationType="slide"
              transparent={false}
              visible={this.state.loginModalVisible}
              style={styles.modal}
            >
                <View style={styles.modal}>
                <Image
                  source={require('../img/fitbit_icon.jpg')}
                  style={{width: 80, height: 80}}
                />
                <TextInput
                    style={styles.textBox} 
                    placeholder='Username' 
                    onChangeText={(username) => this.setState({username})}
                    value={this.state.username}
                  />
                  <TextInput onChangeText = {(password) => this.setState({password})} 
                    style={styles.textBox} placeholder='Password'
                    value = {this.state.password} 
                    secureTextEntry = {true} 
                  />
        
                  <View style={styles.button}>
                    <TouchableOpacity
                      onPress={() => {
                        this.setLoginModalVisible(!this.state.loginModalVisible),
                        navigate('PetHome')}}>
                      <Text style={{fontSize: 20, color: '#8C8B8B', textAlign: 'center', marginTop: 5}}>Login</Text>
                    </TouchableOpacity>
                  </View>
                </View>
            </Modal> 

          <Image
            source={require('../img/logo.png')}
            style={{width: 450, height: 450}}
          />
          <TouchableOpacity onPress={() => this.setLoginModalVisible(true)}>
          <Image
            source={require('../img/trans_bunny.gif')}
            style={{width: 100, height: 100}}
          />
          <Text style={{fontSize: 15, color: '#8C8B8B', textAlign: 'center'}}>Login with Fitbit</Text>
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
  modal: {
    flex: 1,
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  textBox: {
    height: 40, 
    borderColor: '#8C8B8B', 
    borderWidth: 1, 
    textAlign: 'center',
    marginTop: 20,
    padding: 5,
    fontSize: 15,
    width: 100,
  },
});

export default Index;
