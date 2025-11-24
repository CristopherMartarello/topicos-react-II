import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";

import { Provider } from "react-redux";
import { store } from "./store/store";

import AppRoutes from "./routes/AppRoutes";
import { ThemeProvider, useTheme } from "./context/ThemeContext";

import { ConfigProvider, theme as antdTheme } from "antd";

// eslint-disable-next-line react-refresh/only-export-components
const ThemeWrapper = () => {
  const { darkMode } = useTheme();

  return (
    <ConfigProvider
      theme={{
        algorithm: darkMode
          ? antdTheme.darkAlgorithm
          : antdTheme.defaultAlgorithm,
      }}
    >
      <AppRoutes />
    </ConfigProvider>
  );
};

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <ThemeProvider>
        <ThemeWrapper />
      </ThemeProvider>
    </Provider>
  </StrictMode>
);
