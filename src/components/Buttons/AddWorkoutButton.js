import React from 'react';
import {
    Button,
  } from "react-bootstrap";

const AddWorkoutButton = () => {
    
    return (
        <Button
            className="btn-fill pull-right"
            type="add"
            variant="primary">
            Add Workout +
        </Button>
    );
}

export default AddWorkoutButton