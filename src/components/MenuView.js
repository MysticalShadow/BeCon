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
  Alert,
  Animated,
  BackHandler
} from 'react-native';
import { getFormattedDate } from '../util';

class MenuView extends React.Component {

    componentDidMount () {
        this.fadeIn();
        this.backHandler = BackHandler.addEventListener(
            "hardwareBackPress",
            this.handleCloseMenuButtonPressed
          );
    };

    componentWillUnmount() {
        this.backHandler.remove();
    };

    state = {
        fadeAnimation: new Animated.Value(0)
    };

    fadeIn = () => {
        Animated.timing(this.state.fadeAnimation, {
            toValue: 1,
            duration: 200,
            useNativeDriver: true
        }).start();
    };

    handleCloseMenuButtonPressed = () => {
        this.props.onCloseMenuButtonPressed();
        return true;
    };

    handleAddCustomButtonPressed = () => {
        this.props.openAddCustomHabitView();
    };

    handleLogHabitButtonPressed = () => {
        this.props.openLogHabitView();
    };

    handleSetTargetButtonPressed = () => {
        this.props.openSetTargetView();
    };
    
    handleReportsButtonPressed = () => {
        this.props.openReportsView();
    };

    handleGuideButtonPressed = () => {
        this.props.openGuideView();
    };

    handleDeleteDataButtonPressed = () => {
        Alert.alert(
            "Warning!!",
            "This will delete all your records!",
            [
                {
                    text: "OK",
                    onPress: () => {this.props.onDeleteDataButtonPressed();},
                },
                {
                    text: "Cancel",
                    onPress: () => {}
                }
            ],
            { cancelable: true }
          );
    };


    render () {
        return (
            <Animated.View style={{flex:1, opacity:this.state.fadeAnimation}}>
                <TouchableOpacity 
                    style={styles.closeButton} 
                    onPress={this.handleCloseMenuButtonPressed}
                >
                    <Text style={styles.closeString} >
                        Close
                    </Text>
                </TouchableOpacity>

                <View style={styles.menuView}>

                    <TouchableOpacity 
                        style={styles.menuItem}
                        onPress={this.handleLogHabitButtonPressed}
                    >
                        <Text style={styles.menuText}>
                            Log a Habit
                        </Text>
                    </TouchableOpacity>

                    <TouchableOpacity 
                        style={styles.menuItem}
                        onPress={this.handleAddCustomButtonPressed}
                    >
                        <Text style={styles.menuText}>
                            Add a Custom Habit
                        </Text>
                    </TouchableOpacity>

                    <TouchableOpacity 
                        style={styles.menuItem}
                        onPress={this.handleSetTargetButtonPressed}
                    >
                        <Text style={styles.menuText}>
                            Set Consistency Target
                        </Text>
                    </TouchableOpacity>

                    <TouchableOpacity 
                        style={styles.menuItem}
                        onPress={this.handleReportsButtonPressed}
                    >
                        <Text style={styles.menuText}>
                            Reports
                        </Text>
                    </TouchableOpacity>

                    <TouchableOpacity 
                        style={styles.menuItem}
                        onPress={this.handleGuideButtonPressed}
                    >
                        <Text style={styles.menuText}>
                            How It Works!
                        </Text>
                    </TouchableOpacity>

                    <TouchableOpacity 
                        style={styles.menuItem}
                        onPress={this.handleDeleteDataButtonPressed}
                    >
                        <Text style={[styles.menuText, {color: 'red'}]}>
                            Delete Data
                        </Text>
                    </TouchableOpacity>
                </View>
            </Animated.View>
            
        );
    };


};

const styles = StyleSheet.create({
    closeButton: {
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
    closeString:{
        fontSize: 15,
        fontFamily: "sans-serif",
        letterSpacing: 1,
        textShadowColor: "#111",
        textShadowRadius: 1
    },
    menuView: {
        alignItems: 'center',
        justifyContent: 'center',
        flexGrow:1,
        marginBottom:80
    },
    menuItem: {
        margin: 2,
        // marginTop: 20,
        borderColor: '#000',
        // borderWidth: 2.3,
        // borderRadius: 20,
        padding: 6,
        alignSelf: 'stretch',
        alignItems: 'center',
        paddingVertical: 8,
        // elevation: 3,
        // shadowColor: '#000',
        backgroundColor: '#e7f5fe'
    },
    menuText: {
        fontSize: 18,
        textShadowColor: "#222",
        textShadowRadius: 0.2
    }
});

export default MenuView;