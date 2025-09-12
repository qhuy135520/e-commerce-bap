// MainNavAdmin.jsx
import { Button } from "antd";
import React, { useState } from "react";
import { MdContactEmergency, MdOutlineShoppingBag } from "react-icons/md";
import { FaFileInvoiceDollar, FaUserCheck, FaProjectDiagram } from "react-icons/fa";
import { RiContactsLine } from "react-icons/ri";
import { useLogout } from "@/hooks/authentication/useLogout";
import * as MAS from "@/components/ui/mainNavAdmin/MainNavAdmin.styled";

export default function MainNavAdmin() {
  const { logout } = useLogout();
  const [openStatistics, setOpenStatistics] = useState(false);

  return (
    <nav>
      <MAS.NavList>
        <MAS.StyledNavLink to="/admin-dashboard">
          <strong>Dashboard Admin</strong>
        </MAS.StyledNavLink>

        <li>
          <MAS.StyledNavLink to="/admin-dashboard/users">
            <RiContactsLine /> Quản lí người dùng
          </MAS.StyledNavLink>
        </li>
        <li>
          <MAS.StyledNavLink to="/admin-dashboard/products">
            <MdContactEmergency /> Quản lí sản phẩm
          </MAS.StyledNavLink>
        </li>
        <li>
          <MAS.StyledNavLink to="/admin-dashboard/orders">
            <MdOutlineShoppingBag /> Quản lí đơn hàng
          </MAS.StyledNavLink>
        </li>

        {/* Thống kê */}
        <li>
          <MAS.StatisticsToggle onClick={() => setOpenStatistics((prev) => !prev)}>
            <FaProjectDiagram /> Thống kê
          </MAS.StatisticsToggle>
          {openStatistics && (
            <MAS.SubMenu>
              <li>
                <MAS.StyledNavLink to="/admin-dashboard/statistics-order">📊 Thống kê đơn hàng</MAS.StyledNavLink>
              </li>
              <li>
                <MAS.StyledNavLink to="/admin-dashboard/statistics-product">📈 Thống kê sản phẩm</MAS.StyledNavLink>
              </li>
            </MAS.SubMenu>
          )}
        </li>

        <li>
          <MAS.StyledNavLink to="/admin-dashboard/payment-history">
            <FaFileInvoiceDollar /> Lịch sử giao dịch
          </MAS.StyledNavLink>
        </li>
        <li>
          <MAS.StyledNavLink to="/admin-dashboard/approval-vendor">
            <FaUserCheck /> Phê duyệt nhà cung cấp
          </MAS.StyledNavLink>
        </li>

        <strong>Settings</strong>
        <li>
          <Button block onClick={() => logout()}>
            <span>Logout</span>
          </Button>
        </li>
      </MAS.NavList>
    </nav>
  );
}
