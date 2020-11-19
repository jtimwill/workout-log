import http from './httpService';

export function getCompletedExercise(id) {
  return http.get(`/completed_exercises/${id}`);
};

export function deleteCompletedExercise(id) {
  return http.delete(`/completed_exercises/${id}`);
};

export function saveCompletedExercise(completed_exercise) {
  const id = completed_exercise.workout_id;
  return http.post(`/workouts/${id}/completed_exercises`, completed_exercise);
};

export function updateCompletedExercise(completed_exercise) {
  const id = completed_exercise.id;
  return http.put(`/completed_exercises/${id}`, completed_exercise);
};