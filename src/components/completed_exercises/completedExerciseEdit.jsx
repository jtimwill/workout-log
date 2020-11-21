import React, { Component } from 'react';
import Joi from 'joi-browser';
import { getCompletedExercise, updateCompletedExercise } from '../../services/completedExerciseService.js';
import { getExercises } from '../../services/exerciseService.js';
import { validateStateObject, updateErrorObject } from '../../utilities/validationUtility.js';


class CompletedExerciseEdit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      completed_exercise: {
        id: "",
        completedWorkoutId: "",
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
    id: Joi.string(),
    completedWorkoutId: Joi.string().required().label("Workout"),
    exerciseId: Joi.string().required().label("Exercise"),
    exercise_type: Joi.string().label("Exercise Type"),
    sets: Joi.number().required().min(1).label("Sets"),
    reps: Joi.number().required().min(1).label("Reps"),
    load: Joi.number().min(0).label("Added Load"),
    unilateral: Joi.boolean().label("Unilateral"),
    mum: Joi.boolean().label("Made up missed reps")
  };

  async componentDidMount() {
    const wid = this.props.match.params.wid;
    const id = this.props.match.params.id;
    const { data } = await getCompletedExercise(wid, id);
    const completed_exercise = {
      id: String(data.id),
      completedWorkoutId: String(data.completedWorkoutId),
      exerciseId: data.exerciseId,
      exercise_type: data.exercise_type,
      sets: data.sets,
      reps: data.reps,
      load: data.load,
      unilateral: data.unilateral,
    };
    const { data: exercises } = await getExercises();
    console.log(exercises[0]);

    this.setState({ completed_exercise, exercises });
  }

  handleChange(event) {
    const errors = { ...this.state.errors };
    const target = event.currentTarget;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    updateErrorObject(event, errors, this.schema);

    const completed_exercise = { ...this.state.completed_exercise };
    completed_exercise[target.name] = value;

    this.setState({ completed_exercise, errors });
  }

  async handleSubmit(event) {
    event.preventDefault();

    const errors = validateStateObject(this.state.completed_exercise, this.schema);
    if (errors) {
      this.setState({ errors });
      return;
    }
    this.setState({ errors: {} });

    try {
      await updateCompletedExercise(this.state.completed_exercise);
      this.props.history.push("/completed_workouts/index");
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
            <h4>Edit Completed Exercise</h4>
            <div className="form-group">
              <label htmlFor="inputGroupExerciseId">Exercise</label>
              <select
                value={this.state.completed_exercise.exerciseId}
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
                value={this.state.completed_exercise.exercise_type}
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
                value={this.state.completed_exercise.sets}
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
                value={this.state.completed_exercise.reps}
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
                value={this.state.completed_exercise.load}
                onChange={this.handleChange}
              />
              {this.state.errors.load && <div className="alert alert-danger">{this.state.errors.load}</div>}
            </div>
            <div className="form-group form-check">
              <input
                name="unilateral"
                type="checkbox"
                checked={this.state.completed_exercise.unilateral}
                className="form-check-input"
                htmlFor="exampleCheck1"
                value={this.state.completed_exercise.unilateral}
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

export default CompletedExerciseEdit;
