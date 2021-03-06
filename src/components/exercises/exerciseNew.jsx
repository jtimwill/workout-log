import React, { Component } from 'react';
import Joi from 'joi-browser';
import { saveExercise } from '../../services/exerciseService.js';
import { getMuscles } from '../../services/muscleService.js';
import { validateStateObject, updateErrorObject } from '../../utilities/validationUtility.js';

class ExerciseNew extends Component {
  constructor(props) {
    super(props);
    this.state = {
      exercise: {
        name: "",
        muscleId: ""
      },
      muscles: [],
      errors: {}
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  schema = {
    name: Joi.string().required().min(3).label('Exercise Name'),
    muscleId: Joi.string().required().label("Muscle")
  };

  async componentDidMount() {
    const { data: muscles } = await getMuscles();
    this.setState({ muscles });
  }

  handleChange(event) {
    const errors = { ...this.state.errors };
    updateErrorObject(event, errors, this.schema);

    const exercise = { ...this.state.exercise };
    exercise[event.currentTarget.name] = event.currentTarget.value;

    this.setState({ exercise, errors });
  }

  async handleSubmit(event) {
    event.preventDefault();

    const errors = validateStateObject(this.state.exercise, this.schema);
    if (errors) {
      this.setState({ errors });
      return;
    }
    this.setState({ errors: {} });

    try {
      await saveExercise(this.state.exercise);
      this.props.history.push('/exercises/index');
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
            <h4>New Exercise</h4>
            <div className="form-group">
              <label htmlFor="inlineFormInputName">Name</label>
              <input
                name="name"
                type="text"
                className="form-control"
                id="inlineFormInputName"
                value={this.state.exercise.name}
                onChange={this.handleChange}
              />
              {this.state.errors.name && <div className="alert alert-danger">{this.state.errors.name}</div>}
            </div>
            <div className="form-group">
              <label htmlFor="inputGroupSelect01">Muscle</label>
              <select
                name="muscleId"
                className="form-control"
                id="inputGroupSelect01"
                onChange={this.handleChange}
                >
                <option value=""/>
                {this.state.muscles.map(muscle => (
                  <option key={muscle.id} value={muscle.id}>
                    {muscle.name}
                  </option>
                ))}
              </select>
              {this.state.errors.muscleId && <div className="alert alert-danger">{this.state.errors.muscleId}</div>}
            </div>
            <button type="submit" className="btn btn-primary">Submit</button>
          </div>
        </form>
      </div>
    );
  }
}

export default ExerciseNew;
