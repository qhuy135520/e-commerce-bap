import React from "react";
import { Button } from "antd";
import { AiFillProduct } from "react-icons/ai";
import { FaListCheck } from "react-icons/fa6";
import { MdLogout } from "react-icons/md";
import { FaRegUserCircle } from "react-icons/fa";

import { useLogout } from "@/hooks/authentication/useLogout";

import { MainNavVendorStyled as MNVS } from "@/components";

import { formatCurrency } from "@/utils/helpers";
import { useUser } from "@/hooks/authentication/useUser";

export default function MainNavVendor() {
  const { logout } = useLogout();
  const { user } = useUser();

  return (
    <nav>
      <MNVS.NavList>
        <strong> Main Menu Vendor</strong>
        <hr />
        <b>Số tiền chưa thanh toán: {formatCurrency(user.moneyBalance)}</b>
        <hr />
        <li>
          <MNVS.StyledNavLink to="/vendor-dashboard/products">
            <AiFillProduct /> Quản lý sản phẩm
          </MNVS.StyledNavLink>
        </li>
        <li>
          <MNVS.StyledNavLink to="/vendor-dashboard/orders">
            <FaListCheck /> Quản lý đơn hàng
          </MNVS.StyledNavLink>
        </li>
        <strong> Settings</strong>
        <li>
          <Button block>
            <FaRegUserCircle /> Cập nhật thông tin
          </Button>
        </li>
        <li>
          <Button block onClick={() => logout()}>
            <MdLogout />
            Logout
          </Button>
        </li>
      </MNVS.NavList>
    </nav>
  );
}
