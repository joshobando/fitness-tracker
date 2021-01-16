function populateChart(data) {
    let durations = data.map(({
        totalDuration
    }) => totalDuration);
    let pounds = calculateTotalWeight(data);
    let workouts = workoutNames(data);
    const pallette = generatePallette();

    let line = document.querySelector("#canvas-1").getContext("2d");
    let bar = document.querySelector("#canvas-2").getContext("2d");
    let pie = document.querySelector("#canvas-3").getContext("2d");
    let pie2 = document.querySelector("#canvas-4").getContext("2d");

    const daysOfWeek = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
    ];

    const labels = data.map(({
        day
    }) => {
        const date = new Date(day);
        return daysOfWeek[date.getDay()];
    });

    let lineChart = new Chart(line, {
        type: "line",
        data: {
            labels,
            datasets: [{
                label: "Workout Duration",
                backgroundColor: "orange",
                borderColor: "orange",
                data: durations,
                fill: false,
            }, ],
        },
        options: {
            responsive: true,
            title: {
                display: true,
            },
            scales: {
                xAxes: [{
                    display: true,
                    scaleLabel: {
                        display: true,
                    },
                }, ],
                yAxes: [{
                    display: true,
                    scaleLabel: {
                        display: true,
                    },
                }, ],
            },
        },
    });

    let barChart = new Chart(bar, {
        type: "bar",
        data: {
            labels,
            datasets: [{
                label: "Pounds",
                data: pounds,
                backgroundColor: [
                    "rgba(241, 60, 113, 0.2)",
                    "rgba(184, 175, 19, 0.2)",
                    "rgba(241, 60, 113, 0.2)",
                    "rgba(87, 218, 87, 0.2)",
                    "rgba(91, 55, 22, 0.2)",
                    "rgba(240, 46, 234, 0.2)",
                ],
                borderColor: [
                    "rgba(241, 60, 113, 1)",
                    "rgba(184, 175, 19, 1)",
                    "rgba(241, 60, 113, 1)",
                    "rgba(87, 218, 87, 1)",
                    "rgba(91, 55, 22, 1)",
                    "rgba(240, 46, 234, 1)",
                ],
                borderWidth: 1,
            }],
        },
        options:{
            title:{
                display: true,
                text: "Pounds Lifted",
            },
            scales:{
                yAxes:[
                    {
                        ticks:{
                            beginAtZero:true,
                        },
                    },
                ],
            },
        },
    });
    
    let pieChart = new Chart(pie,{
        type:"pie",
        data:{
            labels: workouts,
            datasets:[
                {
                    label:"Exercies Done",
                    backgroundColor: pallette,
                    data:durations,
                },
            ],
        },
        options:{
            title:{
                display:true,
                text:"Exercies Done",
            },
        },
    });

    let doughnutChart = new Chart(pie2, {
        type: "doughnut",
        data:{
            labels:workouts,
            datasets:[
                {
                    label: "Exercies Done",
                    backgroundColor: pallette,
                    data: pounds,
                },
            ],
        },
        options:{
            title:{
                display:true,
                text:"Exercises DOne",
            },
        },
    });
}
function calculateTotalWeight(data) {
    let totals = [];

    data.forEach((workout) =>{
        const workoutTotal = workout.exercises.reduce((total, { type, weight }) =>{
            if (type === "resistance"){
                return total + weight;
            } else{
                return total;
            }
        }, 0);

        totals.push(workoutTotal);
    });

    return totals;
}

function workoutNames(data){
    let workouts = [];

    data.forEach((workout) => {
        workout.exercises.forEach((exercise) => {
            workouts.push(exercises.name);
        });
    });

    return[...new Set (workouts)];

    API.getWorkoutsRange().then(populateChart);
}