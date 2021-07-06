// import * as RNFS from 'react-native-fs';

const dummyJSON = {
    presetHabits : [
        "Do 10 pushups.",
        "Clean room for 10 mins.",
        "Take 10 min walk outside."
    ],
    dummyStr: "dummyTest",
    userLog: ["Log1"],
    score : 10,
    customHabits : []
};

function readUserDataFromFile () {
    return dummyJSON;
};

export function writeUserDataToDB (userLog, presetHabits, customHabits, score) {
    var userData = {
        userLog: userLog,
        presetHabits: presetHabits,
        customHabits: customHabits,
        score: score
    }
    console.log(userData);
    // rnfs write
};

export function getUserData () {
    return readUserDataFromFile();
};

export function getOngoingHabits (data) {
    return [
        "CURRENT: Do 10 pushups.",
        "CURRENT: Clean room for 10 mins.",
        "CURRENT: Take 10 min walk outside."
    ];
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
