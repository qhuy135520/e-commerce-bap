import { Input, Menu, Popover } from 'antd'
import styled from 'styled-components'

export const StyleHeader = styled.header``
export const HeaderTop = styled.div`
  background-color: var(--color-blue-8);
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
  /* @media (max-width: 431px) {
    & button{
      $props.size : 
    }
  } */
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
  justify-content: center;
  height: 100%;
  align-items: center;
  background-color: var(--color-grey-200);
  width: 68rem;
`

export const StyleListCateMobileWrapper = styled(Popover)`
  display: none;
  @media (max-width: 431px) {
    display: block;
  }
`
