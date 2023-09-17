import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { FloatButton, Layout, LayoutProps } from 'antd';
import loadable from '@loadable/component';
import { useSelector } from 'react-redux';

import { NavbarSideOptions } from '../../components/Navbar';
import { getAppSettings } from '../../reducers/slices/AppSettingsSlice';

export interface MainLayoutOptions extends LayoutProps {
  sideBarProps?: NavbarSideOptions;
}

const NavbarSide = loadable(() => import('../../components/Navbar'), {
  resolveComponent: (component) => component.NavbarSide,
});

const NavbarSideAnchor = loadable(() => import('../../components/Navbar'), {
  resolveComponent: (component) => component.NavbarSideAnchor,
});

const NavbarTopTitle = loadable(() => import('../../components/Navbar'), {
  resolveComponent: (component) => component.NavbarTopTitle,
});

const NavbarBottom = loadable(() => import('../../components/Navbar'), {
  resolveComponent: (component) => component.NavbarBottom,
});

const MainLayout = ({ sideBarProps, }: MainLayoutOptions) => {
  const {
    appSettings: { showSideBarAnchor, sideBarAnchor },
  } = useSelector(getAppSettings);

  const getContentContainer = () =>
    document.querySelector(
      `.test-layout-content${showSideBarAnchor === true ? '-anchor' : ''}`,
    ) as HTMLElement;

  const [openNavbar, setOpenNavbar] = useState(false);

  const handleToggleOpenNavbar = () => {
    setOpenNavbar(!openNavbar);
  }

  return (
    <Layout style={{width: "100vw", height:"100vh"}}>
      {openNavbar && sideBarProps && !showSideBarAnchor && <NavbarSide {...sideBarProps} />}
      {showSideBarAnchor && <NavbarSideAnchor {...sideBarAnchor} />}
      <Layout>
        <NavbarTopTitle onClick={() => setOpenNavbar(!openNavbar)} />
        <Layout.Content
          className={`test-layout-content${
            showSideBarAnchor === true ? '-anchor' : ''
          }`}
        >
          <Outlet />
          <FloatButton.BackTop target={getContentContainer} />
        </Layout.Content>
        <NavbarBottom onClick={handleToggleOpenNavbar} />
      </Layout>
    </Layout>
  );
};

MainLayout.defaultProps = {};

export default MainLayout;
