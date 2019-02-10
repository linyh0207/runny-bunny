import React from 'react';
import {
  Modal,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  AsyncStorage,
  Image
} from 'react-native';
import { Bar } from './Bar';
import {getData} from './fitbit/fitbit'
import { PetImage } from './PetImage';
import { within_bounds } from './utils';

const FOOD_DECREMENT = 10;
// Drops to 0 from a 100 after 3 days => (3600*3*24)x = 100
const HUNGER_DECAY = .5;

class PetHome extends React.Component {
  static navigationOptions = {
    headerTitle: (
      <Image
        source={require('../img/home.png')}
        style={{height: 30, width: 30}}
      />
    ),
    headerTintColor: 'black'
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
      let hunger = JSON.parse(await AsyncStorage.getItem('hunger'));
      let lastSyncTime = await AsyncStorage.getItem('lastSyncTime');
      const food = JSON.parse(await AsyncStorage.getItem('food'));
      let lastOpenTime = await AsyncStorage.getItem('lastOpenTime');
      const name = await AsyncStorage.getItem('name');
      // yyyy-MM-ddTHH:mm:ss
      if (lastSyncTime == null) {
        lastSyncTime = new Date().toISOString()
        this.state.lastSyncTime = lastSyncTime
      }
      if (lastOpenTime == null) {
        lastOpenTime = new Date().getTime()
        this.state.lastOpenTime = lastOpenTime
      }
      // TODO: Could probably shorten to just 'hunger && food && ...'
      if (
        hunger !== null && 
        food !== null && 
        lastSyncTime !== null &&
        lastOpenTime !== null) {
        const differenceInSeconds = (currentTime - lastOpenTime)/1000;
        this.state.hunger = within_bounds(hunger - differenceInSeconds*HUNGER_DECAY, 0, 100)
        this.state.lastSyncTime = lastSyncTime;
        this.state.lastOpenTime = lastOpenTime;
        this.state.food = food;
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
      await AsyncStorage.setItem('lastSyncTime', this.state.lastSyncTime);
      await AsyncStorage.setItem('lastOpenTime', JSON.stringify(currentTime.getTime()));

      if(this.state.name){
        await AsyncStorage.setItem('name', this.state.name);
      }
    } catch (error) {
      console.error(error);
    }
  };

  componentDidMount(){
    this.retrieveStoredData().then( () => {
      console.debug('Successful retrieval', this.state);

      AsyncStorage.getItem('@funnybunny:fitbit_access_token', (err, result) => {
        getData(result, this.state.lastSyncTime, (calories) => {
          this.state.food += calories;
          this.state.lastSyncTime = new Date().toISOString();
          this.setState(this.state);
        })
      });
    });
  }
  /**
   * Store the data right before navigation away from main page
   */
  componentWillUnmount(){
    this.storeData().then(() => console.debug('Successful store', this.state));
  }

  canFeed() {
    return this.state.food > 0 && this.state.hunger <= (100 - this.state.food);
  }

  feed() {
    if (this.canFeed()) {
      const decrement = Math.min(FOOD_DECREMENT, this.state.food);
      this.state.hunger += decrement;
      this.state.food -= decrement;
    } else {
      alert('Cannot feed! No food or I\'m full')
      console.warn('Cannot feed! No food or he\'s full');
    }
  }


  componentDidUpdate() {
    if (!this.canFeed) {
      // TODO: Gray out the food button otherwise
    }
    // Bounds Checking
    this.state.food = within_bounds(this.state.food, 0, 100);
    this.state.hunger = within_bounds(this.state.hunger, 0, 100);
  }
  /**
   * This is the feed buttom
   */
  onPress = () => {
    // Feed the pet
    this.feed();
    this.setState(this.state)
  }

  showModal(visible) {
    this.setState({ modalVisible: visible });
  }

  render() {
    return (
    <View style={styles.container}>
      <View style={styles.hungerBar}>
        <Bar height={this.state.hunger} colour="red"></Bar>
        <Image
            source={require('../img/heart.png')}
            style={{width: 20, height: 20}}
          />
      </View>
      <View style={styles.petContainer}>
        {/* No need to set name if already has a name. Using a ternary if operater here */}
        {/* https://www.robinwieruch.de/conditional-rendering-react/#ternary-operation */}
        {!this.state.name ? (
            <TouchableOpacity
            onPress={() => {
              this.showModal(true);
            }}>
              <Text style={{ color: '#8C8B8B',fontWeight: 'bold',}}>Give me a name ... </Text>
            </TouchableOpacity>
          ) : null}
        <Text>{this.state.name}</Text>
        <PetImage hunger={this.state.hunger}></PetImage>

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
            onRequestClose={() => console.log('Modal closed')}
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
                height: 300,
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
                  <Text style={{ color: '#8C8B8B',fontWeight: 'bold',}}>Set Pet Name</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>
        </View>
      </View>
      <View style={styles.foodBar}>
        <Bar height={this.state.food} colour="green"></Bar>
        <Image
            source={require('../img/carrot-icon.png')}
            style={{width: 20, height: 20}}
          />
      </View>
    </View>
    );
  }
}


const styles = StyleSheet.create({
  container:{
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  hungerBar:{
    marginLeft: 20,
    marginTop:'auto',
    marginBottom: 300,
  },
  foodBar: {
    marginRight: 20,
    marginTop:'auto',
    marginBottom: 300,
  },
  petContainer: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    flexGrow: 1,
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
  },
});

export default PetHome;
