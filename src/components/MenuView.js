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
  Alert
} from 'react-native';
import { getFormattedDate } from '../util';

class MenuView extends React.Component {

    handleCloseMenuButtonPressed = () => {
        this.props.onCloseMenuButtonPressed();
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
            <View style={{flex:1}}>
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
                        onPress={this.handleDeleteDataButtonPressed}
                    >
                        <Text style={[styles.menuText, {color: 'red'}]}>
                            Delete Data
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
            
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
        margin: 10,
        // marginTop: 20,
        borderColor: '#000',
        borderWidth: 2,
        borderRadius: 20,
        padding: 6,
        width: 250,
        alignItems: 'center',
        elevation: 1,
        shadowColor: '#fff'
    },
    menuText: {
        fontSize: 18,
        textShadowColor: "#222",
        textShadowRadius: 0.2
    }
});

export default MenuView;