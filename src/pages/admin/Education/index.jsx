import { Button, Form, DatePicker, Input, Pagination, Table, Space } from "antd";
import { useGetEducationsQuery } from "../../../redux/queries/educations";
import { CgAddR } from "react-icons/cg";
import styles from "./AdminEducationPage.module.scss";
import { useState } from "react";
import { LIMIT } from "../../../constants/constants";

const { RangePicker } = DatePicker;

const AdminEducationPage = () => {
  const [page, setPage] = useState(false)
  const [modalOpen, setModalOpen] = useState(false);
  const {
    data: { educations, total } = { experiences: [], total: 0 },
    refetch,
    isFetching,
  } = useGetEducationsQuery({ page, limit: LIMIT });

  const handleSubmit = () => {};


    const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Level",
      dataIndex: "level",
      key: "level",
    },
    {
      title: "Student",
      dataIndex: "user",
      key: "user",
      render: (text) => (text ? text.username : "Unknown"),
    },
        {
      title: "Description",
      dataIndex: "description",
      key: "description",
      render: (text) => <p style={{
        display: '-webkit-box',
        WebkitBoxOrient: 'vertical',
        WebkitLineClamp: '1',
        overflow: 'hidden'
      }}>{text}</p>
    },
    {
      title: "Started at",
      dataIndex: "startDate",
      key: "startDate",
      render: (text) => text.slice(0, 10),
    },
    {
      title: "Ended at",
      dataIndex: "endDate",
      key: "endDate",
      render: (text) => text.slice(0, 10),
    },
    {
      title: "Action",
      dataIndex: "_id",
      key: "_id",
      render: (id) => (
        <Space size="middle">
          <Button type="primary" onClick={() => {}}>
            Edit
          </Button>
          <Button type="primary" danger onClick={() => {}}>
            Delete
          </Button>
        </Space>
      ),
    },
  ];
  return (
    <div className={styles.educations}>
      {modalOpen ? (
        <div className={styles.modal}>
          <Form
            name="basic"
            labelCol={{ span: 24 }}
            wrapperCol={{ span: 24 }}
            style={{ maxWidth: 600 }}
            initialValues={{ remember: true }}
            autoComplete="off"
            onFinish={handleSubmit}
          >
            <Form.Item
              label="Work name"
              name="workName"
              rules={[{ required: true, message: "Please input work name!" }]}
            >
              <Input onChange={(e) => {}} />
            </Form.Item>

            <Form.Item
              label="Company name"
              name="companyName"
              rules={[
                { required: true, message: "Please input company name!" },
              ]}
            >
              <Input onChange={(e) => {}} />
            </Form.Item>
            <Form.Item
              label="Description"
              name="description"
              rules={[{ required: true, message: "Please input description!" }]}
            >
              <Input onChange={(e) => {}} />
            </Form.Item>
            <RangePicker onChange={(e) => {}} />

            <Form.Item wrapperCol={{ offset: 0, span: 24 }}>
              <Button
                type="primary"
                htmlType="submit"
                style={{ width: "100%" }}
              >
                Submit
              </Button>
            </Form.Item>
          </Form>
        </div>
      ) : null}
      <h1>Experiences ({total})</h1>
      <div className={styles.educations_header}>
        <Input
          type="text"
          name=""
          id=""
          placeholder="Search..."
          onChange={(e) => {
            // setSearch(e.target.value);
            // refetch();
            // setPage(1);
          }}
        />
        <button
          onClick={() => {
            setModalOpen(true);
          }}
        >
          <CgAddR size={30} />
        </button>
      </div>
      <Table
        loading={isFetching}
        pagination={false}
        scroll={{
          x: 1000,
        }}
        dataSource={educations}
        columns={columns}
      />
      <Pagination
        pageSize={LIMIT}
        current={page}
        total={total}
        onChange={(e) => {
          console.log(e);
          setPage(e);
          refetch();
        }}
      />
    </div>
  );
};

export default AdminEducationPage;