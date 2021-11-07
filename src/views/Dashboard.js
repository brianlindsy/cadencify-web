import React from "react";
import {
  Card,
  Container,
  Row,
  Col,
  Button,
  Spinner
} from "react-bootstrap";
import { Calendar, momentLocalizer } from 'react-big-calendar'
import withDragAndDrop from "react-big-calendar/lib/addons/dragAndDrop";
import calendarStyle from 'react-big-calendar/lib/css/react-big-calendar.css';
import Workout from '../components/Workout/Workout'
import { getTrainingPlanByUserId, updatePlan } from '../utils/httpService.js'
import { addWorkoutToPlan, parseWorkoutsFromPlan } from '../utils/utils.js'
import moment from "moment";
import AddWorkoutModal from "components/Modals/AddWorkoutModal";
import { useAuth0 } from "@auth0/auth0-react";
const axios = require('axios')
const localizer = momentLocalizer(moment)

const DragAndDropCalendar = withDragAndDrop(Calendar);

const Dashboard = () => {

  const {user, getAccessTokenSilently} = useAuth0()

  const {sub} = user

  const [calendar, setCalendar] = React.useState([])
  const [plan, setPlan] = React.useState()
  const [workout, setWorkout] = React.useState()
  const [lastUpdatedCalendar, setLastUpdatedCalendar] = React.useState('')
  const [showAddWorkoutModal, setShowAddWorkoutModal] = React.useState(false)
  const [saving, setSaving] = React.useState(false)

  const handleSelectEvent = (event) => {
    setWorkout(event)
  }
  
  const getTrainingData = async () => {
    const token = await getAccessTokenSilently()
    await getTrainingPlanByUserId(sub, token)
    .then((plan) => {
      if(plan.id){
        const events = parseWorkoutsFromPlan(plan)
        console.log("events " + events)
        setCalendar(events)
        setPlan(plan)
        setLastUpdatedCalendar(new Date().toLocaleTimeString())
      } else {
        setPlan(plan)
      }
    })
    .catch((error) => {
      return null
      console.log(error)
    })
  }

  const onClickAddWorkout = () => {
    setShowAddWorkoutModal(true)
  }

  const saveWorkout = async (workout, date) => {
    setSaving(true)
    const token = await getAccessTokenSilently()
    const updatedPlan = addWorkoutToPlan(plan, date, workout)
    console.log("updatedPlan: " + JSON.stringify(updatedPlan))
    updatePlan(updatedPlan.planUniqueId, updatedPlan, token)
    .then((result) => {
      setPlan(result)
      setSaving(false)
    },
    (error) => {
      console.log("Error occured in saveWorkout");
      setSaving(false)
    })
  }

  React.useEffect(() => {
    getTrainingData()
  }, [])

  return (
    <>
    {console.log(calendar.length)}
    {saving ?
      <Spinner animation="border" role="status">
        <span className="visually-hidden">Loading...</span>
      </Spinner> : 
      <Container fluid>
        <Row>
          <Col md="12">
            <Card>
              <Card.Body>
                {"Library"}
              </Card.Body>
            </Card>
          </Col>
        </Row>
        <Row>
          <Col md="8">
            <Card>
              <Card.Header>
                <Row>
                  <Col md="4">
                    <Card.Title as="h4">Training Calendar</Card.Title>
                  </Col>
                  <Col md={{ span: 2, offset: 5 }}>
                    <Button className="primary" onClick={() => onClickAddWorkout()}>Add Workout +</Button>
                  </Col>
                </Row>
              </Card.Header>
              <Card.Body>
                <DragAndDropCalendar
                  style={calendarStyle}
                  localizer={localizer}
                  events={calendar}
                  style={{ height: 500 }}
                  titleAccessor="title"
                  startAccessor="date"
                  endAccessor="date"
                  resourceIdAccessor="id"
                  onSelectEvent={(event) => handleSelectEvent(event)}
                />
              </Card.Body>
              <Card.Footer>
                <hr></hr>
                <div className="stats">
                  <i className="fas fa-history"></i>
                  Last Updated {lastUpdatedCalendar}
                </div>
              </Card.Footer>
            </Card>
          </Col>
          <Col md="4">
            <Card>
                {workout ? <Workout workout={workout}/> : "Click on a workout from the calendar to view it."}
            </Card>
          </Col>
        </Row>
      </Container>
      }
    {showAddWorkoutModal ? <AddWorkoutModal saveWorkout={saveWorkout} showAddWorkoutModal={showAddWorkoutModal} setShowAddWorkoutModal={setShowAddWorkoutModal}/> : null}
    </>
  );
}

export default Dashboard;
