import React,{Component} from 'react';
import { createAppContainer, createStackNavigator } from 'react-navigation';
import { SafeAreaView,View } from 'react-native';

import MainScreen from './screens/MainScreen';
import ResultScreen from './screens/ResultScreen';
import CameraScreen from './screens/CameraScreen';

const Nav = createAppContainer(createStackNavigator({
    Main: MainScreen,
    Camera: CameraScreen,
    Result: ResultScreen
  },
  {
    initialRouteName: 'Main'
  }
))

export default class App extends Component {
  render(){
    return (
        <Nav/>
    )
  }
};
