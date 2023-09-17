import { navRouteItem } from '../components/Navbar/NavbarSide';

import AppPaths from './AppPaths';

export default [
  navRouteItem(
    'All Task',
    AppPaths.ALLTASK,
  ),
  navRouteItem(
    'Completed Task',
    AppPaths.COMPLETEDTASK,
  ),
  navRouteItem(
    'Incimplete Task',
    AppPaths.INCOMPLETETASK,
  ),
];
