import { PermissionsAndroid } from 'react-native';

const RNFS = require('react-native-fs');
const path = RNFS.DocumentDirectoryPath + '/BeCon_userdata.txt';

const dummyJSON = {
    presetHabits : [
        "Do 10 pushups.",
        "Clean room for 10 mins.",
        "Take 10 min walk outside."
    ],
    userLog: [],
    targets: [],
    score : 0,
    customHabits : []
};

async function readUserDataFromFile () {
    console.log("reading...");
    return dummyJSON;
    try {
        return await RNFS.readFile(path, 'utf8').then( (contents) => {
            console.log(contents);
            return JSON.parse(contents);
        });
    }
    catch {
        return dummyJSON;
    }
};

export async function writeUserDataToDB (presetHabits, customHabits, targets, userLog, score) {
    var userData = {
        presetHabits: presetHabits,
        customHabits: customHabits,
        targets: targets,
        userLog: userLog,
        score: score
    }

    RNFS.writeFile(path, JSON.stringify(userData), 'utf8')
        .then((success) => {
            console.log('FILE WRITTEN!');
        })
        .catch((err) => {
            console.log(err.message);
        });
};

export async function getUserData () {
    return await readUserDataFromFile();
};

export function getOngoingTargets (targets) {
    var ongoingTargets = [];

    for(const target of targets) {
        var finishDate = addDaysToFormattedDate(target.duration, target.date);
        if(compareDate(finishDate, getFormattedDate(new Date())))
        {
            ongoingTargets.push(target);
        }
    }

    // if(ongoingTargets.length == 0)
    //     ongoingTargets.push({habit:"", date:"--"});

    return ongoingTargets;
};

export function getCurrentScore (userLog, targets) {

    if(!userLog)
        return "UNABLE TO LOAD";

    var normalScore = 0.00;
    normalScore = userLog.length;
    var totalConsistency = normalScore;
    var consistencyScore = 0;

    for (const target of targets) {
        var consistentDays = 0;
        for (var i=0; i<target.duration; i++) {
            var dateToCheck = addDaysToFormattedDate(i, target.date);
            for(const log of userLog)
            {
                if(log.habit == target.habit && log.date == dateToCheck)
                {
                    totalConsistency = totalConsistency+1;
                    consistentDays = consistentDays+1;
                    break;
                }
            }
            
        }
        if(consistentDays == target.duration)
        {
            totalConsistency = totalConsistency + consistentDays * 0.02;
        }
        else
        {
            totalConsistency = totalConsistency + consistentDays * 0.01;
        }
    }

    var startDate = getFormattedDate(new Date());
    var todayDateUnformat = new Date();

    for(const log of userLog) {
        if(compareDate(startDate, log.date))
            startDate = log.date;
    }

    var parts = startDate.split("-");
    var startDateUnformat =  new Date(parts[2], parts[1] - 1, parts[0]);

    const utc2 = Date.UTC(todayDateUnformat.getFullYear(), todayDateUnformat.getMonth(), todayDateUnformat.getDate());
    const utc1 = Date.UTC(startDateUnformat.getFullYear(), startDateUnformat.getMonth(), startDateUnformat.getDate());
    
    var totalDays = Math.floor((utc2 - utc1) / (1000 * 60 * 60 * 24)) + 1;

    consistencyScore = totalConsistency/totalDays;
    return consistencyScore;
};

export function addCustomHabitToDB (habit, currUserData) {
    currUserData.customHabits.push(habit);
    writeUserDataToDB(currUserData);
}

// return true if date1 >= date 2
export function compareDate (date1, date2) {
    var parts = date1.split("-");
    var date1_ =  new Date(parts[2], parts[1] - 1, parts[0]);
    parts = date2.split("-");
    var date2_ =  new Date(parts[2], parts[1] - 1, parts[0]);    
    
    return date1_ >= date2_;
};

export function getFormattedDate (date) {
    var dd = String(date.getDate()).padStart(2, '0');
    var mm = String(date.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = date.getFullYear();
    return dd+"-"+mm+"-"+yyyy;
};

export function addDaysToFormattedDate (days, date) {
    var parts = date.split("-");
    var result = new Date(parts[2], parts[1] - 1, parts[0]);
    result.setDate(result.getDate() + days);    

    return getFormattedDate(result);
};
