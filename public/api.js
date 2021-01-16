const API = {
    async getLastWorkout(){
        let res;
        try{
            res = await fetch ("/api/workouts");
        } catch (error) {
            console.log(error)
        }
        const json = await res.json();
        return json[json.length - 1];
    },
    async addExcercise(data){
        const id = location.search.split("=")[1];
        
        const res = await fetch("/api/workouts/" + id,{
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data)
        });

        const json = await res.json();

        return json;
    },
    async createWorkout(data = {}){
        const res = await fetch("/api/workouts/" + id,{
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data)
        });

        const json = await res.json();

        return json;
    },

    async getWorkoutsRange(){
        const res = await fetch("/api/workouts/range");
        const json = await res.json();

        return json;
    },
};