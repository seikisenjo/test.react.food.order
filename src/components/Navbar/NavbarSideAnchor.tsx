import { memo } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { Anchor, AnchorProps, Button, Layout, LayoutProps } from 'antd';
import { AnchorLinkItemProps } from 'antd/es/anchor/Anchor';

import style from './NavbarSideAnchor.module.scss';

export interface NavbarSideAnchorOptions extends LayoutProps {
  anchorProps?: AnchorProps;
  items?: AnchorLinkItemProps[];
}

const NavbarSideAnchor = ({
  anchorProps,
  items,
  ...props
}: NavbarSideAnchorOptions) => {
  const navigate = useNavigate();

  const getContentContainer = () =>
    document.querySelector('.test-layout-content-anchor') as HTMLElement;

  return (
    <Layout.Sider
      className={`test-navbar-side--anchor ${style.wrapper}`}
      width="136"
      {...props}
    >
      <Button icon={<ArrowLeftOutlined />} onClick={() => navigate(-1)} />
      <Anchor
        offsetTop={64}
        className="test-navbar-side--anchor__list"
        onClick={(e) => e.preventDefault()}
        getContainer={getContentContainer}
        items={items?.map(({ title, ...item }) => ({
          title: (`${title}`),
          ...item,
        }))}
        {...anchorProps}
      />
    </Layout.Sider>
  );
};

NavbarSideAnchor.defaultProps = {
  theme: 'dark',
};

export default memo(NavbarSideAnchor);
