import { Modal, Form, Input, Select, DatePicker } from "antd";
import dayjs from "dayjs";

const AddReport = ({
  isModalVisible,
  form,
  handleOk,
  handleCancel,
  users,
  projects,
}) => {
  return (
    <Modal
      title="Add Report"
      open={isModalVisible}
      onOk={handleOk}
      onCancel={handleCancel}
    >
      <Form form={form} layout="vertical">
        <Form.Item
          name="user"
          label=""
          rules={[{ required: true, message: "User is required" }]}
        >
          <Select>
            {users.map((user) => (
              <Select.Option key={user.id} value={user.firstName}>
                {user.firstName} {user.lastName}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item
          name="description"
          label=""
          rules={[{ required: true, message: "Description is required" }]}
        >
          <Input.TextArea />
        </Form.Item>
        <Form.Item
          name="createDate"
          label=""
          rules={[{ required: true, message: "Create Date is required" }]}
        >
          <DatePicker
            style={{ width: "100%" }}
            value={
              form.getFieldValue("createDate")
                ? dayjs(form.getFieldValue("createDate"))
                : null
            }
            onChange={(date) =>
              form.setFieldsValue({ createDate: date ? date : null })
            }
          />
        </Form.Item>
        <Form.Item
          name="projectName"
          label=""
          rules={[{ required: true, message: "Project Name is required" }]}
        >
          <Select>
            {projects.map((project) => (
              <Select.Option key={project.id} value={project.projectName}>
                {project.projectName}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default AddReport;
