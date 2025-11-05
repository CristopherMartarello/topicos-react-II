import type { FormProps } from "antd";
import { useDispatch } from "react-redux";
import { Button, Form, Input, notification } from "antd";
import { useState } from "react";
import { loginUser } from "../services/userService";
import { login } from "../store/authSlice";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [api, contextHolder] = notification.useNotification();

  const notifyError = () => {
    api.error({
      message: "Erro!",
      description:
        "Erro ao entrar na conta. Por favor, verifique suas credenciais.",
      placement: "top",
    });
  };

  const notifySuccess = () => {
    api.success({
      message: "Sucesso!",
      description: "Login realizado com sucesso.",
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
        notifySuccess();
        navigate("/home");
      } else {
        notifyError();
      }
    } catch (err) {
      console.error(err);
      notifyError();
    } finally {
      setLoading(false);
    }
  };

  const onFinishFailed: FormProps<FieldType>["onFinishFailed"] = (
    errorInfo
  ) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-red-50">
      {contextHolder}
      <Form
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: 400, width: "100%" }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
        className="bg-white rounded-2xl p-6! shadow-md"
      >
        <Form.Item<FieldType>
          label="Usuário"
          name="username"
          rules={[{ required: true, message: "Please input your username!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item<FieldType>
          label="Senha"
          name="password"
          rules={[{ required: true, message: "Please input your password!" }]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button
            type="primary"
            htmlType="submit"
            className="w-full"
            loading={loading}
          >
            Enviar
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Login;
