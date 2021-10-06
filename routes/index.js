const router = require('express').Router();
const team = require("../controllers/team.controller");

router.get("/", team.listTeamsPage);
router.get("/results", team.resultsPage);

module.exports = router;