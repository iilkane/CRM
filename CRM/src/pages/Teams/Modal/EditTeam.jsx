import { useEffect } from "react";
import { Modal, Form, Input } from "antd";
import { useDispatch } from "react-redux";
import { editTeam } from "../../../shared/redux/features/teamSlice";
import PropTypes from "prop-types";

const EditTeam = ({ visible, onCancel, team }) => {
  const dispatch = useDispatch();
  const [form] = Form.useForm();

  useEffect(() => {
    if (team) {
      form.setFieldsValue({ name: team.name }); // Pre-fill the form with team details
    }
  }, [team, form]);

  const handleOk = () => {
    form.validateFields().then((values) => {
      dispatch(editTeam({ ...team, ...values })); // Dispatch edit team action with updated data
      onCancel(); // Close modal after successful edit
    });
  };

  return (
    <Modal
      title="Edit Team"
      open={visible}
      onOk={handleOk}
      onCancel={onCancel}
    >
      <Form form={form} layout="vertical">
        <Form.Item
          name="name"
          label=""
          rules={[{ required: true, message: "Team Name is required" }]}
        >
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  );
};

EditTeam.propTypes = {
  visible: PropTypes.bool.isRequired, 
  onCancel: PropTypes.func.isRequired, 
  team: PropTypes.object, 
};

export default EditTeam;
