import { Modal } from "antd";

interface DeleteClientModalProps {
  open: boolean;
  onOk: () => void;
  onCancel: () => void;
}

const DeleteClientModal = ({
  open,
  onOk,
  onCancel,
}: DeleteClientModalProps) => {
  return (
    <Modal
      title="Confirm deletion"
      open={open}
      onOk={onOk}
      onCancel={onCancel}
      okText="Delete"
      cancelText="Cancel"
      okButtonProps={{ danger: true }}
      centered
    >
      <p>Are you sure you want to delete this client?</p>
    </Modal>
  );
};

export default DeleteClientModal;
