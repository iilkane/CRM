import { useEffect, useState } from "react";
import { Table, Button, Space, Tooltip, Pagination, Modal } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { fetchTeams, deleteTeam } from "../../shared/redux/features/teamSlice";
import { EditOutlined, DeleteOutlined, EyeOutlined } from "@ant-design/icons";
import AddTeam from "./Modal/AddTeam";
import EditTeam from "./Modal/EditTeam";
import ShowTeam from "./Modal/ShowTeam";
import { mockAPI } from "../../shared/redux/api/data";

const Index = () => {
  const dispatch = useDispatch();
  const teams = useSelector((state) => state.team.teams);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  const [isShowModalVisible, setIsShowModalVisible] = useState(false);
  const [currentTeam, setCurrentTeam] = useState(null);
  const [users, setUsers] = useState([]);

  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 4;

  useEffect(() => {
    dispatch(fetchTeams());
    const fetchUsers = async () => {
      const fetchedUsers = await mockAPI.fetchUsers();
      setUsers(fetchedUsers);
    };
    fetchUsers();
  }, [dispatch]);

  const handleAddTeam = () => {
    setCurrentTeam(null);
    setIsModalVisible(true);
  };

  const handleEditTeam = (team) => {
    setCurrentTeam(team);
    setIsEditModalVisible(true);
  };

  const handleDeleteTeam = (team) => {
    setCurrentTeam(team);
    setIsDeleteModalVisible(true);
  };

  const handleShowTeam = (team) => {
    setCurrentTeam(team);
    setIsShowModalVisible(true);
  };

  const handleDeleteConfirm = () => {
    if (currentTeam) {
      dispatch(deleteTeam(currentTeam.id));
    }
    setIsDeleteModalVisible(false);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page); 
  };

  const paginatedTeams = teams.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  const columns = [
    { title: "Team Name", dataIndex: "name" },
    {
      title: "Actions",
      render: (_, team) => (
        <Space>
          <Tooltip title="Show">
            <Button
              icon={<EyeOutlined />}
              onClick={() => handleShowTeam(team)} 
            />
          </Tooltip>
          <Tooltip title="Delete">
            <Button
              icon={<DeleteOutlined />}
              onClick={() => handleDeleteTeam(team)}
              danger
            />
          </Tooltip>
          <Tooltip title="Edit">
            <Button
              icon={<EditOutlined />}
              onClick={() => handleEditTeam(team)}
              type="primary"
            />
          </Tooltip>
        </Space>
      ),
    },
  ];

  return (
    <div className="team-page">
      <Button type="primary" onClick={handleAddTeam}>
        Add Team
      </Button>
      <Table
        columns={columns}
        dataSource={paginatedTeams}
        rowKey="id"
        pagination={false}
      />

      {/* Pagination */}
      <Pagination
        current={currentPage}
        pageSize={pageSize}
        total={teams.length}
        onChange={handlePageChange}
        showSizeChanger={false}
        style={{ textAlign: "right", marginTop: "20px" }} 
      />

      {/* Add Team Modal */}
      <AddTeam
        visible={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
      />

      {/* Edit Team Modal */}
      <EditTeam
        visible={isEditModalVisible}
        onCancel={() => setIsEditModalVisible(false)}
        team={currentTeam}
      />

      {/* Show Team Modal */}
      <ShowTeam
        visible={isShowModalVisible}
        onCancel={() => setIsShowModalVisible(false)}
        team={currentTeam}
        users={users}
      />

      {/* Delete Confirmation Modal */}
      <Modal
        title="Are you sure to delete this team?"
        open={isDeleteModalVisible}
        onCancel={() => setIsDeleteModalVisible(false)}
        footer={[
          <Button onClick={() => setIsDeleteModalVisible(false)} key="cancel">
            Cancel
          </Button>,
          <Button
            style={{ backgroundColor: "red", color: "white", border: "none" }}
            onClick={handleDeleteConfirm}
            key="delete"
          >
            Delete
          </Button>,
        ]}
      >
        <p>Do you really want to delete this team?</p>
      </Modal>
    </div>
  );
};

export default Index;
