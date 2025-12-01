import { api } from "../lib/axios";

const loginUser = async (username: string, password: string) => {
  const response = await api.post("/auth/login", { username, password });
  return response.data;
};

export { loginUser };
