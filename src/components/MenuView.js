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

    handleCloseMenu = () => {
        this.props.onCloseMenuButtonPressed();
    };

    render () {
        return (
            <View>
                <TouchableOpacity style={styles.closeButton} onPress={this.handleCloseMenu}>
                    <Text>
                        Close
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.closeButton}>
                    <Text>
                        Add a Custom Habit
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.closeButton}>
                    <Text>
                        Log a Habit
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.closeButton}>
                    <Text>
                        Set Consistency Target
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.closeButton}>
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
        borderColor: '#000',
        borderWidth: 1,
        borderRadius: 6,
        padding: 5
    },
});

export default MenuView;