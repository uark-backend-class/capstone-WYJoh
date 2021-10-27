const axios = require('axios');
// const Team = require("../models/Team");

const matchupKey = process.env.MATCHUP_API;

exports.listTeamsPage = (req, res) => {
    res.render('list-teams', { title: "Head-to-Head" });
};

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

        let games = results.data.games.reverse().slice(0, 5).map(formatGame);
        if (games.length == 0) {
            throw new Error("matchup error");
        }

        function formatGame(game) {
            game.higher = Math.max(game.homeScore, game.awayScore);
            game.lower = Math.min(game.awayScore, game.homeScore);
            return game;
        };

        return res.render('results-page', {
            title: "Team Results",
            team1,
            team2,
            team1Wins,
            team2Wins,
            ties,
            games,
        });
    } catch (error) {
        console.log(error.message);
        res.render('error-page', {
            errorHead: "Error",
            errorMessageAbove: "you may have a spelling mistake",
            errorConj: "-- or --",
            errorMessageBelow: "these schools have never played before",
        });
    }
};
