import { Modal, Form, Input } from "antd";
import { useDispatch } from "react-redux";
import { addTeam } from "../../../shared/redux/features/teamSlice";

const AddTeam = ({ visible, onCancel }) => {
  const dispatch = useDispatch();
  const [form] = Form.useForm();

  const handleOk = () => {
    form.validateFields().then((values) => {
      dispatch(addTeam(values)); // Dispatch the add team action with form data
      console.log(values);
      form.resetFields(); // Reset the form after successful submission
      onCancel(); // Close the modal after submission
    });
  };

  return (
    <Modal title="Add Team" open={visible} onOk={handleOk} onCancel={onCancel}>
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

export default AddTeam;
