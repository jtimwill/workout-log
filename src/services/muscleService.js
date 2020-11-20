import http from './httpService';

export function getMuscles() {
  return http.get("/muscles");
};

export function getMuscle(muscleId) {
  return http.get(`/muscles/${muscleId}`);
};

export function saveMuscle(muscle) {
  return http.post("/muscles", { name: muscle });
};

export function deleteMuscle(muscleId) {
  return http.delete(`/muscles/${muscleId}`);
};

export function updateMuscle(id, muscle) {
  const name = muscle.name;
  return http.put(`/muscles/${id}`, { name: name });
};