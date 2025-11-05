import React, { useState } from "react";
import { Modal, Form, Input, InputNumber, Button, message, theme } from "antd";

interface ProductModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (values: unknown) => void;
}

const ProductModal: React.FC<ProductModalProps> = ({
  open,
  onClose,
  onSubmit,
}) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const { token } = theme.useToken();

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();
      setLoading(true);
      onSubmit(values);
      message.success("Produto cadastrado com sucesso!");
      form.resetFields();
      onClose();
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      title="New Product"
      open={open}
      onCancel={onClose}
      footer={null}
      maskClosable={false}
      keyboard={false}
      centered
      style={{ maxWidth: 600 }}
      bodyStyle={{ padding: 24, background: token.colorBgContainer }}
    >
      <Form form={form} layout="vertical">
        <Form.Item
          label="Title"
          name="title"
          rules={[{ required: true, message: "Please enter the title" }]}
        >
          <Input placeholder="Product title" />
        </Form.Item>

        <Form.Item
          label="Description"
          name="description"
          rules={[{ required: true, message: "Please enter the description" }]}
        >
          <Input.TextArea rows={3} placeholder="Product description" />
        </Form.Item>

        <Form.Item
          label="Category"
          name="category"
          rules={[{ required: true, message: "Please select a category" }]}
        >
          <Input placeholder="Category name" />
        </Form.Item>

        <Form.Item
          label="Price"
          name="price"
          rules={[{ required: true, message: "Please enter the price" }]}
        >
          <InputNumber
            prefix="$"
            min={0}
            className="w-full"
            formatter={(v) => `$ ${v}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
          />
        </Form.Item>

        <Form.Item
          label="Image"
          name="image"
          rules={[{ required: true, message: "Please enter an image URL" }]}
          extra="URL image"
        >
          <Input placeholder="https://example.com/image.jpg" />
        </Form.Item>

        <div className="flex justify-end gap-3 mt-6">
          <Button onClick={onClose}>Cancel</Button>
          <Button type="primary" loading={loading} onClick={handleSubmit}>
            Save
          </Button>
        </div>
      </Form>
    </Modal>
  );
};

export default ProductModal;
