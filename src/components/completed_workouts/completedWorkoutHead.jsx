import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { reformatDate } from '../../utilities/dateUtility.js';

const CompletedWorkoutHead = ({ workout_name, completed_workout, onCompletedWorkoutSelect, onCompletedWorkoutDelete }) => {
  const btn = "btn btn-";
  const fa = "fa fa-";
  const url_prefix = `/completed_workouts/${completed_workout.id}`;
  return (
    <div
      className="card-header custom-hover-cursor"
      onClick={() => onCompletedWorkoutSelect(completed_workout)}>
      <div className="">
        <span className="font-weight-bold">{reformatDate(completed_workout.date)} </span>
        <span className="badge badge-pill badge-primary">
          {completed_workout.completed_exercises.length}
        </span>
        <span className="font-weight-bold">           {
          `Workout Name: ${workout_name}`}
        </span>
        <div className="float-right">
          <Link to={`${url_prefix}/edit`} className={`${btn}info`}>
            <i className={`${fa}pencil-square-o`}></i>
          </Link>
          <Link to={`${url_prefix}/completed_exercise/new`} className={`${btn}success mx-1`}>
            <i className={`${fa}plus`}></i>
          </Link>
          <button onClick={() => onCompletedWorkoutDelete(completed_workout)} className={`${btn}danger`}>
            <i className={`${fa}trash`}></i>
          </button>
        </div>
      </div>
    </div>
  );
};

CompletedWorkoutHead.propTypes = {
  workout_name: PropTypes.string.isRequired,
  completed_workout: PropTypes.object.isRequired,
  onCompletedWorkoutSelect: PropTypes.func.isRequired,
  onCompletedWorkoutDelete: PropTypes.func.isRequired,
};

export default CompletedWorkoutHead;
