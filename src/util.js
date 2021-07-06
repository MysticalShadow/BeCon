// import * as RNFS from 'react-native-fs';

const dummyJSON = {
    presetHabits : [
        "Do 10 pushups.",
        "Clean room for 10 mins.",
        "Take 10 min walk outside."
    ],
    dummyStr: "dummyTest",
    userLog: ["Log1"],
    score : 10
};

export function getUserData () {
    return dummyJSON;
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

