import React from 'react';
import {View} from 'react-native';

const WIDTH = 20;
const MAX_HEIGHT = 100; // TODO: Create another bar chart as background

export function Bar(props){
    return (
          <View style={
              {
                  width: WIDTH,
                  height: props.height,
                  backgroundColor: props.colour
                }
            } />
      );
}