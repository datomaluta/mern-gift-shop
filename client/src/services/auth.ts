import { instance } from "./axios";

export const signup = async (data: {
  username: string;
  email: string;
  password: string;
  passwordConfirm: string;
}) => {
  return instance.post("/auth/signup", data);
};

export const signin = async (data: { email: string; password: string }) => {
  return instance.post("/auth/signin", data);
};

export const logout = async () => {
  return instance.get("/auth/logout");
};
