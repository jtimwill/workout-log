import React, { Component} from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../../services/userService.js';
import { getCompletedWorkouts } from '../../services/completedWorkoutService.js';
import Spinner from '../reusable/spinner';
import { Line } from 'react-chartjs-2';
import { reformatDate } from '../../utilities/dateUtility.js';
import { compareDates } from '../../utilities/sortUtility.js';

class UserShow extends Component {
  state = {
    user: {},
    completed_workouts: [],
    api_response: false,
  };

  chart_data = {
    labels: [],
    datasets: [
      {
        label: 'Completed Exercises',
        fill: false,
        lineTension: 0.2,
        backgroundColor: 'rgb(0,123,255,0.2)',
        borderColor: 'rgb(0,123,255,1)',
        borderCapStyle: 'butt',
        borderDash: [],
        borderDashOffset: 0.0,
        borderJoinStyle: 'miter',
        pointBorderColor: 'rgb(0,123,255,1)',
        pointBackgroundColor: '#fff',
        pointBorderWidth: 3,
        pointHoverRadius: 6,
        pointHoverBackgroundColor: 'rgb(0,123,255,1)',
        pointHoverBorderColor: 'rgba(220,220,220,1)',
        pointHoverBorderWidth: 2,
        pointRadius: 3,
        pointHitRadius: 10,
        data: []
      },
    ]
  };

  async componentDidMount() {
    const { data: user } = await getUser();
    const { data: completed_workouts } = await getCompletedWorkouts();

    completed_workouts.sort(compareDates);
    const comp_workout_slice = completed_workouts.slice(-10).reverse();
    comp_workout_slice.forEach((cw) => {
      this.chart_data.labels.push(reformatDate(cw.date));
      this.chart_data.datasets[0].data.push(cw.completed_exercises.length);
    });
    
    this.setState({ user, completed_workouts, api_response: true });
  }

  render() {
    return (
      <Spinner ready={this.state.api_response}>
        <div className="card custom-max-width">
          <div className="card-header bg-light">
            <h4 className="card-title">Profile</h4>
          </div>
          <ul className="list-group list-group-flush">
            <li className="list-group-item">
              <span className="card-text font-weight-bold">Name: </span>
              {this.state.user.username}
            </li>
            <li className="list-group-item">
              <span className="card-text font-weight-bold">Email: </span>
              {this.state.user.email}
            </li>
            <li className="list-group-item">
              <span className="font-weight-bold">Total Completed Workouts: </span>
              {this.state.completed_workouts.length}
            </li>
          </ul>
          <div className="card-body mb-10">
            <Line data={this.chart_data}/>
            <ul className="list-group list-group-flush">
              <li className="list-group-item d-flex justify-content-around">
                <span className="card-text">
                  <span className="font-weight-bold">Days Tracked: </span>10
                </span>
              </li>
            </ul>
            <Link
              to="/users/me/edit" className="btn btn-info">
              Edit User
            </Link>
          </div>
        </div>
      </Spinner>
    );
  }
}

export default UserShow;
