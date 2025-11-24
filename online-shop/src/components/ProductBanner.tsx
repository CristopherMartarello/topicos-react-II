import { Button, Image, Rate, notification, theme } from "antd";
import type { Product } from "../types/Product";

const fallbackImage = "...";

interface ProductBannerProps {
  item: Product;
}

const ProductBanner = ({ item }: ProductBannerProps) => {
  const [api, contextHolder] = notification.useNotification();
  const { token } = theme.useToken();

  const handleBuyClick = () => {
    api.success({
      message: "Sucesso!",
      description: "Produto adicionado ao carrinho.",
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
          boxShadow: token.boxShadowTertiary,
        }}
        className="flex flex-col items-center"
      >
        <div className="flex w-full max-w-3xl flex-row items-center gap-4 mb-6">
          <div className="shrink-0 flex items-center justify-center w-48 h-48 rounded-md">
            <Image
              draggable={false}
              src={item.image}
              alt={item.title}
              fallback={fallbackImage}
              height={150}
              width={150}
              className="object-contain"
              preview={{
                mask: <span className="text-white">Clique para ampliar</span>,
              }}
            />
          </div>

          <div className="flex flex-col flex-1">
            <div
              className="font-semibold mb-2 md:line-clamp-2"
              style={{ color: token.colorText }}
            >
              {item.title}
            </div>

            <div className="flex items-center gap-2 mb-2">
              <Rate allowHalf disabled defaultValue={item.rating.rate} />
              <span style={{ color: token.colorTextSecondary }}>
                ({item.rating.count})
              </span>
            </div>

            <p
              className="text-sm line-clamp-3"
              style={{ color: token.colorTextSecondary }}
            >
              {item.description}
            </p>
          </div>
        </div>

        <div className="flex flex-col items-center w-full max-w-3xl">
          <div
            className="flex items-center gap-1 text-lg mb-3"
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
