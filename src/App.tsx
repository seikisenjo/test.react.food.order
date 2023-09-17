import Core from './core/Core';
import AppSettings from './constant/AppSettings';
import AppNavBar from './constant/AppNavBar';
import { AppReducers } from './reducers/index';
import AppRoutes from './constant/AppRoutes';

function App() {

  return (
    <Core
      appSettings={AppSettings}
      appReducers={AppReducers}
      defaultLayoutProps={{
        sideBarProps: {
          items: AppNavBar,
        },
      }}
      privateRoutes={AppRoutes}
    />
  )
}

export default App
