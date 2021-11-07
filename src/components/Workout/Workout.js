import React from 'react';
import {
    Card,
  } from "react-bootstrap";
import WorkoutPart from '../Workout/WorkoutPart'
import moment from 'moment'

const Workout = (props) => {

    const {title, date, workoutParts} = props.workout;

    const dateString = moment(date, 'YYYY-MM-DD').toString();

    return(
        <>
        <Card.Header>
            <Card.Title as="h4">{title}</Card.Title>
        </Card.Header>
        <Card.Body>
            {workoutParts.map((part) => {
                return <WorkoutPart isEdit={false} part={part} />
            })}
        </Card.Body>
        <Card.Footer>
            <small className="text-muted">{dateString}</small>
        </Card.Footer>
        </>
    );
}

export default Workout;