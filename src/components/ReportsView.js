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
import ReportsMenuView from './ReportsMenu';

class ReportsView extends React.Component {

    state = {
        reportsMenuOpen: true,
        presetHabitOpen: false,
        customHabitOpen: false,
        dailyCoverageOpen: false,
        weeklyCoverageOpen: false,
        monthlyCoverageOpen: false,
    };

    handleBackButtonPressed = () => {
        this.props.onBackButtonPressed();
    };

    closeReportAndOpenReportsMenu = () => {

    };

    render () {

        if(this.state.reportsMenuOpen) {
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

                    <ReportsMenuView />
                </View>
            );
        }

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

export default ReportsView;