import {
  PlusOutlined,
  UserOutlined,
  DeleteFilled,
  EditFilled,
} from "@ant-design/icons";
import {
  Button,
  Empty,
  Space,
  Spin,
  Table,
  Tag,
  Tooltip,
  type TableProps,
  message,
} from "antd";
import { useEffect, useState } from "react";
import { fetchAllClients } from "../services/clientService";
import type { User } from "../types/User";
import ClientDrawer from "../components/ClientDrawer";
import DeleteClientModal from "../components/DeleteClientModal";
import CreateClientModal from "../components/CreateClientModal";
import { capitalizeFirstLetter, randomPastDate } from "../utils/formatters";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../store/store";
import { deleteClient, setClients } from "../store/clientSlice";

interface DataType {
  key: string;
  name: {
    firstname: string;
    lastname: string;
  };
  email: string;
  createdAt: string;
  address: string;
  phone: string;
  status: string;
}

const Clients = () => {
  const clients = useSelector((state: RootState) => state.clients.clients);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [selectedClient, setSelectedClient] = useState<User | null>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [clientToDelete, setClientToDelete] = useState<number | null>(null);

  const openDrawer = (client: User) => {
    setSelectedClient(client);
    setDrawerOpen(true);
  };

  const closeDrawer = () => {
    setDrawerOpen(false);
    setSelectedClient(null);
  };

  const showDeleteModal = (id: number) => {
    setClientToDelete(id);
    setIsDeleteModalOpen(true);
  };

  const handleOkDelete = () => {
    if (clientToDelete !== null) {
      dispatch(deleteClient(clientToDelete));
      message.success("Client deleted successfully!");
    }
    setIsDeleteModalOpen(false);
    setClientToDelete(null);
  };

  const handleCancelDelete = () => {
    setIsDeleteModalOpen(false);
    setClientToDelete(null);
  };

  const columns: TableProps<DataType>["columns"] = [
    {
      title: "Name",
      children: [
        {
          title: "First Name",
          dataIndex: ["name", "firstname"],
          key: "firstname",
          sorter: (a, b) => a.name.firstname.localeCompare(b.name.firstname),
        },
        {
          title: "Last Name",
          dataIndex: ["name", "lastname"],
          key: "lastname",
          sorter: (a, b) => a.name.lastname.localeCompare(b.name.lastname),
        },
      ],
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Created At",
      dataIndex: "createdAt",
      key: "createdAt",
      sorter: (a, b) =>
        new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime(),
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
    },
    {
      title: "Phone",
      dataIndex: "phone",
      key: "phone",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      sorter: (a, b) => a.status.localeCompare(b.status),
      render: (status: string) => (
        <Tag color={status === "Activated" ? "green" : "red"}>
          {status.toUpperCase()}
        </Tag>
      ),
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <Tooltip title="Edit">
            <EditFilled
              className="cursor-pointer text-blue-500"
              onClick={() => {
                const client = clients.find(
                  (c) => c.id?.toString() === record.key
                );
                if (client) openDrawer(client);
              }}
            />
          </Tooltip>

          <Tooltip title="Delete">
            <DeleteFilled
              style={{ color: "red" }}
              className="cursor-pointer"
              onClick={() => showDeleteModal(Number(record.key))}
            />
          </Tooltip>
        </Space>
      ),
    },
  ];

  const data: DataType[] = clients.map((client) => ({
    key: String(client.id),
    name: {
      firstname: capitalizeFirstLetter(client.name.firstname),
      lastname: capitalizeFirstLetter(client.name.lastname),
    },
    email: client.email.toLowerCase(),
    address: `${capitalizeFirstLetter(client.address.street)}, ${
      client.address.number
    } - ${capitalizeFirstLetter(client.address.city)}`,
    createdAt: randomPastDate(),
    phone: client.phone,
    status: capitalizeFirstLetter(client.status || "activated"),
  }));

  useEffect(() => {
    const loadClients = async () => {
      try {
        const data = await fetchAllClients();
        dispatch(setClients(data));
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    loadClients();
  }, [dispatch]);

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center font-semibold gap-2 text-xl">
          <UserOutlined />
          List of Clients
        </div>

        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={() => setIsCreateModalOpen(true)}
        >
          New Client
        </Button>
      </div>

      {loading ? (
        <div className="flex justify-center py-10">
          <Spin size="large" />
        </div>
      ) : clients.length === 0 ? (
        <Empty description="No clients found" />
      ) : (
        <Table<DataType> columns={columns} dataSource={data} />
      )}

      <DeleteClientModal
        open={isDeleteModalOpen}
        onOk={handleOkDelete}
        onCancel={handleCancelDelete}
      />

      <CreateClientModal
        open={isCreateModalOpen}
        onCancel={() => setIsCreateModalOpen(false)}
        clients={clients}
      />

      <ClientDrawer
        open={drawerOpen}
        onClose={closeDrawer}
        client={selectedClient}
        allClients={clients}
      />
    </div>
  );
};

export default Clients;
