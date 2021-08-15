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
import DropDownPicker from 'react-native-dropdown-picker';

class ReportsView extends React.Component {

    constructor(props) {
        super(props);

        var items = [
            {
                'label':'All Habits', 'value':'All Habits'
            },
            {
                'label':'All Logs', 'value':'All Logs'
            },
            {
                'label':'All Targets', 'value':'All Targets'
            },
            {
                'label':'Daily Coverage', 'value':'Daily Coverage'
            },
            {
                'label':'Weekly Coverage', 'value':'Weekly Coverage'
            },
            {
                'label':'Monthly Coverage', 'value':'Monthly Coverage'
            }
        ];
    
        this.state = {
            pickerItems: items,
            reportsMenuOpen: true,
            fadeAnimation: new Animated.Value(0)
        };
    }

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
        }).start(() => {
            Animated.timing(this.state.fadeAnimation, {
                toValue: 1,
                duration: 200,
                useNativeDriver: true
            }).start();
        });
    };

    // fadeOutIn = () => {
    //     Animated.timing(this.state.fadeAnimation, {
    //         toValue: 0,
    //         duration: 0,
    //         useNativeDriver: true
    //     }).start(() => {this.fadeIn()});
    // };

    state = {
        reportsMenuOpen: true,
        viewHabitsOpen: false,
        dailyCoverageOpen: false,
        weeklyCoverageOpen: false,
        monthlyCoverageOpen: false,
        periodicalCoverageOpen: false,
        pickerOpen: false,
        pickerValue: null,
        pickerItems: [],
        period: "",
        fadeAnimation: new Animated.Value(0)
    };

    handleBackButtonPressed = () => {
        this.props.onBackButtonPressed();
        return true;
    };

    setOpen = (pickerOpen) => {
        this.setState({
          pickerOpen
        });
    };
    
    setValue = (callback) => {
        this.setState(state => ({
            pickerValue: callback(state.pickerValue)
        }));
        this.fadeOutIn();
        if(callback(this.state.pickerValue) == "All Habits")
            this.onViewHabitsPressed();
        if(callback(this.state.pickerValue) == "All Logs")
            this.onViewLogsPressed();
        if(callback(this.state.pickerValue) == "All Targets")
            this.onViewTargetsPressed();
        if(callback(this.state.pickerValue) == "All Targets")
            this.onViewTargetsPressed();
        if(callback(this.state.pickerValue) == "Daily Coverage")
            this.onViewPeriodicalReportPressed("day");
        if(callback(this.state.pickerValue) == "Weekly Coverage")
            this.onViewPeriodicalReportPressed("week");
        if(callback(this.state.pickerValue) == "Monthly Coverage")
            this.onViewPeriodicalReportPressed("month");
    };

    setItems = (callback) => {
        this.setState(state => ({
            pickerItems: callback(state.pickerItems)
        }));
    };

    onViewHabitsPressed = () => {
        this.setState({
            reportsMenuOpen: false,
            viewHabitsOpen: true,
            viewLogsOpen: false,
            viewTargetsOpen: false,
            periodicalCoverageOpen: false,
        });
    };

    onViewLogsPressed  = () => {
        this.setState({
            reportsMenuOpen: false,
            viewHabitsOpen: false,
            viewLogsOpen: true,
            viewTargetsOpen: false,
            periodicalCoverageOpen: false,
        });
    };

    onViewTargetsPressed  = () => {
        this.setState({
            reportsMenuOpen: false,
            viewHabitsOpen: false,
            viewLogsOpen: false,
            viewTargetsOpen: true,
            periodicalCoverageOpen: false,
        });
    };

    onViewPeriodicalReportPressed = (period) => {
        this.setState({
            reportsMenuOpen: false,
            periodicalCoverageOpen: true,
            period: period,
            viewHabitsOpen: false,
            viewLogsOpen: false,
            viewTargetsOpen: false
        });
    };


    render () {

        if(this.state.reportsMenuOpen) {
            return (
                <Animated.View style={{flex:1, opacity:this.state.fadeAnimation}}>
                    <View style={styles.dropdownContainer}>
                        <DropDownPicker
                            open={this.state.pickerOpen}
                            value={this.state.pickerValue}
                            items={this.state.pickerItems}
                            setOpen={this.setOpen}
                            setValue={this.setValue}
                            setItems={this.setItems}
                            placeholder= "Select an option..."
                            textStyle={{
                                fontSize: 16,
                            }}
                            itemSeparator={true}
                            itemSeparatorStyle={{
                                backgroundColor: "#bbb",
                              }}
                            listItemContainerStyle={{
                                height: 50
                            }}
                            maxHeight={350}
                        />
                    </View>
                    <View style={{flex:1, justifyContent:'center', alignItems:'center'}}>
                        <Text style={{fontSize:18}}>
                            Select an option above to see reports.
                        </Text>
                    </View>
                    
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
                    <View style={styles.dropdownContainer}>
                        <DropDownPicker
                            open={this.state.pickerOpen}
                            value={this.state.pickerValue}
                            items={this.state.pickerItems}
                            setOpen={this.setOpen}
                            setValue={this.setValue}
                            setItems={this.setItems}
                            placeholder= "All Habits"
                            textStyle={{
                                fontSize: 16,
                            }}
                            itemSeparator={true}
                            itemSeparatorStyle={{
                                backgroundColor: "#bbb",
                              }}
                            listItemContainerStyle={{
                                height: 50
                            }}
                            maxHeight={350}
                        />
                    </View>

                    <Text style={[styles.backString, {marginTop:10, marginLeft:10}]}>
                        Preset Habits:
                    </Text>

                    <FlatList 
                        contentContainerStyle={{ paddingBottom: 20 }}
                        style={styles.presetHabitsList}
                        data={this.props.presetHabits}
                        renderItem={({ item, index }) => (
                            <Text style={styles.target} key={index}> - {item} </Text>
                        )}
                        keyExtractor={ ( item, index ) => `${index}` }
                        persistentScrollbar={true}
                    />

                    <Text style={[styles.backString, {marginLeft:10}]}>
                        Custom Habits:
                    </Text>

                    <FlatList 
                        contentContainerStyle={{ paddingBottom: 20 }}
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
                <Animated.View style={{flex:1, opacity:this.state.fadeAnimation}}>
                    
                    <View style={styles.dropdownContainer}>
                        <DropDownPicker
                            open={this.state.pickerOpen}
                            value={this.state.pickerValue}
                            items={this.state.pickerItems}
                            setOpen={this.setOpen}
                            setValue={this.setValue}
                            setItems={this.setItems}
                            placeholder= "Select an option..."
                            textStyle={{
                                fontSize: 16,
                            }}
                            itemSeparator={true}
                            itemSeparatorStyle={{
                                backgroundColor: "#bbb",
                              }}
                            listItemContainerStyle={{
                                height: 50
                            }}
                            maxHeight={350}
                        />
                    </View>
                    
                    <Text style={styles.heading}>
                        All Logs
                    </Text>
                    <FlatList 
                        contentContainerStyle={{ paddingBottom: 20 }}
                        style={styles.logsList}
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
                <Animated.View style={{flex:1, opacity:this.state.fadeAnimation}}>
                    <View style={styles.dropdownContainer}>
                        <DropDownPicker
                            open={this.state.pickerOpen}
                            value={this.state.pickerValue}
                            items={this.state.pickerItems}
                            setOpen={this.setOpen}
                            setValue={this.setValue}
                            setItems={this.setItems}
                            placeholder= "Select an option..."
                            textStyle={{
                                fontSize: 16,
                            }}
                            itemSeparator={true}
                            itemSeparatorStyle={{
                                backgroundColor: "#bbb",
                              }}
                            listItemContainerStyle={{
                                height: 50
                            }}
                            maxHeight={350}
                        />
                    </View>
                    <Text style={styles.heading}>
                        All Targets
                    </Text>
                    <FlatList 
                        contentContainerStyle={{ paddingBottom: 20 }}
                        style={styles.logsList}
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
                    <View style={styles.dropdownContainer}>
                        <DropDownPicker
                            open={this.state.pickerOpen}
                            value={this.state.pickerValue}
                            items={this.state.pickerItems}
                            setOpen={this.setOpen}
                            setValue={this.setValue}
                            setItems={this.setItems}
                            placeholder= "Select an option..."
                            textStyle={{
                                fontSize: 16,
                            }}
                            itemSeparator={true}
                            itemSeparatorStyle={{
                                backgroundColor: "#bbb",
                              }}
                            listItemContainerStyle={{
                                height: 50
                            }}
                            maxHeight={350}
                        />
                    </View>
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
    heading: {
        alignSelf:'center', 
        fontWeight: 'bold', 
        fontSize: 22, 
        marginTop: 20,
        letterSpacing: 0.7
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
    logsList: {
        flex: 0.5,
        borderWidth: 2,
        margin: 10,
        borderRadius: 6,
        padding: 2
    },
    dropdownContainer: {
        margin: 10,
        marginTop: 15,
        width: 200,
        alignSelf: 'center'
    },
});

export default ReportsView;