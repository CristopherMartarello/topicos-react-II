import { Drawer, Button, List, Typography, Modal, notification } from "antd";
import { useDispatch, useSelector } from "react-redux";
import {
  increaseQuantity,
  decreaseQuantity,
  clearCart,
} from "../store/cartSlice";
import type { RootState } from "../store/store";
import { CheckCircleTwoTone } from "@ant-design/icons";
import { useState } from "react";

const { Text } = Typography;

interface CartDrawerProps {
  open: boolean;
  onClose: () => void;
}

export default function CartDrawer({ open, onClose }: CartDrawerProps) {
  const items = useSelector((state: RootState) => state.cart.items);
  const dispatch = useDispatch();

  const [api, contextHolder] = notification.useNotification();

  const [successModalOpen, setSuccessModalOpen] = useState(false);

  const total = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const handleIncrease = (id: number) => {
    dispatch(increaseQuantity(id));
  };

  const handleDecrease = (id: number) => {
    dispatch(decreaseQuantity(id));

    api.info({
      message: "Quantidade atualizada",
      description: "Produto atualizado no carrinho.",
      placement: "top",
    });
  };

  const handleClearCart = () => {
    dispatch(clearCart());
    api.warning({
      message: "Carrinho limpo",
      description: "Todos os produtos foram removidos.",
      placement: "top",
    });
  };

  const handleFinishPurchase = () => {
    setSuccessModalOpen(true);
    dispatch(clearCart());
    onClose();
  };

  return (
    <>
      {contextHolder}

      {/* Modal de sucesso */}
      <Modal
        open={successModalOpen}
        onOk={() => setSuccessModalOpen(false)}
        onCancel={() => setSuccessModalOpen(false)}
        centered
        okText="OK"
        title={
          <span className="flex items-center gap-2">
            <CheckCircleTwoTone twoToneColor="#52c41a" />
            Compra finalizada!
          </span>
        }
      >
        Sua compra foi concluída com sucesso! Obrigado por escolher nossa loja.
      </Modal>

      <Drawer
        title="Shopping Cart"
        open={open}
        onClose={onClose}
        width={400}
        destroyOnClose
      >
        {items.length === 0 ? (
          <Text>No products in cart.</Text>
        ) : (
          <>
            <List
              dataSource={items}
              renderItem={(item) => (
                <List.Item
                  actions={[
                    <div className="flex items-center gap-2">
                      <Button
                        size="small"
                        onClick={() => handleDecrease(item.id)}
                      >
                        −
                      </Button>

                      <Text strong>{item.quantity}</Text>

                      <Button
                        size="small"
                        type="primary"
                        onClick={() => handleIncrease(item.id)}
                      >
                        +
                      </Button>
                    </div>,
                  ]}
                >
                  <List.Item.Meta
                    title={item.title}
                    description={`$ ${item.price.toFixed(2)}`}
                  />
                  <Text strong>${(item.price * item.quantity).toFixed(2)}</Text>
                </List.Item>
              )}
            />

            <div className="border-t pt-4 mt-4">
              <Text strong>Total: ${total.toFixed(2)}</Text>

              <div className="flex flex-col gap-2 mt-4">
                <Button type="primary" onClick={handleFinishPurchase}>
                  Finalizar compra
                </Button>

                <Button danger onClick={handleClearCart}>
                  Limpar carrinho
                </Button>
              </div>
            </div>
          </>
        )}
      </Drawer>
    </>
  );
}
