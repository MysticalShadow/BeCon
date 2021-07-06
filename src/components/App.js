import { react } from '@babel/types';
import React from 'react';
import {Node} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  Colors
} from 'react-native';

import {
  getUserData, 
  getOngoingHabits,
  getCurrentScore
} from '../util';

import IntroView from './IntroView';
import HomeView from './HomeView';
import MenuView from './MenuView';

class App extends React.Component {

  state = {
    userData: undefined,
    presetHabits: [],
    customHabits: [],
    userLog: [],
    score: 0,
    // derived values 
    ongoingHabits: [],

    // event tracking states
    menuOpen: false
  };

  componentDidMount() {
    var data = getUserData(); // load data from file here
    var ongoingHabits = getOngoingHabits(data);
    var score = getCurrentScore();
    // console.log(score);
    setTimeout(() => {
      this.setState({userData: data, ongoingHabits, score});
    }, 500);
  };

  onMenuButtonPressed = () => {
    this.setState({menuOpen: true});
  };

  onCloseMenuButtonPressed = () => {
    this.setState({menuOpen: false});
  };



  render () {
    if(this.state.menuOpen) {
      return (
        <SafeAreaView style={[{flex:1}]}>
          <StatusBar barStyle={'dark-content'} />
          <MenuView onCloseMenuButtonPressed={this.onCloseMenuButtonPressed}/>
        </SafeAreaView>
      );
    }

    if(this.state.userData) {
      var ongoingHabits = getOngoingHabits();
      return (
        <SafeAreaView style={[{flex:1}]}>
          <StatusBar barStyle={'dark-content'} />
          <HomeView 
            ongoingHabits={this.state.ongoingHabits} 
            score={this.state.score}
            onMenuButtonPressed={this.onMenuButtonPressed}
          />
        </SafeAreaView>
      );
    }
    else {
      return (
        <SafeAreaView style={[{flex:1}]}>
          <StatusBar barStyle={'dark-content'} />
          <IntroView/>
        </SafeAreaView>
      );
    }
  };
  
};

const styles = StyleSheet.create({
  container: {
    flex:1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  appTitle: {
    fontSize: 40,
    fontWeight: '700',
    // flex:1
  }
});

export default App;
