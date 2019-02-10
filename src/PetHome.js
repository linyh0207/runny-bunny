import React from 'react';
import {
  Image,
  LayoutAnimation,
  Modal,
  NativeModules, 
  StyleSheet, 
  Text,
  TextInput,
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
      name: '',
      modalVisible: false,
    }
    this.onPress = this.onPress.bind(this);
    this.shrink = this.shrink.bind(this);
    this.showModal = this.showModal.bind(this)
  }
  
  onPress = () => {
    // Animate the update
    LayoutAnimation.spring();
    this.setState({w: this.state.w + 15, h: this.state.h + 15})
  }
  
  shrink = () => {
    LayoutAnimation.spring();
    this.setState({w: this.state.w - 15, h: this.state.h - 15})
  }

  showModal(visible) {
    this.setState({modalVisible: visible});
  }

  componentDidMount = () => {
      fetch(
          'https://warm-stream-84299.herokuapp.com/activities',
          {
              method: 'GET',
          }
      ).then((res) => {
          return res.json()
      }).then((res) => {
          console.log(`res: ${JSON.stringify(res)}`);
      }).catch((err) => {
          console.error('Error: ', err);
      });
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>{ this.state.name }</Text>
        <Image
          style={{
            alignSelf: 'center',
            height: this.state.h,
            width: this.state.w,
            borderWidth: 1,
            borderRadius: 50
          }}
          source={require('../images/bunny.png')}
          resizeMode="stretch"
        />  

          <TouchableOpacity onPress={this.onPress}>
            <View style={styles.button}>
              <Text style={styles.buttonText}>Feed me!</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity onPress={this.shrink}>
            <View style={styles.button}>
              <Text style={styles.buttonText}>Make me skinny😂</Text>
            </View>
          </TouchableOpacity>
  
          <View style={styles.modal}>
            <Modal
              animationType="slide"
              transparent={false}
              visible={this.state.modalVisible}
            >
            <View style={{
              flex: 1,
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center'}}
              >
              <View style={{
                width: 300,
                height: 300}}
                >
                <TextInput
                  style={styles.textBox} 
                  placeholder='Pet Name' 
                  onChangeText={(name) => this.setState({name})}
                  value={this.state.name}
                />
                <TouchableOpacity
                  onPress={() => {
                    this.showModal(!this.state.modalVisible);
                  }}>
                  <Text >Set Pet Name</Text>
                </TouchableOpacity>
                </View>
              </View>
            </Modal>
          </View>

          <TouchableOpacity
            onPress={() => {
              this.showModal(true);
            }}>
            <Text>Name Me!</Text>
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
  },
  modal: {
    marginTop: 100, 
    padding: 20, 
    width: 300, 
    backgroundColor: 'rgba(255,255,255,0)', 
    justifyContent: 'center',
  },
  textBox: {
    height: 40, 
    borderColor: '#8C8B8B', 
    borderWidth: 1, 
    textAlign: 'center',
    marginTop: 10,
    color: '#8C8B8B',
    fontSize: 20,

  }
});

export default PetHome;
