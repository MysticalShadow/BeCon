import React from 'react';

export default class DataProcessor extends React.Component {

    state = {
        presetHabits : [],
        customHabits : [],
        userLog : [],
        score : []
    };

    constructor (userData) {
        if(userData && userData.presetHabits)
            this.state.presetHabits = userData.presetHabits;
        if(userData && userData.customHabits)
            this.state.customHabits = userData.customHabits;
        if(userData && userData.userLog)
            this.state.userLog = userData.userLog;
        if(userData && userData.score)
            this.state.score = userData.score;
    };

    

    getOngoingTargets () {
        if(this.state.userLog.length == 0)
            return [];
        
        return [
            "CURRENT: Do 10 pushups.",
            "CURRENT: Clean room for 10 mins.",
            "CURRENT: Take 10 min walk outside."
        ];
    };

};