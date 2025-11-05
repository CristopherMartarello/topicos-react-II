import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "../pages/Login";
import Home from "../pages/Home";
import AppLayout from "./layout/AppLayout";
import PrivateRoute from "./PrivateRoute";
import Products from "../pages/Products";

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route element={<PrivateRoute />}>
          <Route element={<AppLayout />}>
            <Route path="/home" element={<Home />} />
            <Route path="/products" element={<Products />} />
          </Route>
        </Route>
        <Route path="*" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}
