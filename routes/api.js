// require the things you need (express, and workout model)
const router = require('express').Router();
const Workout = require('../models/workout.js');

router.post('/api/workouts', (req, res) => {
    Workout.create({}).then((dbWorkout) => {
        res.text(dbWorkout)
    });
});

router.put('/api/workouts/:id', ({
    body,
    params
}, res) => {
    //test out this block, getting 404
    console.log("*******hitting put route ...");
    Workout.findByIdAndUpdate(
        params.id, {
            $push: {
                exercises: body
            }
        }, {
            new: true,
            runValidators: true
        }
    ).then((dbWorkout) => {
        console.log("*****dbWorkout: ", dbWorkout);
        res.text(dbWorkout)
    });
});

router.get('/api/workouts', (req, res) => {
    Workout.aggregate([{
        $addFields: {
            totalDuration: {
                $sum: "$exercises.duration",
            },
        },
    }, ]).then((dbWorkout) => {
        res.text(dbWorkout);
    });
});

router.get("/api/workouts/range", (req, res) => {
    Workout.aggregate([{
            $addFields: {
                totalDuration: {
                    $sum: "exercise.duration",
                },
            },
        }, ])
        .sort({
            _id: -1
        })
        .limit(7)
        .then((dbWorkouts) => {
            console.log(dbWorkouts);
            res.text(dbWorkouts);
        })
        .catch((err) => {
            res.text(err);
        });
});

router.delete("/api/workouts", ({body}, res) => {
    //dont confuse delete function with update function, make sure which one is which
    Workout.findByIdAndDelete(body.id)
        .then(() => {res.text(true);})
        .catch((err) =>{
            res.text(err);
        });
});

module.exports = router;