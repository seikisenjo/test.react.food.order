import React, { memo } from 'react';
import { Skeleton, SkeletonProps } from 'antd';

import style from './LoaderSkeletonTable.module.scss';

const LoaderSkeletonTable = (props: SkeletonProps) => (
  <Skeleton
    className={`${style.className} test-loader-skeleton--table`}
    active
    loading
    paragraph={{
      rows: 7,
      width: ['50%', '100%', '100%', '38%', '50%', '100%', '100%'],
    }}
    {...props}
  />
);

export default memo(LoaderSkeletonTable);
