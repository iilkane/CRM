import { useEffect, useState } from "react";
import {
  Table,
  Button,
  Modal,
  Form,
  Input,
  Space,
  Tooltip,
  Pagination,
  Select,
} from "antd";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchUsers,
  addUser,
  editUser,
  deleteUser,
} from "../../shared/redux/features/userSlice";
import { fetchTeams } from "../../shared/redux/features/teamSlice";
import { EditOutlined, DeleteOutlined, EyeOutlined } from "@ant-design/icons";

const { Option } = Select;

const UserPage = () => {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.user.users);
  const teams = useSelector((state) => state.team.teams);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isShowModalVisible, setIsShowModalVisible] = useState(false);
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [deleteUserId, setDeleteUserId] = useState(null);
  const [form] = Form.useForm();

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 4;

  useEffect(() => {
    dispatch(fetchUsers());
    dispatch(fetchTeams());
  }, [dispatch]);

  // Modal operations
  const handleAddUser = () => {
    setCurrentUser(null);
    form.resetFields();
    setIsModalVisible(true);
  };

  const handleEditUser = (user) => {
    setCurrentUser(user);
    form.setFieldsValue(user);
    setIsModalVisible(true);
  };

  const handleDeleteUser = () => {
    if (deleteUserId) {
      dispatch(deleteUser(deleteUserId));
      setDeleteUserId(null);
      setIsDeleteModalVisible(false);
    }
  };

  const handleShowUser = (user) => {
    setCurrentUser(user);
    setIsShowModalVisible(true);
  };

  const handleOk = () => {
    form.validateFields().then((values) => {
      if (currentUser) {
        dispatch(editUser({ ...currentUser, ...values }));
      } else {
        dispatch(addUser(values));
      }
      setIsModalVisible(false);
    });
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  // Pagination handler
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  // Paginate users
  const paginatedUsers = users.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  const columns = [
    { title: "First Name", dataIndex: "firstName" },
    { title: "Last Name", dataIndex: "lastName" },
    { title: "Email", dataIndex: "email" },
    {
      title: "Team",
      render: (_, user) => {
        const team = teams.find((team) => team.userIds.includes(user.id));
        return team ? team.name : "No Team";
      },
    },
    {
      title: "Actions",
      render: (_, user) => (
        <Space>
          <Tooltip title="Show">
            <Button icon={<EyeOutlined />} onClick={() => handleShowUser(user)} />
          </Tooltip>
          <Tooltip title="Delete">
            <Button
              icon={<DeleteOutlined />}
              danger
              onClick={() => {
                setDeleteUserId(user.id);
                setIsDeleteModalVisible(true);
              }}
            />
          </Tooltip>
          <Tooltip title="Edit">
            <Button
              icon={<EditOutlined />}
              onClick={() => handleEditUser(user)}
              type="primary"
            />
          </Tooltip>
        </Space>
      ),
    },
  ];

  return (
    <div className="user-page">
      <Button type="primary" onClick={handleAddUser}>
        Add User
      </Button>

      {/* User Table */}
      <Table
        columns={columns}
        dataSource={paginatedUsers}
        rowKey="id"
        pagination={false}
      />

      {/* Pagination Component */}
      <div className="pagination-container">
        <Pagination
          current={currentPage}
          pageSize={pageSize}
          total={users.length}
          onChange={handlePageChange}
          showSizeChanger={false}
        />
      </div>

      {/* Add/Edit User Modal */}
      <Modal
        title={currentUser ? "Edit User" : "Add User"}
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Form form={form} layout="vertical">
          <Form.Item name="firstName">
            <Input placeholder="First Name" />
          </Form.Item>
          <Form.Item name="lastName">
            <Input placeholder="Last Name" />
          </Form.Item>
          <Form.Item name="email">
            <Input placeholder="Email" />
          </Form.Item>
          <Form.Item name="password">
            <Input.Password placeholder="Password" />
          </Form.Item>
          <Form.Item name="teamId">
            <Select placeholder="Select a team">
              {teams.map((team) => (
                <Option key={team.id} value={team.id}>
                  {team.name}
                </Option>
              ))}
            </Select>
          </Form.Item>
        </Form>
      </Modal>

      {/* Show User Modal */}
      <Modal
        title="User Details"
        visible={isShowModalVisible}
        onCancel={() => setIsShowModalVisible(false)}
        footer={[
          <Button key="close" onClick={() => setIsShowModalVisible(false)}>
            Close
          </Button>,
        ]}
      >
        <div>
          <p style={{ marginBottom: "10px" }}><strong>First Name:</strong> {currentUser?.firstName}</p>
          <p style={{ marginBottom: "10px" }}><strong>Last Name:</strong> {currentUser?.lastName}</p>
          <p style={{ marginBottom: "10px" }}><strong>Email:</strong> {currentUser?.email}</p>
          <p style={{ marginBottom: "10px" }}>
            <strong>Team:</strong> {teams.find((team) => team.userIds.includes(currentUser?.id))?.name || "No Team"}
          </p>
          <p style={{ marginBottom: "10px" }}><strong>Password:</strong> {currentUser?.password}</p>
        </div>
      </Modal>

      {/* Delete User Modal */}
      <Modal
        title="Are you sure to delete this user?"
        visible={isDeleteModalVisible}
        onOk={handleDeleteUser}
        onCancel={() => setIsDeleteModalVisible(false)}
        okText="Delete"
        okButtonProps={{ style: { backgroundColor: "red", color: "white" } }}
      >
        <p>Do you really want to delete this user?</p>
      </Modal>
    </div>
  );
};

export default UserPage;

