import { Image, Rate } from "antd";
import type { Product } from "../types/Product";

interface ProductBannerProps {
  item: Product;
}

const ProductBanner = ({ item }: ProductBannerProps) => {
  console.log(item);
  return (
    <div className="border border-gray-200 py-4 px-8 flex flex-col gap-6 justify-center items-center">
      <div className="flex flex-row">
        <Image
          height={150}
          draggable={false}
          src={item.image}
          alt={item.title}
          preview={{
            mask: <span className="text-white">Clique para ampliar</span>,
          }}
          className="h-full w-full object-contain"
        />
        <div className="flex flex-col">
          <div className="font-semibold">{item.title}</div>
          <div className="flex gap-2">
            <Rate allowHalf defaultValue={item.rating.rate} />
            <span className="text-gray-400">({item.rating.count})</span>
          </div>
          <p className="text-gray-600 line-clamp-2">{item.description}</p>
        </div>
      </div>
      <span className="font-semibold">Preço{item.price}</span>
    </div>
  );
};

export default ProductBanner;
