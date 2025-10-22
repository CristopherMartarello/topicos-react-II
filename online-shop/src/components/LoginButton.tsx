import { Button } from "antd";
import { LoginOutlined } from "@ant-design/icons";

const LoginButton = () => {
  return (
    <Button color="default" variant="filled">
      <LoginOutlined />
      Login
    </Button>
  );
};

export default LoginButton;
