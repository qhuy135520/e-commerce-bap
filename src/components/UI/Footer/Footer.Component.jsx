import { Col, Row } from 'antd'
import {
  Logo,
  StyleFooter,
  StyleRowLogo,
  StyleContainer,
  StyleInfo,
  StylePhone,
} from './Footer.styled'
import DarkModeToggle from '../../common/darkModeToggle'
import { NavLink } from 'react-router-dom'

const logos = ['0 0', '-85px 0', '-170px 0']

export default function Footer() {
  return (
    <StyleFooter>
      <StyleContainer>
        <Row gutter={[24, 36]}>
          <Col xs={24} sm={12} lg={7}>
            <StyleInfo>
              <b>Tổng đài hỗ trợ</b>
              <p>
                Gọi mua: <StylePhone>1900 232 461</StylePhone>{' '}
              </p>
              <p>
                Khiếu nại: <StylePhone>1800 1063</StylePhone>{' '}
              </p>
            </StyleInfo>
          </Col>
          <Col xs={24} sm={12} lg={7}>
            <StyleInfo>
              <b>Về công ty</b>
              <p>
                <NavLink to='about'>Giới thiệu về công ty</NavLink>
              </p>
            </StyleInfo>
          </Col>
          <Col xs={24} sm={12} lg={10 }>
            <StyleInfo>
              <b>Website cùng tập đoàn</b>
              <StyleRowLogo>
                {logos.map((pos, i) => (
                  <Logo key={i} $position={pos} />
                ))}
              </StyleRowLogo>
              <p>
                <DarkModeToggle />
              </p>
            </StyleInfo>
          </Col>
        </Row>
      </StyleContainer>
    </StyleFooter>
  )
}
