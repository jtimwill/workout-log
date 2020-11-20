import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { reformatDate } from '../../utilities/dateUtility.js';

const WorkoutHead = ({ workout, onWorkoutSelect, onWorkoutDelete }) => {
  const btn = "btn btn-";
  const fa = "fa fa-";
  const url_prefix = `/workouts/${workout._id}`;
  return (
    <div
      className="card-header custom-hover-cursor"
      onClick={() => onWorkoutSelect(workout)}>
      <div className="">
        <span className="font-weight-bold">{reformatDate(workout.date)} </span>
        <span className="badge badge-pill badge-primary">
          {workout.exercises.length}
        </span>
        <div className="float-right">
          <Link to={`${url_prefix}/edit`} className={`${btn}info`}>
            <i className={`${fa}pencil-square-o`}></i>
          </Link>
          <Link to={`${url_prefix}/completed_exercise/new`} className={`${btn}success mx-1`}>
            <i className={`${fa}plus`}></i>
          </Link>
          <button onClick={() => onWorkoutDelete(workout)} className={`${btn}danger`}>
            <i className={`${fa}trash`}></i>
          </button>
        </div>
      </div>
    </div>
  );
};

WorkoutHead.propTypes = {
  workout: PropTypes.object.isRequired,
  onWorkoutSelect: PropTypes.func.isRequired,
  onWorkoutDelete: PropTypes.func.isRequired,
};

export default WorkoutHead;
