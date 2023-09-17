import loadable from '@loadable/component';
import { LoaderSpinner } from '../components/Loader';

import AppPaths from '../constant/AppPaths';

export default [
  {
    path: AppPaths.DASHBOARD,
    component: loadable(() => import('../pages/Dashboard/Dashboard'), {
      fallback: <LoaderSpinner />,
    }),
  },
  {
    path: AppPaths.ALLTASK,
    component: loadable(() => import('../pages/Dashboard/Dashboard'), {
      fallback: <LoaderSpinner />,
    }),
  },
  {
    path: AppPaths.PAGE_404,
    component: loadable(() => import('../pages/PageNotFound/PageNotFound'), {
      fallback: <LoaderSpinner />,
    }),
  },
];
