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
  getOngoingTargets,
  getCurrentScore,
  writeUserDataToDB,
  requestPermissions
} from '../util';

import IntroView from './IntroView';
import HomeView from './HomeView';
import MenuView from './MenuView';
import AddCustomHabitView from './AddCustomHabit';
import LogHabitView from './LogHabit';
import SetTargetView from './SetTarget';
import ReportsView from './ReportsView';

class App extends React.Component {

  state = {
    presetHabits: [],
    customHabits: [],
    targets: [],
    userLog: [],
    score: 0,
    dataLoaded: false,
    // derived values 
    ongoingTargets: [],

    // event/view tracking states
    menuOpen: false,
    customHabitOpen: false,
    logHabitOpen: false,
    setTargetOpen: false,
    reportsOpen: false
  };

  async componentDidMount() {
    var data = await getUserData(); // load data from file here
    var ongoingTargets = getOngoingTargets(data.targets);
    var presetHabits = data.presetHabits;
    var customHabits = data.customHabits;
    var targets = data.targets;
    var userLog = data.userLog;
    var score = getCurrentScore(userLog, targets);
    setTimeout(() => {
      this.setState({dataLoaded: true, ongoingTargets, presetHabits, customHabits, targets, userLog, score});
    }, 500);
  };

  onMenuButtonPressed = () => {
    this.setState({menuOpen: true, customHabitOpen: false, logHabitOpen: false, setTargetOpen: false, reportsOpen: false});
  };

  onCloseMenuButtonPressed = () => {
    this.setState({menuOpen: false});
  };

  openAddCustomHabitView = () => {
    this.setState({menuOpen:false, customHabitOpen: true});
  };

  openLogHabitView = () => {
    this.setState({menuOpen:false, logHabitOpen: true});
  };

  openSetTargetView = () => {
    this.setState({menuOpen:false, setTargetOpen: true});
  };

  openReportsView = () => {
    this.setState({menuOpen:false, reportsOpen: true});
  };

  onAddCustomHabitButtonPressed = (habit) => {
    // since setState is async, we separately make new array and write
    writeUserDataToDB(this.state.presetHabits, [...this.state.customHabits, habit], this.state.targets, this.state.userLog, this.state.score);
    this.setState(prevState => ({
      customHabits: [...prevState.customHabits, habit]
    }));
  };

  onLogHabitButtonPressed = (log) => {
    // since setState is async, we separately make new array and write
    var score = getCurrentScore(log, this.state.targets);
    writeUserDataToDB(this.state.presetHabits, this.state.customHabits, this.state.targets, log, score);
    this.setState(prevState => ({
      userLog: log,
      score: score
    }));
  };

  onSetTargetButtonPressed = (target) => {
    // since setState is async, we separately make new array and write
    writeUserDataToDB(this.state.presetHabits, this.state.customHabits, [...this.state.targets, target], this.state.userLog, this.state.score);
    this.setState(prevState => ({
      targets: [...prevState.targets, target],
      ongoingTargets: getOngoingTargets([...prevState.targets, target])
    }));
  };



  render () {
    if(this.state.menuOpen) {
      return (
        <SafeAreaView style={styles.safeArea}>
          {/* <StatusBar barStyle={'dark-content'} /> */}
          <MenuView 
            onCloseMenuButtonPressed={this.onCloseMenuButtonPressed}
            openAddCustomHabitView={this.openAddCustomHabitView}
            openLogHabitView={this.openLogHabitView}
            openSetTargetView={this.openSetTargetView}
            openReportsView={this.openReportsView}
          />
        </SafeAreaView>
      );
    }

    if(this.state.customHabitOpen) {
      return (
        <SafeAreaView style={styles.safeArea}>
          {/* <StatusBar barStyle={'dark-content'} /> */}
          <AddCustomHabitView 
            onBackButtonPressed={this.onMenuButtonPressed}
            onAddCustomHabitButtonPressed={this.onAddCustomHabitButtonPressed}
          />
        </SafeAreaView>
      );
    }

    if(this.state.logHabitOpen) {
      return (
        <SafeAreaView style={styles.safeArea}>
          {/* <StatusBar barStyle={'dark-content'} /> */}
          <LogHabitView 
            presetHabits={this.state.presetHabits}
            customHabits={this.state.customHabits}
            userLog={this.state.userLog}
            onBackButtonPressed={this.onMenuButtonPressed}
            onLogHabitButtonPressed={this.onLogHabitButtonPressed}
          />
        </SafeAreaView>
      );
    }

    if(this.state.setTargetOpen) {
      return (
        <SafeAreaView style={styles.safeArea}>
          {/* <StatusBar barStyle={'dark-content'} /> */}
          <SetTargetView 
            presetHabits={this.state.presetHabits}
            customHabits={this.state.customHabits}
            targets={this.state.targets}
            onBackButtonPressed={this.onMenuButtonPressed}
            onSetTargetButtonPressed={this.onSetTargetButtonPressed}
          />
        </SafeAreaView>
      );
    }

    if(this.state.reportsOpen) {
      return (
        <SafeAreaView style={styles.safeArea}>
          <StatusBar barStyle={'dark-content'} />
          <ReportsView 
            presetHabits={this.state.presetHabits}
            customHabits={this.state.customHabits}
            targets={this.state.targets}
            userLog={this.state.userLog}
            score={this.state.userLog}
            onBackButtonPressed={this.onMenuButtonPressed}
            onSetTargetButtonPressed={this.onSetTargetButtonPressed}
          />
        </SafeAreaView>
      );
    }

    if(this.state.dataLoaded) {
      return (
        <SafeAreaView style={styles.safeArea}>
          {/* <StatusBar barStyle={'dark-content'} /> */}
          <HomeView 
            ongoingTargets={this.state.ongoingTargets} 
            score={this.state.score}
            onMenuButtonPressed={this.onMenuButtonPressed}
          />
        </SafeAreaView>
      );
    }
    else {
      return (
        <SafeAreaView style={[{flex:1}]}>
          {/* <StatusBar barStyle={'dark-content'} /> */}
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
  safeArea: {
    flex: 1,
    backgroundColor: '#ccc'
  },
  appTitle: {
    fontSize: 40,
    fontWeight: '700',
    // flex:1
  }
});

export default App;
