import React, { Component } from 'react';
import Joi from 'joi-browser';
import { saveMuscle } from '../../services/muscleService.js';
import { validateStateObject, updateErrorObject } from '../../utilities/validationUtility.js';

class MuscleNew extends Component {
  constructor(props) {
    super(props);
    this.state = {
      muscle: {
        name: "",
      },
      errors: {}
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  schema = {
    name: Joi.string().required().min(3).label('Muscle Name')
  };

  handleChange(event) {
    const errors = { ...this.state.errors };
    updateErrorObject(event, errors, this.schema);

    const muscle = { ...this.state.muscle };
    muscle[event.currentTarget.name] = event.currentTarget.value;
    
    this.setState({ muscle, errors });
  }

  async handleSubmit(event) {
    event.preventDefault();

    const errors = validateStateObject(this.state.muscle, this.schema);
    if (errors) {
      this.setState({ errors });
      return;
    }
    this.setState({ errors: {} });

    try {
      await saveMuscle(this.state.muscle.name);
      this.props.history.push('/muscles/index');
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
            <h4>New Muscle</h4>
            <div className="form-group">
                <label htmlFor="inlineFormInputName">Name</label>
                <input
                  name="name"
                  type="text"
                  className="form-control"
                  id="inlineFormInputName"
                  value={this.state.muscle.name}
                  onChange={this.handleChange}
                />
              {this.state.errors.name && 
                <div className="alert alert-danger">
                  {this.state.errors.name}
                </div>}
            </div>
            <button type="submit" className="btn btn-primary">Submit</button>
          </div>
        </form>
      </div>
    );
  }
}

export default MuscleNew;
