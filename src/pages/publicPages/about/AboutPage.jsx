import AboutImg from '../../../assets/about-img.jpg'
import AboutImg2 from '../../../assets/about-img-2.png'

import { StyleAbout, StyleHeading, StyleImg } from './About.styled'
import { useTranslation } from 'react-i18next'
export default function About() {
  const { t } = useTranslation(['common'])
  return (
    <StyleAbout>
      <StyleHeading as='h2'>{t('about.title1')}</StyleHeading>
      <StyleImg src={AboutImg} alt='About Image' />
      <p>{t('about.desc1')}</p>
      <hr />
      <StyleHeading as='h2'>{t('about.title2')}</StyleHeading>
      <img src={AboutImg2} alt='About Image' />

      <p>{t('about.desc2')}</p>
    </StyleAbout>
  )
}
