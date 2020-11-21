import http from './httpService';

export function getCompletedExercise(wid, id) {
  return http.get(`/completed_workouts/${wid}/completed_exercises/${id}`);
};

export function deleteCompletedExercise(completed_exercise) {
  const id = completed_exercise.id;
  const wid = completed_exercise.completedWorkoutId;
  return http.delete(`/completed_workouts/${wid}/completed_exercises/${id}`);
};

export function saveCompletedExercise(completed_exercise) {
  const wid = completed_exercise.completedWorkoutId;
  return http.post(`/completed_workouts/${wid}/completed_exercises`, completed_exercise);
};

export function updateCompletedExercise(completed_exercise) {
  const id = completed_exercise.id;
  const wid = completed_exercise.completedWorkoutId;
  return http.put(`/completed_workouts/${wid}/completed_exercises/${id}`, completed_exercise);
};