import { Spin } from 'antd'
import React from 'react'

const ChildrenLoading = ({ isLoading, children }) => {
  if (isLoading) {
    return <Spin />
  }

  return children
}

export default ChildrenLoading
