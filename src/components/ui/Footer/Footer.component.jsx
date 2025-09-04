import { Col, Row } from 'antd'
import {
  Logo,
  StyleFooter,
  StyleRowLogo,
  StyleContainer,
  StyleInfo,
  StylePhone,
  StyleRow,
} from './Footer.styled'
import { NavLink } from 'react-router-dom'
import SocialGroup from '@/components/ui/SocialGroup'
import { useTranslation } from 'react-i18next'

const logos = ['0 0', '-85px 0', '-170px 0']

export default function Footer() {
  const { t } = useTranslation(['common'])
  return (
    <StyleFooter>
      <StyleContainer>
        <StyleRow gutter={[24, 36]} justify='space-around'>
          <Col xs={24} sm={12} lg={6}>
            <StyleInfo>
              <b>{t('footer.supportHotline')}</b>
              <p>
                {t('footer.buy')}: <StylePhone>1900 232 461</StylePhone>{' '}
              </p>
              <p>
                {t('footer.complaint')}: <StylePhone>1800 1063</StylePhone>{' '}
              </p>
            </StyleInfo>
          </Col>
          <Col xs={24} sm={12} lg={6}>
            <StyleInfo>
              <b> {t('footer.aboutCompany')}</b>
              <p>
                <NavLink to='about'>{t('footer.introCompany')}</NavLink>
              </p>
            </StyleInfo>
          </Col>
          <Col xs={24} sm={12} lg={6}>
            <StyleInfo>
              <b>{t('footer.groupWebsite')}</b>
              <StyleRowLogo>
                {logos.map((pos, i) => (
                  <Logo key={i} $position={pos} />
                ))}
              </StyleRowLogo>
            </StyleInfo>
          </Col>
          <Col xs={24} sm={12} lg={6}>
            <StyleInfo>
              <b>{t('footer.contact')}</b>
              <SocialGroup />
            </StyleInfo>
          </Col>
        </StyleRow>
      </StyleContainer>
    </StyleFooter>
  )
}
