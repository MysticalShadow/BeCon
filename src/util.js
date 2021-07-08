import { PermissionsAndroid } from 'react-native';

const RNFS = require('react-native-fs');
const path = RNFS.ExternalStorageDirectoryPath + '/BeCon/BeCon_userdata.txt';
const folderPath = RNFS.ExternalStorageDirectoryPath + '/BeCon';

const dummyJSON = {
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
                console.log(err.message);
            });
    }
    catch{
        console.log("File deletion failed!!");
    }
}

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

    return ongoingTargets;
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

export function getCurrentScore (userLog, targets) {
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


