import { PlusOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Empty, Space, Spin, Table, Tag, type TableProps } from "antd";
import { useEffect, useState } from "react";
import { fetchAllClients } from "../services/clientService";
import type { User } from "../types/User";

interface DataType {
  key: string;
  name: string;
  email: string;
  createdAt: string;
  address: string;
  phone: string;
  status: React.ReactNode;
}

const Clients = () => {
  const [clients, setClients] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  const columns: TableProps<DataType>["columns"] = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "E-mail",
      dataIndex: "email",
      key: "email",
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
    // {
    //   title: "Tags",
    //   key: "tags",
    //   dataIndex: "tags",
    //   render: (_, { tags }) => (
    //     <>
    //         return (
    //           <Tag color={"green"} key={tag}>
    //             {tag.toUpperCase()}
    //           </Tag>
    //         );
    //     </>
    //   ),
    // },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <a>Invite {record.name}</a>
          <a>Delete</a>
        </Space>
      ),
    },
  ];

  const data: DataType[] = clients.map((client) => ({
    key: client.id?.toString(),
    name: client.username,
    email: client.email,
    address: client.address.street,
    createdAt: client.phone,
    phone: client.phone,
    status: client.username,
  }));

  useEffect(() => {
    const loadClients = async () => {
      try {
        // const localData = getClients();
        // if (localData.length > 0) {
        //   setClients(localData);
        //   setLoading(false);
        //   return;
        // }

        const data = await fetchAllClients();
        setClients(data);
        // saveClients(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    loadClients();
  }, []);

  const handleNewProductClick = () => {
    console.log("New Client Clicked");
  };

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
          onClick={handleNewProductClick}
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
    </div>
  );
};

export default Clients;
