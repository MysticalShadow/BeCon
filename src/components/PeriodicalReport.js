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
    getFormattedDate,
    compareDate,
    getCurrentScore,
    convertLogJSONToArray,
    isMonthSame,
    isSunday,
    addDaysToFormattedDate,
    getLastSunday
} from '../util';

class PeriodicalReportView extends React.Component {

    componentDidMount () {
        this.fadeIn();
    };

    state = {
        fadeAnimation: new Animated.Value(0)
    };

    fadeIn = () => {
        Animated.timing(this.state.fadeAnimation, {
            toValue: 1,
            duration: 1000,
            useNativeDriver: true
        }).start();
    };


    getDailyReportData = () => {
        var currDate = "";
        var dailyReport = [];
        var habits = [];
        
        var logArray = convertLogJSONToArray(this.props.userLog);

        for(var i=0; i<logArray.length; i++) {
            var log = logArray[i];  
            if(currDate == "" || compareDate(log.date, currDate, true)) {
                if(habits.length > 0)
                    dailyReport.push({
                        date: currDate,
                        score: getCurrentScore(logArray.slice(0,i), this.props.targets),
                        habits: habits
                    });
                habits = [];
                currDate = log.date;
            }
            habits.push(log.habit);
        }

        if(habits.length > 0)
            dailyReport.push({
                date: currDate,
                score: getCurrentScore(logArray.slice(0,i), this.props.targets),
                habits: habits
            });
        
        return dailyReport;
    };

    getWeeklyReportData = () => {
        var currDate = "";
        var weeklyReport = [];
        var habits = [];
        var week=1, weekDate;
        
        var logArray = convertLogJSONToArray(this.props.userLog);

        for(var i=0; i<logArray.length; i++) {
            var log = logArray[i];  
            if(isSunday(log.date)) {
                if(!weekDate)
                    weekDate = addDaysToFormattedDate(-7, log.date);
                if(habits.length > 0)
                    weeklyReport.push({
                        date: week + " ("+ weekDate + ")",
                        score: getCurrentScore(logArray.slice(0,i), this.props.targets),
                        habits: habits
                    });
                habits = [];
                currDate = log.date;
                week++;
                weekDate = log.date;
            }
            habits.push(log.habit);
        }

        if(habits.length > 0)
        {
            if(!weekDate)
                weekDate = getLastSunday();
            weeklyReport.push({
                date: week + " (" + weekDate + ")",
                score: getCurrentScore(logArray.slice(0,i), this.props.targets),
                habits: habits
            });
        }
            
        
        return weeklyReport;
    };

    getMonthlyReportData = () => {
        var currDate = "";
        var monthlyReport = [];
        var habits = [];
        
        var logArray = convertLogJSONToArray(this.props.userLog);

        for(var i=0; i<logArray.length; i++) {
            var log = logArray[i];  
            if(currDate == "" || !isMonthSame(log.date, currDate)) {
                if(habits.length > 0)
                    monthlyReport.push({
                        date: currDate.slice(3,currDate.length),
                        score: getCurrentScore(logArray.slice(0,i), this.props.targets),
                        habits: habits
                    });
                habits = [];
                currDate = log.date;
            }
            habits.push(log.habit);
        }

        if(habits.length > 0)
            monthlyReport.push({
                date: currDate.slice(3,currDate.length),
                score: getCurrentScore(logArray.slice(0,i), this.props.targets),
                habits: habits
            });
        
        return monthlyReport;
    };

    render () {
        var report, modifier, emptyReportMessage="";
        if(this.props.period == "day") {
            report = this.getDailyReportData();
            modifier = "Date";
        }
            
        if(this.props.period == "week") {
            report = this.getWeeklyReportData();
            modifier = "Week";
         }
        if(this.props.period == "month") {
            report = this.getMonthlyReportData();
            modifier = "Month";
        }
        
        if(!report || (report.length==0))
        {
            emptyReportMessage = "   No records to build report..."
            return (
                <View style={{flex:1}}>
                    <Text style={[styles.reportData, {flex:1, paddingTop:10}]}>{emptyReportMessage}</Text>
                </View>
            );

        }

        return (
            <Animated.View style={{flex:1, opacity:this.state.fadeAnimation}}>
                <FlatList 
                    style={styles.reportData}
                    data={report}
                    renderItem={({ item, index }) => (
                        <>
                            <Text style={{fontWeight: 'bold', marginTop: 10}} key={index}> - {modifier}: {item.date}; Score: {item.score} </Text>
                            <FlatList 
                                style={styles.ongoingTargetList}
                                data={item.habits}
                                renderItem={({ item, index }) => (
                                    <Text style={styles.target} key={index}> ---------{item} </Text>
                                )}
                                keyExtractor={ ( item, index ) => `${index}` }
                            />
                        </>
 
                    )}
                    keyExtractor={ ( item, index ) => `${index}` }
                />
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
        borderWidth: 1,
        borderRadius: 6,
        padding: 5
    },
    menuItem: {
        margin: 10,
        borderColor: '#000',
        borderWidth: 1,
        borderRadius: 6,
        padding: 5,
        width: 200
    },
    reportData: {
        borderWidth: 2,
        margin: 10,
        marginBottom: 14,
        borderRadius: 6,
        padding: 2
    }
});

export default PeriodicalReportView;