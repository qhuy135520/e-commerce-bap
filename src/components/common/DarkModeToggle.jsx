import styled from 'styled-components'
import { HiOutlineMoon, HiOutlineSun } from 'react-icons/hi'

import { useDarkMode } from '@/contexts/theme/DarkModeContext'

const ButtonToggleStyled = styled.button`
  position: fixed;
  bottom: 1rem;
  left: 1rem;
  border: none;
  background-color: var(--color-platinum-1);
  color: var(--color-grey-50);
  width: 50px;
  height: 50px;
  background: var(--color-blue-7);
  border-radius: 50%;
  &::after {
  }
  &:focus {
    outline: none;
  }

  @media (max-width: 431px) {
    width: 40px;
    height: 40px;
  }
`

function DarkModeToggle() {
  const { isDarkMode, toggleDarkMode } = useDarkMode()
  return (
    <ButtonToggleStyled onClick={toggleDarkMode}>
      {isDarkMode ? <HiOutlineSun /> : <HiOutlineMoon />}
    </ButtonToggleStyled>
  )
}

export default DarkModeToggle
