import React from 'react';
import { Route } from 'react-router-dom';
import { ROUTER_PATH } from '../../constants';
import PublicLayout from '../../layouts/public/PublicLayout';

const HomePage = React.lazy(() =>
  import('../../pages/publicPages').then((module) => ({
    default: module.HomePage,
  }))
);

const About = React.lazy(() =>
  import('../../pages/publicPages').then((module) => ({
    default: module.About,
  }))
);

const PublicRoutes = (
  <Route element={<PublicLayout />}>
    <Route path={ROUTER_PATH.HOME_PAGE.PATH} element={<HomePage />} />
    <Route path={ROUTER_PATH.ABOUT.PATH} element={<About />} />
  </Route>
);

export default PublicRoutes;
