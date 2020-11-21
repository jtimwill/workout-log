import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const CompletedWorkoutBody = ({ completed_workout, current_completed_workout, onExerciseDelete, index }) => {
  const btn = "btn-sm btn btn-";
  const fa = "fa fa-";
  const badge = "ml-1 badge badge-secondary";

  function getCSSClass(completed_workout, current_completed_workout) {
    return completed_workout === current_completed_workout ? "custom-show" : "custom-hide-2"
  }

  function formatInfo(ex) {
    const info = `${ex.name}: ${ex.sets}x${ex.reps} ${ex.load}lbs`;
    const type = ex.exercise_type;
    return `${info} ${type}`;
  }

  return (
    <div>
      {completed_workout.completed_exercises.map(exercise => (
        <div key={exercise.id} className={getCSSClass(completed_workout, current_completed_workout)}>
          <div className="card-body">
            <div className="d-flex flex-row align-items-center justify-content-between">
              <div 
                className={"w-50 " + ((exercise.sets === 0 || exercise.reps === 0)? "text-danger" : "text-success")}
              >
                {formatInfo(exercise)}
              </div>
              <div>
                {exercise.unilateral ? <span className={badge}> U </span> : ""}
                <Link
                  to={`/completed_workouts/${completed_workout.id}/completed_exercise/${exercise.id}/edit`}
                  className={`${btn}info mx-1`}
                >
                  <i className={`${fa}pencil-square-o`}></i>
                </Link>
                <button
                  className={`${btn}danger`}
                  onClick={() => onExerciseDelete(index, exercise)}
                >
                  <i className={`${fa}trash`}></i>
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

CompletedWorkoutBody.propTypes = {
  completed_workout: PropTypes.object.isRequired,
  current_completed_workout: PropTypes.object.isRequired,
  onExerciseDelete: PropTypes.func.isRequired,
  index: PropTypes.number.isRequired
};

export default CompletedWorkoutBody;
