
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
} from 'react-native';

class IntroView extends React.Component {
    render () {
        return (
            <View style={styles.container}>
                <Text style={styles.appTitle}>Be-CON</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
      flex:1,
      justifyContent: 'center',
      alignItems: 'center'
    },
    appTitle: {
      fontSize: 40,
      fontWeight: '700',
      // flex:1
    }
  });
  
  export default IntroView;
  