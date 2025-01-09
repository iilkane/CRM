import React, { useState } from 'react';
// import PropTypes from 'prop-types';
import { urls } from '../constants/urls';

import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  HomeOutlined,
  UserOutlined,
  TeamOutlined,
  ProjectOutlined,
  FileOutlined
  
} from '@ant-design/icons';
import { Button, Layout, Menu, theme, ConfigProvider } from 'antd';
import { NavLink } from 'react-router-dom';

const { Header, Sider, Content, Footer } = Layout;

const App = () => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    <ConfigProvider>
      <Layout>
        <Sider trigger={null} collapsible collapsed={collapsed}>
          <div className="demo-logo-vertical" />
          <Menu
            theme="dark"
            mode="inline"
            defaultSelectedKeys={['1']}
            items={[
              {
                key: '1',
                icon: <>
                <NavLink to={urls.Home}>
                <HomeOutlined />
                </NavLink>
                </>,
                label: 'Home',
              },
              {
                key: '2',
                icon: <>
                <NavLink to={urls.USERS}>
                <UserOutlined />
                </NavLink>
                </>,
                label: 'Users',
              },
              {
                key: '3',
                icon: <>
                <NavLink to={urls.TEAMS}>
                <TeamOutlined />
                </NavLink>
                </>,
                label: 'Teams',
              },
              {
                key: '4',
                icon: <>
                <NavLink to={urls.PROJECTS}>
                <ProjectOutlined />
                </NavLink>
                </>,
                label: 'Projects',
              },
              {
                key: '5',
                icon: <>
                <NavLink to={urls.REPORTS}>
                <FileOutlined />
                </NavLink>
                </>,
                label: 'Reports',
              },
            ]}
          />
        </Sider>
        <Layout>
          <Header
            style={{
              padding: 0,
              background: colorBgContainer,
            }}
          >
            <Button
              type="text"
              icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
              onClick={() => setCollapsed(!collapsed)}
              style={{
                fontSize: '16px',
                width: 64,
                height: 64,
              }}
            />
          </Header>
          <Content
            style={{
              margin: '24px 16px',
              padding: 24,
              minHeight: 280,
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
            {/* {children} */}
          </Content>
          <Footer>
            null
          </Footer>
        </Layout>
      </Layout>
    </ConfigProvider>
  );
};


// App.propTypes = {
//   children: PropTypes.node, // children, React node türünde olmalı
// };

export default App;
