import React,{Component} from 'react';
import { createAppContainer, createStackNavigator } from 'react-navigation';
import { SafeAreaView,View } from 'react-native';

import MainScreen from './screens/MainScreen';
import ResultScreen from './screens/ResultScreen';

const Nav = createAppContainer(createStackNavigator({
    Main: MainScreen,
    Result: ResultScreen
  },
  {
    initialRouteName: 'Main'
  }
))

export default class App extends Component {
  render(){
    return (
      <View style={{flex: 1,paddingTop: 20}}>
        <Nav/>
      </View>
    )
  }
};
