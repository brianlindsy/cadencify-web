import React, { Component } from "react"
import { useLocation } from "react-router-dom"
import { Navbar, Container, Nav, Dropdown, Button } from "react-bootstrap"
import AuthenticationButton from "components/Buttons/AuthenticationButton"
import AddTrainingPlanModal from "components/Modals/AddTrainingPlanModal"
import { useAuth0 } from "@auth0/auth0-react";
import { createTrainingPlan } from '../../utils/httpService.js'
import moment from 'moment';

import routes from "routes.js";

function Header() {
  const [showAddTrainingPlanModal, setShowAddTrainingPlanModal] = React.useState(false)

  const { user, getAccessTokenSilently } = useAuth0()

  const {name, sub} = user

  const location = useLocation();
  const mobileSidebarToggle = (e) => {
    e.preventDefault();
    document.documentElement.classList.toggle("nav-open");
    var node = document.createElement("div");
    node.id = "bodyClick";
    node.onclick = function () {
      this.parentElement.removeChild(this);
      document.documentElement.classList.toggle("nav-open");
    };
    document.body.appendChild(node);
  };

  const getBrandText = () => {
    for (let i = 0; i < routes.length; i++) {
      if (location.pathname.indexOf(routes[i].path) !== -1) {
        return routes[i].name;
      }
    }
    return "Brand";
  };

  const saveTrainingPlan = async (startDate, goalDate, numberOfWeeks, goal) => {
    const token = await getAccessTokenSilently();
    console.log(startDate.toLocaleDateString())
    createTrainingPlan({
      goal: goal,
      startDate: moment(startDate).format("YYYY-MM-DD"),
      goalDate: moment(goalDate).format("YYYY-MM-DD"),
      numberOfWeeks: numberOfWeeks,
      userId: sub,
      name: name
    }, token)
  }

  return (
    <>
    <Navbar expand="lg">
      <Container fluid>
        <div className="d-flex justify-content-center align-items-center ml-2 ml-lg-0">
          <Button
            variant="dark"
            className="d-lg-none btn-fill d-flex justify-content-center align-items-center rounded-circle p-2"
            onClick={mobileSidebarToggle}
          >
            <i className="fas fa-ellipsis-v"></i>
          </Button>
        </div>
        <Navbar.Toggle aria-controls="basic-navbar-nav" className="mr-2">
          <span className="navbar-toggler-bar burger-lines"></span>
          <span className="navbar-toggler-bar burger-lines"></span>
          <span className="navbar-toggler-bar burger-lines"></span>
        </Navbar.Toggle>
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto" navbar>
            <Nav.Item>
              <Nav.Link
                className="m-0">
                <Button variant="primary"
                        onClick={() => {setShowAddTrainingPlanModal(true)}}>
                          Create New Plan
                </Button>
              </Nav.Link>
            </Nav.Item>
            <Dropdown as={Nav.Item}>
              <Dropdown.Toggle
                aria-expanded={false}
                aria-haspopup={true}
                as={Nav.Link}
                data-toggle="dropdown"
                id="navbarDropdownMenuLink"
                variant="default"
                className="m-0"
              >
                <span className="no-icon">Dropdown</span>
              </Dropdown.Toggle>
              <Dropdown.Menu aria-labelledby="navbarDropdownMenuLink">
                <Dropdown.Item
                  href="#pablo"
                  onClick={(e) => e.preventDefault()}
                >
                  Action
                </Dropdown.Item>
                <Dropdown.Item
                  href="#pablo"
                  onClick={(e) => e.preventDefault()}
                >
                  Another action
                </Dropdown.Item>
                <Dropdown.Item
                  href="#pablo"
                  onClick={(e) => e.preventDefault()}
                >
                  Something
                </Dropdown.Item>
                <Dropdown.Item
                  href="#pablo"
                  onClick={(e) => e.preventDefault()}
                >
                  Something else here
                </Dropdown.Item>
                <div className="divider"></div>
                <Dropdown.Item
                  href="#pablo"
                  onClick={(e) => e.preventDefault()}
                >
                  Separated link
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
            <Nav.Item>
              <AuthenticationButton />
            </Nav.Item>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    {showAddTrainingPlanModal ? <AddTrainingPlanModal saveTrainingPlan={saveTrainingPlan} showAddTrainingPlanModal={showAddTrainingPlanModal} setShowAddTrainingPlanModal={setShowAddTrainingPlanModal}/> : null}
    </>
  );
}

export default Header;
