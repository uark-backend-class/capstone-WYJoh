const axios = require('axios');
// const Team = require("../models/Team");

const matchupKey = process.env.MATCHUP_API;

exports.listTeamsPage = (req, res) => {
    res.render('list-teams', { title: "Head-to-Head" });
};
// "texas%20a%26m"
exports.resultsPage = async (req, res) => {
    let team1 = encodeURIComponent(req.query.team1);
    let team2 = encodeURIComponent(req.query.team2);

    const config = {
        headers: { Authorization: `Bearer ${matchupKey}` },
    };

    try {
        const results = await axios.get(`https://api.collegefootballdata.com/teams/matchup?team1=${team1}&team2=${team2}`, config);

        // console.log(results.data);

        team1 = results.data.team1;
        team2 = results.data.team2;
        let team1Wins = results.data.team1Wins;
        let team2Wins = results.data.team2Wins;
        let ties = results.data.ties;

        // FIRST GAME (MOST RECENT)
        let gameFirst = results.data.games.slice(-1);

        let objFirst = gameFirst.find(obj => obj.season);
        let seasonFirst = objFirst.season;
        let winnerFirst = objFirst.winner;

        let homeFirst = objFirst.homeScore;
        let awayFirst = objFirst.awayScore;
        let scoresFirst = homeFirst + "," + awayFirst;
        let splitFirst = scoresFirst.split(',').map(Number);
        let higherFirst = Math.max.apply(Math, splitFirst);
        let lowerFirst = Math.min.apply(Math, splitFirst);

        // SECOND GAME
        let gameSecond = results.data.games.slice(-2, -1);

        let objSecond = gameSecond.find(obj => obj.season);
        let seasonSecond = objSecond.season;
        let winnerSecond = objSecond.winner;

        let homeSecond = objSecond.homeScore;
        let awaySecond = objSecond.awayScore;
        let scoresSecond = homeSecond + "," + awaySecond;
        let splitSecond = scoresSecond.split(',').map(Number);
        let higherSecond = Math.max.apply(Math, splitSecond);
        let lowerSecond = Math.min.apply(Math, splitSecond);

        // THIRD GAME
        let gameThird = results.data.games.slice(-3, -2);

        let objThird = gameThird.find(obj => obj.season);
        let seasonThird = objThird.season;
        let winnerThird = objThird.winner;

        let homeThird = objThird.homeScore;
        let awayThird = objThird.awayScore;
        let scoresThird = homeThird + "," + awayThird;
        let splitThird = scoresThird.split(',').map(Number);
        let higherThird = Math.max.apply(Math, splitThird);
        let lowerThird = Math.min.apply(Math, splitThird);

        // FOURTH GAME
        let gameFourth = results.data.games.slice(-4, -3);

        let objFourth = gameFourth.find(obj => obj.season);
        let seasonFourth = objFourth.season;
        let winnerFourth = objFourth.winner;

        let homeFourth = objFourth.homeScore;
        let awayFourth = objFourth.awayScore;
        let scoresFourth = homeFourth + "," + awayFourth;
        let splitFourth = scoresFourth.split(',').map(Number);
        let higherFourth = Math.max.apply(Math, splitFourth);
        let lowerFourth = Math.min.apply(Math, splitFourth);

        // FIFTH GAME (OLDEST)
        let gameFifth = results.data.games.slice(-5, -4);

        let objFifth = gameFifth.find(obj => obj.season);
        let seasonFifth = objFifth.season;
        let winnerFifth = objFifth.winner;

        let homeFifth = objFifth.homeScore;
        let awayFifth = objFifth.awayScore;
        let scoresFifth = homeFifth + "," + awayFifth;
        let splitFifth = scoresFifth.split(',').map(Number);
        let higherFifth = Math.max.apply(Math, splitFifth);
        let lowerFifth = Math.min.apply(Math, splitFifth);
        

        res.render('results-page', {
            title: "Team Results",
            team1,
            team2,
            team1Wins,
            team2Wins,
            ties,
            seasonFirst,
            seasonSecond,
            seasonThird,
            seasonFourth,
            seasonFifth,
            winnerFirst,
            winnerSecond,
            winnerThird,
            winnerFourth,
            winnerFifth,
            higherFirst,
            higherSecond,
            higherThird,
            higherFourth,
            higherFifth,
            lowerFirst,
            lowerSecond,
            lowerThird,
            lowerFourth,
            lowerFifth,
        });

    } catch (error) {
        res.render('error-page', {
            errorHead: "Error",
            errorMessageAbove: "you may have a spelling mistake",
            errorConj: "-- or --",
            errorMessageBelow: "these schools have never played before",
        });
    }
};
