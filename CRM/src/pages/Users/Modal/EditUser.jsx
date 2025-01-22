import { Form, Input, Modal, Select } from "antd";
import { useDispatch } from "react-redux";
import { editUser } from "../../../shared/redux/features/userSlice";

const { Option } = Select;

const EditUser = ({ isModalVisible, onCancel, currentUser, teams }) => {
  const dispatch = useDispatch();
  const [form] = Form.useForm();

  const handleOk = () => {
    form
      .validateFields()
      .then((values) => {
        const updatedUser = { ...currentUser, ...values };
        dispatch(editUser(updatedUser));
        form.resetFields();
        onCancel();
      })
      .catch((errorInfo) => {
        console.error("Validation failed:", errorInfo);
      });
  };

  return (
    <Modal
      title="Edit User"
      open={isModalVisible}
      onOk={handleOk}
      onCancel={onCancel}
    >
      <Form form={form} layout="vertical" initialValues={currentUser}>
        <Form.Item
          name="firstName"
          rules={[{ required: true, message: "First name is required" }]}
        >
          <Input placeholder="First Name" />
        </Form.Item>
        <Form.Item
          name="lastName"
          rules={[{ required: true, message: "Last name is required" }]}
        >
          <Input placeholder="Last Name" />
        </Form.Item>
        <Form.Item
          name="email"
          rules={[{ required: true, message: "Email is required" }]}
        >
          <Input placeholder="Email" />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[{ required: true, message: "Password is required" }]}
        >
          <Input.Password placeholder="Password" />
        </Form.Item>
        <Form.Item name="teamId">
          <Select placeholder="Select a team">
            {teams?.map((team) => (
              <Option key={team?.id} value={team?.id}>
                {team?.name}
              </Option>
            ))}
          </Select>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default EditUser;
