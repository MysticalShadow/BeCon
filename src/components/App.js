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
  getCurrentScore,
  writeUserDataToDB
} from '../util';

import IntroView from './IntroView';
import HomeView from './HomeView';
import MenuView from './MenuView';
import AddCustomHabitView from './AddCustomHabit';

class App extends React.Component {

  state = {
    presetHabits: [],
    customHabits: [],
    userLog: [],
    score: 0,
    dataLoaded: false,
    // derived values 
    ongoingHabits: [],

    // event/view tracking states
    menuOpen: false,
    customHabitOpen: false,
  };

  componentDidMount() {
    var data = getUserData(); // load data from file here
    var ongoingHabits = getOngoingHabits(data);
    var presetHabits = data.presetHabits;
    var customHabits = data.customHabits;
    var userLog = data.userLog;
    var score = data.score;
    setTimeout(() => {
      this.setState({dataLoaded: true, ongoingHabits, presetHabits, customHabits, userLog, score});
    }, 500);
  };

  onMenuButtonPressed = () => {
    this.setState({menuOpen: true, customHabitOpen: false});
  };

  onCloseMenuButtonPressed = () => {
    this.setState({menuOpen: false});
  };

  openAddCustomHabitView = () => {
    this.setState({menuOpen:false, customHabitOpen: true});
  };

  onAddCustomHabitButtonPressed = (habit) => {
    // since setState is async, we separately make new array and write
    writeUserDataToDB(this.state.userLog, this.state.presetHabits, [...this.state.customHabits, habit], this.state.score);
    this.setState(prevState => ({
      customHabits: [...prevState.customHabits, habit]
    }));
  };



  render () {
    if(this.state.menuOpen) {
      return (
        <SafeAreaView style={[{flex:1}]}>
          <StatusBar barStyle={'dark-content'} />
          <MenuView 
            onCloseMenuButtonPressed={this.onCloseMenuButtonPressed}
            openAddCustomHabitView={this.openAddCustomHabitView}
          />
        </SafeAreaView>
      );
    }

    if(this.state.customHabitOpen) {
      return (
        <SafeAreaView style={[{flex:1}]}>
          <StatusBar barStyle={'dark-content'} />
          <AddCustomHabitView 
            onBackButtonPressed={this.onMenuButtonPressed}
            onAddCustomHabitButtonPressed={this.onAddCustomHabitButtonPressed}
          />
        </SafeAreaView>
      );
    }

    if(this.state.dataLoaded) {
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
