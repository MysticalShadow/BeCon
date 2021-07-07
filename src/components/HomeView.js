
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

class HomeView extends React.Component {

    state = {

    };

    handleMenuButtonPressed = () => {
        this.props.onMenuButtonPressed();
    };

    render () {
        const currConsistency = this.props.score;
        var emptyTargets = [];
        if(this.props.ongoingTargets.length == 0)
        {
            emptyTargets.push("No targets for today!");
            emptyTargets.push("Go in Menu to set some targets to build conistency!!");
        }
            

        return (
            <View style={styles.container}>
                <TouchableOpacity style={styles.menuButton} onPress={this.handleMenuButtonPressed}>
                    <Text style={styles.menuString}> Menu </Text>
                </TouchableOpacity>

                <View style={styles.score}>
                    <Text style={styles.scoreString}>
                        Current Consistency Score: {currConsistency}
                    </Text>
                </View>
                <View style={styles.ongoingTarget}>
                    <Text style={styles.challengeHeading}>
                        Today's Challenges:
                    </Text>
                    <FlatList 
                        style={styles.ongoingTargetList}
                        data={this.props.ongoingTargets}
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
        );
    }
}

const styles = StyleSheet.create({
    container: {
      flex:1,
    //   justifyContent: 'center',
    //   alignItems: 'center'
    },
    menuButton: {
        alignSelf: 'baseline',
        marginLeft: 10,
        marginTop: 20,
        borderColor: '#000',
        borderWidth: 1,
        borderRadius: 6,
        padding: 5
    },
    menuString: {
        fontSize: 18,
        fontWeight: "900",
        fontFamily: "sans-serif"
    },
    score: {
        margin: 20,
        alignItems: 'center'
    },
    scoreString: {
        fontWeight: 'bold',
        fontSize: 16
    },
    ongoingTarget: {
        borderColor: '#bbb',
        borderWidth: 4,
        borderRadius: 4,
        margin: 5,
        padding: 5,
        // flex:1
        flexGrow:0,
        flexShrink:1
    },
    challengeHeading: {
        fontWeight:'bold', 
        fontSize: 18,
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
  