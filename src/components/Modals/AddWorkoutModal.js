import React from 'react';
import {
    Card,
    Row,
    Col,
    Modal,
    Button,
    Form,
} from "react-bootstrap";
import Select from 'react-select'
import DatePicker from 'react-date-picker';
import WorkoutPart from '../Workout/WorkoutPart'
var lodash = require('lodash');
 

  const workoutTypeOptions = [
    { value: 'Recovery', label: 'Recovery' },
    { value: 'Easy', label: 'Easy' },
    { value: 'Tempo', label: 'Tempo' },
    { value: 'Threshold', label: 'Threshold' },
    { value: 'Speed', label: 'Speed' },
    { value: 'Long', label: 'Long' },
  ]

const AddWorkoutModal = (props) => {

    const [date, onChange] = React.useState(new Date());

    const [workout, setWorkout] = React.useState({})

    const { saveWorkout, setShowAddWorkoutModal } = props

    const addWorkoutPart = () => {
      const newWorkoutPart = {
        'workoutPartOrder': workout.workoutParts == undefined ? 0 : workout.workoutParts.length,
        'workoutPartType': '',
        'durationType': '',
        'durationValue': null,
        'intensityType': '',
        'intensityValue': null,
        'terrain': '',
      }
      workout.workoutParts == undefined ? workout.workoutParts = [] : null
      setWorkout({
        ...workout,
        ...workout.workoutParts.push(newWorkoutPart)
      })
    }

    const handleWorkoutPartChange = (index, field, newValue) => {
      let toUpdate = { ...workout}
      toUpdate.workoutParts[index][field] = newValue
      setWorkout(toUpdate)
    }

    return(
        <>
        {console.log(JSON.stringify(workout))}
        <Modal
          size="lg"
          className="modal-primary"
          show={props.showAddWorkoutModal}
          onHide={() => setShowAddWorkoutModal(false)}>
          <Modal.Header className="justify-content-center">
            <Row className="align-items-center">
              <Col md="8">
                <h4>New Workout on</h4>
              </Col>
              <Col md={{ span: 4, offset: 7 }}>
                <DatePicker 
                  onChange={onChange}
                  value={date} />
              </Col>
            </Row>
             
          </Modal.Header>
          <Modal.Body className="text-center">
          <Card>
              <Card.Body>
                <Form>
                  <Row>
                    <Col className="col-centered" md="6">
                      <Form.Group>
                        <label>
                          Title
                        </label>
                        <Form.Control
                          placeholder="Title"
                          onChange={(event) =>
                            setWorkout({...workout, title: event.target.value})
                          }
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                    <Col className="col-centered" md="6">
                      <label>
                        Type
                      </label>
                      <Select options={workoutTypeOptions}
                              onChange={(selectedOption) =>
                                setWorkout({...workout, type: selectedOption.value})
                              } />
                    </Col>
                  </Row>
                </Form>
              
              <Row>
                <Col className="col-centered" md={{ span: 6, offset: 3 }}>
                  <Button
                    className="btn-fill"
                    type="submit"
                    variant="info"
                    onClick={addWorkoutPart}>
                      Add Workout Part
                  </Button>
                </Col>
              </Row>
              </Card.Body>
              <Card>
                <Card.Body>
                {(workout && workout.workoutParts) ? workout.workoutParts.map((part, index) => {
                  return <WorkoutPart key={index} handleChange={handleWorkoutPartChange} isEdit={true} index={index} part={part} />
                }) : null}
                </Card.Body>
              </Card>
            </Card>
          </Modal.Body>
          <div className="modal-footer">
            <Button
              className="btn-simple"
              type="button"
              variant="link"
              onClick={() => setShowAddWorkoutModal(false)}>
              Cancel
            </Button>
            <Button
              className="btn-fill pull-right"
              type="submit"
              variant="info"
              onClick={() => {saveWorkout(workout, date); setShowAddWorkoutModal(false)}}>
                Save
            </Button>
          </div>
        </Modal>
        </>
    );
}

export default AddWorkoutModal;