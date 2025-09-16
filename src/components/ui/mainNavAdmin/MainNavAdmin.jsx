import React, { useState } from "react";
import { Button } from "antd";
import { MdContactEmergency, MdOutlineShoppingBag } from "react-icons/md";
import { FaFileInvoiceDollar, FaUserCheck, FaProjectDiagram } from "react-icons/fa";
import { RiContactsLine } from "react-icons/ri";
import { useTranslation } from "react-i18next";

import { useLogout } from "@/hooks/authentication/useLogout";

import { LanguageSwitcher, MainNavAdminStyled as MAS } from "@/components";
import { AiFillDashboard } from "react-icons/ai";

export default function MainNavAdmin() {
  const { logout } = useLogout();
  const { t } = useTranslation(["admin"]);
  const [openStatistics, setOpenStatistics] = useState(false);

  return (
    <nav>
      <MAS.NavList>
        <LanguageSwitcher />
        <hr />
        <MAS.StyledNavLink to="/admin-dashboard">
          <AiFillDashboard />
          {t("nav.dashboard")}
        </MAS.StyledNavLink>

        <li>
          <MAS.StyledNavLink to="/admin-dashboard/users">
            <RiContactsLine /> {t("nav.users")}
          </MAS.StyledNavLink>
        </li>
        <li>
          <MAS.StyledNavLink to="/admin-dashboard/products">
            <MdContactEmergency /> {t("nav.products")}
          </MAS.StyledNavLink>
        </li>
        <li>
          <MAS.StyledNavLink to="/admin-dashboard/orders">
            <MdOutlineShoppingBag /> {t("nav.orders")}
          </MAS.StyledNavLink>
        </li>

        <li>
          <MAS.StatisticsToggle onClick={() => setOpenStatistics((prev) => !prev)}>
            <FaProjectDiagram /> {t("nav.statistics")}
          </MAS.StatisticsToggle>
          {openStatistics && (
            <MAS.SubMenu>
              <li>
                <MAS.StyledNavLink to="/admin-dashboard/statistics-order">
                  {t("nav.statisticsOrders")}
                </MAS.StyledNavLink>
              </li>
              <li>
                <MAS.StyledNavLink to="/admin-dashboard/statistics-product">
                  {t("nav.statisticsProducts")}
                </MAS.StyledNavLink>
              </li>
            </MAS.SubMenu>
          )}
        </li>

        <li>
          <MAS.StyledNavLink to="/admin-dashboard/payment-history">
            <FaFileInvoiceDollar /> {t("nav.paymentHistory")}
          </MAS.StyledNavLink>
        </li>
        <li>
          <MAS.StyledNavLink to="/admin-dashboard/approval-vendor">
            <FaUserCheck /> {t("nav.approvalVendor")}
          </MAS.StyledNavLink>
        </li>

        <strong>{t("nav.settings")}</strong>
        <li>
          <Button block onClick={() => logout()}>
            <span>{t("nav.logout")}</span>
          </Button>
        </li>
      </MAS.NavList>
    </nav>
  );
}
