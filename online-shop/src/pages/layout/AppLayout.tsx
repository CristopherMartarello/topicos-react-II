import { Layout, theme } from "antd";
import { Outlet } from "react-router-dom";
import OnlineShopLogo from "../../assets/online-shop-logo.png";
import SearchBar from "../../components/SearchBar";
import LoginButton from "../../components/LoginButton";
import CartButton from "../../components/CartButton";

const { Header, Content, Footer } = Layout;

export default function AppLayout() {
  const { token } = theme.useToken();

  return (
    <div className="flex min-h-screen flex-col">
      <Header className="flex flex-row items-center shadow-md bg-[#e6f4ff]! justify-between">
        <div className="flex items-center gap-6">
          <img
            src={OnlineShopLogo}
            alt="Online Shop Logo"
            className="mr-4 h-12"
          />
          <span>Home</span>
        </div>
        <SearchBar />
        <div className="flex gap-4">
          <LoginButton />
          <CartButton />
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
    </div>
  );
}
