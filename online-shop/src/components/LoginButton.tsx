import { Button } from "antd";
import { LoginOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

const LoginButton = () => {
  const navigate = useNavigate();

  const handleLoginClick = () => {
    navigate("/login");
  };

  return (
    <Button color="default" variant="filled" onClick={handleLoginClick}>
      <LoginOutlined />
      Login
    </Button>
  );
};

export default LoginButton;
