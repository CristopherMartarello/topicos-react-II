import { Modal, Form, Input, Select, notification } from "antd";
import { useEffect } from "react";
import type { User } from "../types/User";
import { saveClients } from "../services/storageService";
import { useDispatch } from "react-redux";
import { setClients } from "../store/clientSlice";

const { Option } = Select;

interface CreateClientModalProps {
  open: boolean;
  onCancel: () => void;
  clients: User[];
}

const CreateClientModal = ({
  open,
  onCancel,
  clients,
}: CreateClientModalProps) => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const [api, contextHolder] = notification.useNotification();

  const handleCreate = async () => {
    try {
      const values = await form.validateFields();

      const newClient: User = {
        id: Date.now(),
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

      const updatedList = [...clients, newClient];

      dispatch(setClients(updatedList));
      saveClients(updatedList);

      api.success({
        message: "Sucesso!",
        description: "Cliente criado com sucesso.",
        placement: "top",
      });

      form.resetFields();
      onCancel();
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    if (!open) form.resetFields();
  }, [open]);

  return (
    <>
      {contextHolder}
      <Modal
        title="Create New Client"
        open={open}
        onCancel={onCancel}
        onOk={handleCreate}
        okText="Create"
        width={500}
        centered
      >
        <Form layout="vertical" form={form}>
          <Form.Item
            label="State"
            name="state"
            initialValue="activated"
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
            <Input />
          </Form.Item>

          <Form.Item
            label="Last Name"
            name="lastName"
            rules={[{ required: true, message: "Please enter the last name" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Email"
            name="email"
            rules={[
              { required: true, message: "Please enter the email" },
              { type: "email", message: "Invalid email format" },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Street"
            name="street"
            rules={[{ required: true, message: "Please enter the street" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Number"
            name="number"
            rules={[{ required: true, message: "Please enter the number" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="ZipCode"
            name="zipcode"
            rules={[{ required: true, message: "Please enter the zipcode" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="City"
            name="city"
            rules={[{ required: true, message: "Please enter the city" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Phone"
            name="phone"
            rules={[
              { required: true, message: "Please enter the phone number" },
            ]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default CreateClientModal;
