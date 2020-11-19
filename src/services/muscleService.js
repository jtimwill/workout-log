import http from './httpService';

export function getMuscles() {
  return http.get("/muscles");
};

export function getMuscle(muscle_id) {
  return http.get(`/muscles/${muscle_id}`);
};

export function saveMuscle(muscle) {
  return http.post("/muscles", { name: muscle });
};

export function deleteMuscle(muscle_id) {
  return http.delete(`/muscles/${muscle_id}`);
};

export function updateMuscle(muscle) {
  const id = muscle.id;
  const name = muscle.name
  return http.put(`/muscles/${id}`, { name: name });
};