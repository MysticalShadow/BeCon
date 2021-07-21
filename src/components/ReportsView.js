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
  TouchableOpacity,
  FlatList,
  Animated,
  BackHandler
} from 'react-native';

import {
    convertLogJSONToArray
} from '../util';

import ReportsMenuView from './ReportsMenu';
import PeriodicalReportView from './PeriodicalReport';

class ReportsView extends React.Component {

    componentDidMount () {
        this.fadeIn();
        this.backHandler = BackHandler.addEventListener(
            "hardwareBackPress",
            this.handleBackButtonPressed
          );
    };

    componentWillUnmount() {
        this.backHandler.remove();
    };

    fadeIn = () => {
        Animated.timing(this.state.fadeAnimation, {
            toValue: 1,
            duration: 200,
            useNativeDriver: true
        }).start();
    };

    fadeOutIn = () => {
        Animated.timing(this.state.fadeAnimation, {
            toValue: 0,
            duration: 0,
            useNativeDriver: true
        }).start(() => {this.fadeIn()});
    };

    state = {
        reportsMenuOpen: true,
        viewHabitsOpen: false,
        dailyCoverageOpen: false,
        weeklyCoverageOpen: false,
        monthlyCoverageOpen: false,
        periodicalCoverageOpen: false,
        period: "",
        fadeAnimation: new Animated.Value(0)
    };

    handleBackButtonPressed = () => {
        if(this.state.reportsMenuOpen)
            this.props.onBackButtonPressed();
        else
            this.closeReportAndOpenReportsMenu();

        return true;
    };

    closeReportAndOpenReportsMenu = () => {
        this.setState({
            reportsMenuOpen: true,
            viewHabitsOpen: false,
            viewLogsOpen: false,
            viewTargetsOpen: false,
            dailyCoverageOpen: false,
            weeklyCoverageOpen: false,
            monthlyCoverageOpen: false,
            periodicalCoverageOpen: false,
        });
    };

    onViewHabitsPressed = () => {
        this.setState({
            reportsMenuOpen: false,
            viewHabitsOpen: true,
        });
    };

    onViewLogsPressed  = () => {
        this.setState({
            reportsMenuOpen: false,
            viewLogsOpen: true,
        });
    };

    onViewTargetsPressed  = () => {
        this.setState({
            reportsMenuOpen: false,
            viewTargetsOpen: true,
        });
    };

    onViewPeriodicalReportPressed = (period) => {
        this.fadeOutIn();
        this.setState({
            reportsMenuOpen: false,
            periodicalCoverageOpen: true,
            period: period
        });
    };


    render () {

        if(this.state.reportsMenuOpen) {
            return (
                <Animated.View style={{flex:1, opacity:this.state.fadeAnimation}}>
                    <ReportsMenuView 
                        onViewHabitsPressed={this.onViewHabitsPressed}
                        onCustomHabitsPressed={this.onCustomHabitsPressed}
                        onViewLogsPressed={this.onViewLogsPressed}
                        onViewTargetsPressed={this.onViewTargetsPressed}
                        onViewPeriodicalReportPressed={this.onViewPeriodicalReportPressed}
                    />
                </Animated.View>
            );
        }

        if(this.state.viewHabitsOpen) {
            var habits = [];
            for (var i=0; i<50; i++){
                habits.push("Habit no "+i);
            }

            return (
                <Animated.View style={{flex:1, opacity:this.state.fadeAnimation}}>
                    <Text style={styles.backString}>
                        Preset Habits:
                    </Text>

                    <FlatList 
                        style={styles.presetHabitsList}
                        data={this.props.presetHabits}
                        renderItem={({ item, index }) => (
                            <Text style={styles.target} key={index}> - {item} </Text>
                        )}
                        keyExtractor={ ( item, index ) => `${index}` }
                        persistentScrollbar={true}
                    />

                    <Text style={styles.backString}>
                        Custom Habits:
                    </Text>

                    <FlatList 
                        style={styles.customHabitsList}
                        data={this.props.customHabits}
                        renderItem={({ item, index }) => (
                            <Text style={styles.target} key={index}> - {item} </Text>
                        )}
                        keyExtractor={ ( item, index ) => `${index}` }
                        persistentScrollbar={true}
                    />
                </Animated.View>
            );
        }

        if(this.state.viewLogsOpen) {
            var logArray = convertLogJSONToArray(this.props.userLog);
            return (
                <Animated.View style={{opacity:this.state.fadeAnimation}}>
                    <TouchableOpacity 
                        style={styles.backButton} 
                        onPress={this.closeReportAndOpenReportsMenu}
                    >
                        <Text style={styles.backString}>
                            Back
                        </Text>
                    </TouchableOpacity>

                    <FlatList 
                        style={styles.ongoingTargetList}
                        data={logArray}
                        renderItem={({ item, index }) => (
                            <Text style={styles.target} key={index}> - {item.date}: {item.habit} </Text>
                        )}
                        keyExtractor={ ( item, index ) => `${index}` }
                    />
                </Animated.View>
            );
        }

        if(this.state.viewTargetsOpen) {
            return (
                <Animated.View style={{opacity:this.state.fadeAnimation}}>
                    <FlatList 
                        style={styles.ongoingTargetList}
                        data={this.props.targets}
                        renderItem={({ item, index }) => (
                            <Text style={styles.target} key={index}> - {item.date}: For {item.duration} days - {item.habit}</Text>
                        )}
                        keyExtractor={ ( item, index ) => `${index}` }
                    />
                </Animated.View>
            );
        }

        if(this.state.periodicalCoverageOpen) {
            return (
                <Animated.View style={{flex:1, opacity:this.state.fadeAnimation}}>
                    <PeriodicalReportView 
                        period={this.state.period}
                        userLog={this.props.userLog}
                        targets={this.props.targets}
                    />
                </Animated.View>
            );
        }
    };


};

const styles = StyleSheet.create({
    backButton: {
        alignSelf: 'baseline',
        marginLeft: 10,
        marginTop: 20,
        marginBottom: 20,
        borderColor: '#000',
        borderWidth: 0.7,
        borderRadius: 10,
        padding: 4,
        paddingHorizontal: 8
    },
    backString:{
        fontSize: 15,
        fontFamily: "sans-serif",
        letterSpacing: 1,
        textShadowColor: "#111",
        textShadowRadius: 1
    },
    menuItem: {
        margin: 10,
        // marginTop: 20,
        borderColor: '#000',
        borderWidth: 1,
        borderRadius: 6,
        padding: 5,
        width: 200
    },
    presetHabitsList: {
        flex: 0.5,
        borderWidth: 2,
        margin: 10,
        borderRadius: 6,
        padding: 2
    },
    customHabitsList: {
        flex: 0.5,
        borderWidth: 2,
        margin: 10,
        borderRadius: 6,
        padding: 2
    },
});

export default ReportsView;