import React, { Component} from 'react';
import { Link } from 'react-router-dom';
import { getUsers, deleteUser } from '../../services/userService.js';
import Spinner from '../reusable/spinner';

class UserIndex extends Component {
  state = {
    users: [],
    api_response: false
  };

  async componentDidMount() {
    const { data: users } = await getUsers();
    this.setState({ users, api_response: true });
  }

  async handleDelete(selected_user) {
    const old_users = this.state.users;
    const new_users = old_users.filter(user => {
      return user.id !== selected_user.id;
    });
    this.setState({ users: new_users });

    try {
      await deleteUser(selected_user.id);
    } catch (exception) {
      if (exception.response && exception.response.status === 404) {
        alert("This user has already been deleted.");
      }
      this.setState({ users: old_users });
    }
  }

  render() {
    return (
      <Spinner ready={this.state.api_response}>
        <h1>Users</h1>
        <Link to="/users/new" className="btn btn-primary">
          New User
        </Link>
        <table className="table table-sm table-bordered">
          <thead>
            <tr>
              <th scope="col">Name</th>
              <th scope="col">Email</th>
              <th scope="col">Admin?</th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody>
            {this.state.users.map(user => (
              <tr key={user.id}>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.admin.toString()}</td>
                <td>
                  <button
                    onClick={() => this.handleDelete(user)}
                    className="btn btn-danger btn-sm">
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Spinner>
    );
  }
}

export default UserIndex;
