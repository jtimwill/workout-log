import http from './httpService';

export function getExercises() {
  return http.get("/exercises");
};

export function getExercise(exercise_id) {
  return http.get(`/exercises/${exercise_id}`);
};

export function saveExercise(exercise) {
  const obj = { name: exercise.name, muscle_id: exercise.muscle_id };
  return http.post("/exercises", obj);
};

export function deleteExercise(exercise_id) {
  return http.delete(`/exercises/${exercise_id}`);
};

export function updateExercise(exercise) {
  const id = exercise.id;
  const obj = { name: exercise.name, muscle_id: exercise.muscle_id };
  return http.put(`/exercises/${id}`, obj);
};