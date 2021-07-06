
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

    render () {
        const basicHabits = this.props.ongoingHabits;
        const currConsistency = this.props.score;
        console.log(currConsistency);
        return (
            //imgblob - opens menu
            //current consistency score
            //today's targets
            <View style={styles.container}>
                <TouchableOpacity style={styles.menuButton}>
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
                        data={basicHabits}
                        renderItem={({ item, index }) => (
                            <Text style={styles.target} key={index}>- {item} </Text>
                        )}
                        keyExtractor={ ( item, index ) => `${index}` }
                    />
                </View>
                {/* <Text style={styles.appTitle}>HomeView</Text> */}
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
  