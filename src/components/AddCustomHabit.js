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
  FlatList
} from 'react-native';

class AddCustomHabitView extends React.Component {

    state = {
        habitString: ""
    };

    handleBackButtonPressed = () => {
        this.props.onBackButtonPressed();
    };

    handleAddHabitButtonPressed = () => {
        this.props.onAddCustomHabitButtonPressed(this.state.habitString);
        this.inputElement.clear();
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

                <TextInput
                    ref={(inputElement) => { this.inputElement = inputElement; }}
                    onChangeText={(habitString) => this.setState({habitString})}
                    multiline={true}
                    placeholder="Type Habit Name Here..."
                    style={styles.input}
                />

                <TouchableOpacity 
                    style={styles.addHabitButton}
                    onPress={this.handleAddHabitButtonPressed}
                >
                    <Text style={{fontSize: 16}}>
                        Add Habit
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
    }
});

export default AddCustomHabitView;