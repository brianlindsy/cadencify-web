import React from 'react';
import {
    Card,
  } from "react-bootstrap";
import WorkoutPart from '../Workout/WorkoutPart'

const Day = (props) => {

    const {title, workouts} = props;

    return(
        <>
        <Card.Body>
            {console.log(workouts)}
            {workoutParts.map((part) => {
                return <Workout part={{...part, title}} />
            })}
        </Card.Body>
        </>
    );
}

export default Day;