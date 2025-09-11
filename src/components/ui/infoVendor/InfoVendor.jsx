import { Row } from "antd";
import React from "react";
import { CiShop } from "react-icons/ci";

import { HeadingStyled, InfoVendorStyled as IS } from "@/components";

export default function InfoVendor({ handleNavigate, vendorId }) {
  return (
    <IS.InfoVendor>
      <Row gutter={[0, 12]}>
        <IS.ColInfo sm={24} lg={8}>
          <IS.FlexInfo>
            <HeadingStyled as="h3">Apple FlagShip Store</HeadingStyled>
            <IS.ButtonInfo
              size="medium"
              color="blue"
              variant="outlined"
              onClick={() => handleNavigate(`/vendor/${vendorId}`)}
            >
              <CiShop size="20" /> Xem Shop
            </IS.ButtonInfo>
          </IS.FlexInfo>
        </IS.ColInfo>
        <IS.ColInfo sm={24} lg={16}>
          <IS.Grid>
            <IS.GridItem>
              <strong>4.8/5</strong>
              <p>Tham gia</p>
            </IS.GridItem>
            <IS.GridItem>
              <strong>120</strong>
              <p>Sản phẩm</p>
            </IS.GridItem>
            <IS.GridItem>
              <strong>3.5k</strong>
              <p>Lượt bán</p>
            </IS.GridItem>
          </IS.Grid>
        </IS.ColInfo>
      </Row>
    </IS.InfoVendor>
  );
}
