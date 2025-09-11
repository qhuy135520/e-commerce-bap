import { Input, Pagination, message } from "antd";
import { AdminApprovalVendorStyled as AAVS, Loading } from "@/components";
import { useVendorAdmin } from "@/hooks/vendor/useVendorAdmin";
import { useDispatch } from "react-redux";

const { Search } = Input;

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
  } = useVendorAdmin(10);

  return (
    <AAVS.Container>
      <AAVS.Title>Admin Approval Vendor</AAVS.Title>
      <AAVS.HeaderContainer>
        <AAVS.Summaries>
          <AAVS.Summary>Total Vendors: {totalItems}</AAVS.Summary>
        </AAVS.Summaries>
        <AAVS.SearchWrapper>
          <Search
            placeholder="Search by Name"
            onSearch={handleSearch}
            onChange={(e) => handleSearch(e.target.value)}
            value={searchTerm}
            allowClear
            loading={status === "loading"}
          />
        </AAVS.SearchWrapper>
      </AAVS.HeaderContainer>
      <AAVS.TableContainer>
        <AAVS.Table>
          <thead>
            <AAVS.Tr>
              <AAVS.Th>#</AAVS.Th>
              <AAVS.Th>ID</AAVS.Th>
              <AAVS.Th>Name</AAVS.Th>
              <AAVS.Th>Role</AAVS.Th>
              <AAVS.Th>Status</AAVS.Th>
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
                    onClick={() => handleStatusToggle(vendor.id, vendor.status)}
                    disabled={status === "loading"}
                  >
                    {vendor.status === "active" ? "Unactive" : "Active"}
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
    </AAVS.Container>
  );
}

export default AdminApprovalVendor;
