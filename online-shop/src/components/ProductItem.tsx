import { useState } from "react";
import { Card, Image } from "antd";
import type { Product } from "../types/Product";
import { EyeOutlined } from "@ant-design/icons";

const { Meta } = Card;

interface ProductItemProps {
  productItem: Product;
}

const ProductItem = ({ productItem }: ProductItemProps) => {
  const [previewVisible, setPreviewVisible] = useState(false);

  return (
    <>
      <Image
        src={productItem.image}
        alt={productItem.title}
        preview={{
          visible: previewVisible,
          onVisibleChange: (vis) => setPreviewVisible(vis),
        }}
        className="hidden"
      />

      <Card
        hoverable
        className="w-full max-w-sm mx-auto shadow-sm"
        bodyStyle={{ padding: "12px" }}
        actions={[
          <EyeOutlined
            key="view"
            className="text-lg"
            onClick={() => setPreviewVisible(true)}
          />,
        ]}
        cover={
          <div className="flex items-center justify-center p-4 h-[220px] sm:h-[260px] md:h-[300px] overflow-hidden">
            <img
              src={productItem.image}
              alt={productItem.title}
              className="max-h-full max-w-full object-contain mx-auto cursor-pointer"
              onClick={() => setPreviewVisible(true)}
            />
          </div>
        }
      >
        <Meta
          title={
            <p className="font-semibold text-base md:text-lg line-clamp-2">
              {productItem.title}
            </p>
          }
          description={
            <p className="text-gray-600 text-sm line-clamp-2 md:line-clamp-3">
              {productItem.description}
            </p>
          }
        />
      </Card>
    </>
  );
};

export default ProductItem;
