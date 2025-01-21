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
} from "antd";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchTeams,
  addTeam,
  editTeam,
  deleteTeam,
} from "../../shared/redux/features/teamSlice";
import { mockAPI } from "../../shared/redux/api/data";
import { EditOutlined, DeleteOutlined, EyeOutlined } from "@ant-design/icons";

const Index = () => {
  const dispatch = useDispatch();
  const teams = useSelector((state) => state.team.teams);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isShowModalVisible, setIsShowModalVisible] = useState(false);
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  const [currentTeam, setCurrentTeam] = useState(null);
  const [users, setUsers] = useState([]); // Kullanıcıları saklamak için state
  const [form] = Form.useForm();

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(4);

  // Fetch teams and users
  useEffect(() => {
    dispatch(fetchTeams());
    const fetchUsers = async () => {
      const fetchedUsers = await mockAPI.fetchUsers();
      setUsers(fetchedUsers); // Kullanıcıları state'e ekle
    };
    fetchUsers();
  }, [dispatch]);

  // Yeni takım ekleme
  const handleAddTeam = () => {
    setCurrentTeam(null);
    form.resetFields(); // Formu sıfırla
    setIsModalVisible(true);
  };

  // Mevcut takımı düzenleme
  const handleEditTeam = (team) => {
    setCurrentTeam(team);
    form.setFieldsValue({ name: team.name }); // Sadece takım adını formda göster
    setIsModalVisible(true);
  };

  // Takımı silme
  const handleDeleteTeam = (team) => {
    setCurrentTeam(team);
    setIsDeleteModalVisible(true);
  };

  const handleDeleteConfirm = () => {
    if (currentTeam) {
      dispatch(deleteTeam(currentTeam.id));
    }
    setIsDeleteModalVisible(false);
  };

  // Takım detaylarını gösterme
  const handleShowTeam = (team) => {
    setCurrentTeam(team);
    setIsShowModalVisible(true);
  };

  // Modal submit işlemi
  const handleOk = () => {
    form.validateFields().then((values) => {
      const { name } = values;

      if (currentTeam) {
        // Mevcut takımı düzenle (userIds değiştirme)
        dispatch(editTeam({ ...currentTeam, name }));
      } else {
        // Yeni takım oluştur (userIds değiştirme)
        dispatch(addTeam({ name }));
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
            <Button icon={<EyeOutlined />} onClick={() => handleShowTeam(team)} />
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

      {/* Pagination Component */}
      <div className="pagination-container">
        <Pagination
          current={currentPage}
          pageSize={pageSize}
          total={teams.length}
          onChange={handlePageChange}
          showSizeChanger={false}
        />
      </div>

      {/* Modal for adding/editing team */}
      <Modal
        title={currentTeam ? "Edit Team" : "Add Team"}
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="name"
            label="Team Name"
            rules={[{ required: true, message: "Team Name is required" }]}>
            <Input />
          </Form.Item>
        </Form>
      </Modal>

      {/* Show Modal for team details */}
      <Modal
        title="Team Details"
        visible={isShowModalVisible}
        onCancel={() => setIsShowModalVisible(false)}
        footer={<Button onClick={() => setIsShowModalVisible(false)}>Close</Button>}
      >
        <p>
          <strong>Team Name:</strong> {currentTeam?.name}
        </p>
        <p>
          <strong>Users:</strong>{" "}
          {currentTeam?.userIds
            ?.map((userId) => {
              const user = users.find((u) => u.id === userId);
              return user ? `${user.firstName} ${user.lastName}` : null;
            })
            .join(", ")}
        </p>
      </Modal>

      {/* Delete Modal */}
      <Modal
        title="Are you sure to delete this team?"
        visible={isDeleteModalVisible}
        onCancel={() => setIsDeleteModalVisible(false)}
        footer={
          <>
            <Button onClick={() => setIsDeleteModalVisible(false)}>Cancel</Button>
            <Button
              style={{ backgroundColor: "red", color: "white", border: "none" }}
              onClick={handleDeleteConfirm}
            >
              Delete
            </Button>
          </>
        }
      >
        <p>Do you really want to delete this team?</p>
      </Modal>
    </div>
  );
};

export default Index;
