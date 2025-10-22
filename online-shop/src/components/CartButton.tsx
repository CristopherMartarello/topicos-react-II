import { Button } from "antd";
import { ShoppingCartOutlined } from "@ant-design/icons";

const CartButton = () => {
  return (
    <Button color="default" variant="filled">
      <ShoppingCartOutlined />
      Cart
    </Button>
  );
};

export default CartButton;
