import { NavLink } from 'react-router-dom'
import styled from 'styled-components'

const NavLinkStyled = styled(NavLink)`
  font-size: 1.6rem;
  color: var(--color-grey-600);
  font-weight: 500;

  @media (max-width: 992px) {
    font-size: 1.2rem;
  }
`
export default NavLinkStyled
