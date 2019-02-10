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
  View,
  AsyncStorage
} from 'react-native';
import { Bar } from './Bar';

const { UIManager } = NativeModules;

UIManager.setLayoutAnimationEnabledExperimental &&
  UIManager.setLayoutAnimationEnabledExperimental(true);

const FOOD_DECREMENT = 10;
// Drops to 0 from a 100 after 3 days => (3600*3*24)x = 100
const HUNGER_DECAY = 0.00038580;
// Hunger is used to scale the size of the pet,
// this is an offset so that at 0 hunger the width/height is not 0
const HUNGER_SIZE_OFFSET = 100; 

class PetHome extends React.Component {
  static navigationOptions = {
    title: 'Pet Home',
  };

  constructor(props) {
    super(props);
    this.state = {
      name: '',
      modalVisible: false,
      hunger: 50,
      food: 100,
      // Sync Time is for retrieval limit of API calls to fitbit
      lastSyncTime: null,
      // Open Time is for determining hunger decay
      lastOpenTime: null
    }
    this.onPress = this.onPress.bind(this);
    this.showModal = this.showModal.bind(this)
  }

  retrieveStoredData = async () => {
    const currentTime = (new Date()).getTime();
    try {
      // Could probably clean with multiGet method but I'm too lazy
      const hunger = JSON.parse(await AsyncStorage.getItem('hunger'));
      const lastSyncTime = JSON.parse(await AsyncStorage.getItem('lastSyncTime'));
      const food = JSON.parse(await AsyncStorage.getItem('food'));
      const lastOpenTime = JSON.parse(await AsyncStorage.getItem('lastOpenTime'));
      const name = await AsyncStorage.getItem('name');
      // TODO: Could probably shorten to just 'hunger && food && ...'
      if (
        hunger !== null && 
        food !== null && 
        lastSyncTime !== null &&
        lastOpenTime !== null) {
        // TODO: Fix this code...
        const differenceInSeconds = (currentTime - lastOpenTime)/1000;
        this.state.food = food - differenceInSeconds*HUNGER_DECAY;
        this.state.lastSyncTime = lastSyncTime;
        this.state.lastOpenTime = lastOpenTime;
        this.state.hunger = hunger;
      }
      else {
        console.warn('Could not retrieve all stored data! Using defaults');
      }

      if (name !== null){
        this.state.name = name;
      }

    } catch (error) {
      console.error(error);
    }
  };

  storeData = async () => {
    const currentTime = new Date();
    try {
      // TODO: Maybe I should be storing the entire state object as JSON?
      await AsyncStorage.setItem('hunger', JSON.stringify(this.state.hunger));
      await AsyncStorage.setItem('food', JSON.stringify(this.state.food));
      // TODO: Change this to whatever format for API call
      await AsyncStorage.setItem('lastSyncTime',
        JSON.stringify(currentTime.toUTCString())
      );
      await AsyncStorage.setItem('lastOpenTime', JSON.stringify(currentTime.getTime()));

      if(this.state.name){
        await AsyncStorage.setItem('name', this.state.name);
      }
    } catch (error) {
      console.error(error);
    }
  };

  componentDidMount(){
    // TODO: Send API call to retrieve information from fitbit
    this.retrieveStoredData().then( () => {
      console.debug('Successful retrieval', this.state);
      this.setState(this.state);
    });
    
  }
  /**
   * Store the data right before navigation away from main page
   */
  componentWillUnmount(){
    this.storeData().then(() => console.debug('Successful store', this.state));
  }

  canFeed() {
    return this.state.food > FOOD_DECREMENT;
  }

  feed() {
    if (this.canFeed()) {
      this.state.hunger += FOOD_DECREMENT;
      this.state.food -= FOOD_DECREMENT;
    } else {
      console.warn('Cannot feed! No food');
    }
  }


  componentDidUpdate() {
    if (this.state.hunger < 0){
      // TODO: Add dead state?
    }
    if (!this.canFeed) {
      // TODO: Gray out the food button otherwise
    }
  }
  /**
   * This is the feed buttom
   */
  onPress = () => {
    // Feed the pet
    this.feed();
    // Animate the update
    LayoutAnimation.spring();
    this.setState(this.state)
  }

  showModal(visible) {
    this.setState({ modalVisible: visible });
  }

  render() {
    // TODO: How do I add hunger and food bars to the left and right of the pet
    /* <Bar height={this.state.hunger} colour="red"></Bar> */
    return (
      <View style={styles.container}>
        <Text>{this.state.name}</Text>
        <Image
          style={{
            alignSelf: 'center',
            height: this.state.hunger + HUNGER_SIZE_OFFSET,
            width: this.state.hunger + HUNGER_SIZE_OFFSET,
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
              alignItems: 'center'
            }}
            >
              <View style={{
                width: 300,
                height: 300
              }}>
                <TextInput
                  style={styles.textBox}
                  placeholder='Pet Name'
                  onChangeText={(name) => this.setState({ name })}
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

        {/* No need to set name if already has a name? */}
        {!this.state.name ? (
          <TouchableOpacity
          onPress={() => {
            this.showModal(true);
          }}>
          <Text>Name Me!</Text>
        </TouchableOpacity>
        ) : null}

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
