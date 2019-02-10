import React from 'react';
import {
  Image,
  StyleSheet,
  Text,
  View,
} from 'react-native';


export class PetImage extends React.Component{
    constructor(props) {
        super(props);
      }

    render(){
        const hunger = this.props.hunger;
        let imgKey = 0;
        // Need this, since you can't dynamically load images
        const imgRequireMap = {
            10: require('../images/red/256x256/kiss.png'),
            8: require('../images/red/256x256/happy.png'),
            6: require('../images/red/256x256/smile.png'),
            4: require('../images/red/256x256/wary.png'),
            2: require('../images/red/256x256/sad.png'),
            0: require('../images/red/256x256/cry.png')
        };

        if(hunger > 100){
            imgKey = 10;
        }else if (hunger > 80){
            imgKey = 8;
        } else if (hunger > 60){
            imgKey = 6;
        } else if (hunger > 40){
            imgKey = 4;
        } else if (hunger > 20){
            imgKey = 2;
        } else{
            imgKey = 0;
        }
        console.log(imgRequireMap[imgKey]);
        return (
            <Image
            style={{
              alignSelf: 'center',
              borderWidth: 1,
              borderRadius: 50
            }}
            source={imgRequireMap[imgKey]}
            resizeMode="stretch"
          />
        );
    }


}