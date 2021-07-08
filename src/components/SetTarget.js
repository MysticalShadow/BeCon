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
  Alert
} from 'react-native';

import {
    compareDate,
    getFormattedDate,
    addDaysToFormattedDate
} from '../util';

import DatePicker from 'react-native-datepicker';
import DropDownPicker from 'react-native-dropdown-picker';

class SetTargetView extends React.Component {

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
            date: new Date()
        };
    };

    allHabits=[];

    state = {
        date: new Date(),
        duration: 2,
        habitPickerOpen: false,
        habitPickerValue: null,
        habitPickerItems: [],
    };

    handleBackButtonPressed = () => {
        this.props.onBackButtonPressed();
    };

    isHabitAlreadyTarget = () => {
        for(const target of this.props.targets) {
            var finishDate = addDaysToFormattedDate(target.duration, target.date);
            console.log(target);
            if(target.habit ==this.state.habitPickerValue && 
                 compareDate(finishDate, this.state.date)) // finishDate>=statedate gives true
            {
                this.showHabitAlreadyPrompt();
                return true;
            }
        }
        return false;
    };

    handleSetTargetButtonPressed = () => {
        if(this.state.duration < 2)
        {
            this.showDurationRestrictionPrompt();
            return;
        }

        if(this.isHabitAlreadyTarget())
        {
            return;
        }

        var target = {
            habit: this.state.habitPickerValue,
            date: getFormattedDate(this.state.date),
            duration: this.state.duration
        };
        this.props.onSetTargetButtonPressed(target);
    };

    durationChanged = (days) => {
        this.setState({duration:days});
    };

    showDurationRestrictionPrompt = () => {
        Alert.alert(
            "Target Duration Error!!",
            "Consistency Targets must be set for more than one day.",
            [
                { text: "OK" }
            ]
        );
    };

    showHabitAlreadyPrompt = () => {
        Alert.alert(
            "Overlapping Duration!!",
            "Selected Habit has overlapping durations since same habit is already a target for one or more days in selected duration.",
            [
                { text: "OK" }
            ]
        );
    };

    setOpen = (habitPickerOpen) => {
        this.inputElement.blur();
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

                <Text style={{alignSelf:'center', fontWeight: 'bold', fontSize: 16, marginBottom: 20}}>
                    Set Target:
                </Text>

                <View style={{flexDirection:'row', alignItems:'center'}}>
                    <View style={{flex: 0.8, flexDirection: 'column', alignItems:'flex-end', justifyContent: 'space-around'}}>
                        <Text>From: </Text>
                        <Text style={{marginTop:34, marginBottom:36}}>Duration: </Text>
                        <Text style={{marginBottom: 10}}>Target Habit: </Text>
                    </View>

                    <View style={{flex: 2, alignItems:'flex-start'}}>
                        <View style={{alignItems:'center'}}>
                            <DatePicker
                                style={styles.datePickerStyle}
                                date={this.state.date} // Initial date from state
                                mode="date" // The enum of date, datetime and time
                                placeholder="select date"
                                format="DD-MM-YYYY"
                                minDate={new Date()}
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
                        </View>

                        <View style={{alignItems:'center'}}>
                            <TextInput
                                ref={(inputElement) => { this.inputElement = inputElement; }}
                                onChangeText={(duration) => this.durationChanged(duration)}
                                keyboardType='numeric'
                                placeholder="More than 1"
                                style={styles.duration}
                                value={this.state.duration}
                            />
                        </View>
                        <View style={{ alignItems:'center'}}>
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
                        </View>
                    </View>
                </View>
                

                {/* <View style={{flexDirection:'row', alignItems:'center'}}>
                    <Text>From: </Text>
                    <View style={{flex:1, alignItems:'center'}}>
                        <DatePicker
                            style={styles.datePickerStyle}
                            date={this.state.date} // Initial date from state
                            mode="date" // The enum of date, datetime and time
                            placeholder="select date"
                            format="DD-MM-YYYY"
                            minDate={new Date()}
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
                    </View>
                </View> */}

                {/* <View style={{flexDirection:'row', alignItems:'center'}}>
                    <Text>Duration: </Text>
                    <View style={{flex:1, alignItems:'center'}}>
                        <TextInput
                            ref={(inputElement) => { this.inputElement = inputElement; }}
                            onChangeText={(duration) => this.durationChanged(duration)}
                            keyboardType='numeric'
                            placeholder="More than 1"
                            style={styles.duration}
                            value={this.state.duration}
                        />
                    </View>
                </View> */}

                {/* <View style={{flexDirection:'row', alignItems:'center'}}>
                    <Text>Target Habit: </Text>
                    <View style={{ alignItems:'center'}}>
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
                    </View>
                </View> */}

                <View style={{alignItems:'center', elevation: -1}}>
                    <TouchableOpacity 
                        style={styles.setTargetButton}
                        onPress={this.handleSetTargetButtonPressed}
                    >
                        <Text style={{fontSize: 16}}>
                            Set Target
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
        borderWidth: 1,
        borderRadius: 6,
        padding: 5
    },
    datePickerStyle: {
        width: 200,
        margin: 10
    },
    duration: {
        marginHorizontal: 10,
        borderWidth: 1,
        borderRadius: 5,
    },
    dropdownContainer: {
        margin: 10,
        width: 250,
    },
    setTargetButton: {
        alignSelf: 'center',
        marginLeft: 10,
        marginTop: 20,
        marginBottom: 20,
        borderColor: '#000',
        borderWidth: 1,
        borderRadius: 63,
        padding: 7,
    },
});

export default SetTargetView;