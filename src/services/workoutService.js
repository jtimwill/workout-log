import http from './httpService';

export function getWorkouts() {
  return http.get("/workouts");
};

export function getWorkout(workout_id) {
  return http.get(`/workouts/${workout_id}`);
};

export function saveWorkout(workout_obj) {
  return http.post("/workouts", workout_obj);
};

export function deleteWorkout(workout_id) {
  return http.delete(`/workouts/${workout_id}`);
};

export function updateWorkout(workout_obj) {
  const id = workout.id;
  return http.put(`/workouts/${id}`, workout_obj);
};