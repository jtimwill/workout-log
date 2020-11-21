import React, { Component } from 'react';
import { saveWorkout } from '../../services/workoutService.js';
import { validateStateObject, updateErrorObject } from '../../utilities/validationUtility.js';

const BaseJoi = require('joi-browser');
const Extension = require('joi-date-extensions');
const Joi = BaseJoi.extend(Extension);

class WorkoutNew extends Component {
  constructor(props) {
    super(props);
    this.state = {
      workout: {
        name: "",
      },
      errors: {}
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  schema = {
    name: Joi.string().required().min(3).label('Workout Name'),
  };

  handleChange(event) {
    const errors = { ...this.state.errors };
    updateErrorObject(event, errors, this.schema);

    const workout = { ...this.state.workout };
    workout[event.currentTarget.name] = event.currentTarget.value;

    this.setState({ workout, errors });
  }

  async handleSubmit(event) {
    event.preventDefault();
    const errors = validateStateObject(this.state.workout, this.schema);
    if (errors) {
      this.setState({ errors });
      return;
    }
    this.setState({ errors: {} });

    try {
      await saveWorkout(this.state.workout);
      this.props.history.push('/workouts/index');
    } catch (exception) {
      if (exception.response && exception.response.status === 400) {
        alert(exception.response.data.errmsg);
      }
    }
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit} className="card bg-light">
          <div className="card-body">
            <h4>New Workout</h4>
            <div className="form-group">
              <label htmlFor="inlineFormInputDate">Name</label>
              <input
                name="name"
                type="text"
                className="form-control"
                id="inlineFormInputDate"
                value={this.state.workout.name}
                onChange={this.handleChange}
              />
              {this.state.errors.name && <div className="alert alert-danger">{this.state.errors.name}</div>}
            </div>
            <button type="submit" className="btn btn-primary">Submit</button>
          </div>
        </form>
      </div>
    );
  }
}

export default WorkoutNew;
