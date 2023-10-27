import React, { useState } from "react";
import { Layout, Menu, Button, theme } from "antd";
import { Link, Outlet, useLocation } from "react-router-dom";
import { GiStrong } from "react-icons/gi";
import { FiUsers } from "react-icons/fi";
import { FaUniversity } from "react-icons/fa";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";

const { Header, Sider, Content } = Layout;

const AdminLayout = () => {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation()
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  return (
    <Layout style={{ height: "100vh" }}>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <h1
          className="demo-logo-vertical"
          style={{
            height: "64px",
            paddingLeft: "10px",
            display: "flex",
            alignItems: "center",
            color: "white",
            fontSize: "32px",
          }}
        >
          Logo
        </h1>
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={location.pathname}
          items={[
            {
              key: "/admin/dashboard",
              icon: <GiStrong />,
              label: <Link to='/admin/dashboard'>Dashboard</Link>,
            },
            {
              key: "/admin/experiences",
              icon: <GiStrong />,
              label: <Link to='/admin/experiences'>Experiences</Link>,
            },
            {
              key: "/admin/users",
              icon: <FiUsers />,
              label: <Link to='/admin/users'>Users</Link>,
            },
            {
              key: "/admin/education",
              icon: <FaUniversity />,
              label: <Link to='/admin/education'>Education</Link>,
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
              fontSize: "16px",
              width: 64,
              height: 64,
            }}
          />
        </Header>
        <Content
          style={{
            margin: "24px 16px",
            marginTop: '90px',
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
          }}
        >
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default AdminLayout;
