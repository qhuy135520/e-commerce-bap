import { Routes } from 'react-router-dom'
import { Suspense } from 'react'
import { Spin } from 'antd'

import PrivateRoutes from '@/routes/configs/_private'
import GlobalRoutes from '@/routes/configs/_global'
import LoadingComponent from '@/components/common/Loading.component'

const RootRouter = () => {
  return (
    <Suspense fallback={<LoadingComponent isLoading={true} />}>
      <Routes>
        {PrivateRoutes}
        {GlobalRoutes}
      </Routes>
    </Suspense>
  )
}

export default RootRouter
