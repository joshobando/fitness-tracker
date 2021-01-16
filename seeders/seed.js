let mongoose = require("mongoose");
let db = require("../models");

mongoose.connect("mongodb://localhost/workout", {
    useNewUrlParser:true,
    useFindAndModify: false
});

let workoutSeed = [
    {
        day: new Date(new Date().setDate(new Date().getDate() - 10)),
        exercises:[
            {
                type: "resistance",
                name: "Push Press",
                duration: 30,
                weight: 100,
                sets: 6,
                reps: 14
            }
        ]
    },
    {
        day: new Date(new Date().setDate(new Date().getDate() - 9)),
        exercises:[
            {
                type: "resistance",
                name: "Bicep Curl",
                duration: 15,
                weight: 150,
                sets: 4,
                reps: 12  
            }
        ]
    },
    {
        day: new Date(new Date().setDate(new Date().getDate() - 8)),
        exercises:[
            {
                type: "resistance",
                name: "Lateral Pull",
                duration: 25,
                weight: 125,
                sets: 5,
                reps: 12  
            }
        ]
    },
    {
        day: new Date(new Date().setDate(new Date().getDate() - 7)),
        exercises:[
            {
                type: "cardio",
                name: "running",
                duration: 20,
                distance: 5
            }
        ]
    },
    {
        day: new Date(new Date().setDate(new Date().getDate() - 6)),
        exercises:[
            {
                type: "resistance",
                name: "Quad Press",
                duration: 10,
                weight: 200,
                sets: 4,
                reps: 10  
            }
        ]
    },
    {
        day: new Date(new Date().setDate(new Date().getDate() - 5)),
        exercises:[
            {
                type: "resistance",
                name: "Bench Press",
                duration: 10,
                weight: 200,
                sets: 4,
                reps: 10
            }
        ]
    },
    {
        day: new Date(new Date().setDate(new Date().getDate() - 4)),
        exercises:[
            {
                type: "resistance",
                name: "Bench Press",
                duration: 15,
                weight: 150,
                sets: 4,
                reps: 12  
            }
        ]
    },
    {
        day: new Date(new Date().setDate(new Date().getDate() - 3)),
        exercises:[
            {
                type: "resistance",
                name: "Bicep Curl",
                duration: 20,
                weight: 100,
                sets: 6,
                reps: 10  
            }
        ]
    },
    {
        day: new Date(new Date().setDate(new Date().getDate() - 2)),
        exercises:[
            {
                type: "cardio",
                name: "Walking",
                duration: 30,
                distance: 6
            }
        ]
    },
];

db.Workout.deleteMany({})
.then(() => db.Workout.collection.insertMany(workoutSeed))
.then(data => {
    console.log(data.result.n + " records added");
    process.exit(0);
})
.catch(error => {
    console.error(error);
    process.exit(1);
});