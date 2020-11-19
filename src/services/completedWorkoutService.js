import http from './httpService';

export function getCompletedWorkouts() {
  return http.get("/completed_workouts");
};

export function getCompletedWorkout(cwid) {
  return http.get(`/completed_workouts/${cwid}`);
};

export function saveCompletedWorkout(completed_workout_obj) {
  return http.post("/completed_workouts", completed_workout_obj);
};

export function deleteCompletedWorkout(cwid) {
  return http.delete(`/completed_workouts/${cwid}`);
};

export function updateCompletedWorkout(completed_workout_obj) {
  const id = completed_workout_obj.id;
  return http.put(`/completed_workouts/${id}`, completed_workout_obj);
};