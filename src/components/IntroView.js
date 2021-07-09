
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
  Animated
} from 'react-native';

class IntroView extends React.Component {

    componentDidMount () {
        this.fadeInOut();
    };

    state = {
        fadeAnimation: new Animated.Value(0)
    };

    fadeInOut = () => {
        Animated.timing(this.state.fadeAnimation, {
            toValue: 1,
            duration: 1000,
            useNativeDriver: true
        }).start(() => {
            Animated.timing(this.state.fadeAnimation, {
                toValue: 0,
                duration: 10000,
                useNativeDriver: true
            }).start();
        });
    };

    render () {
        return (
            <Animated.View style={[styles.container, {opacity: this.state.fadeAnimation}]}>
                <Text style={styles.appTitle}>Be-CON</Text>
            </Animated.View>
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
  