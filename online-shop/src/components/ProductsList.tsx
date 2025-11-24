import { Col, Row } from "antd";
import type { Product } from "../types/Product";
import ProductItem from "./ProductItem";

interface ProductsListProps {
  productsList: Product[];
}

const ProductsList = ({ productsList }: ProductsListProps) => (
  <Row gutter={[24, 24]} justify="center">
    {productsList.map((product) => (
      <Col key={product.id} xs={24} sm={12} md={8} lg={6} xl={4}>
        <ProductItem productItem={product} />
      </Col>
    ))}
  </Row>
);

export default ProductsList;
