import { Modal, Button } from "antd";
import PropTypes from "prop-types";

const ShowTeam = ({ visible, onCancel, team, users }) => {
  return (
    <Modal
      title="Team Details"
      open={visible}
      onCancel={onCancel}
      footer={<Button onClick={onCancel}>Close</Button>}
    >
      <p>
        <strong>Team Name:</strong> {team?.name}
      </p>
      <p>
        <strong>Users:</strong>{" "}
        {team?.userIds
          ?.map((userId) => {
            const user = users.find((u) => u.id === userId);
            return user ? `${user.firstName} ${user.lastName}` : null;
          })
          .join(", ")}
      </p>
    </Modal>
  );
};

ShowTeam.propTypes = {
  visible: PropTypes.bool.isRequired, 
  onCancel: PropTypes.func.isRequired, 
  team: PropTypes.object,
  users: PropTypes.array.isRequired, 
};

export default ShowTeam;

