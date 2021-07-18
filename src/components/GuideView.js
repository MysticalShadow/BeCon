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

                <ScrollView style={styles.helpPage}>
                    <Text style={styles.heading}>The Concept!!</Text>
                    <Text style={styles.normalText}>
                        This simple yet powerful app helps you in building 
                        consistency, since being consistent is the core foundation
                        of acheiving everything in life, big or small. Being a consistent 
                        person is almost like a superpower. Imagine being that person,
                         who is able to do whatever he/she sets his/her mind to. Ain't 
                         that a superpower?
                    </Text>
                    <Text style={styles.normalText}>
                        This app lets you set targets for habits that you want to be 
                        consistent on. Based on how you acheive your targets, you are 
                        awarded points and your score is calculated (See Scoring 
                        section for details). 
                    </Text>

                    <Text style={styles.heading}>
                        Features:
                    </Text>
                    <Text style={styles.normalText}>
                        <Text style={styles.subheading}>1.) Set Targets:</Text> You can set a target for any number of days, choosing
                        from a list of either preset habits, or your custom habits.
                    </Text>
                    <Text style={styles.normalText}>
                        <Text style={styles.subheading}>2.) Add Custom Habit:</Text> Although the app comes with a set of basic preset 
                        habits, it allows you to add your own custom habits so that you can 
                        customize your own journey to become consistent.
                    </Text>
                    <Text style={styles.normalText}>
                        <Text style={styles.subheading}>3.) Log Habit:</Text> You can log the habits that you have completed on 
                        any day, from the list of preset or custom habits. 
                        If you have set a
                        target for some day and you log a habit for that day, it will be automatically
                        counted as acheiving the target for that day.
                    </Text>
                    <Text style={styles.normalText}>
                        <Text style={styles.subheading}>4.) Reports:</Text> You can view list of all the preset habits, custom habits and
                        all your logs here. 
                    </Text>
                    <Text style={styles.normalText}>
                        The most important feature is that you can view historical scores
                        and check how much consistent you have been. You can view daily, 
                        weekly and monthly reports and check the progress in terms of scores.
                        This will help in:
                    </Text>
                    <Text style={styles.normalText}>
                        <Text style={styles.subheading}>a.)</Text> Finding out optimal targets to increase consistency in fastest
                        way possible.
                    </Text>
                    <Text style={styles.normalText}>
                        <Text style={styles.subheading}>b.)</Text> Unveling hidden patterns that might be blocking your overall
                        wellbeing and productivity.
                    </Text>
                    <Text style={styles.normalText}>
                        <Text style={styles.subheading}>c.)</Text> Keeping you motivated to be a better person, every single day.
                    </Text>

                    <Text style={styles.heading}>Scoring: </Text>
                    <Text style={styles.normalText}>
                        Total score for all the habits logged and targets achieved is calculated, and then divided
                        by total number of active days (from the day since you have either set
                        your first target or logged first habit until today). This gives current average score,
                        that you see on home screen as Current Consistency Score. 
                    </Text>
                    <Text style={styles.normalText}>
                        For every habit logged, you get one point, irrespective of whether
                        you have set a target for that or not.
                    </Text>
                    <Text style={styles.normalText}>
                        When you log a habit and there is a target set for the day, that habit
                        is counted as acheving the target for the day. This would earn 
                        you one extra point. 
                    </Text>
                    <Text style={styles.normalText}>
                        <Text style={styles.subheading}>Bonus Points:</Text> If you have partially completed a target, say for x number
                        of days, this would earn you x percent of total points earned for that
                        target. When you fully complete that target, you earn 2x percent instead.
                        These are called bonus points for acheving targets.
                    </Text>
                    <Text style={styles.normalText}>
                        For example, you set a target for 6 days. 
                    </Text>
                    <Text style={styles.normalText}>
                        If you complete the target for 4 days only, you get 2 points each day for
                        target habit completed, which means for 4 days, you will get 2*4 = 8 points; 
                        and since target is partially completed for 4 days, you will get 8*(4/100)
                        = 0.32 bonus points. Total points at the end of 4 days = 8 + 0.32 = 8.32.
                    </Text>
                    <Text style={styles.normalText}>
                        Now, if you complete you target for for all 6 days.
                        2 points each day for target habit completed gives 2*6 = 12; 
                        12*2*(6/100) = 1.44 bonus since target is fully completed for 6 days. 
                        Total points at the end of 6 days = 12 + 1.44 = 13.44.
                    </Text>
                    <Text style={styles.normalText}>
                        For a different example, let's say you set a target for 4 days, and fully complete
                        it. You will score 8.64 points. 
                    </Text>
                    <Text style={styles.normalText}>
                        So, setting and acheiving small targets will
                        give you more points for same effort than setting and not acheving, since you 
                        get Complete Acheivement Bonus too.
                    </Text>
                    <Text style={styles.normalText}>
                        
                    </Text>
                </ScrollView>
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
        padding: 10
    },
    heading: {
        fontSize: 20,
        fontWeight: 'bold',
        marginTop: 10,
        marginBottom: 5
    },
    subheading: {
        fontWeight: 'bold'
    },
    normalText: {
        fontSize: 16
    }
});

export default GuideView;