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
  FlatList
} from 'react-native';

import {
    convertLogJSONToArray
} from '../util';

import ReportsMenuView from './ReportsMenu';
import PeriodicalReportView from './PeriodicalReport';

class ReportsView extends React.Component {

    state = {
        reportsMenuOpen: true,
        viewHabitsOpen: false,
        dailyCoverageOpen: false,
        weeklyCoverageOpen: false,
        monthlyCoverageOpen: false,
        periodicalCoverageOpen: false,
        period: ""
    };

    handleBackButtonPressed = () => {
        this.props.onBackButtonPressed();
    };

    closeReportAndOpenReportsMenu = () => {
        this.setState({
            reportsMenuOpen: true,
            viewHabitsOpen: false,
            viewLogsOpen: false,
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

    onViewPeriodicalReportPressed = (period) => {
        this.setState({
            reportsMenuOpen: false,
            periodicalCoverageOpen: true,
            period: period
        });
    };


    render () {

        if(this.state.reportsMenuOpen) {
            return (
                <View style={{flex:1}}>
                    <TouchableOpacity 
                        style={styles.backButton} 
                        onPress={this.handleBackButtonPressed}
                    >
                        <Text style={styles.backString}>
                            Back
                        </Text>
                    </TouchableOpacity>

                    <ReportsMenuView 
                        onViewHabitsPressed={this.onViewHabitsPressed}
                        onCustomHabitsPressed={this.onCustomHabitsPressed}
                        onViewLogsPressed={this.onViewLogsPressed}
                        onViewPeriodicalReportPressed={this.onViewPeriodicalReportPressed}
                    />
                </View>
            );
        }

        if(this.state.viewHabitsOpen) {
            var habits = [];
            for (var i=0; i<50; i++){
                habits.push("Habit no "+i);
            }

            return (
                <View style={{flex:1}}>
                    <TouchableOpacity 
                        style={styles.backButton} 
                        onPress={this.closeReportAndOpenReportsMenu}
                    >
                        <Text style={styles.backString}>
                            Back
                        </Text>
                    </TouchableOpacity>

                    <Text style={styles.backString}>
                        Preset Habits:
                    </Text>

                    <FlatList 
                        style={styles.presetHabitsList}
                        data={habits}//this.props.presetHabits}
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
                </View>
            );
        }

        if(this.state.viewLogsOpen) {
            var logArray = convertLogJSONToArray(this.props.userLog);
            return (
                <View>
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
                </View>
            );
        }

        if(this.state.periodicalCoverageOpen) {
            return (
                <View style={{flex:1}}>
                    <TouchableOpacity 
                        style={styles.backButton} 
                        onPress={this.closeReportAndOpenReportsMenu}
                    >
                        <Text style={styles.backString}>
                            Back
                        </Text>
                    </TouchableOpacity>

                    <PeriodicalReportView 
                        period={this.state.period}
                        userLog={this.props.userLog}
                        targets={this.props.targets}
                    />
                </View>
            );
        }

        return (
            <View>
                <TouchableOpacity 
                    style={styles.backButton} 
                    onPress={this.handleBackButtonPressed}
                >
                    <Text style={styles.backString}>
                        Back
                    </Text>
                </TouchableOpacity>

                
                
            </View>
        );
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