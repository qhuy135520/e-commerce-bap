import { Col, Row } from 'antd'
import styled from 'styled-components'

export const StyleFooter = styled.footer`
  background-color: var(--color-grey-200);
  padding: 3rem 0;
  width: 100%;
`
export const StyleContainer = styled.div`
  max-width: 1200px;
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto;
  gap: 2rem;
  padding: 2rem;
`
export const Sprite = styled.div`
  background-image: url('https://cdnv2.tgdd.vn/webmwg/2024/ContentMwg/images/DMX/Global/Desktop/Logo-webmoi-min.png');
  background-repeat: no-repeat;
  display: inline-block;
  background-size: 250px 200px;
`

export const Logo = styled(Sprite)`
  width: 85px;
  height: 24px;
  background-position: ${(props) => props.$position};
`

export const StyleRowLogo = styled.div`
  display: flex;
  gap: 0.4rem;
`

export const StyleInfo = styled(Col)`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`
export const StylePhone = styled.span`
  font-weight: 600;
  color: var(--color-blue-7);
`

export const StyleRow = styled(Row)`
  width: 100%;
`
