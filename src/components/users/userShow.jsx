import React, { Component} from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../../services/userService.js';
import { getCompletedWorkouts } from '../../services/completedWorkoutService.js';
import Spinner from '../reusable/spinner';

class UserShow extends Component {
  state = {
    user: {},
    completed_workouts: [],
    api_response: false
  };

  async componentDidMount() {
    const { data: user } = await getUser();
    const { data: completed_workouts } = await getCompletedWorkouts();
    this.setState({ user, completed_workouts, api_response: true });
  }

  render() {
    return (
      <Spinner ready={this.state.api_response}>
        <div className="card">
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
              <span className="font-weight-bold">Completed Workouts: </span>
              {this.state.completed_workouts.length}
            </li>
          </ul>
          <div className="card-body">
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
