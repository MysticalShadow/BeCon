
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
  FlatList,
  Animated
} from 'react-native';

import {
    getOngoingTargets,
    getTodaysTargets,
    isTodaysTargetsCompleted
} from '../util';

class HomeView extends React.Component {

    componentDidMount () {
        this.fadeIn();
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
    
    fadeOut = () => {
        Animated.timing(this.state.fadeAnimation, {
            toValue: 0,
            duration: 1000
        }).start();
    };

    handleMenuButtonPressed = () => {
        this.props.onMenuButtonPressed();
    };

    render () {
        const currConsistency = this.props.score;
        var emptyTargets = [], ongoingTargets = [], todaysTargets = [];

        todaysTargets = getTodaysTargets(this.props.targets, this.props.userLog);
        if (todaysTargets.length > 0 && isTodaysTargetsCompleted(this.props.targets, this.props.userLog))
        {
            emptyTargets.push("Amazing!!");
            emptyTargets.push("All targets for today are completed!!");
        }
        else if (todaysTargets.length == 0) 
        {
            emptyTargets.push("No targets for today!");
            emptyTargets.push("Go in \"Menu\" -> \"Set Consistency Target\" and set some targets to build conistency!!");
            todaysTargets = []
        }   

        return (
            <Animated.View style={[styles.container, {opacity: this.state.fadeAnimation}]}>
                <TouchableOpacity style={styles.menuButton} onPress={this.handleMenuButtonPressed}>
                    <Text style={styles.menuString}> Menu </Text>
                </TouchableOpacity>

                <View style={{marginTop: 40}}>
                    <View style={styles.score}>
                        <Text style={styles.scoreString}>
                            Consistency Score: {currConsistency}
                        </Text>
                    </View>
                    <View style={styles.ongoingTarget}>
                        <Text style={styles.challengeHeading}>
                            Today's Challenges:
                        </Text>
                        <FlatList 
                            style={styles.ongoingTargetList}
                            data={todaysTargets}
                            renderItem={({ item, index }) => (
                                <Text style={styles.target} key={index}> - {item.habit} </Text>
                            )}
                            keyExtractor={ ( item, index ) => `${index}` }
                        />
                        <FlatList 
                            style={{margin: 10}}
                            data={emptyTargets}
                            renderItem={({ item, index }) => (
                                <Text style={{textAlign:'center'}} key={index}> {item} </Text>
                            )}
                            keyExtractor={ ( item, index ) => `${index}` }
                        />
                    </View>
                </View>
            </Animated.View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex:1
    },
    menuButton: {
        alignSelf: 'baseline',
        marginLeft: 10,
        marginTop: 20,
        borderColor: '#000',
        borderWidth: 2,
        borderRadius: 6,
        padding: 5,
        elevation: 1,
        shadowColor: '#aaa'
    },
    menuString: {
        fontSize: 19,
        fontFamily: "GoodFeelingSans",
        letterSpacing: 1,
        textShadowColor: "#111",
        textShadowRadius: 1.5
    },
    score: {
        margin: 30,
        alignItems: 'center'
    },
    scoreString: {
        fontWeight: 'bold',
        fontSize: 18
    },
    ongoingTarget: {
        borderColor: '#bbb',
        borderWidth: 3,
        borderRadius: 4,
        margin: 5,
        padding: 5,
        flexGrow:0,
        flexShrink:1
    },
    challengeHeading: {
        fontWeight:'bold', 
        fontSize: 19,
        margin: 4,
        alignSelf: 'center'
    },  
    ongoingTargetList: {
        // flexGrow: 2,
    },
    target: {
        fontSize: 18
    },
    appTitle: {
      fontSize: 40,
      fontWeight: '700',
      // flex:1
    }
  });
  
  export default HomeView;
  