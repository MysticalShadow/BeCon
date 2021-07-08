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
        presetHabitsOpen: false,
        customHabitsOpen: false,
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
            presetHabitsOpen: false,
            customHabitsOpen: false,
            viewLogsOpen: false,
            dailyCoverageOpen: false,
            weeklyCoverageOpen: false,
            monthlyCoverageOpen: false,
            periodicalCoverageOpen: false,
        });
    };

    onPresetHabitsPressed= () => {
        this.setState({
            reportsMenuOpen: false,
            presetHabitsOpen: true,
        });
    };

    onCustomHabitsPressed = () => {
        this.setState({
            reportsMenuOpen: false,
            customHabitsOpen: true,
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
                <View>
                    <TouchableOpacity 
                        style={styles.backButton} 
                        onPress={this.handleBackButtonPressed}
                    >
                        <Text>
                            Back
                        </Text>
                    </TouchableOpacity>

                    <ReportsMenuView 
                        onPresetHabitsPressed={this.onPresetHabitsPressed}
                        onCustomHabitsPressed={this.onCustomHabitsPressed}
                        onViewLogsPressed={this.onViewLogsPressed}
                        onViewPeriodicalReportPressed={this.onViewPeriodicalReportPressed}
                    />
                </View>
            );
        }

        if(this.state.presetHabitsOpen) {
            return (
                <View>
                    <TouchableOpacity 
                        style={styles.backButton} 
                        onPress={this.closeReportAndOpenReportsMenu}
                    >
                        <Text>
                            Back
                        </Text>
                    </TouchableOpacity>

                    <FlatList 
                        style={styles.ongoingTargetList}
                        data={this.props.presetHabits}
                        renderItem={({ item, index }) => (
                            <Text style={styles.target} key={index}> - {item} </Text>
                        )}
                        keyExtractor={ ( item, index ) => `${index}` }
                    />
                </View>
            );
        }

        if(this.state.customHabitsOpen) {
            return (
                <View>
                    <TouchableOpacity 
                        style={styles.backButton} 
                        onPress={this.closeReportAndOpenReportsMenu}
                    >
                        <Text>
                            Back
                        </Text>
                    </TouchableOpacity>

                    <FlatList 
                        style={styles.ongoingTargetList}
                        data={this.props.customHabits}
                        renderItem={({ item, index }) => (
                            <Text style={styles.target} key={index}> - {item} </Text>
                        )}
                        keyExtractor={ ( item, index ) => `${index}` }
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
                        <Text>
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
                <View>
                    <TouchableOpacity 
                        style={styles.backButton} 
                        onPress={this.closeReportAndOpenReportsMenu}
                    >
                        <Text>
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
                    <Text>
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
        borderWidth: 1,
        borderRadius: 6,
        padding: 5
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
});

export default ReportsView;