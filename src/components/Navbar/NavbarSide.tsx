import { Key, memo, ReactNode, useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Layout, Menu, SiderProps, MenuProps, Typography } from 'antd';
import { useSelector } from 'react-redux';
import style from './NavbarSide.module.scss';

type MenuItemType = Required<MenuProps>['items'][number] &
  {
    label: ReactNode | string;
    icon?: ReactNode;
    children?: MenuItemType[];
  };

export const navRouteItem = (
  label: ReactNode,
  key: Key,
  icon?: ReactNode,
  children?: MenuItemType[],
  type?: 'group',
  /* eslint-disable-next-line max-params */
): MenuItemType => ({
  key,
  icon,
  children,
  label,
  type,
});

export interface NavbarSideOptions extends SiderProps {
  items: MenuItemType[];
  menuProps?: MenuProps;
}

const { Title } = Typography;

const NavbarSide = ({
  items,
  menuProps,
  theme,
  ...props
}: NavbarSideOptions) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(false);
  const [openKeys, setOpenKeys] = useState<string[]>([]);

  const {
    appSettings: { appFullLogo, appLogo, appBasename },
  } = useSelector(({ appSettings }) => ({ appSettings }));

  const handleOnMenuClick = ({ key }: any) => navigate(key);

  const handleOnCollapse = (res: boolean) => setCollapsed(res);

  /** Open only one submenu at a time */
  const handleOnSubMenuOpen = (menuItems: string[]) => {
    const lastKey = menuItems[menuItems.length - 1];
    setOpenKeys([lastKey]);
  };

  const getItems = (options: MenuItemType[]): ReactNode[] =>
    options.map(
      ({ key, ...itemProps }: MenuItemType) => {

        if (itemProps.children) {
          const subMenuItems = getItems(itemProps.children);
          if (subMenuItems.length === 0) {
            return <></>;
          }

          return (
            <Menu.SubMenu
              key={key}
              icon={itemProps.icon}
              title={(`${itemProps.label}`)}
              popupClassName={`test-navbar-side__submenu ${style.submenu}`}
            >
              {subMenuItems}
            </Menu.SubMenu>
          );
        }

        return (
          <Menu.Item
            className={`test-navbar-side__menu ${style.menu}`}
            key={key}
            icon={itemProps.icon}
          >
            <Link to={key as string}>{(`${itemProps.label}`)}</Link>
          </Menu.Item>
        );
      },
    );

  useEffect(() => {
    if (items && !collapsed) {
      const currentPath =
        appBasename !== '/'
          ? location.pathname.replace(`${appBasename}`, '')
          : location.pathname;
      const itemKey = `/${currentPath.split('/')?.[1]}`;
      const currentOpenKey = items.find(
        (item) => itemKey === item.key && item.children?.length,
      )?.key as string;

      setOpenKeys([currentOpenKey]);
    }
  }, [collapsed]);

  return (
    <Layout.Sider
      className={`test-navbar-side ${style.wrapper}`}
      width="240"
      {...props}
    >
      <div
        className={`test-navbar-side__logo__box ${
          collapsed ? 'collapsed' : ''
        }`}
      >
        <Title>todo</Title>
      </div>
        <Menu
          theme={theme}
          mode="inline"
          defaultSelectedKeys={[location.pathname]}
          openKeys={openKeys}
          onClick={handleOnMenuClick}
          onOpenChange={handleOnSubMenuOpen}
          {...menuProps}
        >
          {getItems(items)}
        </Menu>
    </Layout.Sider>
  );
};

NavbarSide.defaultProps = {
  items: [],
  theme: 'dark',
};

export default memo(NavbarSide);
