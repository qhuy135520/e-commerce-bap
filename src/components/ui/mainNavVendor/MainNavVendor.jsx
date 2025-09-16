import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { Button } from "antd";

import { AiFillProduct } from "react-icons/ai";
import { FaListCheck } from "react-icons/fa6";
import { MdLogout } from "react-icons/md";
import { FaRegUserCircle, FaHome } from "react-icons/fa";
import { AiFillDashboard } from "react-icons/ai";

import { useLogout } from "@/hooks/authentication/useLogout";

import { vendorSelector } from "@/stores/rootSelector";
import { vendorThunk } from "@/stores/rootThunk";
import { MainNavVendorStyled as MNVS } from "@/components";

import { formatCurrency } from "@/utils/helpers";

export default function MainNavVendor({ vendor }) {
  const dispatch = useDispatch();
  const { logout } = useLogout();
  const { t } = useTranslation(["vendor"]);
  const vendorInfo = useSelector(vendorSelector.selectVendor);

  useEffect(() => {
    if (vendor?.id) {
      dispatch(vendorThunk.getVendorInfo(vendor.id));
    }
  }, [vendor?.id, dispatch]);

  return (
    <nav>
      <MNVS.NavList>
        <MNVS.StyledNavLink to="/admin-dashboard">
          <strong>Vendor Dashboard</strong>
        </MNVS.StyledNavLink>
        <b>{t("mainNav.balance", { moneyBalance: formatCurrency(vendorInfo.moneyBalance) })}</b>
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
          <Button block onClick={logout}>
            <MdLogout /> {t("mainNav.logout")}
          </Button>
        </li>
      </MNVS.NavList>
    </nav>
  );
}
