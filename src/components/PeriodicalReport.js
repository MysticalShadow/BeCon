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
    getLastSunday,
    getScore,
    getPreviousMonthYear
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
            duration: 200,
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
                while(currDate != "" && compareDate(log.date, currDate, true))
                {
                    dailyReport.push({
                        date: currDate,
                        score: getScore(logArray.slice(0,i+1), this.props.targets, currDate),
                        habits: habits
                    });
                    currDate = addDaysToFormattedDate(1, currDate);
                    habits = [];
                }
                habits = [];
                currDate = log.date;
            }
            habits.push(log.habit);
        }

        while(currDate != "" && compareDate(getFormattedDate(new Date()), currDate))
        {
            dailyReport.push({
                date: currDate,
                score: getScore(logArray.slice(0,i+1), this.props.targets, currDate),
                habits: habits
            });
            currDate = addDaysToFormattedDate(1, currDate);
            habits = [];
        }
        
        return dailyReport;
    };

    getWeeklyReportData = () => {
        var currDate = "";
        var weeklyReport = [];
        var habits = [];
        var week=1, weekDate;

        var dailyReport = this.getDailyReportData();
        var cumulativeWeekScore=0, days=0, weekHistory = "";

        for(const report of dailyReport) 
        {
            if(days!=0 && isSunday(report.date))
            {
                weeklyReport.push({
                    date: addDaysToFormattedDate(-7, report.date),
                    score: Math.round((cumulativeWeekScore/days)*1e3)/1e3 ,
                    habits: [weekHistory]
                });
                cumulativeWeekScore = 0;
                days=0;
                weekHistory = "";
            }
            if(weekHistory != "")
                weekHistory += ", "
            weekHistory = weekHistory + report.score;
            cumulativeWeekScore += report.score;
            days += 1;
        }   

        weeklyReport.push({
            date: getLastSunday(),
            score: Math.round((cumulativeWeekScore/days)*1e3)/1e3 ,
            habits: [weekHistory]
        });
        
        return weeklyReport;
    };

    getMonthlyReportData = () => {
        var currDate = "";
        var monthlyReport = [];
        var habits = [];

        var dailyReport = this.getDailyReportData();
        var cumulativeMonthScore=0, days=0, monthHistory = "";

        for(const report of dailyReport) 
        {
            if(days!=0 && report.date.slice(0,2) == "01")
            {
                monthlyReport.push({
                    date: getPreviousMonthYear(report.date),
                    score: Math.round((cumulativeMonthScore/days)*1e3)/1e3 ,
                    habits: [monthHistory]
                });
                cumulativeMonthScore = 0;
                days=0;
                monthHistory = "";
            }
            if(monthHistory != "")
                monthHistory += ", "
            monthHistory = monthHistory + report.score;
            cumulativeMonthScore += report.score;
            days += 1;
        }

        var todaysDate = getFormattedDate(new Date());
        monthlyReport.push({
            date: todaysDate.slice(3, todaysDate.length),
            score: Math.round((cumulativeMonthScore/days)*1e3)/1e3 ,
            habits: [monthHistory]
        });
        
        return monthlyReport;
    };

    render () {
        var report, modifier, emptyReportMessage="", heading;
        if(this.props.period == "day") {
            report = this.getDailyReportData();
            modifier = "Date";
            heading = "Daily Report";
        }
            
        if(this.props.period == "week") {
            report = this.getWeeklyReportData();
            modifier = "Week Starting";
            heading = "Weekly Report";
         }
        if(this.props.period == "month") {
            report = this.getMonthlyReportData();
            modifier = "Month";
            heading = "Monthly Report";
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
                <Text style={styles.heading}>
                    {heading}
                </Text>
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
                                    <Text style={styles.target} key={index}> ---------  {item} </Text>
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
    heading: {
        alignSelf:'center', 
        fontWeight: 'bold', 
        fontSize: 22, 
        marginTop: 20
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