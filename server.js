const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");

// const PORT = 5000;

const app = express();
// const PORT = process.env.PORT || 5000

app.use(logger("dev"));

app.use(express.urlencoded({
    extended: true
}));
app.use(express.json());

app.use(express.static("public"));

mongoose.connect("mongodb://localhost/workout", {
    useNewUrlParser: true,
    useFindAndModify: false
});

// acquiring routes
app.use(require("./routes/api.js"));
app.use(require("./routes/view.js"));

// app.listen(PORT, () => {console.log(`App running on port ${PORT}!`);});
var server = app.listen(process.env.PORT || 5000, function () {
    var port = server.address().port;
    console.log("Express is working on port " + port);
});