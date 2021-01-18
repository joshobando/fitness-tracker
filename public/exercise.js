const workoutTypeSel = document.querySelector("#type");
const cardioForm = document.querySelector("#cardio-form")
const resistanceForm = document.querySelector("#resistance-form");
const cardioName = document.querySelector("#cardio-name");
const resistanceName = document.querySelector("#resistance")
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
    } else if (workoutType === "resistance"){
        resistanceForm.classList.remove("d-none");
        cardioForm.classList.add("d-none");
    } else{
        resistanceForm.classList.add("d-none");
        cardioForm.classList.add("d-none");
    }

    validateInputs();
}

function validateInputs() {
    let isValid = true;

    if (workoutType === "resistance") {
        if (resistanceName.value.trim() === ""){
            isValid = false;
        }
        
        if(weight.value.trim() === ""){
            isValid = false;
        }
        if(sets.value.trim() === ""){
            isValid = false;
        }
        if(reps.value.trim() === ""){
            isValid = false;
        }
        if(resistanceDuration.value.trim() === ""){
            isValid = false;
        }
    }else if (workoutType === "cardio"){
        if(cardioName.value.trim() === ""){
            isValid = false
        }
        if(cardioDuration.value.trim() === ""){
            isValid = false
        }
        if(distance.value.trim() === ""){
            isValid = false
        }
    }

    if (isValid) {
        completeButton.removeAttribute("disabled");
        addButton.removeAttribute("disabled");
    }else {
        completeButton.setAttribute("disabled", true);
        addButton.setAttribute("disabled", true);
    }
}

async function formSubmission(event){
    event.preventDefault();

    let workoutData = {};

    if (workoutType === "cardio-name") {
        workoutData.type = "cardio-name";
        workoutData.name = cardioName.value.trim();
        workoutData.distance = Number(distance.value.trim());
        workoutData.duration = Number(cardioDuration.value.trim());
    }else if(workoutType === "resistance"){
        workoutData.type = "resistance";
        workoutData.name = resistanceName.value.trim();
        workoutData.weight = Number(weight.value.trim());
        workoutData.duration = Number(resistanceDuration.value.trim());
        workoutData.sets = Number(sets.value.trim());
        workoutData.reps = Number(reps.value.trim());
    }

    await API.addExercise(workoutData);
    clearInputs();
    toast.classList.add("success");
}

function toastAnimation(){
    toast.removeAttribute("class");
    if (moveaway){
        location.href = "/";
    }
}

function clearInputs(){
    cardioName.value = "";
    resistanceName.value = "";
    sets.value = "";
    cardioDuration.value = "";
    distance.value = "";
    resistanceDuration.value = "";
    reps.value = "";
    weight.value = "";
}

if (workoutTypeSel){
    workoutTypeSel.addEventListener("change", workoutTypeChange);
}
if(completeButton){
    completeButton.addEventListener("click", function(event){
        moveaway = true;
        formSubmission(event);
    });
}
if (addButton){
    addButton.addEventListener("click", formSubmission);
}
toast.addEventListener("animationend", toastAnimation);

document
.querySelectorAll("input")
.forEach(element => element.addEventListener("input", validateInputs));