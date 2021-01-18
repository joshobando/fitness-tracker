const router = require("express").Router();
const Workout = require("../models/workout");

router.post("/api/workouts", (req, res) => {
    Workout.create({})
        .then((dbWorkout) => {
            res.json(dbWorkout);
        })
        .catch((error) => {
            res.json(error);
        });
});

router.put("/api/workouts/:id", ({
    body,
    params
}, res) => {
    Workout.findByIdAndDelete(
            params.id, {
                $push: {
                    exercises: body
                }
            }, {
                new: true,
                runValidators: true
            }
        )
        .then((dbWorkout) => {
            res.json(dbWorkout);
        })
        .catch((error) => {
            res.json(error);
        });
});

router.get("/api/workouts", (req, res) => {
    Workout.aggregate([{
            $addFields: {
                totalDuration: {
                    $sum: "$exercises.duration",
                },
            },
        }, ])
        .then((dbWorkout) => {
            res.json(dbWorkout);
        })
        .catch((error) => {
            res.json(error);
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
            res.json(dbWorkouts);
        })
        .catch((err) => {
            res.json(err);
        });
});

router.delete("/api/workouts", ({
    body
}, res) => {
    Workout.findByIdAndDelete(body.id)
        .then(() => {
            res.json(true);
        })
        .catch((err) => {
            res.json(err);
        });
})

module.exports = router;