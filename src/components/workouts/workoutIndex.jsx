import React, { Component} from 'react';
import { Link } from 'react-router-dom';
import { getWorkouts, deleteWorkout } from '../../services/workoutService.js';
import { deleteTargetExercise } from '../../services/targetExerciseService.js';
import { getMuscles } from '../../services/muscleService.js';
import { compareDates } from '../../utilities/sortUtility.js';
import './workout.css';
import Pagination from '../reusable/pagination';
import Spinner from '../reusable/spinner';
import MuscleMap from '../reusable/muscleMap';
import WorkoutHead from './workoutHead'
import WorkoutBody from './workoutBody';
import { getExercises } from '../../services/exerciseService.js';

class WorkoutIndex extends Component {
  state = {
    workouts: [],
    current_page: 1,
    sort_direction: "desc",
    current_workout: {},
    muscles: [],
    exercises: [],
    api_response: false
  };

  async componentDidMount() {
    const { data: muscles } = await getMuscles();
    const { data: workouts } = await getWorkouts();
    const { data: exercises } = await getExercises();

    workouts.sort(compareDates);

    for(let w of workouts) {
      for(let ce of w.target_exercises) {
        ce.name = exercises[ce.exerciseId-1].name;
      }
    }

    this.setState({ workouts, exercises, muscles, api_response: true });
  }

  confirmDelete(name) {
    return window.confirm(`Are you sure you want to delete this ${name}?`);
  }

  handleWorkoutDelete = async selected_workout => {
    if (!this.confirmDelete("workout")) { return; }
    const old_workouts = this.state.workouts;
    const new_workouts = old_workouts.filter(w => w.id !== selected_workout.id);

    this.setState({ workouts: new_workouts });

    try {
      await deleteWorkout(selected_workout.id);
    } catch (exception) {
      if (exception.response && exception.response.status === 404) {
        alert("This workout has already been deleted.");
      }
      this.setState({ workouts: old_workouts });
    }
  };

  handleExerciseDelete = async (workout_index, selected_exercise) => {
    if (!this.confirmDelete("exercise")) { return; }
    const old_exercises = this.state.workouts[workout_index].target_exercises;
    const new_exercises = old_exercises.filter(e => e.id !== selected_exercise.id);
    const workouts = [ ...this.state.workouts ];

    workouts[workout_index].target_exercises = new_exercises;
    this.setState({ workouts });

    try {
      await deleteTargetExercise(selected_exercise);
    } catch (exception) {
      if (exception.response && exception.response.status === 404) {
        alert("This exercise has already been deleted.");
      }
      workouts[workout_index].target_exercises = old_exercises
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
    if (this.state.current_workout.target_exercises === undefined) { return []; }
    const target_exercises = this.state.current_workout.target_exercises;
    const muscles = this.state.muscles;
    const exercises = this.state.exercises;
    let muscle_names = {};
    let selected_muscles = [];

    for (let target_exercise of target_exercises) {
      muscle_ids.push(exercises[target_exercise.exerciseId].muscleId);
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
            current_workout,
            workouts
          } = this.state;

    return (
      <Spinner ready={this.state.api_response}>
        <h4>
          {current_workout.name ?
            `Workout Name: ${current_workout.name}` :
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
            key={workout.id}
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
