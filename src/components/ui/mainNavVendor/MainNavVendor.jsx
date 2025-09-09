import React from "react";
import { Button } from "antd";
import { AiFillProduct } from "react-icons/ai";
import { FaListCheck, FaWarehouse } from "react-icons/fa6";
import { MdOutlinePayments, MdLogout } from "react-icons/md";
import { FaRegUserCircle } from "react-icons/fa";

import { useLogout } from "@/hooks/authentication/useLogout";

import { MainNavVendorStyled as MNVS } from "@/components";

export default function MainNavVendor() {
  const { logout } = useLogout();
  return (
    <nav>
      <MNVS.NavList>
        <strong> Main Menu Vendor</strong>
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
        <li>
          <MNVS.StyledNavLink to="/vendor-dashboard/transaction">
            <MdOutlinePayments /> Quản lý thanh toán
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
