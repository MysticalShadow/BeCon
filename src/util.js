// import * as RNFS from 'react-native-fs';

const dummyJSON = {
    presetHabits : [
        "Do 10 pushups.",
        "Clean room for 10 mins.",
        "Take 10 min walk outside."
    ],
    dummyStr: "dummyTest",
    userLog: ["Log1"],
    targets: [],
    score : 10,
    customHabits : []
};

function readUserDataFromFile () {
    return dummyJSON;
};

export function writeUserDataToDB (presetHabits, customHabits, targets, userLog, score) {
    var userData = {
        presetHabits: presetHabits,
        customHabits: customHabits,
        targets: targets,
        userLog: userLog,
        score: score
    }
    console.log(userData);
    // rnfs write
};

export function getUserData () {
    return readUserDataFromFile();
};

export function getOngoingTargets (data) {
    var targets = data.targets;
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

export function getCurrentScore (data) {
    if (data && data.score)
        return data.score;
    return "UNABLE TO LOAD";
};

export function addCustomHabitToDB (habit, currUserData) {
    currUserData.customHabits.push(habit);
    writeUserDataToDB(currUserData);
}

// return true if date1 >= date 2
export function compareDate (date1, date2) {
    var parts = date1.split("-")
    var date1_ =  new Date(parts[2], parts[1] - 1, parts[0]);
    parts = date2.split("-")
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
    var result = new Date(date);
    result.setDate(result.getDate() + days);
    return getFormattedDate(result);
};
