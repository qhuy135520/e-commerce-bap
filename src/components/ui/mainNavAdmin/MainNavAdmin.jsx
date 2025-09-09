import { Button } from "antd";
import React from "react";

import { MdContactEmergency } from "react-icons/md";
import { FaProjectDiagram } from "react-icons/fa";
import { RiContactsLine } from "react-icons/ri";

import { MainNavAdminStyled as MAS } from "@/components";

import { useLogout } from "@/hooks/authentication/useLogout";

export default function MainNavAdmin() {
  const { logout } = useLogout();

  return (
    <nav>
      <MAS.NavList>
        <strong> Main Menu Admin</strong>
        <li>
          <MAS.StyledNavLink to="/dashboard/about">
            <MdContactEmergency /> About
          </MAS.StyledNavLink>
        </li>
        <li>
          <MAS.StyledNavLink to="/dashboard/projects">
            <FaProjectDiagram /> Projects
          </MAS.StyledNavLink>
        </li>
        <li>
          <MAS.StyledNavLink to="/dashboard/contact">
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
