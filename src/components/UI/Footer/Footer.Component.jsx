import { Col, Row } from 'antd'
import {
  Logo,
  StyleFooter,
  StyleRowLogo,
  StyleContainer,
  StyleInfo,
} from './Footer.styled'

const logos = ['0 0', '-85px 0', '-170px 0']

export default function Footer() {
  return (
    <StyleFooter>
      <StyleContainer>
        <Row gutter={[24, 36]}>
          <Col xs={24} sm={12} lg={6}>
            <StyleInfo>
              <b>Tổng đài hỗ trợ</b>
              <p>Gọi mua: 1900 232 461 (8:00 - 21:30)</p>
              <p>Khiếu nại: 1800.1063 (8:00 - 21:30)</p>
            </StyleInfo>
          </Col>
          <Col xs={24} sm={12} lg={6}>
            <StyleInfo>
              <b>Về công ty</b>
              <p>Gọi mua: 1900 232 461 (8:00 - 21:30)</p>
              <p>Khiếu nại: 1800.1063 (8:00 - 21:30)</p>
            </StyleInfo>
          </Col>
          <Col xs={24} sm={12} lg={6}>
            <StyleInfo>
              <b>Thông tin khác</b>
              <p>Gọi mua: 1900 232 461 (8:00 - 21:30)</p>
              <p>Khiếu nại: 1800.1063 (8:00 - 21:30)</p>
            </StyleInfo>
          </Col>
          <Col xs={24} sm={12} lg={6}>
            <StyleInfo>
              <b>Website cùng tập đoàn</b>
              <StyleRowLogo>
                {logos.map((pos, i) => (
                  <Logo key={i} position={pos} />
                ))}
              </StyleRowLogo>
              <p>Gọi mua: 1900 232 461 (8:00 - 21:30)</p>
              <p>Khiếu nại: 1800.1063 (8:00 - 21:30)</p>
            </StyleInfo>
          </Col>
        </Row>
      </StyleContainer>
    </StyleFooter>
  )
}
