import { Input, Menu, Popover } from 'antd'
import styled from 'styled-components'

export const HeaderBg = styled.header`
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  z-index: 1000;
`
export const HeaderTop = styled.div`
  background: var(--grad-blue-1);
  height: 6.4rem;
  display: flex;
  align-items: center;
`
export const HeaderBottom = styled.div`
  display: block;
  background-color: var(--color-grey-200);
  height: 3.2rem;
  display: flex;
  align-items: center;
  @media (max-width: 431px) {
    display: none;
  }
`
export const ContainerTop = styled.div`
  max-width: 1200px;
  padding: 0 1rem;
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 0 auto;
  gap: 2rem;
`
export const ContainerBot = styled.div`
  max-width: 1200px;
  padding: 0 1rem;
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto;
  gap: 2rem;
`
export const ButtonHeader = styled.div`
  display: flex;
  gap: 1rem;
  align-items: center;
`
export const Img = styled.img`
  height: 100%;
  cursor: pointer;
  @media (max-width: 431px) {
    display: none;
  }
`
export const InputSearch = styled(Input)`
  height: 4rem;
  border-radius: 2rem;
  width: 60%;
  background-color: var(--color-grey-100);

  .ant-input::placeholder {
    color: var(--color-grey-800);
    opacity: 0.5;
  }
  @media (max-width: 431px) {
    width: 19rem;
  }
`
export const MenuHeader = styled(Menu)`
  display: flex;
  flex-direction: ${(props) =>
    props.mode === 'horizontal' ? 'row' : 'column'};
  width: ${(props) => (props.mode === 'horizontal' ? '68rem' : '100%')};
  justify-content: center;
  height: 100%;
  align-items: center;
  background-color: var(--color-grey-200);
  &.ant-menu-inline {
    border-inline-end: none !important;
  }
`

export const ListCateMobileWrapper = styled(Popover)`
  display: none;
  @media (max-width: 431px) {
    display: block;
  }
`

export const ContentPopover = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
  justify-content: center;
  align-items: center;
  & hr {
    width: 80%;
  }
`
