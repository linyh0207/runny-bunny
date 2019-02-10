import React from 'react';
import {
  Image,
  StyleSheet,
  Text,
  View,
} from 'react-native';


export function PetImage(props){
    const hunger = props.hunger;
    const imgSrcBase = '../images/red/256x256/';
    let imgSrcFull;
    if(hunger > 100){
        imgSrcFull = imgSrcBase + 'kiss.png'
    }else if (hunger > 80){
        imgSrcFull = imgSrcBase + 'happy.png'
    } else if (hunger > 60){
        imgSrcFull = imgSrcBase + 'smile.png'
    } else if (hunger > 40){
        imgSrcFull = imgSrcBase + 'wary.png'
    } else if (hunger > 20){
        imgSrcFull = imgSrcBase + 'sad.png'
    } else{
        imgSrcFull = imgSrcBase + 'cry.png'
    }
    console.log(imgSrcFull);
    return (
        <Image
        style={{
          alignSelf: 'center',
          borderWidth: 1,
          borderRadius: 50
        }}
        source={require('../images/red/256x256/cry.png')}
        resizeMode="stretch"
      />
    );

}