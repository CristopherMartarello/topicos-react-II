import { api } from "../lib/axios";
import { USER_NAME, USER_PASSWORD } from "../constants/user";

const loginUser = async (username: string, password: string) => {
  if (username.trim() !== USER_NAME && password.trim() !== USER_PASSWORD) {
    return {
      success: false,
      message: "Credenciais inválidas, verifique o e-mail e a senha.",
    };
  }

  const response = await api.post("/auth/login", { username, password });
  return response.data;
};

export { loginUser };
