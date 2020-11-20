import http from './httpService';

export function getExercises() {
  return http.get("/exercises");
};

export function getExercise(exerciseId) {
  return http.get(`/exercises/${exerciseId}`);
};

export function saveExercise(exercise) {
  const obj = { name: exercise.name, muscleId: exercise.muscleId };
  return http.post("/exercises", obj);
};

export function deleteExercise(exerciseId) {
  return http.delete(`/exercises/${exerciseId}`);
};

export function updateExercise(exercise) {
  const id = exercise.id;
  const obj = { name: exercise.name, muscleId: exercise.muscleId };
  return http.put(`/exercises/${id}`, obj);
};