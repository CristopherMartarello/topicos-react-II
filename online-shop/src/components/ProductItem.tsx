import { Card, Image, notification } from "antd";
import type { Product } from "../types/Product";
import { EyeOutlined } from "@ant-design/icons";
const { Meta } = Card;

interface ProductItemProps {
  productItem: Product;
}

const ProductItem = ({ productItem }: ProductItemProps) => {
  // inicializa o hook
  const [api, contextHolder] = notification.useNotification();

  const notifyNotImplemented = () => {
    api.error({
      message: "Erro!",
      description: "Esta funcionalidade ainda está em desenvolvimento.",
      placement: "top",
    });
  };

  return (
    <>
      {contextHolder}
      <Card
        hoverable
        cover={
          <Image
            height={300}
            draggable={false}
            src={productItem.image}
            alt={productItem.title}
            preview={{
              mask: <span className="text-white">Clique para ampliar</span>,
            }}
            className="h-full w-full object-contain"
          />
        }
        actions={[<EyeOutlined key="view" onClick={notifyNotImplemented} />]}
      >
        <Meta
          title={productItem.title}
          description={
            <p className="text-gray-600 line-clamp-2">
              {productItem.description}
            </p>
          }
        />
      </Card>
    </>
  );
};

export default ProductItem;
