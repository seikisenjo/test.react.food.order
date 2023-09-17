import { StrictMode } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { HelmetProvider } from 'react-helmet-async';
import { Resource } from 'i18next';

import AppSettings from '../constant/AppSettings';
import { ReduxProvider } from '../store';
import MainLayout, {
  MainLayoutOptions,
} from '../layouts/MainLayout/MainLayout';
import RouteProvider, { RouteType } from './RouteProvider';
import SetupProvider from './SetupProvider';

export interface CoreOptions {
  appSettings: any;
  appReducers?: any;
  appServices?: any;
  appRoutes?: any;
  defaultLayout?: any;
  defaultLayoutProps?: MainLayoutOptions;
  publicRoutes?: RouteType[];
  privateRoutes?: RouteType[];
  overwriteRoutes?: any;
  translatorResource?: Resource;
}

export const CoreDefaultProps = {
  appSettings: AppSettings,
  appReducers: {},
  appServices: [],
  defaultLayout: MainLayout,
  defaultLayoutProps: {
    sideBarProps: { menu: [] },
  },
};

const Core = ({
  appSettings,
  appReducers,
  appServices,
  defaultLayout,
  ...props
}: CoreOptions) => {

  return (
    <StrictMode>
      <HelmetProvider>
        <ReduxProvider
          appReducers={appReducers}
          appServices={appServices}
        >
              <SetupProvider appSettings={appSettings}>
                <BrowserRouter basename={appSettings.appBasename}>
                  <RouteProvider
                    appSettings={appSettings}
                    defaultLayout={defaultLayout}
                    {...props}
                  />
                </BrowserRouter>
              </SetupProvider>
              <ToastContainer />
        </ReduxProvider>
      </HelmetProvider>
    </StrictMode>
  );
};

Core.defaultProps = CoreDefaultProps;

export default Core;
