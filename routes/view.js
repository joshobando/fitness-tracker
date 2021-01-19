const express = require("express");
const path = require("path");
const router = express.Router();

router.get("/exercise", (req, res) => {
  try{
  res.sendFile(path.join(__dirname, "../public/exercise.html"));
  }
  catch(e){
    console.error(e.message);
  }
});


router.get("/stats", (req, res) => {
  try{
  res.sendFile(path.join(__dirname, "../public/stats.html"));
  }
  catch(e){ //checking if 
    console.error(e.message)
  }
});

module.exports = router;
