import React, { useState } from "react";
import { Avatar, Button, ConfigProvider, Space, Table, Tooltip, Modal } from "antd";

import { VendorManagerProductTableStyled as VMPTS, FormAddProduct } from "@/components";
import { useEditProduct } from "@/hooks/useAddProduct/useEditProduct";

export default function VendorManagerProductTable({ products }) {
  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      width: "5%",
      render: (text) => <span>{text?.substring(0, 5)}</span>,
    },
    {
      title: "Tên sản phẩm",
      dataIndex: "name",
      key: "name",
      width: "10%",
      render: (text) => <b>{text}</b>,
    },
    {
      title: "Hình ảnh",
      dataIndex: "images",
      key: "images",
      width: "10%",
      render: (images) =>
        images && images.length > 0 ? (
          <Avatar shape="square" size={80} src={images[0].imageUrl} />
        ) : (
          <Avatar shape="square" size={80} icon="📷" />
        ),
    },
    {
      title: "Nhãn hiệu",
      dataIndex: "brandname",
      key: "brandname",
      width: "10%",
    },
    {
      title: "Danh mục",
      dataIndex: "categoryname",
      key: "categoryname",
      width: "10%",
    },
    {
      title: "Số lượng",
      key: "stock",
      dataIndex: "stock",
      width: "10%",
    },
    {
      title: "Mô tả",
      key: "description",
      dataIndex: "description",
      width: "15%",
      render: (text) => (
        <Tooltip title={text}>
          <span>{text && text.length > 150 ? text.substring(0, 50) + "..." : text}</span>
        </Tooltip>
      ),
    },
    {
      title: "Thông số",
      key: "param",
      dataIndex: "param",
      width: "15%",
      render: (text) => (
        <Tooltip title={text}>
          <span>{text && text.length > 150 ? text.substring(0, 50) + "..." : text}</span>
        </Tooltip>
      ),
    },
    {
      title: "Action",
      key: "action",
      render: (record) => (
        <Space size="middle">
          <Button onClick={() => openUpdateModal(record)}>Cập nhật</Button>
          <Button>Xóa</Button>
        </Space>
      ),
    },
  ];

  const [productEdit, setProductEdit] = useState({});

  const {
    initialValues,
    validationSchema,
    categorys,
    brands,
    fileList,
    primaryIndex,
    isModalOpen,
    isEditSession,
    handleCancel,
    onChange,
    handleSubmit,
    setPrimaryIndex,
    setIsModalOpen,
  } = useEditProduct(productEdit);

  const openCreateModal = () => {
    setProductEdit({});
    setIsModalOpen(true);
  };

  const openUpdateModal = (record) => {
    setProductEdit(record);
    setIsModalOpen(true);
  };

  return (
    <ConfigProvider
      theme={{
        components: {
          Table: {
            headerBg: "var(--color-grey-200)",
            headerColor: "var(--color-grey-800)",
            headerSplitColor: "var(--color-grey-500)",
            rowHoverBg: "var(--color-grey-200)",
          },
          Modal: {
            contentBg: "var(--color-grey-100)",
            headerBg: "var(--color-grey-100)",
          },
        },
        token: {
          colorBgContainer: "var(--color-grey-100)",
          colorText: "var(--color-grey-800)",
        },
      }}
    >
      <VMPTS.ButtonPosition>
        <Button size="large" color="blue" variant="solid" onClick={openCreateModal}>
          + Thêm sản phẩm
        </Button>
      </VMPTS.ButtonPosition>
      <Table columns={columns} dataSource={products} rowKey="id" />
      <Modal
        title={isEditSession ? "Cập nhật sản phẩm" : "Thêm sản phẩm mới"}
        open={isModalOpen}
        onCancel={handleCancel}
        footer={null}
      >
        <FormAddProduct
          initialValues={initialValues}
          validationSchema={validationSchema}
          categorys={categorys}
          brands={brands}
          fileList={fileList}
          primaryIndex={primaryIndex}
          handleCancel={handleCancel}
          onChange={onChange}
          handleSubmit={handleSubmit}
          setPrimaryIndex={setPrimaryIndex}
        />
      </Modal>
    </ConfigProvider>
  );
}
