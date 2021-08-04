import React, { Component, Fragment } from "react";
import { Link } from 'react-router-dom';

class IndexDashboard extends Component {
  constructor(props) {
		super(props);
		this.state = {appointments: []};
		this.deleteAppointment = this.deleteAppointment.bind(this);
    this.getBydate = this.getBydate.bind(this)
	}
	
	componentDidMount() {
		fetch('https://mi-linux.wlv.ac.uk/~2042481/doctor-appointment/appointment/')
			.then(response => {
				return response.json();
			}).then(result => {
				this.setState({
					appointments:result
				});
			});
	}

	deleteAppointment(id) {
		if(window.confirm("Are you sure want to delete?")) {
			fetch('https://mi-linux.wlv.ac.uk/~2042481/doctor-appointment/appointment/delete/' + id, {
				method : 'GET'
			}).then(response => { 
					if(response.status === 200) {
						alert("Appointment deleted successfully");
						fetch('https://mi-linux.wlv.ac.uk/~2042481/doctor-appointment/appointment/')
						.then(response => {
							return response.json();
						}).then(result => {
							this.setState({
								appointments:result
							});
						});
					} 
			 });
		}
	}

  getBydate(date){
    fetch('https://mi-linux.wlv.ac.uk/~2042481/doctor-appointment/appointment/'+date.target.value,{
      method : 'GET'
    })
    .then(response => {
      return response.json();
    }).then(result => {
      this.setState({
        appointments:result
      });
    });
  }
  render() {
    return (
      <Fragment>
        <div class="frame2">
          <h1>Appointments</h1>
          <div class="row pd-60">
            <div class="col-md-4">            
            <input class="form-control" type="date" id="filterDate" onChange={this.getBydate} />
            </div>
            <div class="col-md-8">
              <table class="table" style={{color: '#fff'}}>
                <thead>
                  <tr>                  
                    <th>Patient Name</th>
                    <th>Age</th>
                    <th>Height</th>
                    <th>Speciality</th>
                    <th>City</th>
                    <th>State</th>
                    <th>Status</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                {this.state.appointments.map((item) => (
                  <tr>
                    <td>
                      {item.first_name+' '+item.last_name}
                    </td>
                    <td>
                      {item.age}
                    </td>
                    <td>
                      {item.height}
                    </td>
                    <td>
                      {item.speciality}
                    </td>
                    <td>
                      {item.city}
                    </td>
                    <td>
                      {item.state}
                    </td>
                    <td>
                      {item.status == 1 ? 'Active' : 'Complete'}
                    </td>
                    <td>
                    <Link to={`/appointment/edit/${item.id}`} className="edit-btn" style={{color: '#fff'}}>Edit</Link>||
                  <a href="#" onClick={e => this.deleteAppointment(item.id)} className="delete-btn" style={{color: '#fff'}}>Delete</a>
                    </td>
                  </tr>
                ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </Fragment>
    );
  }
}
export default IndexDashboard;
