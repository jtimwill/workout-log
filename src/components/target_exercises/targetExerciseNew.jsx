import React, { Component } from 'react';
import Joi from 'joi-browser';
import { saveTargetExercise } from '../../services/targetExerciseService.js';
import { getExercises } from '../../services/exerciseService.js';
import { validateStateObject, updateErrorObject } from '../../utilities/validationUtility.js';


class TargetExerciseNew extends Component {
  constructor(props) {
    super(props);
    this.state = {
      target_exercise: {
        workoutId: "",
        exerciseId: "",
        exercise_type: "",
        sets: 0,
        reps: 0,
        load: 0,
        unilateral: false,
      },
      exercises: [],
      errors: {}
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  exercise_types = [
    {name: 'bodyweight', id: 1},
    {name: 'free weight', id: 2},
    {name: 'cable', id: 3},
    {name: 'machine', id: 4}
  ];

  schema = {
    workoutId: Joi.string().required().label("Workout"),
    exerciseId: Joi.string().required().label("Exercise"),
    exercise_type: Joi.string().label("Exercise Type"),
    sets: Joi.number().required().min(1).label("Sets"),
    reps: Joi.number().required().min(1).label("Reps"),
    load: Joi.number().min(0).label("Added Load"),
    unilateral: Joi.boolean().label("Unilateral"),
    mum: Joi.boolean().label("Made up missed reps")
  };

  async componentDidMount() {
    const target_exercise = { ...this.state.target_exercise };
    target_exercise.workoutId = this.props.match.params.wid;
    this.setState({ target_exercise });
    const { data: exercises } = await getExercises();
    this.setState({ exercises });
  }

  handleChange(event) {
    const errors = { ...this.state.errors };
    const target = event.currentTarget;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    updateErrorObject(event, errors, this.schema);

    const target_exercise = { ...this.state.target_exercise };
    target_exercise[target.name] = value;

    this.setState({ target_exercise, errors });
  }

  async handleSubmit(event) {
    event.preventDefault();

    const errors = validateStateObject(this.state.target_exercise, this.schema);
    if (errors) {
      this.setState({ errors });
      return;
    }
    this.setState({ errors: {} });

    try {
      await saveTargetExercise(this.state.target_exercise);
      this.props.history.push("/workouts/index");
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
            <h4>New Target Exercise</h4>
            <div className="form-group">
              <label htmlFor="inputGroupExerciseId">Exercise</label>
              <select
                name="exerciseId"
                className="form-control"
                id="inputGroupExerciseId"
                onChange={this.handleChange}
                >
                <option value="">
                </option>
                {this.state.exercises.map(exercise => (
                  <option key={exercise.id} value={exercise.id}>
                    {exercise.name}
                  </option>
                ))}
              </select>
              {this.state.errors.exerciseId && <div className="alert alert-danger">{this.state.errors.exerciseId}</div>}
            </div>
            <div className="form-group">
              <label htmlFor="inputGroupExerciseType">Exercise Types</label>
              <select
                name="exercise_type"
                className="form-control"
                id="inputGroupExerciseType"
                onChange={this.handleChange}
                >
                <option value=""/>
                {this.exercise_types.map(type => (
                  <option key={type.id} value={type.name}>
                    {type.name}
                  </option>
                ))}
              </select>
              {this.state.errors.exercise_type && <div className="alert alert-danger">{this.state.errors.exercise_type}</div>}
            </div>
            <div className="form-group">
              <label htmlFor="exampleInputSets">Sets</label>
              <input
                name="sets"
                type="number"
                className="form-control"
                id="exampleInputSets"
                value={this.state.target_exercise.sets}
                onChange={this.handleChange}
              />
              {this.state.errors.sets && <div className="alert alert-danger">{this.state.errors.sets}</div>}
            </div>
            <div className="form-group">
              <label htmlFor="exampleInputReps">Reps</label>
              <input
                name="reps"
                type="number"
                className="form-control"
                id="exampleInputReps"
                value={this.state.target_exercise.reps}
                onChange={this.handleChange}
              />
              {this.state.errors.reps && <div className="alert alert-danger">{this.state.errors.reps}</div>}
            </div>
            <div className="form-group">
              <label htmlFor="exampleInputLoad">Load</label>
              <input
                name="load"
                type="number"
                className="form-control"
                id="exampleInputLoad"
                value={this.state.target_exercise.load}
                onChange={this.handleChange}
              />
              {this.state.errors.load && <div className="alert alert-danger">{this.state.errors.load}</div>}
            </div>
            <div className="form-group form-check">
              <input
                name="unilateral"
                type="checkbox"
                className="form-check-input"
                htmlFor="exampleCheck1"
                value={this.state.target_exercise.unilateral}
                onChange={this.handleChange}
              />
              <label className="form-check-label" htmlFor="exampleCheck1">Unilateral?</label>
              {this.state.errors.unilateral && <div className="alert alert-danger">{this.state.errors.unilateral}</div>}
            </div>
            <button type="submit" className="btn btn-primary">Submit</button>
          </div>
        </form>
      </div>
    );
  }
}

export default TargetExerciseNew;
