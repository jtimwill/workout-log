import http from './httpService';

export function getTargetExercise(wid, id) {
  return http.get(`/workouts/${wid}/target_exercises/${id}`);
};

export function deleteTargetExercise(target_exercise) {
  const id = target_exercise.id;
  const wid = target_exercise.workoutId;
  return http.delete(`/workouts/${wid}/target_exercises/${id}`);
};

export function saveTargetExercise(target_exercise) {
  const wid = target_exercise.workoutId;
  return http.post(`/workouts/${wid}/target_exercises`, target_exercise);
};

export function updateTargetExercise(target_exercise) {
  const id = target_exercise.id;
  const wid = target_exercise.workoutId;
  return http.put(`/workouts/${wid}/target_exercises/${id}`, target_exercise);
};