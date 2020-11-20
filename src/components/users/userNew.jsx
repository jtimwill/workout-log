import React, { Component } from 'react';
import Joi from 'joi-browser';
import { saveUser } from '../../services/userService.js';
import { loginWithJwt } from '../../services/authService';
import { validateStateObject, updateErrorObject } from '../../utilities/validationUtility.js';

class UserNew extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {
        username: "",
        email: "",
        password: ""
      },
      errors: {}
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  schema = {
    username: Joi.string().required().min(3).label('User Name'),
    email: Joi.string().required().email().label("Email"),
    password: Joi.string().required().min(5).label("Password")
  };

  handleChange(event) {
    const errors = { ...this.state.errors };
    updateErrorObject(event, errors, this.schema);

    const user = { ...this.state.user };
    user[event.currentTarget.name] = event.currentTarget.value;

    this.setState({ user, errors });
  }

  async handleSubmit(event) {
    event.preventDefault();

    const errors = validateStateObject(this.state.user, this.schema);
    if (errors) {
      this.setState({ errors });
      return;
    }
    this.setState({ errors: {} });

    try {
      const response = await saveUser(this.state.user);
      loginWithJwt(response.headers["x-auth-token"]);
      window.location = "/users/me/show";
    } catch (exception) {
      if (exception.response && exception.response.status === 400) {
        alert(exception.response.data);
      }
    }
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit} className="card bg-light">
          <div className="card-body">
            <h4>New User</h4>
            <div className="form-group">
              <label htmlFor="inlineFormInputName">User Name</label>
              <input
                name="username"
                type="text"
                className="form-control"
                id="inlineFormInputName"
                value={this.state.user.username}
                onChange={this.handleChange}
              />
              {this.state.errors.username && <div className="alert alert-danger">{this.state.errors.username}</div>}
            </div>
            <div className="form-group">
              <label htmlFor="inlineFormInputPassword">Email</label>
              <input
                name="email"
                type="text"
                className="form-control"
                id="inlineFormInputPassword"
                value={this.state.user.email}
                onChange={this.handleChange}
              />
              {this.state.errors.email && <div className="alert alert-danger">{this.state.errors.email}</div>}
            </div>
            <div className="form-group">
              <label htmlFor="inlineFormInputEmail">Password</label>
              <input
                name="password"
                type="password"
                className="form-control"
                id="inlineFormInputEmail"
                value={this.state.user.password}
                onChange={this.handleChange}
              />
              {this.state.errors.password && <div className="alert alert-danger">{this.state.errors.password}</div>}
            </div>
            <button type="submit" className="btn btn-primary">Submit</button>
          </div>
        </form>
      </div>
    );
  }
}

export default UserNew;
