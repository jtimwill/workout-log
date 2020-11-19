import http from './httpService';

export function getWorkouts() {
  return http.get("/workouts");
};

export function getWorkout(workout_id) {
  return http.get(`/workouts/${workout_id}`);
};

export function saveWorkout(workout) {
  return http.post("/workouts", { date: workout.date });
};

export function deleteWorkout(workout_id) {
  return http.delete(`/workouts/${workout_id}`);
};

export function updateWorkout(workout) {
  const id = workout.id;
  return http.put(`/workouts/${id}`, { date: workout.date });
};