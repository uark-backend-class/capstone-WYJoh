exports.listTeamsPage = (req, res) => {
    res.render('list-teams', { title: "Head-to-Head" });
};

exports.resultsPage = (req, res) => {
    res.render('results-page', { title: "Team Results" });
};