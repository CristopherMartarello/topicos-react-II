import type { FormProps } from "antd";
import { useDispatch } from "react-redux";
import {
  Button,
  Form,
  Input,
  notification,
  theme,
  Typography,
  Divider,
} from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { useState } from "react";
import { loginUser } from "../services/userService";
import { login } from "../store/authSlice";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";
import { setCartUser } from "../store/cartSlice";

const { Title, Text } = Typography;

const Login = () => {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { darkMode } = useTheme();
  const { token } = theme.useToken();

  const [api, contextHolder] = notification.useNotification();

  const notify = (type: "success" | "error") => {
    api[type]({
      message: type === "success" ? "Sucesso!" : "Erro!",
      description:
        type === "success"
          ? "Login realizado com sucesso."
          : "Erro ao entrar. Verifique suas credenciais.",
      placement: "top",
    });
  };

  type FieldType = {
    username: string;
    password: string;
  };

  const onFinish: FormProps<FieldType>["onFinish"] = async (values) => {
    const username = values.username.trim();
    const password = values.password.trim();

    try {
      setLoading(true);
      const response = await loginUser(username, password);

      if (response?.token) {
        dispatch(login({ username, password, token: response.token }));
        dispatch(setCartUser(username));
        notify("success");
        navigate("/home");
      } else notify("error");
    } catch (err) {
      console.error(err);
      notify("error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="flex justify-center items-center min-h-screen px-4 transition-all"
      style={{
        background: darkMode
          ? "linear-gradient(135deg, #0f2027, #203a43, #2c5364)"
          : "linear-gradient(135deg, #e0f3ff, #cbe6ff, #f0faff)",
      }}
    >
      {contextHolder}

      <div
        className="rounded-2xl shadow-xl p-8 w-full max-w-md transition-all"
        style={{
          backgroundColor: darkMode ? "#1f1f1f" : "#ffffff",
          border: `1px solid ${
            darkMode ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)"
          }`,
        }}
      >
        <Title
          level={2}
          style={{ textAlign: "center", color: token.colorText }}
        >
          Bem-vindo
        </Title>

        <Text
          style={{
            display: "block",
            textAlign: "center",
            marginBottom: 20,
            color: token.colorTextSecondary,
          }}
        >
          Faça login para continuar
        </Text>

        <Divider />

        <Form
          name="login"
          layout="vertical"
          onFinish={onFinish}
          autoComplete="off"
        >
          <Form.Item<FieldType>
            label={<span className="font-medium">Usuário</span>}
            name="username"
            rules={[{ required: true, message: "Digite seu usuário" }]}
          >
            <Input
              size="large"
              prefix={<UserOutlined />}
              placeholder="Seu usuário"
            />
          </Form.Item>

          <Form.Item<FieldType>
            label={<span className="font-medium">Senha</span>}
            name="password"
            rules={[{ required: true, message: "Digite sua senha" }]}
          >
            <Input.Password
              size="large"
              prefix={<LockOutlined />}
              placeholder="Sua senha"
            />
          </Form.Item>

          <Button
            type="primary"
            htmlType="submit"
            loading={loading}
            size="large"
            className="mt-2 w-full"
          >
            Entrar
          </Button>
        </Form>

        <Divider />

        <Text
          style={{
            display: "block",
            textAlign: "center",
            color: token.colorTextSecondary,
          }}
        >
          Online Shop IFSC - Cristopher e Fernando
        </Text>
      </div>
    </div>
  );
};

export default Login;
