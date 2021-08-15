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
  Animated,
  BackHandler
} from 'react-native';

class AddCustomHabitView extends React.Component {

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
        habitString: "",
        fadeAnimation: new Animated.Value(0)
    };

    handleBackButtonPressed = () => {
        this.props.onBackButtonPressed();
        return true;
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
            <Animated.View style={{flex:1, opacity: this.state.fadeAnimation}}>
                <Text style={styles.addCustomHabitHeading}>
                    Add Custom Habit
                </Text>

                <View style={{
                    borderBottomColor: 'black',
                    borderBottomWidth: 1,
                    marginTop:5
                }}/>

                <View style={{flex:0.8, justifyContent:'center'}}>
                <TextInput
                    ref={(inputElement) => { this.inputElement = inputElement; }}
                    onChangeText={(habitString) => this.setState({habitString})}
                    multiline={true}
                    placeholder="Type Custom Habit Here..."
                    style={styles.input}
                    placeholderTextColor = 'black'
                />

                <TouchableOpacity 
                    style={styles.addHabitButton}
                    onPress={this.handleAddHabitButtonPressed}
                >
                    <Text style={styles.addHabitString}>
                        Add Habit
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
    addCustomHabitHeading: {
        alignSelf:'center', 
        fontWeight: 'bold', 
        fontSize: 26, 
        marginTop: 15
    },
    input: {
        flex:0.6,
        justifyContent:'center',
        height: 120,
        marginHorizontal: 12,
        marginTop: 40,
        borderWidth: 1,
        borderRadius: 5,
        textAlignVertical: 'top',
        color: 'black',
        fontSize: 16
    },
    addHabitButton: {
        alignSelf: 'center',
        marginLeft: 10,
        marginTop: 20,
        marginBottom: 20,
        borderColor: '#000',
        borderWidth: 1.5,
        borderRadius: 63,
        padding: 7,
        paddingHorizontal: 10
    },
    addHabitString: {
        fontSize: 17,
        textShadowColor: "#111",
        textShadowRadius: 0.5
    }
});

export default AddCustomHabitView;