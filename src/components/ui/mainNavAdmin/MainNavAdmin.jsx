import { Button } from "antd";
import React from "react";
import { MdContactEmergency, MdOutlineShoppingBag } from "react-icons/md";
import { FaFileInvoiceDollar, FaUserCheck, FaProjectDiagram } from "react-icons/fa";
import { RiContactsLine } from "react-icons/ri";
import { useLogout } from "@/hooks/authentication/useLogout";
import { MainNavAdminStyled as MAS } from "@/components/ui/mainNavAdmin";

export default function MainNavAdmin() {
  const { logout } = useLogout();

  return (
    <nav>
      <MAS.NavList>
        <strong> Main Menu Admin</strong>
        <li>
          <MAS.StyledNavLink to="/admin-dashboard/users">
            <RiContactsLine /> Quản lí users
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
        <li>
          <MAS.StyledNavLink to="/dashboard/statistics">
            <FaProjectDiagram /> Thống kê
          </MAS.StyledNavLink>
        </li>
        <li>
          <MAS.StyledNavLink to="/admin-dashboard/payment-history">
            <FaFileInvoiceDollar /> Payment History
          </MAS.StyledNavLink>
        </li>
        <li>
          <MAS.StyledNavLink to="/admin-dashboard/approval-vendor">
            <FaUserCheck /> Vendor Approval
          </MAS.StyledNavLink>
        </li>
        <li>
          <MAS.StyledNavLink to="/admin-dashboard/payment-history">
            <RiContactsLine /> Contact
          </MAS.StyledNavLink>
        </li>

        <strong> Settings</strong>
        <li>
          <Button block onClick={() => logout()}>
            <span>Logout</span>
          </Button>
        </li>
      </MAS.NavList>
    </nav>
  );
}
