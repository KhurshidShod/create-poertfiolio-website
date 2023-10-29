import React, { Fragment, useEffect, useRef, useState } from "react";
import { Layout, Menu, Button, theme } from "antd";
import { Link, Outlet, useLocation } from "react-router-dom";
import { GiStrong } from "react-icons/gi";
import { FiUsers } from "react-icons/fi";
import { FaUniversity } from "react-icons/fa";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import { IoNotificationsSharp } from "react-icons/io5";
import {
  useGetNonClientUsersQuery,
  useUpdateUserToRoleMutation,
} from "../../redux/queries/users";
import styles from "./AdminLayout.module.scss";
import NotificationCard from "../notificationCard";

const { Header, Sider, Content } = Layout;

const AdminLayout = () => {
  const location = useLocation();
  const LIMIT = 10;

  const [limit, setLimit] = useState(10);
  const [collapsed, setCollapsed] = useState(false);
  const [notificationOpen, setNotificationOpen] = useState(false);
  const [updateUser] = useUpdateUserToRoleMutation();

  const {
    data: { users, total } = { users: [], total: 0 },
    refetch,
    isFetching,
    error,
  } = useGetNonClientUsersQuery({ page: 1, limit, role: "user" });

  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const changeRole = async (id) => {
    await updateUser(id).unwrap();
    refetch();
    console.log(id);
  };

  const scrollPagination = (e) => {
    if (error?.status !== 404) {
      if (
        e.currentTarget.clientHeight + e.currentTarget.scrollTop + 1 >=
        e.currentTarget.scrollHeight
      ) {
        setLimit(limit + LIMIT);
        refetch();
      }
    }
  };

  return (
    <Fragment>
      <div
        onScroll={(e) => {
          scrollPagination(e);
        }}
        className={`${styles.notifications} ${
          notificationOpen ? styles.open : null
        }`}
      >
        {isFetching ? (
          <div className={styles.notifications__loader}>
            <div className="newtons-cradle">
              <div className="newtons-cradle__dot"></div>
              <div className="newtons-cradle__dot"></div>
              <div className="newtons-cradle__dot"></div>
              <div className="newtons-cradle__dot"></div>
            </div>
          </div>
        ) : null}
        <h3 className={styles.nonClientHeader}>Non-client users</h3>
        {users.map((user) => (
          <NotificationCard
            key={user._id}
            id={user._id}
            role={user.role}
            username={user.username}
            firstName={user.firstName}
            lastName={user.lastName}
            changeRole={changeRole}
          />
        ))}
        {isFetching ? (
          <div className="typing-indicator">
            <div className="typing-circle"></div>
            <div className="typing-circle"></div>
            <div className="typing-circle"></div>
            <div className="typing-shadow"></div>
            <div className="typing-shadow"></div>
            <div className="typing-shadow"></div>
          </div>
        ) : error?.status == 404 ? (
          <p
            style={{
              color: "white",
            }}
          >
            That is all
          </p>
        ) : null}
      </div>
      <Layout style={{ height: "100vh" }}>
        <Sider trigger={null} collapsible collapsed={collapsed}>
          <h1
            className="demo-logo-vertical"
            style={{
              height: "64px",
              paddingLeft: "20px",
              display: "flex",
              alignItems: "center",
              color: "white",
              fontSize: "32px",
            }}
          >
            *_*
          </h1>
          <Menu
            theme="dark"
            mode="inline"
            defaultSelectedKeys={location.pathname}
            items={[
              {
                key: "/admin/dashboard",
                icon: <GiStrong />,
                label: <Link to="/admin/dashboard">Dashboard</Link>,
              },
              {
                key: "/admin/experiences",
                icon: <GiStrong />,
                label: <Link to="/admin/experiences">Experiences</Link>,
              },
              {
                key: "/admin/users",
                icon: <FiUsers />,
                label: <Link to="/admin/users">Users</Link>,
              },
              {
                key: "/admin/education",
                icon: <FaUniversity />,
                label: <Link to="/admin/education">Education</Link>,
              },
            ]}
          />
        </Sider>
        <Layout>
          <Header
            style={{
              width: collapsed ? "100%" : "calc(100% - 200px)",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: 0,
              paddingRight: "25px",
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
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "end",
                position: "relative",
                cursor: "pointer",
              }}
              onClick={() => setNotificationOpen(!notificationOpen)}
            >
              <p
                style={{
                  position: "absolute",
                  width: "10px",
                  height: "10px",
                  top: "5px",
                  right: "4px",
                  backgroundColor: "red",
                  borderRadius: "50%",
                  fontSize: "6px",
                }}
              ></p>
              <IoNotificationsSharp color="rgb(0, 21, 40)" size={30} />
            </div>
          </Header>
          <Content
            style={{
              margin: "24px 16px",
              marginTop: "90px",
              padding: 24,
              minHeight: 280,
              overflowY: "auto",
              background: colorBgContainer,
            }}
          >
            <Outlet />
          </Content>
        </Layout>
      </Layout>
    </Fragment>
  );
};

export default AdminLayout;
