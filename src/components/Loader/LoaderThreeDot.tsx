import React, { memo } from 'react';

import style from './LoaderThreeDot.module.scss';

export interface LoaderThreeDotOptions {}

const LoaderThreeDot = (props: LoaderThreeDotOptions) => (
  <span className={`test-loader-three-dot ${style.className}`}>
    <span>.</span>
    <span>.</span>
    <span>.</span>
  </span>
);

export default memo(LoaderThreeDot);
