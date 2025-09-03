import AuthSideImageStyled from './AuthSideImage.styled'
import SideImage from '@/assets/images/auth/side-image.svg'

export default function AuthSideImage() {
  return (
    <AuthSideImageStyled src={SideImage} alt='Authentication Side Image...' />
  )
}
