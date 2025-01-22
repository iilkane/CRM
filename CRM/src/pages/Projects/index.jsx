import { useEffect, useState } from "react";
import { Table, Button, Space, Tooltip, Pagination } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { fetchProjects } from "../../shared/redux/features/projectSlice";
import { fetchUsers } from "../../shared/redux/features/userSlice";
import { EditOutlined, EyeOutlined } from "@ant-design/icons";
import AddProject from "./Modal/AddProject";
import EditProject from "./Modal/EditProject";
import ShowProject from "./Modal/ShowProject";

const Index = () => {
  const dispatch = useDispatch();
  const projects = useSelector((state) => state.project.projects);
  const users = useSelector((state) => state.user.users);

  const [isAddModalVisible, setIsAddModalVisible] = useState(false);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [isShowModalVisible, setIsShowModalVisible] = useState(false);
  const [currentProject, setCurrentProject] = useState(null);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(4);

  // Fetch projects and users
  useEffect(() => {
    dispatch(fetchProjects());
    dispatch(fetchUsers());
  }, [dispatch]);

  // Pagination handler
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const paginatedProjects = projects.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  const columns = [
    { title: "Project Name", dataIndex: "projectName" },
    {
      title: "Actions",
      render: (_, project) => (
        <Space>
          {/* Show Button */}
          <Tooltip title="Show Project">
            <Button
              icon={<EyeOutlined />}
              onClick={() => {
                setCurrentProject(project);
                setIsShowModalVisible(true);
              }}
            />
          </Tooltip>
          {/* Edit Button */}
          <Tooltip title="Edit Project">
            <Button
              icon={<EditOutlined />}
              onClick={() => {
                setCurrentProject(project);
                setIsEditModalVisible(true);
              }}
              type="primary"
            />
          </Tooltip>
        </Space>
      ),
    },
  ];

  return (
    <div className="project-page">
      <Button type="primary" onClick={() => setIsAddModalVisible(true)}>
        Add Project
      </Button>
      <Table
        columns={columns}
        dataSource={paginatedProjects}
        rowKey="id"
        pagination={false}
      />

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

      {/* Add Project Modal */}
      <AddProject
        visible={isAddModalVisible}
        onCancel={() => setIsAddModalVisible(false)}
      />

      {/* Edit Project Modal */}
      <EditProject
        visible={isEditModalVisible}
        onCancel={() => setIsEditModalVisible(false)}
        currentProject={currentProject}
      />

      {/* Show Project Modal */}
      <ShowProject
        visible={isShowModalVisible}
        onCancel={() => setIsShowModalVisible(false)}
        currentProject={currentProject}
        users={users}
      />
    </div>
  );
};

export default Index;
