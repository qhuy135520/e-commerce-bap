import { useState } from "react";

import { FaArrowCircleLeft } from "react-icons/fa";
import { IoMdMenu } from "react-icons/io";

import { useUser } from "@/hooks/authentication/useUser";

import { SidebarStyled as SS, MainNavAdmin, MainNavVendor } from "@/components";

export default function Sidebar() {
  const { user } = useUser();
  const [open, setOpen] = useState(false);
  const toggleSidebar = () => setOpen((prev) => !prev);
  const closeSidebar = () => setOpen(false);

  return (
    <>
      <SS.ToggleButton onClick={toggleSidebar}>
        {open ? <FaArrowCircleLeft size={20} /> : <IoMdMenu size={20} />}
      </SS.ToggleButton>
      <SS.Overlay $open={open} onClick={closeSidebar} />
      <SS.StyledSidebar $open={open}>{user.role === "vendor" ? <MainNavVendor /> : <MainNavAdmin />}</SS.StyledSidebar>
    </>
  );
}
