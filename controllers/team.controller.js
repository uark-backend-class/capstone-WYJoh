exports.listTeamsPage = (req, res) => {
    res.render('list-teams', { title: "List Teams" });
};

exports.resultsPage = (req, res) => {
    res.render('results-page');
};