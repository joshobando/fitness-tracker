async function initWorkout(){
    const lastWorkout = await API.getLastWorkout();
    console.log("Last Workout:", lastWorkout);
    if (lastWorkout){
        document
        .querySelector("a[href='/exercise?']")
        .setAttribute("href", `/exercise?id=${lastWorkout._id}`);

        const workoutSummary = {
            date: formatDate(lastWorkout.day),
            totalDuration: lastWorkout.totalDuration,
            numExercises: lastWorkout.exercises.length,
            ... countExercises(lastWorkout.exercises)
        };

        renderSummary(workoutSummary);
    } else{
        renderNoWorkout()
    }
}

function countExercises(exercises){
    const counted = exercises.reduce((acc, curr) => {
        if (curr.type === "resistance") {
            acc.totalWeight = (acc.totalWeight || 0) + curr.weight;
            acc.totalReps = (acc.totalReps || 0) + curr.reps; 
            acc.totalSets = (acc.totalSets || 0) + curr.sets;
        } else if (curr.type === "cardio"){
            acc.totalDistance = (acc.totalDistance || 0) + curr.distance
        }
        return acc;
    }, {});
    return counted;
}

function formatDate() {
    const options = {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric"
    };

    return new Date(date).toLocaleDateString(options);
}

function workoutSummary(summary) {
    const container = document.querySelector(".workoutstats");

    const workoutKeyMap = {
        date: "",
        totalDuration: "Total Workout Duration",
        numExercises: "Exercises Done",
        totalWeight: "Total Weight Lifted",
        totalSets: "Total Sets Performed",
        totalReps: "Totoal Reps Performed",
        totalDistance: "Total Distance Covered"
    };

    Object.keys (summary).forEach(key => {
        const p = document.createElement("strong");

        strong.textContent = workoutKeyMap[key];
        const textNode = document.createTextNode(`: ${summary[key]} `);

        p.appendChild(strong);
        p.appendChild(textNode);
    });
}

function workoutSummary(){
    const container = document.querySelector("workoutstats");
    const p = document.createElement("p");
    const strong = document.createElement("strong");
    strong.textContent = "You haven't created a workout yet"

    p.appendChild(strong);
    container.appendChild(p);
}

initWorkout();