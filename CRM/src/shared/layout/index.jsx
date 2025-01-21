import { useState } from "react";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  HomeOutlined,
  UserOutlined,
  TeamOutlined,
  ProjectOutlined,
  FileOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import { Button, Layout, Menu, theme, ConfigProvider } from "antd";
import { NavLink, Outlet } from "react-router-dom";
import { logout } from "../redux/features/authSlice";
import { urls } from "@/shared/constants/urls";

const { Header, Sider, Content } = Layout;

const LayoutPage = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { borderRadiusLG },
  } = theme.useToken();

  const items = [
    {
      label: <NavLink to={urls.Home}>Home</NavLink>,
      icon: <HomeOutlined />,
      key: "/",
    },
    {
      label: <NavLink to={urls.USERS}>Users</NavLink>,
      icon: <UserOutlined />,
      key: "/users",
    },
    {
      label: <NavLink to={urls.TEAMS}>Teams</NavLink>,
      icon: <TeamOutlined />,
      key: "/teams",
    },
    {
      label: <NavLink to={urls.PROJECTS}>Projects</NavLink>,
      icon: <ProjectOutlined />,
      key: "/projects",
    },
    {
      label: <NavLink to={urls.REPORTS}>Reports</NavLink>,
      icon: <FileOutlined />,
      key: "/reports",
    },
  ];

  return (
    <ConfigProvider>
      <Layout>
        <Sider trigger={null} collapsible collapsed={collapsed}>
          <div className="demo-logo-vertical" />
          <div className="logo">CRM</div>
          <Menu
            theme="dark"
            mode="inline"
            items={items}
            defaultSelectedKeys={[location.pathname]}
            selectedKeys={[location.pathname]}
          />
        </Sider>
        <Layout>
          <Header
            style={{
              padding: 0,
            }}
          >
            <Button
              type="text"
              icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
              onClick={() => setCollapsed(!collapsed)}
              style={{
                fontSize: "16px",
                width: 64,
                height: 64,
              }}
            />
            <Button
              className="button"
              icon={<LogoutOutlined />}
              onClick={() => dispatch(logout())}
            ></Button>
          </Header>
          <Content
            style={{
              margin: "10px 15px",
              padding: 24,
              minHeight: 280,
              borderRadius: borderRadiusLG,
            }}
          >
            <Outlet />
          </Content>
        </Layout>
      </Layout>
    </ConfigProvider>
  );
};

export default LayoutPage;
