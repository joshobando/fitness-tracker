const workoutType = document.querySelector("#type");
const cardioForm = document.querySelector("#cardio-form")
const resistanceForm = document.querySelector("#resistance-form");
const cardioName = document.querySelector("#cardio-name");
const weight = document.querySelector("#weight");
const sets = document.querySelector("#sets");
const reps = document.querySelector("#reps");
const cardioDuration = document.querySelector("#cardio-duration");
const resistanceDuration = document.querySelector("#resistance-duration");
const distance = document.querySelector("#distance");
const completeButton = document.querySelector("#complete-button");
const addButton = document.querySelector("#addanother-button");
const toast = document.querySelector("#toast");


let workoutType = null;
let moveaway = false;

async function initExercise(){
    let workout;

    if (location.search.split("=")[1] === undefined){
        workout = await API.createWorkout()
        console.log(workout)
    }
    if (workout){
        location.search = "?id" + workout._id;
    }
}

initExercise();

function workoutTypeChange(event){
    workoutType = event.target.value;

    if (workoutType === "cardio") {
        cardioForm.classList.remove("d-none");
        resistanceForm.classList.add("d-none");
    } else if (workoutType == "resistance"){
        resistanceForm.classList.remove("d-none");
        cardioForm.classList.add("d-none");
        resistanceForm.classList.add("d-none");
    }

    validateInputs();
}

function validateInputs() {
    let isValid = true;

    if (workoutType === "resistance") {
        if (name.value.trim() === ""){
            isValid = false;
        }
        
        if(weight)
    }
}