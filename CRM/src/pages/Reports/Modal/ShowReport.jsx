import { Modal, Button } from "antd";
import dayjs from 'dayjs';
import PropTypes from 'prop-types';

const ShowReport = ({ isViewModalVisible, currentReport, handleCancel }) => {
  return (
    <Modal
      title="View Report"
      open={isViewModalVisible}
      onCancel={handleCancel}
      footer={<Button onClick={() => handleCancel()}>Close</Button>}
    >
      <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
        <p><strong>User:</strong> {currentReport?.user}</p>
        <p><strong>Description:</strong> {currentReport?.description}</p>
        <p><strong>Create Date:</strong> {currentReport?.createDate ? dayjs(currentReport.createDate).format('YYYY-MM-DD') : ''}</p>
        <p><strong>Project Name:</strong> {currentReport?.projectName}</p>
      </div>
    </Modal>
  );
};

ShowReport.propTypes = {
  isViewModalVisible: PropTypes.bool.isRequired,
  currentReport: PropTypes.object,
  handleCancel: PropTypes.func.isRequired,
};

export default ShowReport;


