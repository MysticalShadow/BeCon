import { PermissionsAndroid } from 'react-native';

const RNFS = require('react-native-fs');
const path = RNFS.ExternalStorageDirectoryPath + '/BeCon/BeCon_userdata.txt';
const folderPath = RNFS.ExternalStorageDirectoryPath + '/BeCon';

const dummyJSON = 
{
    presetHabits : [
        "Do 10 pushups.",
        "Clean room for 10 mins.",
        "Take 10 min walk outside.",
        "Do exercise first thing in morning for at least 10 mins.",
        "Meditate every morning for at least 15 mins."
    ],
    userLog: {
        // "08-07-2021": {
        //     habits: [
        //         "Clean room for 10 mins.",
        //         "Do 10 pushups."
        //     ]
        // },
        // "09-07-2021": {
        //     habits: [
        //         "Clean room for 10 mins.",
        //         "Take 10 min walk outside."
        //     ]
        // },
    },
    targets: [
        // {
        //     habit: "Do 10 pushups.",
        //     date: "08-07-2021",
        //     duration: 3
        // }
    ],
    score : 0,
    customHabits : []
};

async function readUserDataFromFile () {
    console.log("reading...");
    // return dummyJSON;
    try {
        console.log("trying to read from "+path);
        return await RNFS.readFile(path, 'utf8').then( (contents) => {
            return JSON.parse(contents);
        });
    }
    catch {
        console.log("Data read failed, reading dummy data!");
        console.log(dummyJSON);
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

    console.log("trying to write at "+path);
    try{
        RNFS.mkdir(folderPath);
        RNFS.writeFile(path, JSON.stringify(userData), 'utf8')
            .then((success) => {
                console.log('FILE WRITTEN!');
            })
            .catch((err) => {
                console.log("File write failed!!");
                console.log(err.message);
            });
    }
    catch{
        console.log("File write failed!!");
    }
};

export async function deleteUserData () {
    try{
        RNFS.mkdir(folderPath);
        return RNFS.unlink(path)
            .then((success) => {
                console.log('FILE DELETED!');
            })
            .catch((err) => {
                console.log("File deletion failed!!");
                console.log(err.message);
                return err;
            });
    }
    catch{
        console.log("File deletion failed!!");
    }
}

export async function getUserData () {
    return await readUserDataFromFile();
};

export function getOngoingTargets (targets, userLog) {
    var ongoingTargets = [];
    var todayCompletedHabits, todayDate = getFormattedDate(new Date());

    if(userLog && userLog.hasOwnProperty(todayDate) && userLog[todayDate])
        todayCompletedHabits = userLog[todayDate].habits;

    for(const target of targets) {
        var finishDate = addDaysToFormattedDate(target.duration, target.date);
        if(compareDate(todayDate, target.date))
        {
            if(compareDate(finishDate, todayDate, true))
                ongoingTargets.push(target);
            else if(compareDate(finishDate, todayDate) && (!todayCompletedHabits || !todayCompletedHabits.includes(target.habit))) 
            {
                ongoingTargets.push(target);
            }
        }
    }
    return ongoingTargets;
};

export function getTodaysTargets (targets) {
    var todaysTargets = [];
    var todayDate = getFormattedDate(new Date());

    for(const target of targets) {
        var finishDate = addDaysToFormattedDate(target.duration-1, target.date);
        if(compareDate(todayDate, target.date) && compareDate(finishDate, todayDate))
        {
            todaysTargets.push(target);
        }
    }
    return todaysTargets;
};

export function isTodaysTargetsCompleted (targets, userLog) {
    var todaysTargets = getTodaysTargets(targets, userLog);
    var todayCompletedHabits, todayDate = getFormattedDate(new Date());

    if(userLog && userLog.hasOwnProperty(todayDate) && userLog[todayDate])
        todayCompletedHabits = userLog[todayDate].habits;

    for(const target of todaysTargets) {
        if(!todayCompletedHabits || !todayCompletedHabits.includes(target.habit))
            return false;
    }
    return true;
};

export function convertLogJSONToArray (log) {
    var logArray = [];
    var date = getFormattedDate(new Date());
    for(var logDate in log) {
        if(compareDate(date, logDate))
            date = logDate;
    }

    var totalDayEntries = 0;
    for(var key in log)
        if(log.hasOwnProperty(key))
            totalDayEntries++;
    
    var countedDays = 0;

    while(countedDays != totalDayEntries) {
        if (log[date] != undefined) {
            for(const habit of log[date].habits) {
                logArray.push({habit: habit, date: date});
            }
            countedDays++;
        }

        date = addDaysToFormattedDate(1, date);
    }

    return logArray;
};

export function getScore (userLog, targets, endDate, startDate) {

    if(!startDate && !endDate)
        return getCurrentScore(userLog, targets);
    
    if(!userLog)
        return "UNABLE TO LOAD";

    if(!Array.isArray(userLog))
        userLog = convertLogJSONToArray(userLog);

    if(!startDate)
    {
        startDate = getFormattedDate(new Date());
        for(const log of userLog) {
            if(compareDate(startDate, log.date))
                startDate = log.date;
        }
        for(const target of targets) {
            if(compareDate(startDate, target.date))
                startDate = target.date;
        }
    }
    
    var filteredUserLog = [];
    for(const log of userLog) {
        if(compareDate(endDate, log.date) && compareDate(log.date, startDate))
            filteredUserLog.push(log);
    }

    var filteredTargets = [];
    for(const target of targets) {
        if(compareDate(target.date, startDate) && compareDate(endDate, target.date))
            filteredTargets.push(target);
    }

    var score = getCurrentScore(filteredUserLog, filteredTargets, endDate);
    return score;
};

export function getCurrentScore (userLog, targets, endDate) {
    if(!userLog)
        return "UNABLE TO LOAD";

    if(!Array.isArray(userLog))
        userLog = convertLogJSONToArray(userLog);

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
            totalConsistency = totalConsistency + consistentDays * consistentDays * 0.02;
        }
        else
        {
            totalConsistency = totalConsistency + consistentDays * consistentDays * 0.01;
        }
    }

    var startDate = getFormattedDate(new Date());
    var endDateUnformat;
    if(!endDate)
        endDateUnformat = new Date();
    else
    {
        var parts = endDate.split("-");
        endDateUnformat = new Date(parts[2], parts[1] - 1, parts[0]);
    }

    for(const log of userLog) {
        if(compareDate(startDate, log.date))
            startDate = log.date;
    }
    for(const target of targets) {
        if(compareDate(startDate, target.date))
            startDate = target.date;
    }

    var parts = startDate.split("-");
    var startDateUnformat =  new Date(parts[2], parts[1] - 1, parts[0]);

    const utc2 = Date.UTC(endDateUnformat.getFullYear(), endDateUnformat.getMonth(), endDateUnformat.getDate());
    const utc1 = Date.UTC(startDateUnformat.getFullYear(), startDateUnformat.getMonth(), startDateUnformat.getDate());
    
    var totalDays = Math.floor((utc2 - utc1) / (1000 * 60 * 60 * 24)) + 1;

    consistencyScore = totalConsistency/totalDays;
    return Math.round( consistencyScore * 1e3 ) / 1e3;
    // return consistencyScore.toFixed(3);
};

export function addCustomHabitToDB (habit, currUserData) {
    currUserData.customHabits.push(habit);
    writeUserDataToDB(currUserData);
}

// return true if date1 >= date 2
export function compareDate (date1, date2, strict) {
    var parts = date1.split("-");
    var date1_ =  new Date(parts[2], parts[1] - 1, parts[0]);
    parts = date2.split("-");
    var date2_ =  new Date(parts[2], parts[1] - 1, parts[0]);    
    
    if(strict)
        return date1_ > date2_;
    else
        return date1_ >= date2_;
};

export function isMonthSame (date1, date2) {
    var parts1 = date1.split("-");
    var parts2 = date2.split("-");
    return parts1[1] == parts2[1];
};

export function isSunday (date) {
    var parts = date.split("-");
    var result = new Date(parts[2], parts[1] - 1, parts[0]);
    return result.getDay() == 0 ;
};

export function getLastSunday (date) {
    if(!date)
        date = getFormattedDate(new Date());

    while(!isSunday(date)){
        date = addDaysToFormattedDate(-1, date);
    }
    return date;
};

export function getPreviousMonthYear (date) {
    if(!date){
        date = new Date();
    }
    else 
        date = getUnformattedDate(date);
    
    date.setDate(1);
    date.setMonth(date.getMonth()-1);
    date = getFormattedDate(date);
    return date.slice(3, date.length);
};

export function getFormattedDate (date) {
    var dd = String(date.getDate()).padStart(2, '0');
    var mm = String(date.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = date.getFullYear();
    return dd+"-"+mm+"-"+yyyy;
};

export function getUnformattedDate (date) {
    var parts = date.split("-");
    var result = new Date(parts[2], parts[1] - 1, parts[0]);
    return result;
};

export function addDaysToFormattedDate (days, date) {
    
    var parts = date.split("-");
    var result = new Date(parts[2], parts[1] - 1, parts[0]);
    if(typeof days == "string")
        days = parseInt(days, 10);
    result.setDate(result.getDate() + days);    
    return getFormattedDate(result);
};


