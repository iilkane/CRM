import { useEffect, useState } from "react";
import { Table, Button, Modal, Space, Tooltip, Pagination } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsers, deleteUser } from "../../shared/redux/features/userSlice";
import { fetchTeams } from "../../shared/redux/features/teamSlice";
import { EditOutlined, DeleteOutlined, EyeOutlined } from "@ant-design/icons";
import AddUser from "./Modal/AddUser";
import EditUser from "./Modal/EditUser";

const UserPage = () => {
  const dispatch = useDispatch();
  const { users, status: userStatus } = useSelector((state) => state.user);
  const { teams, status: teamStatus } = useSelector((state) => state.team);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isShowModalVisible, setIsShowModalVisible] = useState(false);
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [deleteUserId, setDeleteUserId] = useState(null);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 4;

  useEffect(() => {
    dispatch(fetchUsers());
    dispatch(fetchTeams());
  }, [dispatch, teams]);

  // Modal operations
  const handleAddUser = () => {
    setCurrentUser(null);
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
        const team =
          teams && teams?.find((team) => team?.userIds?.includes(user.id));
        return team ? team.name : "No Team";
      },
    },
    {
      title: "Actions",
      render: (_, user) => (
        <Space>
          <Tooltip title="Show">
            <Button
              icon={<EyeOutlined />}
              onClick={() => handleShowUser(user)}
            />
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
              onClick={() => {
                setCurrentUser(user);
                setIsModalVisible(true);
              }}
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
      <AddUser
        isModalVisible={isModalVisible && !currentUser}
        onCancel={() => setIsModalVisible(false)}
        teams={teams}
      />
      <EditUser
        isModalVisible={isModalVisible && currentUser}
        onCancel={() => setIsModalVisible(false)}
        currentUser={currentUser}
        teams={teams}
      />

      {/* Show User Modal */}
      <Modal
        title="User Details"
        open={isShowModalVisible}
        onCancel={() => setIsShowModalVisible(false)}
        footer={[
          <Button key="close" onClick={() => setIsShowModalVisible(false)}>
            Close
          </Button>,
        ]}
      >
        <div>
          <p>
            <strong>First Name:</strong> {currentUser?.firstName}
          </p>
          <p>
            <strong>Last Name:</strong> {currentUser?.lastName}
          </p>
          <p>
            <strong>Email:</strong> {currentUser?.email}
          </p>
          <p>
            <strong>Team:</strong>{" "}
            {(teams &&
              teams?.find((team) => team?.userIds?.includes(currentUser?.id))
                ?.name) ||
              "No Team"}
          </p>
          <p>
            <strong>Password:</strong> {currentUser?.password}
          </p>
        </div>
      </Modal>

      {/* Delete User Modal */}
      <Modal
        title="Are you sure to delete this user?"
        open={isDeleteModalVisible}
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
