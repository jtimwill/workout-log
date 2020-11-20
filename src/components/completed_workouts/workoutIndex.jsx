import React, { Component} from 'react';
import { Link } from 'react-router-dom';
import { getWorkouts, deleteWorkout } from '../../services/workoutService.js';
import { deleteCompletedExercise } from '../../services/completedExerciseService.js';
import { getMuscles } from '../../services/muscleService.js';
import { compareDates } from '../../utilities/sortUtility.js';
import { reformatDate } from '../../utilities/dateUtility.js';
import './workout.css';
import Pagination from '../reusable/pagination';
import Spinner from '../reusable/spinner';
import MuscleMap from '../reusable/muscleMap';
import WorkoutHead from './workoutHead'
import WorkoutBody from './workoutBody';

class WorkoutIndex extends Component {
  state = {
    workouts: [],
    current_page: 1,
    sort_direction: "desc",
    current_workout: {},
    muscles: [],
    api_response: false
  };

  async componentDidMount() {
    const { data: muscles } = await getMuscles();
    const { data: workouts } = await getWorkouts();
    workouts.sort(compareDates);
    this.setState({ workouts, muscles, api_response: true });
  }

  confirmDelete(name) {
    return window.confirm(`Are you sure you want to delete this ${name}?`);
  }

  handleWorkoutDelete = async selected_workout => {
    if (!this.confirmDelete("workout")) { return; }
    const old_workouts = this.state.workouts;
    const new_workouts = old_workouts.filter(w => w._id !== selected_workout._id);

    this.setState({ workouts: new_workouts });

    try {
      await deleteWorkout(selected_workout._id);
    } catch (exception) {
      if (exception.response && exception.response.status === 404) {
        alert("This workout has already been deleted.");
      }
      this.setState({ workouts: old_workouts });
    }
  };

  handleExerciseDelete = async (workout_index, selected_exercise) => {
    if (!this.confirmDelete("exercise")) { return; }
    const old_exercises = this.state.workouts[workout_index].exercises;
    const new_exercises = old_exercises.filter(e => e._id !== selected_exercise._id);
    const workouts = [ ...this.state.workouts ];

    workouts[workout_index].exercises = new_exercises;
    this.setState({ workouts });

    try {
      await deleteCompletedExercise(selected_exercise._id);
    } catch (exception) {
      if (exception.response && exception.response.status === 404) {
        alert("This exercise has already been deleted.");
      }
      workouts[workout_index].exercises = old_exercises
      this.setState({ workouts });
    }
  }

  handlePageChange = (page_number, page_size) => {
    const length = this.state.workouts.length;
    const number_of_pages = Math.ceil(length / page_size);
    if (page_number <= 0 ||  page_number > number_of_pages) {
      return;
    }
    this.setState({ current_page: page_number });
  };

  toggleSort = () => {
    const old_direction = this.state.sort_direction;
    const workouts = [ ...this.state.workouts ];
    workouts.reverse();
    let sort_direction;
    sort_direction = old_direction === "desc" ? "asc" : "desc";

    this.setState({ workouts, sort_direction });
  }

  generatePage(page, page_size) {
    let workouts = [ ...this.state.workouts ];
    const start_index = (page-1)*page_size;
    const end_index = start_index + page_size;
    const workout_slice = workouts.slice(start_index,end_index);
    return workout_slice;
  }

  handleWorkoutSelect = workout => {
    if (workout === this.state.current_workout) {
      workout = {};
    }
    this.setState({ current_workout: workout });
  }

  getSelectedMuscles() {
    let muscle_ids = [];
    if (this.state.current_workout.exercises === undefined) { return []; }
    const completed_exercises = this.state.current_workout.exercises;
    const muscles = this.state.muscles;
    let muscle_names = {};
    let selected_muscles = [];

    for (let completed_exercise of completed_exercises) {
      muscle_ids.push(completed_exercise.exercise_id.muscle_id);
    }
    for (let muscle of muscles){
      muscle_names[muscle._id] = muscle.name;
    }
    for (let muscle_id of muscle_ids) {
      let name = muscle_names[muscle_id];
      selected_muscles.push(name);
    }
    return selected_muscles;
  }

  render() {
    const page_size = 5;
    const { sort_direction,
            current_page,
            current_workout,
            workouts
          } = this.state;

    return (
      <Spinner ready={this.state.api_response}>
        <h4>
          {current_workout.date ?
            `Workout Date: ${reformatDate(current_workout.date)}` :
            `Select a Workout`}
        </h4>
        <MuscleMap
          current_muscles={this.getSelectedMuscles()}
          onMuscleSelect={() => {}}
        />

        <Link to="/workouts/new" className="btn btn-primary mr-1">
          New Workout
        </Link>
        <button onClick={this.toggleSort} className="btn btn-info btn-sm">
          {"Sort by date "}
          <i className={"fa fa-sort-" + sort_direction}></i>
        </button>

        {this.generatePage(current_page, page_size).map((workout, index) => (
          <div
            key={workout._id}
            className={"my-1 card " + (workout === current_workout ? "border-primary" : "")}
          >
            <WorkoutHead
              workout={workout}
              onWorkoutSelect={this.handleWorkoutSelect}
              onWorkoutDelete={this.handleWorkoutDelete}
            />

            <WorkoutBody
              workout={workout}
              current_workout={current_workout}
              onExerciseDelete={this.handleExerciseDelete}
              index={index}
            />
          </div>
        ))}

        <Pagination
          page_size={page_size}
          item_count={workouts.length}
          current_page={current_page}
          onPageChange={this.handlePageChange}
        />
      </Spinner>
    );
  }
}

export default WorkoutIndex;
