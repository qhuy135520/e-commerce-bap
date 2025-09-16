import { Input, Pagination, Select, Modal, ConfigProvider } from "antd";
import { useTranslation } from "react-i18next";

import { useVendorAdmin } from "@/hooks/vendor/useVendorAdmin";
import useVendorModal from "@/hooks/vendor/useVendorModal";

import { AdminApprovalVendorStyled as AAVS } from "@/components";

const { Search } = Input;
const { Option } = Select;

function AdminApprovalVendor() {
  const { t } = useTranslation(["admin"]);
  const {
    vendors,
    totalItems,
    currentPage,
    itemsPerPage,
    searchTerm,
    status,
    handlePageChange,
    handleSearch,
    handleStatusToggle,
    statusFilter,
    handleStatusFilter,
  } = useVendorAdmin(10);

  const { isModalVisible, showConfirmModal, handleModalOk, handleModalCancel, getModalContent } =
    useVendorModal(handleStatusToggle);

  return (
    <ConfigProvider>
      <AAVS.Container>
        <AAVS.Title>{t("approvalVendor.title")}</AAVS.Title>

        <AAVS.HeaderContainer>
          <AAVS.Summaries>
            <AAVS.Summary>
              {t("approvalVendor.totalVendors")}: {totalItems}
            </AAVS.Summary>
          </AAVS.Summaries>

          <AAVS.SearchWrapper>
            <Search
              placeholder={t("approvalVendor.searchPlaceholder")}
              onSearch={handleSearch}
              onChange={(e) => handleSearch(e.target.value)}
              value={searchTerm}
              allowClear
              loading={status === "loading"}
            />
            <Select
              value={statusFilter}
              onChange={handleStatusFilter}
              style={{ width: 120, marginLeft: 10 }}
              disabled={status === "loading"}
            >
              <Option value="all">{t("approvalVendor.all")}</Option>
              <Option value="inactive">{t("approvalVendor.inactive")}</Option>
              <Option value="active">{t("approvalVendor.active")}</Option>
            </Select>
          </AAVS.SearchWrapper>
        </AAVS.HeaderContainer>

        <AAVS.TableContainer>
          <AAVS.Table>
            <thead>
              <AAVS.Tr>
                <AAVS.Th>{t("approvalVendor.table.index")}</AAVS.Th>
                <AAVS.Th>{t("approvalVendor.table.id")}</AAVS.Th>
                <AAVS.Th>{t("approvalVendor.table.name")}</AAVS.Th>
                <AAVS.Th>{t("approvalVendor.table.role")}</AAVS.Th>
                <AAVS.Th>{t("approvalVendor.table.status")}</AAVS.Th>
              </AAVS.Tr>
            </thead>
            <tbody>
              {vendors.map((vendor, index) => (
                <AAVS.Tr key={vendor.vendorId}>
                  <AAVS.Td>{(currentPage - 1) * itemsPerPage + index + 1}</AAVS.Td>
                  <AAVS.Td>{vendor.vendorId}</AAVS.Td>
                  <AAVS.Td>{vendor.vendorName}</AAVS.Td>
                  <AAVS.Td>{vendor.role}</AAVS.Td>
                  <AAVS.Td>
                    <AAVS.StatusButton
                      $active={vendor.status === "active"}
                      onClick={() => showConfirmModal(vendor)}
                      disabled={status === "loading"}
                    >
                      {vendor.status === "active"
                        ? t("approvalVendor.statusButton.active")
                        : t("approvalVendor.statusButton.inactive")}
                    </AAVS.StatusButton>
                  </AAVS.Td>
                </AAVS.Tr>
              ))}
            </tbody>
          </AAVS.Table>
        </AAVS.TableContainer>

        <Pagination
          align="center"
          current={currentPage}
          total={totalItems}
          pageSize={itemsPerPage}
          showSizeChanger={false}
          onChange={handlePageChange}
          disabled={status === "loading"}
        />

        <Modal
          title={t("approvalVendor.modal.title")}
          open={isModalVisible}
          onOk={handleModalOk}
          onCancel={handleModalCancel}
          okText={t("approvalVendor.modal.okText")}
          cancelText={t("approvalVendor.modal.cancelText")}
        >
          <div dangerouslySetInnerHTML={getModalContent()} />
        </Modal>
      </AAVS.Container>
    </ConfigProvider>
  );
}

export default AdminApprovalVendor;
