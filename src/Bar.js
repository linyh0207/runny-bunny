import React from 'react';
import {View} from 'react-native';
import { within_bounds } from './utils';

const WIDTH = 20;
const BACKGROUND_COLOUR = 'gray';
const MAX_HEIGHT = 100;

export function Bar(props){
    const height = within_bounds(props.height, 0, 100);
    return (
        <View style={{
            flexDirection: 'column',
            height: MAX_HEIGHT,
          }}>
            <View style={{
                width: WIDTH,
                height: (MAX_HEIGHT - height) ,
                backgroundColor: BACKGROUND_COLOUR
                }}
            ></View>
            <View style={{
                width: WIDTH,
                height: height,
                backgroundColor: props.colour
                }}
            ></View>
        </View>
      );
}