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
  TextInput,
  FlatList,
  Easing,
  Alert,
  Animated,
  BackHandler,
  Switch
} from 'react-native';

import {
    getFormattedDate
} from '../util';

import DatePicker from 'react-native-datepicker';
import DropDownPicker from 'react-native-dropdown-picker';



class LogHabitView extends React.Component {

    constructor(props) {
        super(props);

        var items = [];
        for(const habit of props.presetHabits)
        {
            items.push({'label':habit, 'value':habit});
        }
        for(const habit of props.customHabits)
        {
            items.push({'label':habit, 'value':habit});
        }

        this.allHabits = items;
    
        this.state = {
            habitPickerItems: items,
            date: getFormattedDate(new Date()),
            fadeAnimation: new Animated.Value(0),
            unlogToggle: false
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

    state = {
        date: "",
        habitsList: [],
        habitPickerOpen: false,
        habitPickerValue: null,
        habitPickerItems: [],
        fadeAnimation: new Animated.Value(0)
    };

    handleBackButtonPressed = () => {
        this.props.onBackButtonPressed();
        return true;
    };

    showInvalidInputPrompt = () => {
        Alert.alert(
            "Invalid Input!!",
            "Please select the habit from dropdown menu to log.",
            [
                { text: "OK" }
            ]
        );
    };

    handleLogHabitButtonPressed = () => {
        var log = this.props.userLog;
        var logItem = {
            habit: this.state.habitPickerValue,
            date: this.state.date
        };

        if(logItem.habit == undefined) {
            this.showInvalidInputPrompt();
            return;
        }

        if(this.state.unlogToggle) {
            let prevHabits = log[logItem.date].habits;
            let newHabits = prevHabits.filter(habit => habit !== logItem.habit);
            log[logItem.date].habits = newHabits;

            this.props.onLogHabitButtonPressed(log);

            Alert.alert(
                "Habit Unlogged!!",
                "Habit entry for selected date is removed from logs!",
                [
                  {
                    text: "OK",
                    onPress: () => {},
                  },
                ],
                { cancelable: false }
              );
        }
        else {
            if(log[logItem.date] == undefined) {
                log[logItem.date] = {habits:[logItem.habit]};
            }
            else if (log[logItem.date].habits.includes(logItem.habit)) {
                Alert.alert(
                    "Habit Already Logged!",
                    "You have already logged this habit for today!",
                    [
                      {
                        text: "OK",
                        onPress: () => {},
                      },
                    ],
                    { cancelable: false }
                  );
                return;
            }
            else {
                log[logItem.date].habits.push(logItem.habit);
            }
    
            this.props.onLogHabitButtonPressed(log);
            Alert.alert(
                "Habit Logged!!",
                "Good Job! Keep going!",
                [
                  {
                    text: "OK",
                    onPress: () => {},
                  },
                ],
                { cancelable: false }
              );
        }
        
        this.setState({
            habitPickerValue: null,
            unlogToggle: false,
            date: getFormattedDate(new Date())
        });
    };

    onUnlogTogglePress = (value) => {
        this.refreshHabitPickerList(value, this.state.date);
    };

    onDateChange  = (date) => {
        this.refreshHabitPickerList(this.state.unlogToggle, date);
    }

    refreshHabitPickerList = (unlogToggle, date) => {
        if(!unlogToggle) {
            this.setState({
                unlogToggle,
                date,
                habitPickerItems: this.allHabits,
                habitPickerValue: null,
                habitPickerOpen: false
            });
            return;
        }

        let unloggableHabits = [];
        if(this.props.userLog && this.props.userLog.hasOwnProperty(date) &&
            this.props.userLog[date]) {
                for (const habit of this.props.userLog[date].habits) {
                    unloggableHabits.push({'label':habit, 'value':habit});
                }
        }

        this.setState({
            unlogToggle,
            date,
            habitPickerItems: unloggableHabits,
            habitPickerValue: null,
            habitPickerOpen: false
        });
        return;
    };



    setOpen = (habitPickerOpen) => {
        this.setState({
          habitPickerOpen
        });
    };
    
    setValue = (callback) => {
        this.setState(state => ({
            habitPickerValue: callback(state.habitPickerValue)
        }));
    };

    setItems = (callback) => {
        this.setState(state => ({
            habitPickerItems: callback(state.habitPickerItems)
        }));
    };
    

    render () {
        var allHabits = this.props.presetHabits.concat(this.props.customHabits);
        return (
            <Animated.View style={{flex: 1, opacity: this.state.fadeAnimation}}>
                <Text style={styles.logHabitHeading}>
                    Log Habit
                </Text>

                <View style={{
                        borderBottomColor: 'black',
                        borderBottomWidth: 1,
                        marginTop:5
                }}/>

                <View style={{flex:1, justifyContent:'center', marginBottom:60}}>
                    <DatePicker
                        style={styles.datePickerStyle}
                        date={this.state.date} // Initial date from state
                        mode="date" // The enum of date, datetime and time
                        placeholder="select date"
                        format="DD-MM-YYYY"
                        confirmBtnText="Confirm"
                        cancelBtnText="Cancel"
                        customStyles={{
                            dateIcon: {
                                position: 'absolute',
                                left: 0,
                                top: 4,
                                marginLeft: 0
                            },
                            dateInput: {
                                marginLeft: 40,
                                borderColor: '#000',
                                borderRadius: 5,
                            },
                        }}
                        onDateChange={(date) => this.onDateChange(date)}
                    />

                    <View style={styles.dropdownContainer}>
                        <DropDownPicker
                            open={this.state.habitPickerOpen}
                            value={this.state.habitPickerValue}
                            items={this.state.habitPickerItems}
                            setOpen={this.setOpen}
                            setValue={this.setValue}
                            setItems={this.setItems}
                            placeholder= "Select a Habit"
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
                            searchable={true}
                            searchPlaceholder="Search Habit..."
                            maxHeight={300}
                        />
                    </View>
                </View>

                <View style={{flexDirection:'row', justifyContent:'center', marginBottom:30}}>
                        <Switch
                            trackColor={{false: 'green', true: 'red'}}
                            thumbColor="white"
                            onValueChange={(value) => this.onUnlogTogglePress(value)}
                            value={this.state.unlogToggle}
                            style={styles.unlogToggle}
                        />
                        <TouchableOpacity 
                            style={styles.logHabitButton}
                            onPress={this.handleLogHabitButtonPressed}
                        >
                            <Text style={styles.logHabitString}>
                                {this.state.unlogToggle ? 'Unlog Habit' : 'Log Habit'}
                            </Text>
                        </TouchableOpacity>
                    </View>
                
            </Animated.View>
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
    logHabitHeading: {
        alignSelf:'center', 
        fontWeight: 'bold', 
        fontSize: 26, 
        marginTop: 15
    },
    unlogToggle: {
        alignSelf: 'center',
        transform: [{ scaleX: 1.2}, { scaleY: 1.1 }]
    },
    input: {
        height: 120,
        marginHorizontal: 12,
        borderWidth: 1,
        borderRadius: 5,
        textAlignVertical: 'top'
    },
    logHabitButton: {
        alignSelf: 'center',
        marginLeft: 10,
        marginTop: 20,
        marginBottom: 20,
        borderColor: '#000',
        borderWidth: 1.5,
        borderRadius: 63,
        padding: 7,
        paddingHorizontal: 10,
        elevation: -3,
        width: 130
    },
    logHabitString: {
        fontSize: 17,
        textShadowColor: "#111",
        textShadowRadius: 0.5,
        alignSelf: 'center'
    },
    datePickerStyle: {
        width: 150,
        alignSelf: 'center',
        marginBottom: 10
    },
    dropdownContainer: {
        margin: 10,
        // flex:1
    }
});

export default LogHabitView;