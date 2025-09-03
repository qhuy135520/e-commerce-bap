import React from 'react'
import ErrorComponent from './Error.component'
import {
  CartIcon,
  LoaderWrapper,
  LogoText,
} from '@/components/common/Loading.styled'

function LoadingComponent({ children, isLoading, error = null }) {
  if (isLoading) {
    return (
      <LoaderWrapper>
        <CartIcon />
        <LogoText>E-Bap</LogoText>
      </LoaderWrapper>
    )
  }

  if (error) {
    return <ErrorComponent message={error.message} />
  }

  return children
}

export default LoadingComponent

