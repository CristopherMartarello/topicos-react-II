import { Drawer, Form, Input, InputNumber, Button, notification } from "antd";
import type { Product } from "../types/Product";
import { useEffect } from "react";

interface ProductDrawerProps {
  open: boolean;
  onClose: () => void;
  product: Product | null;
  onSave: (product: Product) => void;
}

const ProductDrawer = ({
  open,
  onClose,
  product,
  onSave,
}: ProductDrawerProps) => {
  const [form] = Form.useForm();
  const [api, contextHolder] = notification.useNotification();

  useEffect(() => {
    if (product) {
      form.setFieldsValue(product);
    } else {
      form.resetFields();
    }
  }, [product, form]);

  const handleSave = async () => {
    try {
      const values = await form.validateFields();

      const updatedProduct: Product = {
        ...(product as Product),
        ...values,
      };

      onSave(updatedProduct);

      api.success({
        message: "Success!",
        description: "Product updated successfully.",
        placement: "top",
      });

      onClose();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      {contextHolder}
      <Drawer
        title="Edit Product"
        width={420}
        onClose={onClose}
        open={open}
        destroyOnClose
      >
        <Form form={form} layout="vertical">
          <Form.Item label="Title" name="title" rules={[{ required: true }]}>
            <Input />
          </Form.Item>

          <Form.Item
            label="Description"
            name="description"
            rules={[{ required: true }]}
          >
            <Input.TextArea rows={3} />
          </Form.Item>

          <Form.Item
            label="Category"
            name="category"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>

          <Form.Item label="Price" name="price" rules={[{ required: true }]}>
            <InputNumber className="w-full" min={0} />
          </Form.Item>

          <Form.Item label="Image" name="image">
            <Input />
          </Form.Item>

          <div className="flex justify-end gap-3 mt-6">
            <Button onClick={onClose}>Cancel</Button>
            <Button type="primary" onClick={handleSave}>
              Save
            </Button>
          </div>
        </Form>
      </Drawer>
    </>
  );
};

export default ProductDrawer;
