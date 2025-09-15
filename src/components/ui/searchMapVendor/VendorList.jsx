import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Card, Collapse, Rate, Badge, Tooltip, Pagination, Button } from "antd";
import { MdLocationOn, MdPhone, MdStar } from "react-icons/md";
import { FaShoppingCart } from "react-icons/fa";
import { NavLink } from "react-router-dom";

const { Panel } = Collapse;

const VendorGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
  gap: 16px;
  padding: 30px;
  background-color: #f8fafc;
`;

const StyledCard = styled(Card)`
  border-radius: 12px;
  transition: all 0.2s ease-in-out;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
  border: none;
  background-color: #ffffff;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 6px 18px rgba(0, 0, 0, 0.12);
  }

  .ant-card-head {
    border-bottom: none;
    padding: 12px 16px 6px;
  }

  .ant-card-body {
    padding: 12px 16px;
    display: flex;
    flex-direction: column;
    gap: 8px;
  }
`;

const VendorHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 16px;
  font-weight: 600;
  color: #1a1a1a;
`;

const VendorTitle = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
`;

const InfoRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 6px 0;
  font-size: 12px;
  color: #4b5563;
  font-weight: 500;

  svg {
    margin-right: 4px;
  }
`;

const StyledBadge = styled(Badge)`
  .ant-badge-count {
    background-color: ${(props) => props.bgcolor || "#3b82f6"};
  }
`;

const StyledPanelContent = styled.div`
  padding: 8px 12px;
  background-color: #f9fafb;
  border-radius: 6px;
  border-left: 3px solid #3b82f6;
  margin-bottom: 8px;
  font-size: 12px;
  color: #374151;

  div {
    margin: 4px 0;
  }

  strong {
    color: #1f2937;
    font-weight: 600;
  }
`;

const StyledCollapse = styled(Collapse)`
  .ant-collapse-header {
    display: flex;
    align-items: center;
    padding: 4px 0 !important;
    color: #3b82f6 !important;
    font-weight: 500;
    font-size: 12px;
  }

  .ant-collapse-content {
    background-color: transparent !important;
  }
`;

const PanelHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;

  svg {
    color: #3b82f6;
  }
`;

const PaginationWrapper = styled.div`
  text-align: center;
  margin-top: 16px;

  .ant-pagination-item-link,
  .ant-pagination-item {
    border-radius: 6px;
  }

  .ant-pagination-item-active a {
    color: #3b82f6;
  }
`;

const VendorButton = styled(Button)`
  margin-top: auto;
  background-color: #3b82f6;
  color: white;
  font-weight: 500;
  border-radius: 6px;
  width: 100%;

  &:hover,
  &:focus {
    background-color: #2563eb;
    color: white;
  }
`;

export default function VendorList({ vendors, pageSize = 9 }) {
  const [currentPage, setCurrentPage] = useState(1);

  const startIndex = (currentPage - 1) * pageSize;
  const currentVendors = vendors.slice(startIndex, startIndex + pageSize);

  useEffect(() => {
    setCurrentPage(1);
  }, [vendors]);

  return (
    <div>
      <VendorGrid>
        {currentVendors.map((vendor) => (
          <StyledCard
            key={vendor.vendorId}
            title={
              <VendorHeader>
                <VendorTitle>
                  <MdStar color="#f59e0b" size={18} />
                  {vendor.vendorName || "N/A"}
                </VendorTitle>
              </VendorHeader>
            }
          >
            <InfoRow>
              <span>
                <FaShoppingCart /> Products
              </span>
              <StyledBadge count={vendor.totalProducts || 0} />
            </InfoRow>

            <InfoRow>
              <span>
                <MdStar /> Reviews
              </span>
              {vendor.totalReviews > 0 ? (
                <Tooltip title={`${vendor.totalReviews} reviews`}>
                  <Rate disabled count={Number(vendor.avgRating)} value={Number(vendor.avgRating) || 0} />
                </Tooltip>
              ) : (
                <span>No ratings</span>
              )}
            </InfoRow>

            <InfoRow>
              <span>
                <MdPhone /> Total Sales
              </span>
              <StyledBadge count={vendor.totalSales || 0} bgcolor="#f59e0b" />
            </InfoRow>

            <StyledCollapse
              ghost
              items={[
                {
                  key: "1",
                  label: (
                    <PanelHeader>
                      <MdLocationOn />
                      Addresses ({vendor.addresses?.length || 0})
                    </PanelHeader>
                  ),
                  children:
                    vendor.addresses && vendor.addresses.length > 0 ? (
                      vendor.addresses.map((addr) => (
                        <StyledPanelContent key={addr.addressId}>
                          <div>
                            <strong>Address:</strong> {addr.fullAddress || "N/A"}
                          </div>
                          <div>
                            <strong>Phone:</strong> {addr.phone || "N/A"}
                          </div>
                        </StyledPanelContent>
                      ))
                    ) : (
                      <StyledPanelContent>No addresses</StyledPanelContent>
                    ),
                },
              ]}
            />

            <NavLink to={`/vendor/${vendor.vendorId}`}>
              <VendorButton>View Vendor</VendorButton>
            </NavLink>
          </StyledCard>
        ))}
      </VendorGrid>

      {vendors.length > pageSize && (
        <PaginationWrapper>
          <Pagination
            current={currentPage}
            pageSize={pageSize}
            total={vendors.length}
            onChange={(page) => setCurrentPage(page)}
            showSizeChanger={false}
          />
        </PaginationWrapper>
      )}
    </div>
  );
}
