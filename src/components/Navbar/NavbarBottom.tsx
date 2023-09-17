import { memo } from 'react';
import { Button, Layout } from 'antd';

export interface NavbarBottomOptions {
  onClick?: (e?: MouseEvent) => void | any;
}

const NavbarBottom = ({onClick}: NavbarBottomOptions) => {

  const { Footer } = Layout;

  return (
    <Layout>
      <Footer style={{ display: 'flex', alignItems: 'center', marginTop: 'auto' }}>
         <Button type='link' block>
            <div>
            <svg width='24' height='24'style={{backgroundColor: '#0095ff'}}>
              <rect/>
            </svg>
            </div>
            <div>
              Blue
            </div>
         </Button>
         <Button type='link' block>
            <div>
            <svg width='24' height='24'style={{backgroundColor: '#9000ff'}}>
              <rect/>
            </svg>
            </div>
            <div>
              Purple
            </div>
         </Button>
         <Button type='link' block>
            <div>
            <svg width='24' height='24'style={{backgroundColor: '#64bc00'}}>
              <rect/>
            </svg>
            </div>
            <div>
              Green
            </div>
         </Button>
         <Button type='link' block>
            <div>
            <svg width='24' height='24'style={{backgroundColor: '#ff8400'}}>
              <rect/>
            </svg>
            </div>
            <div>
              Orange
            </div>
         </Button>
      </Footer>
    </Layout>
  );
};

NavbarBottom.defaultProps = {};

export default memo(NavbarBottom);
