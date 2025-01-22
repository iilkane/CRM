import { useEffect } from "react";
import { Modal, Form, Input, Select } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { editProject } from "../../../shared/redux/features/projectSlice";

const EditProject = ({ visible, onCancel, currentProject }) => {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.user.users);
  const [form] = Form.useForm();

  useEffect(() => {
    if (currentProject) {
      form.setFieldsValue({
        ...currentProject,
        userIds: currentProject.userIds || [],
      });
    }
  }, [currentProject, form]);

  const handleOk = () => {
    form.validateFields().then((values) => {
      const { projectName, userIds } = values;
      dispatch(editProject({ ...currentProject, projectName, userIds }));
      onCancel(); // Close modal after editing
    });
  };

  return (
    <Modal
      title="Edit Project"
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

export default EditProject;
