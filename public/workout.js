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
            numExercies: lastWorkout.exercises.length,
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

function