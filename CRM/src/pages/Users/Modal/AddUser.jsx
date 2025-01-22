import React from "react";
import { Form, Input, Modal, Select } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../../../shared/redux/features/userSlice";

const { Option } = Select;

const AddUser = ({ isModalVisible, onCancel, teams }) => {
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const [emailError, setEmailError] = React.useState(null);
  const users = useSelector((state) => state.user.users);

  const handleOk = () => {
    form
      .validateFields()
      .then((values) => {
        const existingUser = users.find((user) => user.email === values.email);
        if (existingUser) {
          setEmailError("This email is already in use.");
          return;
        }

        dispatch(addUser(values)).then(() => {
          form.resetFields();
          onCancel();
          window.location.reload();
        });
      })
      .catch((errorInfo) => {
        console.error("Validation failed:", errorInfo);
      });
  };

  return (
    <Modal
      title="Add User"
      open={isModalVisible}
      onOk={handleOk}
      onCancel={onCancel}
    >
      <Form form={form} layout="vertical">
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
        {emailError && (
          <div
            style={{
              color: "red",
              marginLeft: "40px",
              marginBottom: "10px",
            }}
          >
            {emailError}
          </div>
        )}
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

// AddUser.propTypes = {
//   isModalVisible: PropTypes.bool.isRequired,
//   onCancel: PropTypes.func.isRequired,
//   teams: PropTypes.array.isRequired,
// };

export default AddUser;

//  bu nedi a :D
