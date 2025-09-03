import { Input, Menu, Popover } from 'antd'
import styled from 'styled-components'

export const StyleHeader = styled.header``
export const HeaderTop = styled.div`
  background-color: var(--color-blue-5);
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
export const StyleContainer = styled.div`
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
export const StyleButton = styled.div`
  display: flex;
  gap: 1rem;
`
export const StyleImg = styled.img`
  height: 100%;
  @media (max-width: 431px) {
    display: none;
  }
`
export const StyleInputSearch = styled(Input)`
  height: 4rem;
  border-radius: 2rem;
  width: 60%;
  @media (max-width: 431px) {
    width: 24rem;
  }
`

export const StyleCategory = styled.nav`
  height: 100%;
  @media (max-width: 431px) {
  }
`
export const StyleMenu = styled(Menu)`
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

export const StyleListCateMobileWrapper = styled(Popover)`
  display: none;
  @media (max-width: 431px) {
    display: block;
  }
`

export const StyleContentPopover = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
  justify-content: center;
  align-items: center;
  & hr{
    width: 80%;
  }

`