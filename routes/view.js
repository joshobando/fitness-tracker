const router = require("express").Router();
const path = require("path");

router.get("./public/exercise.js", (req, res) => {
    res.sendFile(path.join(__dirname, "../public/exercise.html"));
});

router.get("./public/dash.js", (req, res) => {
    res.sendFile(path.join(__dirname, "../public/dash.html"))
});

module.exports = router;