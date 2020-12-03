import React, { Component} from 'react';
import { Link } from 'react-router-dom';
import { login } from '../services/authService';
import Lottie from 'react-lottie';
import * as animationData from './squat.json';
import { getMuscles } from '../services/muscleService.js';
import Spinner from './reusable/spinner';




class HomePage extends Component {
  state = {
    api_response: false
  };

  defaultOptions = {
    loop: true,
    autoplay: true, 
    animationData: animationData.default,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice'
    }
  };

  async componentDidMount() {
    await getMuscles();
    this.setState({ api_response: true });
  }


  async exampleUserLogin() {
    await login("adam@example.com", "123456");
    window.location = "/users/me/show";
  }

  render() {
    return(
      <Spinner ready={this.state.api_response}>
        <div className="jumbotron custom-center">
          <h1 className="display-4">Welcome to WorkoutLog!</h1>
          <Lottie options={this.defaultOptions} height={350} width={350}/>
          <p className="lead">
            This project provides users with a simple interface for creating,
            reviewing, updating and deleting workouts.
          </p>
          <hr className="my-4"/>
          <Link
            to="/users/new"
            className="btn btn-danger btn-lg custom-right-margin custom-add-margin-top">
            Register New Account
          </Link>
          <button
            onClick={this.exampleUserLogin}
            className="btn btn-info btn-lg custom-add-margin-top">
            View Example Account
          </button>
        </div>
        <div className="custom-flex-grow-column"/>
      </Spinner>
    );
  }
}

export default HomePage;
