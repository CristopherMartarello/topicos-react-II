import { Layout, theme } from "antd";
import { NavLink, Outlet, useLocation } from "react-router-dom";
import OnlineShopLogo from "../../assets/online-shop-logo.png";
import SearchBar from "../../components/SearchBar";
import LoginButton from "../../components/LoginButton";
import CartButton from "../../components/CartButton";
import { useSelector } from "react-redux";
import type { RootState } from "../../store/store";
import UserProfileButton from "../../components/UserProfileButton";
import ThemeButton from "../../components/ThemeButton";
import { useTheme } from "../../context/ThemeContext";
import { useState } from "react";
import CartDrawer from "../../components/CartDrawer";

const { Header, Content, Footer } = Layout;

export default function AppLayout() {
  const { darkMode } = useTheme();
  const { token } = theme.useToken();
  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated
  );
  const username = useSelector((state: RootState) => state.auth.username);
  const location = useLocation();
  const isProductsPage = location.pathname === "/products";
  const [cartOpen, setCartOpen] = useState(false);

  const linkBaseClasses =
    "text-gray-700 font-medium hover:text-blue-600 transition-colors";
  const activeClasses =
    "text-blue-600 font-semibold border-b-2 border-blue-600 pb-1";

  return (
    <div className="flex min-h-screen flex-col">
      <Header
        className="flex flex-row items-center shadow-md justify-between px-6"
        style={{
          backgroundColor: darkMode ? "#0A1A2F" : "#e6f4ff",
          color: darkMode ? "#ffffff" : "#1f1f1f",
        }}
      >
        <div className="flex items-center gap-8">
          <img
            src={OnlineShopLogo}
            alt="Online Shop Logo"
            className="mr-4 h-12"
          />

          <nav className="flex gap-6">
            <NavLink
              to="/home"
              className={({ isActive }) =>
                `${linkBaseClasses} ${isActive ? activeClasses : ""}`
              }
            >
              Home
            </NavLink>

            <NavLink
              to="/products"
              className={({ isActive }) =>
                `${linkBaseClasses} ${isActive ? activeClasses : ""}`
              }
            >
              Products
            </NavLink>

            <NavLink
              to="/clients"
              className={({ isActive }) =>
                `${linkBaseClasses} ${isActive ? activeClasses : ""}`
              }
            >
              Clients
            </NavLink>
          </nav>
        </div>

        {isProductsPage && <SearchBar />}

        <div className="flex items-center gap-4">
          {isAuthenticated ? (
            <UserProfileButton username={username || "Usuário"} />
          ) : (
            <LoginButton />
          )}
          <CartButton onClick={() => setCartOpen(true)} />
          <ThemeButton />
        </div>
      </Header>

      <Content
        className="p-6"
        style={{
          backgroundColor: token.colorBgContainer,
        }}
      >
        <Outlet />
      </Content>

      <Footer
        className="flex justify-center"
        style={{
          color: token.colorTextSecondary,
        }}
      >
        Online Shop | IFSC ©{new Date().getFullYear()} Created by Cristopher and
        Fernando
      </Footer>
      <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} />
    </div>
  );
}
