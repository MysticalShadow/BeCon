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
    

    handleViewHabitsPressed = () => {
        this.props.onViewHabitsPressed();
    };

    handleCustomHabitsPressed = () => {
        this.props.onCustomHabitsPressed();
    };

    handleViewLogsPressed = () => {
        this.props.onViewLogsPressed();
    };

    handleViewTargetsPressed = () => {
        this.props.onViewTargetsPressed();
    };

    handleDailyCoveragePressed = () => {
        this.props.onViewPeriodicalReportPressed("day");
    };

    handleWeeklyCoveragePressed = () => {
        this.props.onViewPeriodicalReportPressed("week");
    };

    handleMonthlyCoveragePressed = () => {
        this.props.onViewPeriodicalReportPressed("month");
    };

    render () {
        return (
            <View style={styles.menuView}> 
                <TouchableOpacity 
                    style={styles.menuItem}
                    onPress={this.handleViewHabitsPressed}
                >
                    <Text style={styles.menuText}>
                        View All Habits
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity 
                    style={styles.menuItem}
                    onPress={this.handleViewLogsPressed}
                >
                    <Text style={styles.menuText}>
                        View your Logs
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity 
                    style={styles.menuItem}
                    onPress={this.handleViewTargetsPressed}
                >
                    <Text style={styles.menuText}>
                        View All Targets
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity 
                    style={styles.menuItem}
                    onPress={this.handleDailyCoveragePressed}
                >
                    <Text style={styles.menuText}>
                        Daily Coverage
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity 
                    style={styles.menuItem}
                    onPress={this.handleWeeklyCoveragePressed}
                >
                    <Text style={styles.menuText}>
                        Weekly Coverage
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity 
                    style={styles.menuItem}
                    onPress={this.handleMonthlyCoveragePressed}
                >
                    <Text style={styles.menuText}>
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
    menuView: {
        alignItems: 'center',
        justifyContent: 'center',
        flexGrow:1,
        marginBottom:80
    },
    menuItem: {
        margin: 8,
        borderColor: '#000',
        // borderWidth: 2,
        borderRadius: 20,
        padding: 8,
        width: 180,
        alignItems: 'center',
        elevation: 3,
        shadowColor: '#000'
    },
    menuText: {
        fontSize: 16,
        textShadowColor: "#222",
        textShadowRadius: 0.2
    }
});

export default ReportsMenuView;