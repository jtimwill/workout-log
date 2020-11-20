import React, { Component} from 'react';
import { Link } from 'react-router-dom';
import { getMuscles, deleteMuscle } from '../../services/muscleService.js';
// import { getCurrentUser } from '../../services/authService';
import MuscleMap from '../reusable/muscleMap';
import Spinner from '../reusable/spinner';
import { compareNames } from '../../utilities/sortUtility.js';

class MuscleIndex extends Component {
  state = {
    muscles: [],
    current_muscle: {},
    api_response: false
  };

  async componentDidMount() {
    const { data: muscles } = await getMuscles();
    muscles.sort(compareNames);
    this.setState({ muscles, api_response: true });
  }

  async handleDelete(selected_muscle) {
    // if (!getCurrentUser().admin) {
    //   alert("Access Denied, Admin Only");
    //   return;
    // }

    const old_muscles = this.state.muscles;
    const new_muscles = old_muscles.filter(muscle => {
      return muscle.id !== selected_muscle.id;
    });
    this.setState({ muscles: new_muscles });

    try {
      await deleteMuscle(selected_muscle.id);
    } catch (exception) {
      if (exception.response && exception.response.status === 404) {
        alert("This muscle has already been deleted.");
      }
      this.setState({ muscles: old_muscles });
    }
  }

  handleRowSelect(muscle) {
    const muscles = [ ...this.state.muscles ];
    const prev_muscle = this.state.current_muscle;
    const current_muscle = muscle;

    if (Object.keys(prev_muscle).length) {
      prev_muscle.active = "";
    }
    current_muscle.active = "table-active";
    this.setState({ muscles, current_muscle });
  }

  handleMuscleSelect = (muscle_name) => {
    const muscles = this.state.muscles;
    const muscle = muscles.find(muscle => muscle.name === muscle_name);
    this.handleRowSelect(muscle);
  };

  render() {
    return (
      <Spinner ready={this.state.api_response}>
        <div className="container">
          <div className="row">
            <div className="col-sm">
              <h1>Muscles</h1>
              <MuscleMap
                current_muscles={[this.state.current_muscle.name]}
                onMuscleSelect={this.handleMuscleSelect}
              />
            </div>
            <div className="col-sm">
              <Link to="/muscles/new" className="btn btn-primary">New Muscle</Link>
              <table className="table table-sm table-bordered">
                <thead>
                  <tr>
                    <th scope="col">Muscle</th>
                    <th scope="col"></th>
                    <th scope="col"></th>
                  </tr>
                </thead>
                <tbody>
                  {this.state.muscles.map(muscle => (
                    <tr key={muscle.id} className={muscle.active}>
                      <td onClick={() => this.handleRowSelect(muscle)}>
                        {muscle.name}
                      </td>
                      <td>
                        <Link
                          to={muscle.id + "/edit"}
                          className="btn btn-info btn-sm">
                          Edit
                        </Link>
                      </td>
                      <td>
                        <button
                          onClick={() => this.handleDelete(muscle)}
                          className="btn btn-danger btn-sm">
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </Spinner>
    );
  }
}

export default MuscleIndex;
