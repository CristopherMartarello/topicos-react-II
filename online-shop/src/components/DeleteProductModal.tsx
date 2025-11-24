import { Modal } from "antd";

interface DeleteProductModalProps {
  open: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

export default function DeleteProductModal({
  open,
  onConfirm,
  onCancel,
}: DeleteProductModalProps) {
  return (
    <Modal
      title="Confirm deletion"
      open={open}
      onCancel={onCancel}
      onOk={onConfirm}
      okText="Delete"
      cancelText="Cancel"
      centered
      okButtonProps={{ danger: true }}
    >
      Are you sure you want to delete this product?
    </Modal>
  );
}
