import React from 'react';
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

class GuideView extends React.Component {

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

    handleBackButtonPressed = () => {
        this.props.onBackButtonPressed();
    };

    render () {
        return (
            <Animated.View style={[{opacity:this.state.fadeAnimation, flex:1}]}>
                <TouchableOpacity 
                    style={styles.backButton} 
                    onPress={this.handleBackButtonPressed}
                >
                    <Text style={styles.backString}>
                        Back
                    </Text>
                </TouchableOpacity>

                <View style={styles.helpPage}>
                    <Text>GUIDE VIEW!!</Text>
                </View>
            </Animated.View>
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
        borderWidth: 0.7,
        borderRadius: 10,
        padding: 4,
        paddingHorizontal: 8
    },
    backString:{
        fontSize: 15,
        fontFamily: "sans-serif",
        letterSpacing: 1,
        textShadowColor: "#111",
        textShadowRadius: 1
    },
    helpPage: {
        flex: 1, 
        borderWidth: 2,
        margin: 10,
        marginBottom: 14,
        borderRadius: 6,
        padding: 2
    }
});

export default GuideView;