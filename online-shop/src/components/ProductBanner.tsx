import { Button, Image, Rate, notification, theme, Tooltip } from "antd";
import { EditFilled, DeleteFilled } from "@ant-design/icons";
import type { Product } from "../types/Product";
import { useDispatch } from "react-redux";
import { addToCart } from "../store/cartSlice";

const fallbackImage = "data:image/png;base64,...";

interface ProductBannerProps {
  item: Product;
  onEdit?: (product: Product) => void;
  onDelete?: (id: number) => void;
}

const ProductBanner = ({ item, onEdit, onDelete }: ProductBannerProps) => {
  const [api, contextHolder] = notification.useNotification();
  const { token } = theme.useToken();
  const dispatch = useDispatch();

  const handleBuyClick = () => {
    dispatch(addToCart(item));
    api.success({
      message: "Success!",
      description: "Product added to cart.",
      placement: "top",
    });
  };

  return (
    <>
      {contextHolder}

      <div
        style={{
          backgroundColor: token.colorBgContainer,
          border: `1px solid ${token.colorBorder}`,
          borderRadius: 8,
          padding: "24px 32px",
          paddingTop: "64px",
          boxShadow: token.boxShadowTertiary,
        }}
        className="relative flex flex-col items-center"
      >
        <div className="absolute top-3 right-3 flex gap-3 z-10">
          <Tooltip title="Edit">
            <EditFilled
              className="cursor-pointer text-blue-500 text-lg"
              onClick={() => onEdit?.(item)}
            />
          </Tooltip>

          <Tooltip title="Delete">
            <DeleteFilled
              className="cursor-pointer text-red-500 text-lg"
              onClick={() => onDelete?.(item.id)}
            />
          </Tooltip>
        </div>

        <div
          className="
            grid 
            grid-cols-1 
            md:grid-cols-2 
            gap-4 
            w-full 
            max-w-3xl
            items-center
          "
        >
          <div className="flex justify-center">
            <Image
              draggable={false}
              src={item.image}
              alt={item.title}
              fallback={fallbackImage}
              height={140}
              width={140}
              className="object-contain md:w-48 md:h-48 w-32 h-32"
              preview={{
                mask: <span className="text-white">Clique para ampliar</span>,
              }}
            />
          </div>

          <div className="flex flex-col justify-center px-1">
            <h2
              className="
                font-semibold 
                mb-2 
                line-clamp-2 
                text-center 
                md:text-left
              "
              style={{ color: token.colorText }}
            >
              {item.title}
            </h2>

            <div
              className="
                flex 
                justify-center 
                md:justify-start 
                items-center 
                gap-2 
                mb-2
              "
            >
              <Rate allowHalf disabled defaultValue={item.rating.rate} />
              <span style={{ color: token.colorTextSecondary }}>
                ({item.rating.count})
              </span>
            </div>

            <p
              className="
                text-sm 
                line-clamp-3 
                text-center 
                md:text-left
              "
              style={{ color: token.colorTextSecondary }}
            >
              {item.description}
            </p>
          </div>
        </div>

        <div
          className="
            flex 
            flex-col 
            items-center 
            w-full 
            max-w-3xl 
            mt-2
          "
        >
          <div
            className="
              flex 
              items-center 
              gap-1 
              text-lg 
              mb-3
            "
            style={{ color: token.colorText }}
          >
            <span className="font-semibold">Price:</span>
            <span className="font-semibold">US$ {item.price.toFixed(2)}</span>
          </div>

          <Button type="primary" className="w-full" onClick={handleBuyClick}>
            Buy
          </Button>
        </div>
      </div>
    </>
  );
};

export default ProductBanner;
