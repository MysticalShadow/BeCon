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
  FlatList
} from 'react-native';

class MenuView extends React.Component {

    handleCloseMenuButtonPressed = () => {
        this.props.onCloseMenuButtonPressed();
    };

    handleAddCustomButtonPressed = () => {
        this.props.openAddCustomHabitView();
    };

    render () {
        return (
            <View>
                <TouchableOpacity 
                    style={styles.closeButton} 
                    onPress={this.handleCloseMenuButtonPressed}
                >
                    <Text>
                        Close
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity 
                    style={styles.menuItem}
                    onPress={this.handleAddCustomButtonPressed}
                >
                    <Text>
                        Add a Custom Habit
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.menuItem}>
                    <Text>
                        Log a Habit
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.menuItem}>
                    <Text>
                        Set Consistency Target
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.menuItem}>
                    <Text>
                        Reports
                    </Text>
                </TouchableOpacity>
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
        borderWidth: 1,
        borderRadius: 6,
        padding: 5
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
});

export default MenuView;