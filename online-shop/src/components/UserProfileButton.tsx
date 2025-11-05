import { UserOutlined, LogoutOutlined } from "@ant-design/icons";
import { Button, Dropdown, type MenuProps, Space } from "antd";
import { useDispatch } from "react-redux";
import { logout } from "../store/authSlice";

interface UserProfileButtonProps {
  username: string;
}

const UserProfileButton = ({ username }: UserProfileButtonProps) => {
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
  };

  const items: MenuProps["items"] = [
    {
      key: "user",
      label: (
        <div className="flex flex-col px-2">
          <span className="font-semibold">{username}</span>
          <span className="text-xs text-gray-500">Usuário logado</span>
        </div>
      ),
      disabled: true,
    },
    {
      type: "divider",
    },
    {
      key: "logout",
      label: (
        <div
          className="flex items-center gap-2 text-red-500 font-medium"
          onClick={handleLogout}
        >
          <LogoutOutlined /> Sair
        </div>
      ),
    },
  ];

  return (
    <Dropdown
      menu={{ items }}
      placement="bottomRight"
      arrow
      trigger={["click"]}
    >
      <Button
        color="default"
        variant="filled"
        icon={<UserOutlined />}
        className="font-medium"
      >
        <Space>{username}</Space>
      </Button>
    </Dropdown>
  );
};

export default UserProfileButton;
