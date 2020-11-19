import http from './httpService';

export function getTargetExercise(wid, id) {
    return http.get(`/workouts/${wid}/target_exercises/${id}`);
};

export function deleteTargetExercise(wid, id) {
    return http.delete(`/workouts/${wid}/target_exercises/${id}`);
};

export function saveTargetExercise(target_exercise) {
    const cwid = target_exercise.workoutId;
    return http.post(`/workouts/${wid}/target_exercises`, target_exercise);
};

export function updateTargetExercise(target_exercise) {
    const wid = target_exercise.workoutId;
    const id = target_exercise.id;
    return http.put(`/workouts/${wid}/target_exercises/${id}`, target_exercise);
};