import React, { useState } from "react";
import { Avatar, Button, ConfigProvider, Space, Table, Tooltip, Modal } from "antd";

import { VendorManagerProductTableStyled as VMPTS, FormAddProduct, VendorProductOperation } from "@/components";
import { useEditProduct } from "@/hooks/useAddProduct/useEditProduct";

export default function VendorManagerProductTable({ products }) {
  const [productEdit, setProductEdit] = useState({});

  const {
    t,
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
    status,
  } = useEditProduct(productEdit);

  const openCreateModal = () => {
    setProductEdit({});
    setIsModalOpen(true);
  };

  const openUpdateModal = (record) => {
    setProductEdit(record);
    setIsModalOpen(true);
  };

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      width: "5%",
      render: (text) => <span>{text?.substring(0, 5)}</span>,
    },
    {
      title: t("productTable.tableColumns.name"),
      dataIndex: "name",
      key: "name",
      width: "10%",
      render: (text) => <b>{text}</b>,
    },
    {
      title: t("productTable.tableColumns.images") || "Hình ảnh",
      dataIndex: "images",
      key: "images",
      width: "10%",
      render: (images) => {
        if (images && images.length > 0) {
          const primaryImage = images.find((img) => img.isPrimary) || images[0];
          return <Avatar shape="square" size={80} src={primaryImage.imageUrl} />;
        }
        return <Avatar shape="square" size={80} icon="📷" />;
      },
    },
    {
      title: t("productTable.tableColumns.brand"),
      dataIndex: "brandName",
      key: "brandName",
      width: "10%",
    },
    {
      title: t("productTable.tableColumns.category"),
      dataIndex: "categoryName",
      key: "categoryName",
      width: "10%",
    },
    {
      title: t("productTable.tableColumns.stock"),
      dataIndex: "stock",
      key: "stock",
      width: "10%",
    },
    {
      title: t("productTable.tableColumns.description") || "Mô tả",
      dataIndex: "description",
      key: "description",
      width: "15%",
      render: (text) => (
        <Tooltip title={text}>
          <span>{text && text.length > 150 ? text.substring(0, 50) + "..." : text}</span>
        </Tooltip>
      ),
    },
    {
      title: t("productTable.tableColumns.param") || "Thông số",
      dataIndex: "param",
      key: "param",
      width: "15%",
      render: (text) => (
        <Tooltip title={text}>
          <span>{text && text.length > 150 ? text.substring(0, 50) + "..." : text}</span>
        </Tooltip>
      ),
    },
    {
      title: t("productTable.tableColumns.actions"),
      key: "actions",
      render: (record) => (
        <Space size="middle">
          <Button onClick={() => openUpdateModal(record)}>{t("productTable.buttons.update") || "Cập nhật"}</Button>
        </Space>
      ),
    },
  ];

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
      <VMPTS.Operation>
        <VendorProductOperation />
        <VMPTS.ButtonPosition>
          <Button size="large" color="blue" variant="solid" onClick={openCreateModal}>
            + {t("productTable.buttons.add") || "Thêm sản phẩm"}
          </Button>
        </VMPTS.ButtonPosition>
      </VMPTS.Operation>

      <Table columns={columns} dataSource={products} rowKey="id" locale={{ emptyText: t("productTable.noData") }} />

      <Modal
        title={
          isEditSession
            ? t("productTable.modal.update") || "Cập nhật sản phẩm"
            : t("productTable.modal.add") || "Thêm sản phẩm mới"
        }
        open={isModalOpen}
        onCancel={handleCancel}
        footer={null}
        zIndex={5000}
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
          t={t}
          status={status}
        />
      </Modal>
    </ConfigProvider>
  );
}
