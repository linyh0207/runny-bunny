import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createStackNavigator, createAppContainer } from 'react-navigation';
import {Linking} from 'react-native';

import Index from './src/Index.js'
import PetHome from './src/PetHome.js'

const RootStack = createStackNavigator(
  {
    Index: {
      screen: Index,
    },
    PetHome: {
      screen: PetHome,
      path: 'fit',
    }
  },
  {
    initialRouteName: 'Index',
  },
);

const App = createAppContainer(RootStack)

export default App;
