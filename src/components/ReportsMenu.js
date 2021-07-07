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

class ReportsMenuView extends React.Component {

    render () {
        return (
            <View>

                <TouchableOpacity 
                    style={styles.menuItem}
                    // onPress={this.handleAddCustomButtonPressed}
                >
                    <Text>
                        Preset Habits
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity 
                    style={styles.menuItem}
                    // onPress={this.handleLogHabitButtonPressed}
                >
                    <Text>
                        Custom Habits
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity 
                    style={styles.menuItem}
                    // onPress={this.handleSetTargetButtonPressed}
                >
                    <Text>
                        Daily Coverage
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity 
                    style={styles.menuItem}
                    // onPress={this.handleSetTargetButtonPressed}
                >
                    <Text>
                        Weekly Coverage
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity 
                    style={styles.menuItem}
                    // onPress={this.handleSetTargetButtonPressed}
                >
                    <Text>
                        Monthly Coverage
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

export default ReportsMenuView;