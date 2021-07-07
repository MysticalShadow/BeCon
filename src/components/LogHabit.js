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
        this.props.onLogHabitButtonPressed(logItem);
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
            <View style={{minHeight:300, zIndex:0}}>
                <TouchableOpacity 
                    style={styles.backButton} 
                    onPress={this.handleBackButtonPressed}
                >
                    <Text>
                        Back
                    </Text>
                </TouchableOpacity>

                {/* <TextInput
                    ref={(inputElement) => { this.inputElement = inputElement; }}
                    onChangeText={(habitString) => this.setState({habitString})}
                    multiline={true}
                    placeholder="Type Habit Name Here..."
                    style={styles.input}
                /> */}

                <DatePicker
                    style={styles.datePickerStyle}
                    date={this.state.date} // Initial date from state
                    mode="date" // The enum of date, datetime and time
                    placeholder="select date"
                    format="DD-MM-YYYY"
                    // minDate="01-01-2016"
                    // maxDate="01-01-2019"
                    confirmBtnText="Confirm"
                    cancelBtnText="Cancel"
                    customStyles={{
                        dateIcon: {
                            position: 'absolute',
                            left: 0,
                            top: 4,
                            marginLeft: 0,
                        },
                        dateInput: {
                            marginLeft: 36,
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
                    />
                </View>
                
                <TouchableOpacity 
                    style={styles.addHabitButton}
                    onPress={this.handleLogHabitButtonPressed}
                >
                    <Text style={{fontSize: 16}}>
                        Log Habit
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
    input: {
        height: 120,
        marginHorizontal: 12,
        borderWidth: 1,
        borderRadius: 5,
        textAlignVertical: 'top'
    },
    addHabitButton: {
        alignSelf: 'center',
        marginLeft: 10,
        marginTop: 20,
        marginBottom: 20,
        borderColor: '#000',
        borderWidth: 1,
        borderRadius: 63,
        padding: 7
    },
    datePickerStyle: {
        width: 200,
        margin: 10,
        alignSelf: 'center'
    },
    dropdownContainer: {
        margin: 10
    }
});

export default LogHabitView;