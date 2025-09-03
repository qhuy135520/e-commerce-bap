import { Routes } from 'react-router-dom'
import { Suspense } from 'react'

import PrivateRoutes from '@/routes/configs/_private'
import GlobalRoutes from '@/routes/configs/_global'
import LoadingComponent from '@/components/common/Loading.component'
import PublicRoutes from '@/routes/configs/_public'

const RootRouter = () => {
  return (
    <Suspense fallback={<LoadingComponent isLoading={true} />}>
      <Routes>
        {PrivateRoutes}
        {GlobalRoutes}
        {PublicRoutes}
      </Routes>
    </Suspense>
  )
}

export default RootRouter;
