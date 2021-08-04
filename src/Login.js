import React, { Component } from "react";
import { Redirect } from "react-router-dom";
class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      islogged: false,
      loginParams: {
        user_id: "",
        user_password: ""
      }
    };
  }
  handleFormChange = event => {
    let loginParamsNew = { ...this.state.loginParams };
    let val = event.target.value;
    loginParamsNew[event.target.name] = val;
    this.setState({
      loginParams: loginParamsNew
    });
  };

  login = event => {
    let user_id = this.state.loginParams.user_id;
    let user_password = this.state.loginParams.user_password;
    if (user_id === "admin" && user_password === "admin@123") {
      localStorage.setItem("token", "token@123!@#");
      this.setState({
        islogged: true
      });
    }
    event.preventDefault();
  };
  render() {
    if (localStorage.getItem("token")) {
      return <Redirect to="/" />;
    }
    return (
      <div className="container-fluid">
        <div class="frame">
          <h1 class="mb-36">Online Doctor Appointment</h1>
          <form class="form-signin" onSubmit={this.login} action="" method="post" name="form">
            <label for="username">Username</label>
            <input class="form-styling" type="text" name="user_id"
              onChange={this.handleFormChange}
              placeholder="Enter Username" />
            <label for="password">Password</label>
            <input class="form-styling" type="password"
              name="user_password"
              onChange={this.handleFormChange}
              placeholder="Enter Password" />
            <div class="btn-animate">
              <button class="btn-signin" type="submit">Login</button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}
export default Login;
