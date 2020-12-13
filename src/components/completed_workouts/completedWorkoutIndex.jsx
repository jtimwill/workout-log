import React, { Component} from 'react';
import { Link } from 'react-router-dom';
import { getCompletedWorkouts, deleteCompletedWorkout } from '../../services/completedWorkoutService.js';
import { deleteCompletedExercise } from '../../services/completedExerciseService.js';
import { getMuscles } from '../../services/muscleService.js';
import { getWorkouts } from '../../services/workoutService.js';
import { getExercises } from '../../services/exerciseService.js';
import { compareDates, compareNames } from '../../utilities/sortUtility.js';
import { reformatDate } from '../../utilities/dateUtility.js';
import { findNameById } from '../../utilities/findUtility.js';
import './completedWorkout.css';
import Pagination from '../reusable/pagination';
import Spinner from '../reusable/spinner';
import MuscleMap from '../reusable/muscleMap';
import CompletedWorkoutHead from './completedWorkoutHead'
import CompletedWorkoutBody from './completedWorkoutBody';

class CompletedWorkoutIndex extends Component {
  state = {
    completed_workouts: [],
    current_page: 1,
    sort_direction: "desc",
    current_completed_workout: {},
    muscles: [],
    workouts: [],
    exercises: [],
    api_response: false
  };

  async componentDidMount() {
    const { data: muscles } = await getMuscles();
    const { data: workouts } = await getWorkouts();
    const { data: exercises } = await getExercises();
    const { data: completed_workouts } = await getCompletedWorkouts();
    completed_workouts.sort(compareDates);
    for(let cw of completed_workouts) {
      cw.date = reformatDate(cw.date);
      cw.name = findNameById(workouts, cw.workoutId);
      for(let ce of cw.completed_exercises) {
        ce.name = findNameById(exercises, ce.exerciseId);;
      }
      cw.completed_exercises.sort(compareNames);
    }
    
    this.setState({ completed_workouts, exercises, workouts, muscles, api_response: true });
  }

  confirmDelete(name) {
    return window.confirm(`Are you sure you want to delete this ${name}?`);
  }

  handleCompletedWorkoutDelete = async selected_workout => {
    if (!this.confirmDelete("completed workout")) { return; }
    const old_completed_workouts = this.state.completed_workouts;
    const new_completed_workouts = old_completed_workouts.filter(w => w.id !== selected_workout.id);

    this.setState({ completed_workouts: new_completed_workouts });

    try {
      await deleteCompletedWorkout(selected_workout.id);
    } catch (exception) {
      if (exception.response && exception.response.status === 404) {
        alert("This completed workout has already been deleted.");
      }
      this.setState({ completed_workouts: old_completed_workouts });
    }
  };

  handleExerciseDelete = async (selected_exercise) => {
    if (!this.confirmDelete("exercise")) { return; }
    let completed_workout_index = 0;
    const completed_workouts = [ ...this.state.completed_workouts ];
    for(let i = 0; i < completed_workouts.length; i++) {
      if (completed_workouts[i].id === selected_exercise.completedWorkoutId) {
        completed_workout_index = i;
        break;
      }
    }
    
    const old_exercises = this.state.completed_workouts[completed_workout_index].completed_exercises;
    const new_exercises = old_exercises.filter(e => e.id !== selected_exercise.id);

    completed_workouts[completed_workout_index].completed_exercises = new_exercises;
    this.setState({ completed_workouts });

    try {
      await deleteCompletedExercise(selected_exercise);
    } catch (exception) {
      if (exception.response && exception.response.status === 404) {
        alert("This exercise has already been deleted.");
      }
      completed_workouts[completed_workout_index].completed_exercises = old_exercises
      this.setState({ completed_workouts });
    }
  }

  handlePageChange = (page_number, page_size) => {
    const length = this.state.completed_workouts.length;
    const number_of_pages = Math.ceil(length / page_size);
    if (page_number <= 0 ||  page_number > number_of_pages) {
      return;
    }
    this.setState({ current_page: page_number });
  };

  toggleSort = () => {
    const old_direction = this.state.sort_direction;
    const completed_workouts = [ ...this.state.completed_workouts ];
    completed_workouts.reverse();
    let sort_direction;
    sort_direction = old_direction === "desc" ? "asc" : "desc";

    this.setState({ completed_workouts, sort_direction });
  }

  generatePage(page, page_size) {
    let completed_workouts = [ ...this.state.completed_workouts ];
    const start_index = (page-1)*page_size;
    const end_index = start_index + page_size;
    const completed_workout_slice = completed_workouts.slice(start_index,end_index);
    return completed_workout_slice;
  }

  handleCompletedWorkoutSelect = completed_workout => {
    if (completed_workout === this.state.current_completed_workout) {
      completed_workout = {};
    }
    this.setState({ current_completed_workout: completed_workout });
  }

  getSelectedMuscles() {
    let muscle_ids = [];
    if (this.state.current_completed_workout.completed_exercises === undefined) { return []; }
    const completed_exercises = this.state.current_completed_workout.completed_exercises;
    const muscles = this.state.muscles;
    const exercises = this.state.exercises;
    let muscle_names = {};
    let exercise_map = {};
    let selected_muscles = [];

    for (let exercise of exercises) {
      exercise_map[exercise.id] = exercise;
    }
    for (let completed_exercise of completed_exercises) {
      muscle_ids.push(exercise_map[completed_exercise.exerciseId].muscleId);
    }
    for (let muscle of muscles){
      muscle_names[muscle.id] = muscle.name;
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
            current_completed_workout,
            completed_workouts
          } = this.state;

    return (
      <Spinner ready={this.state.api_response}>
        <div className="custom-max-width">
          <div className="card my-2">
            <div className="card-header bg-light">
              <h4 className="card-title">
                {current_completed_workout.date ?
                `Workout Date: ${current_completed_workout.date}` :
                `Select a Workout`}
              </h4>
            </div>
            <div className="card-body">
              <MuscleMap
                current_muscles={this.getSelectedMuscles()}
                onMuscleSelect={() => {}}
              />
            </div>
            <ul className="list-group list-group-flush">
            </ul>
            <div className="card-body">
              <Link to="/completed_workouts/new" className="btn btn-primary mr-1">
                New Completed Workout
              </Link>
              <button onClick={this.toggleSort} className="btn btn-info btn-sm">
                {"Sort by date "}
                <i className={"fa fa-sort-" + sort_direction}></i>
              </button>
            </div>
          </div>

          {this.generatePage(current_page, page_size).map((completed_workout, index) => (
            <div
              key={completed_workout.id}
              className={"my-1 card " + (completed_workout === current_completed_workout ? "border-primary" : "")}
            >
              <CompletedWorkoutHead
                workout_name={completed_workout.name}
                completed_workout={completed_workout}
                onCompletedWorkoutSelect={this.handleCompletedWorkoutSelect}
                onCompletedWorkoutDelete={this.handleCompletedWorkoutDelete}
              />

              <CompletedWorkoutBody
                completed_workout={completed_workout}
                current_completed_workout={current_completed_workout}
                onExerciseDelete={this.handleExerciseDelete}
              />
            </div>
          ))}

          <Pagination
            page_size={page_size}
            item_count={completed_workouts.length}
            current_page={current_page}
            onPageChange={this.handlePageChange}
          />
        </div>
      </Spinner>
    );
  }
}

export default CompletedWorkoutIndex;
