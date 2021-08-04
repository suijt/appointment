import React, { Component } from "react";
import { Redirect, Switch, Route, Link } from "react-router-dom";
import { withRouter } from "react-router";
import Appointment from "./Appointment";
import IndexDashboard from "./IndexDashboard";
import EditAppointment from "./EditAppointment";

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      islogout: false
    };
  }
  signOut = () => {
    localStorage.removeItem("token");
    this.setState({
      islogout: true
    });
  };
  render() {
    if (this.state.islogout) {
      return <Redirect to="/login" />;
    }
    const { match } = this.props;
    return (
      <div class="container-fluid">
        <nav class="navbar navbar-expand-lg navbar-dark bg-primary">
          <div class="container-fluid"> <button class="navbar-toggler navbar-toggler-right border-0 p-0" type="button" data-toggle="collapse" data-target="#navbar20">
            <p class="navbar-brand text-white mb-0"> <i class="fa d-inline fa-lg fa-stop-circle"></i> Online Doctor Appointment </p>
          </button>
            <div class="collapse navbar-collapse" id="navbar20">
              <ul class="navbar-nav mr-auto">
                <li class="nav-item">
                </li>
                <li class="nav-item">
                  <Link to={`${match.path}/appointment`} className="nav-link">Make An Appointment</Link>
                </li>
              </ul>
              <p class="d-none d-md-block lead mb-0 text-white"> <i class="fa d-inline fa-lg fa-stop-circle"></i> <b> Online Doctor Appointment</b> </p>
              <ul class="navbar-nav ml-auto">
                <li class="nav-item mx-1">
                  <a class="nav-link" href="#" onClick={this.signOut}> Logout </a>
                </li>
              </ul>
            </div>
          </div>
        </nav>
        <main role="main">
          <div className="main">
            <Switch>
              <Route path={`${match.path}/appointment`}>
                <Appointment />
              </Route>
              <Route exact path={`${match.path}`}>
                <IndexDashboard />
              </Route>
              <Route path={`${match.path}/appointment/edit}`}>
                <EditAppointment />
              </Route>
            </Switch>
          </div>
        </main>
      </div>
    );
  }
}


export default withRouter(Dashboard);