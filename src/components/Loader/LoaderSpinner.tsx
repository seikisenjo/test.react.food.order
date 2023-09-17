import { memo } from 'react';
import { LoadingOutlined } from '@ant-design/icons';
import { Spin, SpinProps } from 'antd';
import loadable from '@loadable/component';

import style from './LoaderSpinner.module.scss';

const LoaderThreeDot = loadable(() => import('./LoaderThreeDot'));

export interface LoaderSpinnerOptions {
  spinProps?: SpinProps;
  block?: boolean | undefined;
}

const LoaderSpinner = ({ block, spinProps, ...props }: LoaderSpinnerOptions) =>
  block ? (
    <div className={`${style.className} test-loader-spinner`}>
      <Spin
        className={style.spinner}
        tip={
          <div className="mt-2">
            Loading
            <LoaderThreeDot />
          </div>
        }
        indicator={<LoadingOutlined style={{ fontSize: 48 }} spin />}
        {...spinProps}
      />
    </div>
  ) : (
    <Spin
      indicator={<LoadingOutlined style={{ fontSize: 48 }} spin />}
      {...spinProps}
    />
  );

LoaderSpinner.defaultProps = {
  block: true,
};

export default memo(LoaderSpinner);
