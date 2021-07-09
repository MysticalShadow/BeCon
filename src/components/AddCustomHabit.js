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
  Alert,
  Animated
} from 'react-native';

class AddCustomHabitView extends React.Component {

    componentDidMount () {
        this.fadeIn();
    };

    fadeIn = () => {
        Animated.timing(this.state.fadeAnimation, {
            toValue: 1,
            duration: 200,
            useNativeDriver: true
        }).start();
    };

    state = {
        habitString: "",
        fadeAnimation: new Animated.Value(0)
    };

    handleBackButtonPressed = () => {
        this.props.onBackButtonPressed();
    };

    handleAddHabitButtonPressed = () => {
        this.props.onAddCustomHabitButtonPressed(this.state.habitString);
        this.inputElement.clear();
        Alert.alert(
            "Custom Habit Added!!",
            "You can view Custom habits in Menu->Reports!",
            [
              {
                text: "OK",
                onPress: () => {},
              },
            ],
            { cancelable: false }
          );
    };

    render () {
        return (
            <Animated.View style={{opacity: this.state.fadeAnimation}}>
                <TouchableOpacity 
                    style={styles.backButton} 
                    onPress={this.handleBackButtonPressed}
                >
                    <Text style={styles.backString}>
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