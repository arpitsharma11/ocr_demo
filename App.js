import React from 'react';
import { createAppContainer, createStackNavigator } from 'react-navigation';

import MainScreen from './screens/MainScreen';
import ResultScreen from './screens/ResultScreen';

const App = createAppContainer(createStackNavigator({
    Main: MainScreen,
    Result: ResultScreen
  },
  {
    initialRouteName: 'Main'
  }
))

export default App;