import { useEffect, useState } from "react";
import { Table, Button, Modal, Form, Input, Select, Space, Tooltip, Pagination } from "antd";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchProjects,
  addProject,
  editProject,
} from "../../shared/redux/features/projectSlice";
import { fetchUsers } from "../../shared/redux/features/userSlice";
import { EditOutlined, EyeOutlined } from "@ant-design/icons";

const Index = () => {
  const dispatch = useDispatch();
  const projects = useSelector((state) => state.project.projects);
  const users = useSelector((state) => state.user.users);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isShowModalVisible, setIsShowModalVisible] = useState(false);
  const [currentProject, setCurrentProject] = useState(null);
  const [form] = Form.useForm();

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(4); 

  // Fetch projects and users
  useEffect(() => {
    dispatch(fetchProjects());
    dispatch(fetchUsers());
  }, [dispatch]);

  // Handle adding a new project
  const handleAddProject = () => {
    setCurrentProject(null);
    form.resetFields();  // Reset form fields for "Add Project"
    setIsModalVisible(true);
  };

  // Handle editing an existing project
  const handleEditProject = (project) => {
    setCurrentProject(project);
    form.setFieldsValue({
      ...project,
      userIds: project.userIds || [], // Populate selected users when editing
    });
    setIsModalVisible(true);
  };

  // Handle modal submit
  const handleOk = () => {
    form.validateFields().then((values) => {
      const { name, userIds } = values;
      if (currentProject) {
        // If editing, update the project with selected users
        dispatch(editProject({ ...currentProject, name, userIds }));
      } else {
        // If adding, create a new project with selected users
        dispatch(addProject({ name, userIds }));
      }
      setIsModalVisible(false);
    });
  };

  // Handle modal cancel
  const handleCancel = () => {
    setIsModalVisible(false);
  };

  // Handle show project details modal
  const handleShowProject = (project) => {
    setCurrentProject(project);
    setIsShowModalVisible(true);
  };

  // Pagination handler
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const paginatedProjects = projects.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  const columns = [
    { title: "Project Name", dataIndex: "name" },
    {
      title: "Assigned Users",
      dataIndex: "userIds",
      render: (userIds) =>
        userIds
          ?.map((id) => users.find((user) => user.id === id)?.firstName)
          .join(", "),
    },
    {
      title: "Actions",
      render: (_, project) => (
        <Space>
          {/* Show Button */}
          <Tooltip title="Show Project">
            <Button
              icon={<EyeOutlined />}
              onClick={() => handleShowProject(project)}
            />
          </Tooltip>
          {/* Edit Button */}
          <Tooltip title="Edit Project">
            <Button
              icon={<EditOutlined />}
              onClick={() => handleEditProject(project)}
              type="primary"
            />
          </Tooltip>
        </Space>
      ),
    },
  ];

  return (
    <div className="project-page">
      <Button type="primary" onClick={handleAddProject}>
        Add Project
      </Button>
      <Table columns={columns} dataSource={paginatedProjects} rowKey="id" pagination={false} />

      {/* Pagination Component */}
      <div className="pagination-container">
        <Pagination
          current={currentPage}
          pageSize={pageSize}
          total={projects.length}
          onChange={handlePageChange}
          showSizeChanger={false} 
        />
      </div>

      {/* Modal for adding/editing project */}
      <Modal
        title={currentProject ? "Edit Project" : "Add Project"}
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="name"
            rules={[{ required: true, message: "Project Name is required" }]} >
            <Input />
          </Form.Item>

          {/* Select users for the project */}
          <Form.Item
            name="userIds"
            rules={[{ required: true, message: "Please select at least one user" }]} >
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

      {/* Show Project Modal */}
      <Modal
        title="Project Details"
        visible={isShowModalVisible}
        onCancel={() => setIsShowModalVisible(false)}
        footer={<Button onClick={() => setIsShowModalVisible(false)}>Close</Button>}
      >
        <p>
          <strong>Project Name:</strong> {currentProject?.name}
        </p>
        <p>
          <strong>Assigned Users:</strong>{" "}
          {currentProject?.userIds
            ?.map((id) => users.find((user) => user.id === id)?.firstName)
            .join(", ")}
        </p>
      </Modal>
    </div>
  );
};

export default Index;

