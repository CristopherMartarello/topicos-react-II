import { Badge, Button } from "antd";
import { ShoppingCartOutlined } from "@ant-design/icons";
import { useSelector } from "react-redux";
import type { RootState } from "../store/store";

const CartButton = ({ onClick }: { onClick: () => void }) => {
  const total = useSelector((state: RootState) => state.cart.items.length);
  return (
    <Badge count={total} showZero>
      <Button
        color="default"
        variant="filled"
        icon={<ShoppingCartOutlined />}
        onClick={onClick}
      >
        <span className="hidden sm:inline">Cart</span>
      </Button>
    </Badge>
  );
};

export default CartButton;
