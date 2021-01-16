const { urlencoded } = require("body-parser");
const express = require("express");
const mongoose = require("mongoose");
const logger = require("morgan");

const PORT = 5000;

const app = express();

app.use (logger("dev"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

mongoose.connect("mongodb://localhost/workout", {
    useNewUrlParser:true,
    useFindAndModify:false
});

app.use(require("./routes/api"));
app.use(require("./routes/view"));

app.listen(PORT, () => {
    console.log(`App running on port ${PORT}!`)
});