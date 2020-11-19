import http from './httpService';

export function getUsers() {
  return http.get("/users");
};

export function getUser() {
  return http.get("/users/me");
};

export function saveUser(user) {
  const obj = {
    name: user.name,
    email: user.email,
    password: user.password
  };
  return http.post("/users", obj);
};

export function deleteUser(user_id) {
  return http.delete(`/users/${user_id}`);
};

export function updateUser(user) {
  const obj = {
    name: user.name,
    email: user.email
  };
  return http.put("/users/me", obj);
};
