import { useState, useEffect } from "react";
import { Table, Button, Modal, Form, Input, Space, Select, DatePicker, Pagination } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { fetchReports, addReport, editReport, fetchProjects, fetchUsers } from "../../shared/redux/features/reportSlice";
import { EyeOutlined, EditOutlined } from "@ant-design/icons";
import dayjs from 'dayjs';

const Index = () => {
  const dispatch = useDispatch();
  const reports = useSelector((state) => state.report.reports);
  const projects = useSelector((state) => state.report.projects);
  const users = useSelector((state) => state.report.users);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isViewModalVisible, setIsViewModalVisible] = useState(false);
  const [currentReport, setCurrentReport] = useState(null);
  const [form] = Form.useForm();

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(4); 

  useEffect(() => {
    dispatch(fetchReports());
    dispatch(fetchProjects());
    dispatch(fetchUsers());
  }, [dispatch]);

  const handleAddReport = () => {
    setCurrentReport(null);
    form.resetFields();  // Reset form fields for "Add Report"
    setIsModalVisible(true);
  };

  const handleEditReport = (report) => {
    setCurrentReport(report);
    form.setFieldsValue({
      ...report,
      createDate: report.createDate ? dayjs(report.createDate) : null, 
    });
    setIsModalVisible(true);
  };

  const handleShowReport = (report) => {
    setCurrentReport(report);
    setIsViewModalVisible(true); 
  };

  const handleOk = () => {
    form.validateFields().then((values) => {
      if (currentReport) {
        dispatch(editReport({ ...currentReport, createDate: values.createDate }));
      } else {
        dispatch(addReport({ ...values, createDate: values.createDate }));
      }
      setIsModalVisible(false);
      form.resetFields();
    });
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setIsViewModalVisible(false);
    form.resetFields();
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const paginatedReports = reports.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  const columns = [
    { title: "User", dataIndex: "user", key: "user" },
    { title: "Description", dataIndex: "description", key: "description" },
    { title: "Create Date", dataIndex: "createDate", key: "createDate", render: (text) => dayjs(text).format("YYYY-MM-DD") },
    { title: "Project Name", dataIndex: "projectName", key: "projectName" },
    {
      title: "Actions",
      key: "actions",
      render: (_, report) => (
        <Space>
          <Button icon={<EyeOutlined />} onClick={() => handleShowReport(report)} />
          <Button icon={<EditOutlined />} onClick={() => handleEditReport(report)} type="primary" />
        </Space>
      ),
    },
  ];

  return (
    <div className="report-page">
      <Button type="primary" onClick={handleAddReport}>
        Add Report
      </Button>
      <Table columns={columns} dataSource={paginatedReports} rowKey="id" pagination={false} />

      {/* Pagination Component */}
      <div className="pagination-container">
        <Pagination
          current={currentPage}
          pageSize={pageSize}
          total={reports.length}
          onChange={handlePageChange}
          showSizeChanger={false} 
        />
      </div>

      {/* Edit Report Modal */}
      <Modal
        title={currentReport ? "Edit Report" : "Add Report"}
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="user"
            label=""
            rules={[{ required: true, message: "User is required" }]} >
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
            rules={[{ required: true, message: "Description is required" }]} >
            <Input.TextArea />
          </Form.Item>
          <Form.Item
            name="createDate"
            label=""
            rules={[{ required: true, message: "Create Date is required" }]} >
            <DatePicker
              style={{ width: "100%" }}
              value={form.getFieldValue('createDate') ? dayjs(form.getFieldValue('createDate')) : null}
              onChange={(date) => form.setFieldsValue({ createDate: date ? date : null })}
            />
          </Form.Item>
          <Form.Item
            name="projectName"
            label=""
            rules={[{ required: true, message: "Project Name is required" }]} >
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

      {/* View Report Modal - Only Text Display */}
      <Modal
        title="View Report"
        visible={isViewModalVisible}
        onCancel={handleCancel}
        footer={<Button onClick={() => setIsViewModalVisible(false)}>Close</Button>}
      >
        <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          <p><strong>User:</strong> {currentReport?.user}</p>
          <p><strong>Description:</strong> {currentReport?.description}</p>
          <p><strong>Create Date:</strong> {currentReport?.createDate ? dayjs(currentReport.createDate).format('YYYY-MM-DD') : ''}</p>
          <p><strong>Project Name:</strong> {currentReport?.projectName}</p>
        </div>
      </Modal>
    </div>
  );
};

export default Index;






