import { PlusOutlined, ShoppingOutlined } from "@ant-design/icons";
import { Button, Col, Empty, Row, Spin } from "antd";
import { useEffect, useState } from "react";
import { fetchAllProducts } from "../services/productService";
import type { Product } from "../types/Product";
import ProductBanner from "../components/ProductBanner";

const Products = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const data = await fetchAllProducts();
        setProducts(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, []);

  const handleNewProductClick = () => {
    console.log("New Product click");
  };

  return (
    <div>
      <div className="flex items-center justify-between">
        <div className="flex items-center font-semibold gap-2">
          <ShoppingOutlined />
          List of Products
        </div>
        <Button color="primary" variant="solid" onClick={handleNewProductClick}>
          <PlusOutlined />
          New Product
        </Button>
      </div>
      {loading ? (
        <div className="flex justify-center py-10">
          <Spin size="large" />
        </div>
      ) : products.length === 0 ? (
        <Empty description="No products found" />
      ) : (
        <Row gutter={[24, 24]}>
          {products.map((item) => (
            <Col key={item.id} xs={24} sm={12} lg={8}>
              <ProductBanner item={item} />
            </Col>
          ))}
        </Row>
      )}
    </div>
  );
};

export default Products;
