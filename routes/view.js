//requiring express and path here

const router = require("express").Router();
const path = require("path");
//make sure pathing in dirname is correct on both exercise and stats
router.get("/exercise", (req, res) => {
    res.sendFile(path.join(__dirname, "../public/exercise.html"));
});

router.get("/stats", (req, res) => {
    res.sendFile(path.join(__dirname, "../public/stats.html"));
});

module.exports = router;