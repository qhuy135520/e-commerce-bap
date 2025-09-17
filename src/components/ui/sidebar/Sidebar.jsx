import { useState } from "react";

import { FaArrowCircleLeft } from "react-icons/fa";
import { IoMdMenu } from "react-icons/io";

import { SidebarStyled as SS, MainNavVendor, MainNavAdmin } from "@/components";

import { useUser } from "@/hooks/authentication/useUser";
import { useSelector } from "react-redux";
import { vendorSelector } from "@/stores/rootSelector";

export default function Sidebar() {
  const { user } = useUser();
  const vendorInfo = useSelector(vendorSelector.selectVendorCurrent);
  const [open, setOpen] = useState(true);
  const toggleSidebar = () => setOpen((prev) => !prev);
  const closeSidebar = () => setOpen(false);

  return (
    <>
      <SS.ToggleButton onClick={toggleSidebar}>
        {open ? <FaArrowCircleLeft size={20} /> : <IoMdMenu size={20} />}
      </SS.ToggleButton>
      <SS.Overlay $open={open} onClick={closeSidebar} />
      <SS.StyledSidebar $open={open}>
        {user.role === "vendor" ? <MainNavVendor vendor={vendorInfo} /> : <MainNavAdmin />}
      </SS.StyledSidebar>
    </>
  );
}
