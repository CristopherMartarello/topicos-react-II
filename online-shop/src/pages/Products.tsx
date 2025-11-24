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

import ProductDrawer from "../components/ProductDrawer";
import DeleteProductModal from "../components/DeleteProductModal";

import {
  addProduct,
  getProducts,
  saveProducts,
} from "../services/storageService";

import type { RootState } from "../store/store";

const Products = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  const [openCreateModal, setOpenCreateModal] = useState(false);
  const [createForm] = Form.useForm();

  const [drawerOpen, setDrawerOpen] = useState(false);
  const [productToEdit, setProductToEdit] = useState<Product | null>(null);

  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [productToDelete, setProductToDelete] = useState<number | null>(null);

  const searchTerm = useSelector(
    (state: RootState) => state.products.searchTerm
  );

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const localData = getProducts();

        if (localData.length > 0) {
          setProducts(localData);
          setLoading(false);
          return;
        }

        const apiData = await fetchAllProducts();
        setProducts(apiData);
        saveProducts(apiData);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, []);

  const handleAddProduct = async () => {
    try {
      const values = await createForm.validateFields();

      const newProduct: Product = {
        ...values,
        id: Date.now(),
        rating: { rate: 0, count: 0 },
      };

      const updated = addProduct(newProduct);
      setProducts(updated);

      message.success("Product created successfully!");
      createForm.resetFields();
      setOpenCreateModal(false);
    } catch (error) {
      console.error(error);
    }
  };

  const openDrawer = (product: Product) => {
    setProductToEdit(product);
    setDrawerOpen(true);
  };

  const closeDrawer = () => {
    setProductToEdit(null);
    setDrawerOpen(false);
  };

  const handleUpdateProduct = (updatedProduct: Product) => {
    const updated = products.map((p) =>
      p.id === updatedProduct.id ? updatedProduct : p
    );

    saveProducts(updated);
    setProducts(updated);

    message.success("Product updated successfully!");
    closeDrawer();
  };

  const showDeleteModal = (id: number) => {
    setProductToDelete(id);
    setDeleteModalOpen(true);
  };

  const handleConfirmDelete = () => {
    if (productToDelete !== null) {
      const updated = products.filter((p) => p.id !== productToDelete);
      saveProducts(updated);
      setProducts(updated);
      message.success("Product deleted!");
    }
    setDeleteModalOpen(false);
    setProductToDelete(null);
  };

  const filteredProducts = products.filter((p) =>
    p.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center font-semibold gap-2 text-xl">
          <ShoppingOutlined />
          List of Products
        </div>
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={() => setOpenCreateModal(true)}
        >
          New Product
        </Button>
      </div>

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
              <ProductBanner
                item={item}
                onEdit={() => openDrawer(item)}
                onDelete={() => showDeleteModal(item.id)}
              />
            </Col>
          ))}
        </Row>
      )}

      <Modal
        title="New Product"
        open={openCreateModal}
        onCancel={() => setOpenCreateModal(false)}
        footer={null}
        centered
        maskClosable={false}
      >
        <Form
          form={createForm}
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
            <InputNumber prefix="$" className="w-full" min={0} />
          </Form.Item>

          <Form.Item label="Image" name="image" extra="URL image">
            <Input placeholder="https://example.com/image.jpg" />
          </Form.Item>

          <div className="flex justify-end gap-3 mt-6">
            <Button onClick={() => setOpenCreateModal(false)}>Cancel</Button>
            <Button type="primary" onClick={handleAddProduct}>
              Save
            </Button>
          </div>
        </Form>
      </Modal>

      <ProductDrawer
        open={drawerOpen}
        onClose={closeDrawer}
        product={productToEdit}
        onSave={handleUpdateProduct}
      />

      <DeleteProductModal
        open={deleteModalOpen}
        onCancel={() => setDeleteModalOpen(false)}
        onConfirm={handleConfirmDelete}
      />
    </div>
  );
};

export default Products;
