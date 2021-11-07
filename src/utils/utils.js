import moment from "moment"

export const parseWorkoutsFromPlan = (plan) => {
    let events = []
    plan.weeks.map((week) => {
        week.days.map((day) => {
            day.workouts.map((workout) => {
                if(workout.workoutParts.length > 0){
                const event = {
                    ...workout,
                    date: day.date
                }
                events.push(event)
                }
            })
        })
    })

      return events
}

export const addWorkoutToPlan = (plan, dayToFind, workout) => {
    const dateToFind = moment(dayToFind)
    plan.weeks.forEach((week) => {
        week.days.forEach((day) => {
            const currentDate = moment(day.date)
            console.log("day: " + JSON.stringify(currentDate))
            console.log("day: " + JSON.stringify(dateToFind))
            if(currentDate.isSame(dateToFind)){
                    console.log("found")
                    day.workouts.push({...workout, date: dayToFind})
                }
        })
    })

    return plan
}