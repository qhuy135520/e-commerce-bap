import { Row } from "antd";
import React from "react";
import { CiShop } from "react-icons/ci";

import { HeadingStyled, InfoVendorStyled as IS } from "@/components";

export default function InfoVendor({ handleNavigate, dataVendor }) {
  return (
    <IS.InfoVendor>
      <Row gutter={[0, 12]}>
        <IS.ColInfo sm={24} lg={8}>
          <IS.FlexInfo>
            <HeadingStyled as="h3">{dataVendor.vendorName}</HeadingStyled>
            <IS.ButtonInfo
              size="medium"
              color="blue"
              variant="outlined"
              onClick={() => handleNavigate(`/vendor/${dataVendor.vendorId}`)}
            >
              <CiShop size="20" /> Xem Shop
            </IS.ButtonInfo>
          </IS.FlexInfo>
        </IS.ColInfo>
        <IS.ColInfo sm={24} lg={16}>
          <IS.Grid>
            <IS.GridItem>
              <strong>{dataVendor?.avgRating}/5</strong>
              <p>Đánh giá</p>
            </IS.GridItem>
            <IS.GridItem>
              <strong>{dataVendor?.totalProducts}</strong>
              <p>Sản phẩm</p>
            </IS.GridItem>
            <IS.GridItem>
              <strong>{dataVendor?.totalSales}</strong>
              <p>Lượt bán</p>
            </IS.GridItem>
          </IS.Grid>
        </IS.ColInfo>
      </Row>
    </IS.InfoVendor>
  );
}
