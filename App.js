import { createStackNavigator, createAppContainer } from 'react-navigation';

import Index from './src/Index.js'
import PetHome from './src/PetHome.js'

const RootStack = createStackNavigator(
  {
    Index: {
      screen: Index,
    },
    PetHome: {
      screen: PetHome,
    }
  },
  {
    initialRouteName: 'PetHome',
    },
);

const App = createAppContainer(RootStack)

export default App;