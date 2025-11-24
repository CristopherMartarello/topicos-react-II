import { Drawer, Form, Input, Select, Button, notification } from "antd";
import type { User } from "../types/User";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { updateClient } from "../store/clientSlice";

const { Option } = Select;

interface ClientDrawerProps {
  open: boolean;
  onClose: () => void;
  client: User | null;
}

const ClientDrawer = ({ open, onClose, client }: ClientDrawerProps) => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const [api, contextHolder] = notification.useNotification();

  useEffect(() => {
    if (client) {
      form.setFieldsValue({
        state: client.status || "activated",
        firstName: client.name?.firstname,
        lastName: client.name?.lastname,
        email: client.email,
        street: client.address?.street,
        number: client.address?.number,
        zipcode: client.address?.zipcode,
        city: client.address?.city,
        phone: client.phone,
      });
    } else {
      form.resetFields();
    }
  }, [client, form]);

  const handleSave = async () => {
    try {
      const values = await form.validateFields();

      const updatedClient: User = {
        ...(client as User),
        status: values.state,
        name: {
          firstname: values.firstName,
          lastname: values.lastName,
        },
        email: values.email,
        address: {
          street: values.street,
          number: values.number,
          zipcode: values.zipcode,
          city: values.city,
        },
        phone: values.phone,
      };

      dispatch(updateClient(updatedClient));

      api.success({
        message: "Sucesso!",
        description: "Cliente editado com sucesso.",
        placement: "top",
      });
      onClose();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      {contextHolder}
      <Drawer
        title="Edit User"
        placement="right"
        width={400}
        onClose={onClose}
        open={open}
        maskClosable={false}
        destroyOnClose
      >
        <Form layout="vertical" form={form}>
          <Form.Item
            label="State"
            name="state"
            rules={[{ required: true, message: "Please select a state" }]}
          >
            <Select>
              <Option value="activated">Activated</Option>
              <Option value="deactivated">Deactivated</Option>
            </Select>
          </Form.Item>

          <Form.Item
            label="First Name"
            name="firstName"
            rules={[{ required: true, message: "Please enter the first name" }]}
          >
            <Input placeholder="John" />
          </Form.Item>

          <Form.Item
            label="Last Name"
            name="lastName"
            rules={[{ required: true, message: "Please enter the last name" }]}
          >
            <Input placeholder="Doe" />
          </Form.Item>

          <Form.Item
            label="Email"
            name="email"
            rules={[
              { required: true, message: "Please enter the email" },
              { type: "email", message: "Invalid email format" },
            ]}
          >
            <Input placeholder="john@example.com" />
          </Form.Item>

          <Form.Item
            label="Street"
            name="street"
            rules={[{ required: true, message: "Please enter the street" }]}
          >
            <Input placeholder="New Road" />
          </Form.Item>

          <Form.Item
            label="Number"
            name="number"
            rules={[{ required: true, message: "Please enter the number" }]}
          >
            <Input placeholder="123" />
          </Form.Item>

          <Form.Item
            label="ZipCode"
            name="zipcode"
            rules={[{ required: true, message: "Please enter the zipcode" }]}
          >
            <Input placeholder="12345-678" />
          </Form.Item>

          <Form.Item
            label="City"
            name="city"
            rules={[{ required: true, message: "Please enter the city" }]}
          >
            <Input placeholder="Kilcoole" />
          </Form.Item>

          <Form.Item
            label="Phone"
            name="phone"
            rules={[
              { required: true, message: "Please enter the phone number" },
            ]}
          >
            <Input placeholder="1-570-236-7033" />
          </Form.Item>

          <div className="flex justify-end mt-6 gap-3">
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

export default ClientDrawer;
