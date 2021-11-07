import React from 'react';
import {
    Card,
    Row,
    Col,
    Form
  } from "react-bootstrap";
import Select from 'react-select'

const durationTypeOptions = [
    { value: 'Minutes', label: 'Minutes' },
    { value: 'Miles', label: 'Miles' },
  ]

const intensityTypeOptions = [
    { value: 'Pace', label: 'Pace' },
    { value: 'Heart Rate', label: 'Heart Rate' },
    { value: 'Feel', label: 'Feel' },
  ]

const terrainTypeOptions = [
    { value: 'Grass', label: 'Grass' },
    { value: 'Pavement', label: 'Pavement' },
    { value: 'Gravel', label: 'Gravel' },
    { value: 'Trail Non-Technical', label: 'Trail Non-Technical' },
    { value: 'Trail Technical', label: 'Trail Technical' },
  ]

const workoutPartTypeOptions = [
    { value: 'Warm Up', label: 'Warm Up' },
    { value: 'Cool Down', label: 'Cool Down' },
    { value: 'Run', label: 'Run' },
  ]

const WorkoutPart = (props) => {

    const {title, workoutPartType, durationType, durationValue, intensityType, intensityValue, terrain } = props.part

    const {isEdit, handleChange, index} = props

    const workoutPartKeys = Object.keys(props.part)

    return(
        <>
        <Card>
        <Card.Header>
            <Card.Title as="h4">{title}</Card.Title>
        </Card.Header>
        <Card.Body>
            <Row>
                {workoutPartType && !isEdit ? 
                    <Col xs="3">
                        <div className="numbers">
                            <p className="card-category">Type</p>
                            <Card.Title as="h5">{workoutPartType}</Card.Title>
                        </div>
                    </Col> : null
                }
                { isEdit &&
                    <>
                    <Col xs="3">
                        <label>
                            Type
                        </label>
                        <Select options={workoutPartTypeOptions}
                                onChange={(selected) => {handleChange(index, workoutPartKeys[1], selected.value)}} />
                    </Col>
                    </>
                }
                {durationValue && durationType && !isEdit ?
                    <Col xs="3">
                    <div className="numbers">
                        <p className="card-category">Duration</p>
                        <Card.Title as="h5">{durationValue + " " + durationType}</Card.Title>
                    </div>
                    </Col> : null
                }
                { isEdit &&
                    <>
                    <Col xs="3">
                        <Form.Group>
                            <label>
                            Duration
                            </label>
                            <Form.Control
                                placeholder="Duration"
                                onChange={(event) => handleChange(index, workoutPartKeys[3], event.target.value)}>
                            </Form.Control>
                        </Form.Group>
                        <Select options={durationTypeOptions}
                                onChange={(selected) => handleChange(index, workoutPartKeys[2], selected.value)} />
                    </Col>
                    </>
                }
                {intensityType && intensityValue && !isEdit ? 
                    <Col xs="3">
                        <div className="numbers">
                        <p className="card-category">Intensity</p>
                        <Card.Title as="h5">{intensityValue + " " + intensityType}</Card.Title>
                        </div>
                    </Col> : null
                }
                { isEdit &&
                    <>
                    <Col xs="3">
                        <Form.Group>
                            <label>
                            Intensity
                            </label>
                            <Form.Control
                                placeholder="Intensity"
                                onChange={(event) => handleChange(index, workoutPartKeys[5], event.target.value)}>
                            </Form.Control>
                        </Form.Group>
                        <Select options={intensityTypeOptions}
                                onChange={(selected) => handleChange(index, workoutPartKeys[4], selected.value)} />
                    </Col>
                    </>
                }
                {terrain && !isEdit ? 
                    <Col xs="3">
                        <div className="numbers">
                        <p className="card-category">Terrain</p>
                        <Card.Title as="h5">{terrain}</Card.Title>
                        </div>
                    </Col> : null
                }
                { isEdit &&
                    <>
                    <Col xs="3">
                        <label>
                            Terrain
                        </label>
                        <Select options={terrainTypeOptions}
                                onChange={(selected) => handleChange(index, workoutPartKeys[6], selected.value)} />
                    </Col>
                    </>
                }
            </Row>
        </Card.Body>
        </Card>
        </>
    );
}

export default WorkoutPart;