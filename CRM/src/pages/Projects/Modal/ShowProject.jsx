import { Modal, Button } from "antd";

const ShowProject = ({ visible, onCancel, currentProject, users }) => {
  return (
    <Modal
      title="Project Details"
      open={visible}
      onCancel={onCancel}
      footer={<Button onClick={onCancel}>Close</Button>}
    >
      <p>
        <strong>Project Name:</strong> {currentProject?.name}
      </p>
      <p>
        <strong>Assigned Users:</strong>
        {currentProject?.userIds
          ?.map((id) => users.find((user) => user.id === id)?.firstName)
          .join(", ")}
      </p>
    </Modal>
  );
};

export default ShowProject;
