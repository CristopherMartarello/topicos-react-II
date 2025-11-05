import { PlusOutlined, ShoppingOutlined } from "@ant-design/icons";
import {
  Button,
  Col,
  Empty,
  message,
  Modal,
  Row,
  Spin,
  Form,
  Input,
  InputNumber,
} from "antd";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { fetchAllProducts } from "../services/productService";
import type { Product } from "../types/Product";
import ProductBanner from "../components/ProductBanner";
import {
  addProduct,
  getProducts,
  saveProducts,
} from "../services/storageService";
import type { RootState } from "../store/store";

const Products = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [openModal, setOpenModal] = useState(false);
  const [form] = Form.useForm();

  // 🔹 termo de busca vindo da SearchBar no Header
  const searchTerm = useSelector(
    (state: RootState) => state.products.searchTerm
  );

  // 🔹 carregar produtos do LocalStorage ou API
  useEffect(() => {
    const loadProducts = async () => {
      try {
        const localData = getProducts();
        if (localData.length > 0) {
          setProducts(localData);
          setLoading(false);
          return;
        }

        const data = await fetchAllProducts();
        setProducts(data);
        saveProducts(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, []);

  // 🔹 abrir modal
  const handleNewProductClick = () => {
    setOpenModal(true);
  };

  // 🔹 adicionar novo produto e salvar no LocalStorage
  const handleAddProduct = async () => {
    try {
      const values = await form.validateFields();
      const newProduct: Product = {
        ...values,
        id: Date.now(),
        rating: { rate: 0, count: 0 },
      };

      const updated = addProduct(newProduct);
      setProducts(updated);

      message.success("Produto cadastrado com sucesso!");
      form.resetFields();
      setOpenModal(false);
    } catch (error) {
      console.error(error);
    }
  };

  // 🔹 aplicar filtro da SearchBar
  const filteredProducts = products.filter((p) =>
    p.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      {/* Header da lista */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center font-semibold gap-2 text-xl">
          <ShoppingOutlined />
          List of Products
        </div>
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={handleNewProductClick}
        >
          New Product
        </Button>
      </div>

      {/* Lista ou feedback visual */}
      {loading ? (
        <div className="flex justify-center py-10">
          <Spin size="large" />
        </div>
      ) : filteredProducts.length === 0 ? (
        <Empty description="No products found" />
      ) : (
        <Row gutter={[24, 24]}>
          {filteredProducts.map((item) => (
            <Col key={item.id} xs={24} sm={12} lg={8}>
              <ProductBanner item={item} />
            </Col>
          ))}
        </Row>
      )}

      {/* Modal de novo produto */}
      <Modal
        title="New Product"
        open={openModal}
        onCancel={() => setOpenModal(false)}
        footer={null}
        maskClosable={false}
        keyboard={false}
        centered
      >
        <Form
          form={form}
          layout="vertical"
          className="mt-2"
          initialValues={{ price: 0 }}
        >
          <Form.Item
            label="Title"
            name="title"
            rules={[{ required: true, message: "Please enter a title" }]}
          >
            <Input placeholder="Product title" />
          </Form.Item>

          <Form.Item
            label="Description"
            name="description"
            rules={[{ required: true, message: "Please enter a description" }]}
          >
            <Input.TextArea rows={3} placeholder="Product description" />
          </Form.Item>

          <Form.Item
            label="Category"
            name="category"
            rules={[{ required: true, message: "Please enter a category" }]}
          >
            <Input placeholder="Category name" />
          </Form.Item>

          <Form.Item
            label="Price"
            name="price"
            rules={[{ required: true, message: "Please enter a price" }]}
          >
            <InputNumber
              prefix="$"
              className="w-full"
              min={0}
              formatter={(v) => `${v}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
            />
          </Form.Item>

          <Form.Item
            label="Image"
            name="image"
            rules={[{ message: "Please enter an image URL" }]}
            extra="URL image"
          >
            <Input placeholder="https://example.com/image.jpg" />
          </Form.Item>

          <div className="flex justify-end gap-3 mt-6">
            <Button onClick={() => setOpenModal(false)}>Cancel</Button>
            <Button type="primary" onClick={handleAddProduct}>
              Save
            </Button>
          </div>
        </Form>
      </Modal>
    </div>
  );
};

export default Products;
