import { myAxios } from "./helper";

export const signUp = (user) => {
  return myAxios.post("/api/users/signup", user).then((resp) => resp.data);
};

export const loginUser = (user) => {
  return myAxios.post("/api/users/login", user).then((resp) => resp.data);
};
