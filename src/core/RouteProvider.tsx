import { useSelector } from 'react-redux';
import { Navigate, RouteObject, useRoutes } from 'react-router-dom';
import AppPaths from '../constant/AppPaths';
import ErrorRoutes from '../constant/AppRoutes';
import {
  AppSettingInitialStateProps,
  getAppSettings,
} from '../reducers/slices/AppSettingsSlice';
import { MainLayoutOptions } from '../layouts/MainLayout/MainLayout';

export type RouteType = {
  component?: any;
} & RouteObject;

type SubNavigateType = {
  route: string;
};

const SubNavigate = ({ route }: SubNavigateType) => {
  const { appSettings } = useSelector(getAppSettings);

  const appBasename =
    appSettings?.appBasename === '/' ? '' : appSettings.appBasename;

  window.location.pathname = `${appBasename}${route}`;
  return <></>;
};

const RouteProvider = ({
  appSettings,
  defaultLayout: MainLayout,
  defaultLayoutProps,
  privateRoutes = [],
  overwriteRoutes,
}: {
  appSettings: AppSettingInitialStateProps;
  authLayoutProps?: any;
  defaultLayout?: any;
  defaultLayoutProps?: MainLayoutOptions;
  publicRoutes?: RouteType[];
  privateRoutes?: RouteType[];
  overwriteRoutes?: RouteObject[];
}) => {

  let routes: RouteObject[] = [];    

      routes = [
        ...routes,
        {
          element: <MainLayout {...defaultLayoutProps} />,
          children: privateRoutes.map(
            ({
              path,
              component: ComponentRender,
              ...routeProps
            }: RouteType) => ({
              path,
              element: <ComponentRender/>,
              ...routeProps,
            }),
          ),
        },
      ];

    routes = [
      ...routes,
      ...ErrorRoutes.map(({ path, component }: RouteType) => ({
        path,
        element: component,
      })),
      {
        path: '/iframe.html',
        element: (
          <Navigate
            to={appSettings.mainUrl}
          />
        ),
      },
      {
        path: '/',
        element: (
          <SubNavigate
            route={appSettings.mainUrl}
          />
        ),
      },
      { path: '*', element: <Navigate to={AppPaths.PAGE_404} /> },
    ];

  return useRoutes(overwriteRoutes ?? routes);
};

export default RouteProvider;
