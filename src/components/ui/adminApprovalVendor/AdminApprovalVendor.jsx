import { Input, Pagination, Select, Modal, ConfigProvider } from "antd";
import { useVendorAdmin } from "@/hooks/vendor/useVendorAdmin";
import useVendorModal from "@/hooks/vendor/useVendorModal";
import { AdminApprovalVendorStyled as AAVS, Loading } from "@/components";

const { Search } = Input;
const { Option } = Select;

function AdminApprovalVendor() {
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
        <AAVS.Title>Phê duyệt nhà cung cấp</AAVS.Title>
        <AAVS.HeaderContainer>
          <AAVS.Summaries>
            <AAVS.Summary>Tổng số nhà cung cấp: {totalItems}</AAVS.Summary>
          </AAVS.Summaries>
          <AAVS.SearchWrapper>
            <Search
              placeholder="Tìm theo tên"
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
              <Option value="all">Tất cả</Option>
              <Option value="unactive">Chưa duyệt</Option>
              <Option value="active">Đã duyệt</Option>
            </Select>
          </AAVS.SearchWrapper>
        </AAVS.HeaderContainer>

        <AAVS.TableContainer>
          <AAVS.Table>
            <thead>
              <AAVS.Tr>
                <AAVS.Th>#</AAVS.Th>
                <AAVS.Th>ID</AAVS.Th>
                <AAVS.Th>Họ Tên</AAVS.Th>
                <AAVS.Th>Vai Trò</AAVS.Th>
                <AAVS.Th>Trạng Thái</AAVS.Th>
              </AAVS.Tr>
            </thead>
            <tbody>
              {vendors.map((vendor, index) => (
                <AAVS.Tr key={vendor.id}>
                  <AAVS.Td>{(currentPage - 1) * itemsPerPage + index + 1}</AAVS.Td>
                  <AAVS.Td>{vendor.id}</AAVS.Td>
                  <AAVS.Td>{vendor.name}</AAVS.Td>
                  <AAVS.Td>{vendor.role}</AAVS.Td>
                  <AAVS.Td>
                    <AAVS.StatusButton
                      $active={vendor.status === "active"}
                      onClick={() => showConfirmModal(vendor)}
                      disabled={status === "loading"}
                    >
                      {vendor.status === "active" ? "Đã duyệt" : "Chưa duyệt"}
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
          title="Xác nhận thay đổi trạng thái"
          open={isModalVisible}
          onOk={handleModalOk}
          onCancel={handleModalCancel}
          okText="Xác nhận"
          cancelText="Hủy"
        >
          <div dangerouslySetInnerHTML={getModalContent()} />
        </Modal>
      </AAVS.Container>
    </ConfigProvider>
  );
}

export default AdminApprovalVendor;
