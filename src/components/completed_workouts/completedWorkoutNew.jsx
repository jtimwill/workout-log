import React, { Component } from 'react';
import { saveCompletedWorkout } from '../../services/completedWorkoutService.js';
import { getWorkouts } from '../../services/workoutService.js';
import { validateStateObject, updateErrorObject } from '../../utilities/validationUtility.js';


const BaseJoi = require('joi-browser');
const Extension = require('joi-date-extensions');
const Joi = BaseJoi.extend(Extension);

class CompletedWorkoutNew extends Component {
  constructor(props) {
    super(props);
    this.state = {
      completed_workout: {
        date: "",
        workoutId: "",
      },
      workouts: [],
      errors: {}
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  schema = {
    date: Joi.date().format('MM-DD-YYYY').label('Workout Date'),
    workoutId: Joi.string().required().label("Workout"),
  };

  async componentDidMount() {
    const { data: workouts } = await getWorkouts();
    console.log(workouts);
    this.setState({ workouts });
  }

  handleChange(event) {
    const errors = { ...this.state.errors };
    updateErrorObject(event, errors, this.schema);

    const completed_workout = { ...this.state.completed_workout };
    completed_workout[event.currentTarget.name] = event.currentTarget.value;

    this.setState({ completed_workout, errors });
  }

  async handleSubmit(event) {
    event.preventDefault();

    const errors = validateStateObject(this.state.completed_workout, this.schema);
    if (errors) {
      this.setState({ errors });
      return;
    }
    this.setState({ errors: {} });

    try {
      await saveCompletedWorkout(this.state.completed_workout);
      this.props.history.push('/completed_workouts/index');
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
              <label htmlFor="inlineFormInputDate">Date</label>
              <input
                name="date"
                type="text"
                className="form-control"
                id="inlineFormInputDate"
                value={this.state.completed_workout.date}
                onChange={this.handleChange}
              />
              {this.state.errors.date && <div className="alert alert-danger">{this.state.errors.date}</div>}
            </div>
            <div className="form-group">
              <label htmlFor="inputGroupWorkoutId">Workout</label>
              <select
                name="workoutId"
                className="form-control"
                id="inputGroupWorkoutId"
                onChange={this.handleChange}
                >
                <option value=""/>
                {this.state.workouts.map(workout => (
                  <option key={workout.id} value={workout.id}>
                    {workout.name}
                  </option>
                ))}
              </select>
              {this.state.errors.WorkoutId &&
                <div className="alert alert-danger">
                {this.state.errors.workoutId}
                </div>}
            </div>
            <button type="submit" className="btn btn-primary">Submit</button>
          </div>
        </form>
      </div>
    );
  }
}

export default CompletedWorkoutNew;
