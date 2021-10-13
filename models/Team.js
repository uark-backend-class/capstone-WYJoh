const mongoose = require('mongoose');

const teamSchema = mongoose.Schema({
    team1: String,
    team2: String,
    team1Wins: String,
    team2Wins: String,
    ties: String,
});

const Team = mongoose.model("team", teamSchema);

module.exports = Team;