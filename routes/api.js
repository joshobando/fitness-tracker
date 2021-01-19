// require the things you need (express, and workout model)
const router = require("express").Router();
const Workout = require("../models/workout");

router.post("/api/workouts", (req, res) => {
    Workout.create({}).then((dbWorkout) => { res.json(dbWorkout) });
});

router.put("/api/workouts/:id", (req, res) => {
    //test out this block, getting 404
    console.log("*******hitting put route ...");
    Workout.findByIdAndUpdate(
            req.params.id, 
            {$push: {exercises: req.body}}, {new: true}
        ).then((dbWorkout) => { 
            console.log("*****dbWorkout: ",dbWorkout);
            res.json(dbWorkout) });
});

router.get("/api/workouts", (req, res) => {
    Workout.aggregate([{$addFields: {totalDuration: {$sum: "$exercises.duration",},},
        }, ]).then((dbWorkout) => {res.json(dbWorkout);});
});

router.get("/api/workouts/range", (req, res) => {
    Workout.aggregate([{$addFields: {totalDuration: {$sum: "exercise.duration",},},
        }, ])
        .then((dbWorkouts) => {res.json(dbWorkouts);});
});

router.delete("/api/workouts", ({
    body
}, res) => {
    //dont confuse delete function with update function, make sure which one is which
    Workout.findByIdAndDelete(body.id)
        .then(() => {res.json(true);});
});

module.exports = router;