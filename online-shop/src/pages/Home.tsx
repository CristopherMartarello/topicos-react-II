import Title from "antd/es/typography/Title";
import { useEffect, useState } from "react";
import type { Product } from "../types/Product";
import { fetchTop5Products } from "../services/productService";
import ProductsList from "../components/ProductsList";
import { Col, Row, Skeleton, Space } from "antd";

const Home = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const data = await fetchTop5Products();
        setProducts(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, []);

  return (
    <div className="flex flex-col items-center">
      <Space direction="vertical" size="large" className="w-full items-center">
        <Title level={2} className="mt-8">
          Welcome to the Shop
        </Title>
        <Title level={3} className="mt-10">
          Top 5 Products
        </Title>
        {loading ? (
          <Row gutter={[24, 24]} justify="center">
            {Array.from({ length: 5 }).map((_, index) => (
              <Col key={index} flex="0 0 220px">
                <div className="flex flex-col items-center w-[220px] h-[360px] p-2 bg-white rounded-lg shadow-sm">
                  <Skeleton.Image
                    active
                    className="w-[200px]! h-[200px]! mb-4"
                  />

                  <Skeleton
                    active
                    title={{ width: "80%" }}
                    paragraph={{ rows: 2, width: ["100%", "60%"] }}
                  />
                </div>
              </Col>
            ))}
          </Row>
        ) : (
          <ProductsList productsList={products} />
        )}
      </Space>
    </div>
  );
};

export default Home;
