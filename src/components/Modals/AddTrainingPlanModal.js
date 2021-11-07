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
var lodash = require('lodash');
 

  const goalOptions = [
    { value: '1 Mile', label: '1 Mile' },
    { value: '5K', label: '5K' },
    { value: '10K', label: '10K' },
    { value: 'Half Marathon', label: 'Half Marathon' },
    { value: 'Marathon', label: 'Marathon' },
    { value: '50K', label: '50K' },
    { value: '100K', label: '100K' },
    { value: '100 Mile', label: '100 Mile' },
  ]

  const numWeeksOptions = [
    { value: '4 Weeks', label: '4 Weeks' },
    { value: '8 Weeks', label: '8 Weeks' },
    { value: '12 Weeks', label: '12 Weeks' },
    { value: '16 Weeks', label: '16 Weeks' }
  ]

const AddTrainingPlanModal = (props) => {

    const [startDate, onChangeStartDate] = React.useState()
    const [goalDate, onChangeGoalDate] = React.useState()
    const [goal, setGoal] = React.useState('')
    const [numberOfWeeks, setNumberOfWeeks] = React.useState()

    const {saveTrainingPlan, setShowAddTrainingPlanModal, showAddTrainingPlanModal } = props

    return(
        <>
        <Modal
          size="lg"
          className="modal-primary"
          show={showAddTrainingPlanModal}
          onHide={() => setShowAddTrainingPlanModal(false)}>
          <Modal.Header className="justify-content-center">
            <Row className="align-items-center">
              <Col>
                <h4>New Training Plan</h4>
              </Col>
            </Row>
          </Modal.Header>
          <Modal.Body className="text-center">
          <Card>
              <Card.Body>
                <Form>
                    <Row>
                        <Col className="col-centered" md={{ span: 6, offset: 3 }}>
                            <label>
                                Goal
                            </label>
                            <Select options={goalOptions}
                                    onChange={(selectedOption) =>
                                        setGoal(selectedOption.value)
                                    } />
                        </Col>
                    </Row>
                    <Row>
                        <Col className="col-centered" md="6">
                        <Form.Group>
                            <label>
                            Start Date
                            </label>
                            <DatePicker 
                                onChange={onChangeStartDate}
                                value={startDate} />
                        </Form.Group>
                        </Col>
                        <Col className="col-centered" md="6">
                        <label>
                            Goal Date
                        </label>
                        <DatePicker 
                            onChange={onChangeGoalDate}
                            value={goalDate} />
                        </Col>
                    </Row>
                    <Row>
                        <Col className="col-centered" md={{ span: 6, offset: 3 }}>
                            <h4>OR</h4>
                        </Col>
                    </Row>
                    <Row>
                        <Col className="col-centered" md={{ span: 3, offset: 2 }}>
                            <Form.Group>
                                <label>
                                    Number of Weeks
                                </label>
                                <Select options={numWeeksOptions}
                                        onChange={(selectedOption) =>
                                            setNumberOfWeeks(selectedOption.value)
                                    } />
                            </Form.Group>
                        </Col>
                        <Col className="col-centered" md="6">
                            <label>
                                Starting On
                            </label>
                            <DatePicker 
                                onChange={onChangeStartDate}
                                value={startDate} />
                        </Col>
                    </Row>
                </Form>
              </Card.Body>
            </Card>
          </Modal.Body>
          <div className="modal-footer">
            <Button
              className="btn-simple"
              type="button"
              variant="link"
              onClick={() => setShowAddTrainingPlanModal(false)}>
              Cancel
            </Button>
            <Button
              className="btn-fill pull-right"
              type="submit"
              variant="info"
              onClick={() => {saveTrainingPlan(startDate, goalDate, numberOfWeeks, goal); setShowAddTrainingPlanModal(false)}}>
                Save
            </Button>
          </div>
        </Modal>
        </>
    );
}

export default AddTrainingPlanModal;