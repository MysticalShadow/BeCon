
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
                <TouchableOpacity>
                    <Text>Menu</Text>
                </TouchableOpacity>

                <Text>
                    Current Consistency: {currConsistency}
                </Text>

                <View style={styles.list}>
                    <FlatList
                    data={basicHabits}
                    renderItem={({ item, index }) => (
                        <Text key={index}> {item} </Text>
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
    appTitle: {
      fontSize: 40,
      fontWeight: '700',
      // flex:1
    }
  });
  
  export default HomeView;
  