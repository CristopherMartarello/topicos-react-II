import { useTheme } from "../context/ThemeContext";

export default function UseContextExample() {
  const { theme, toggleTheme } = useTheme();

  return (
    <div style={{ marginBottom: "20px" }}>
      <h2>useContext (Tema)</h2>
      <p>
        O tema atual é: <b>{theme}</b>
      </p>
      <button onClick={toggleTheme}>
        Alternar para {theme === "light" ? "dark" : "light"}
      </button>
    </div>
  );
}
