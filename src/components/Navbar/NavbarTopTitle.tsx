import { memo, useEffect } from 'react';
import { Button, Layout } from 'antd';
import { UnorderedListOutlined } from '@ant-design/icons';
import { useSelector, useDispatch } from 'react-redux';
import { getAppSettings, setShowMainPage } from '../../reducers/slices/AppSettingsSlice';

export interface NavbarTopTitleOptions {
  onClick?: (e?: MouseEvent) => void | any;
}

const headerStyle: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  textAlign: 'center',
  color: '#fff',
  height: 64,
  paddingInline: 50,
  lineHeight: '64px',
  background: '#0095ff',
};

const NavbarTopTitle = ({onClick}: NavbarTopTitleOptions) => {
  const dispatch = useDispatch();
  const { Header } = Layout;
  const { appSettings } = useSelector(getAppSettings);

  // const showDashboard = () => {
  //   dispatch(setShowMainPage(true));
  // }

  // useEffect(() => {
  //   dispatch(setShowMainPage(false));
  // },[])

  return (
    <Layout>
      <Header style={headerStyle}>
        {appSettings.showMainPage ? (
          <Button icon={<UnorderedListOutlined style={{ fontSize: '32px'}}/>} type='text' onClick={onClick}/>
        ) : (
          <Button type='text' onClick={() => {showDashboard}}>
            return
          </Button>
        )}
      </Header>
    </Layout>
  );
};

export default memo(NavbarTopTitle);
