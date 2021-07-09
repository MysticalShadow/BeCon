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
  Alert
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
    
        this.state = {
            habitPickerItems: items,
            date: getFormattedDate(new Date())
        };
      }

    state = {
        date: "",
        habitsList: [],
        habitPickerOpen: false,
        habitPickerValue: null,
        habitPickerItems: []
    };

    handleBackButtonPressed = () => {
        this.props.onBackButtonPressed();
    };

    handleLogHabitButtonPressed = () => {
        var logItem = {
            habit: this.state.habitPickerValue,
            date: this.state.date
        };
        var log = this.props.userLog;
        
        if(log[logItem.date] == undefined) {
            log[logItem.date] = {habits:[logItem.habit]};
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
        this.setState({
            habitPickerValue: null,
            date: getFormattedDate(new Date())
        });
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
            <View style={{flex: 1}}>
                <TouchableOpacity 
                    style={styles.backButton} 
                    onPress={this.handleBackButtonPressed}
                >
                    <Text style={styles.backString}>
                        Back
                    </Text>
                </TouchableOpacity>

                <View style={{marginTop:50}}>
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
                        onDateChange={(date) => {
                            this.setState({date});
                        }}
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
                            searchable={true}
                            searchPlaceholder="Search Habit..."
                            maxHeight={400}
                        />
                    </View>
                    
                    <TouchableOpacity 
                        style={styles.logHabitButton}
                        onPress={this.handleLogHabitButtonPressed}
                    >
                        <Text style={styles.logHabitString}>
                            Log Habit
                        </Text>
                    </TouchableOpacity>
                </View>
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
        elevation: -3
    },
    logHabitString: {
        fontSize: 17,
        textShadowColor: "#111",
        textShadowRadius: 0.5
    },
    datePickerStyle: {
        width: 150,
        margin: 10,
        alignSelf: 'center',
        marginBottom: 20
    },
    dropdownContainer: {
        margin: 10
    }
});

export default LogHabitView;