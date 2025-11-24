import { Switch } from "antd";
import { MoonOutlined, BulbOutlined } from "@ant-design/icons";
import { useTheme } from "../context/ThemeContext";

export default function ThemeButton() {
  const { darkMode, toggleTheme } = useTheme();

  return (
    <Switch
      checked={darkMode}
      onChange={toggleTheme}
      checkedChildren={<MoonOutlined />}
      unCheckedChildren={<BulbOutlined />}
    />
  );
}
