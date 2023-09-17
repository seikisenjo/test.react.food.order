import { memo } from 'react';
import { Layout } from 'antd';
import styled from 'styled-components';

import ImageNotFound from '../../assets/img/404.png';
import style from './PageNotFound.module.scss';

export const PageNotFoundLayoutWithBackground = styled(Layout.Content)`
  background: url(${ImageNotFound}) no-repeat center center fixed #f4f5f9;
  background-size: cover;
`;

const PageNotFound = () => {

  return (
    <Layout>
      <PageNotFoundLayoutWithBackground
        className={`test-page-not-found ${style.wrapper}`}
      >
        <div className="test-page-not-found__content">
          <div className="test-page-not-found__content__wrapper">
            <div className="test-page-not-found__content__wrapper__title">
              {('PAGE NOT FOUND')}
            </div>
          </div>
        </div>
      </PageNotFoundLayoutWithBackground>
    </Layout>
  );
};

export default memo(PageNotFound);
