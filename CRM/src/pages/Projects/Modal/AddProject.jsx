import PropTypes from "prop-types";
import { Modal, Form, Input, Select } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { addProject } from "../../../shared/redux/features/projectSlice";

const AddProject = ({ visible, onCancel }) => {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.user.users);
  const [form] = Form.useForm();

  const handleOk = () => {
    form.validateFields().then((values) => {
      const { projectName, userIds } = values;
      dispatch(addProject({ projectName, userIds }));
      form.resetFields();
      onCancel(); // Close modal after adding
    });
  };

  return (
    <Modal
      title="Add Project"
      open={visible}
      onOk={handleOk}
      onCancel={onCancel}
    >
      <Form form={form} layout="vertical">
        <Form.Item
          name="projectName"
          rules={[{ required: true, message: "Project Name is required" }]}
        >
          <Input />
        </Form.Item>

        {/* Select users for the project */}
        <Form.Item
          name="userIds"
          rules={[
            { required: true, message: "Please select at least one user" },
          ]}
        >
          <Select
            mode="multiple"
            placeholder="Select users"
            options={users.map((user) => ({
              label: `${user.firstName} ${user.lastName}`,
              value: user.id,
            }))}
          />
        </Form.Item>
      </Form>
    </Modal>
  );
};

// Prop Types validation
AddProject.propTypes = {
  visible: PropTypes.bool.isRequired,
  onCancel: PropTypes.func.isRequired,
};

export default AddProject;
