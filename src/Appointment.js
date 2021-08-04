import React, { Component } from "react";
import { withRouter } from "react-router";

class Appointment extends Component {
  constructor(props) {
    super(props);
    this.state = { first_name: '', last_name: '', age: '', appointment_date: '', height: '', speciality: '', city: '', state: '', description: '' };
    this.inputChange = this.inputChange.bind(this);
    this.formSubmit = this.formSubmit.bind(this);
  }
  inputChange(e) {
    const state = this.state
    state[e.target.name] = e.target.value
    this.setState(state);
  }
  formSubmit(e) {
    e.preventDefault();

    fetch('http://localhost/UK/doctorApi/appointment/create/', {
      method: 'POST',
      body: JSON.stringify({
        first_name: this.state.first_name,
        last_name: this.state.last_name,
        age: this.state.age,
        appointment_date: this.state.appointment_date,
        height: this.state.height,
        speciality: this.state.speciality,
        city: this.state.city,
        state: this.state.state,
        description: this.state.description
      })
    }).then(res => {
      if (res.status === 200) {
        this.props.history.push('/');
      }
    });
  }
  render() {
    const { match } = this.props;
    return (
      <div class="frame3">
        <h1 class="mb-20">Make An Appointment</h1>
        <div class="row">
          <div class="col-md-12">
            <form onSubmit={this.formSubmit}>
              <div class="form-group">
                <div class="row">
                  <div class="col-md-6">
                    <label>First Name</label>
                    <input type="text" name="first_name" class="form-control" value={this.state.first_name} onChange={this.inputChange} placeholder="First Name" required />
                  </div>
                  <div class="col-md-6">
                    <label>Last Name</label>
                    <input type="text" name="last_name" class="form-control" value={this.state.last_name} onChange={this.inputChange} placeholder="Last Name" required />
                  </div>
                </div>
              </div>
              <div class="form-group">
                <div class="row">
                  <div class="col-md-6">
                    <label>Age</label>
                    <input type="number" min='1' max='100' name="age" class="form-control" value={this.state.age} onChange={this.inputChange} placeholder="Age" required />
                  </div>
                  <div class="col-md-6">
                    <label>Height</label>
                    <input type="text" name="height" class="form-control" value={this.state.height} onChange={this.inputChange} placeholder="Height" required />
                  </div>
                  
                </div>
              </div>
              <div class="form-group">
                <div class="row">
                <div class="col-md-6">
                    <label>Appointment Date</label>
                    <input type="date" name="appointment_date" class="form-control" value={this.state.appointment_date} onChange={this.inputChange} placeholder="Appointment Date" required />
                  </div>
                  <div class="col-md-6">
                    <label>Speciality</label>
                    <select name="speciality" class="form-control" value={this.state.speciality} onChange={this.inputChange} placeholder="Speciality" required>
                      <option value="neurologist">Neurologist</option>
                      <option value="dermatology">Dermatology</option>
                      <option value="ophthalmology">Ophthalmology</option>
                      <option value="Pathology">Pathology</option>
                      <option value="psychiatry">Psychiatry</option>
                      <option value="pediatrics">Pediatrics</option>
                    </select>
                  </div>
                </div>
              </div>
              <div class="form-group">
                <div class="row">
                  <div class="col-md-6">
                    <label>City</label>
                    <input type="text" name="city" class="form-control" value={this.state.city} onChange={this.inputChange} placeholder="City" required />

                  </div>
                  <div class="col-md-6">
                    <label>State</label>
                    <input type="text" name="state" class="form-control" value={this.state.state} onChange={this.inputChange} placeholder="State" />
                  </div>
                </div>
              </div>
              <div class="form-group">
                <label>Description</label>
                <textarea name="description" class="form-control" value={this.state.description} onChange={this.inputChange} placeholder="Description" />
              </div>
              <input type="submit" class="btn btn-primary" value="Submit" />
            </form>
          </div>
        </div>
      </div>
    );
  }
}
export default withRouter(Appointment);
