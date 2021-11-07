/*!

=========================================================
* Light Bootstrap Dashboard React - v2.0.0
=========================================================

* Product Page: https://www.creative-tim.com/product/light-bootstrap-dashboard-react
* Copyright 2020 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/light-bootstrap-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React from "react";
import ReactDOM from "react-dom";

import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";
import "./assets/css/animate.min.css";
import "./assets/scss/light-bootstrap-dashboard-react.scss?v=2.0.0";
import "./assets/css/demo.css";
import "@fortawesome/fontawesome-free/css/all.min.css";

import AdminLayout from "layouts/App.js";
import Auth0ProviderWithHistory from './auth/auth0-provider-with-history';
import ProtectedRoute from './auth/ProtectedRoute'

ReactDOM.render(
  <BrowserRouter>
    <Auth0ProviderWithHistory>
      <Switch>
        <ProtectedRoute path="/dashboard" component={(props) => <AdminLayout {...props} />} />
        <ProtectedRoute path="/editPlan" component={(props) => <AdminLayout {...props} />} />
        <ProtectedRoute path="/user" component={(props) => <AdminLayout {...props} />} />
        <Redirect path="/" to="/dashboard"/>
      </Switch>
    </Auth0ProviderWithHistory>
  </BrowserRouter>,
  document.getElementById("root")
);
