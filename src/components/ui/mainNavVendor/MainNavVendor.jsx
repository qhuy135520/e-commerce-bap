import React from "react";
import { useTranslation } from "react-i18next";
import { Button } from "antd";
import { AiFillProduct } from "react-icons/ai";
import { FaListCheck } from "react-icons/fa6";
import { MdLogout } from "react-icons/md";
import { FaRegUserCircle, FaHome } from "react-icons/fa";
import { AiFillDashboard } from "react-icons/ai";
import { NavLink } from "react-router-dom";

import { useLogout } from "@/hooks/authentication/useLogout";
import { formatCurrency } from "@/utils/helpers";
import { useUser } from "@/hooks/authentication/useUser";

import { LanguageSwitcher, MainNavVendorStyled as MNVS } from "@/components";

export default function MainNavVendor() {
  const { logout } = useLogout();
  const { user } = useUser();
  const { t } = useTranslation(["vendor"]);

  return (
    <nav>
      <MNVS.NavList>
        <MNVS.StyledNavLink to="/admin-dashboard">
          <strong>Vendor Dashboard</strong>
        </MNVS.StyledNavLink>
        <b>{t("mainNav.balance", { moneyBalance: formatCurrency(user.moneyBalance) })}</b>
        <hr />
        <li>
          <MNVS.StyledNavLink to="/vendor-dashboard/dashboard">
            <AiFillDashboard /> {t("mainNav.dashboard")}
          </MNVS.StyledNavLink>
        </li>
        <li>
          <MNVS.StyledNavLink to="/vendor-dashboard/products">
            <AiFillProduct /> {t("mainNav.manageProducts")}
          </MNVS.StyledNavLink>
        </li>
        <li>
          <MNVS.StyledNavLink to="/vendor-dashboard/orders">
            <FaListCheck /> {t("mainNav.manageOrders")}
          </MNVS.StyledNavLink>
        </li>
        <strong>{t("mainNav.settings")}</strong>
        <li>
          <NavLink to="/vendor-dashboard/update-info">
            <Button block>
              <FaRegUserCircle /> {t("mainNav.updateInfo")}
            </Button>
          </NavLink>
        </li>
        <li>
          <NavLink to="/">
            <Button block>
              <FaHome /> {t("mainNav.home")}
            </Button>
          </NavLink>
        </li>
        <li>
          <Button block onClick={() => logout()}>
            <MdLogout /> {t("mainNav.logout")}
          </Button>
        </li>
      </MNVS.NavList>
    </nav>
  );
}
