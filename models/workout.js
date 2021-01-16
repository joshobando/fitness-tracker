const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const workoutSchema = new Schema({
    day: {
        type: Date,
        default: () => Date(),
    },
    exercises: [
        {
            type:{
                type: String,
                trim: true,
                required: "Excersice type",
            },
            name:{
                type: String,
                trim:true,
                required: "Excersice name",
            },
            duration:{
                type: Number,
                required:"Exercise duration",
            },
            weight:{
                type: Number,
            },
            Reps: {
                type:Number
            },
            Sets:{
                type:Number,
            },
            Distance:{
                type:Number,
            },
        },
    ],
});

const Workout = mongoose.model("Workout", workoutSchema);

module.exports = Workout;