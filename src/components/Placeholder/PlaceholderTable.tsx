import { memo } from 'react';
import { Empty, EmptyProps } from 'antd';

import EmptyState from '../../assets/img/empty_state.png';
import style from './PlaceholderTable.module.scss';

export interface PlaceholderTableOptions extends EmptyProps {
  label?: string;
}

const PlaceholderTable = ({ label, ...props }: PlaceholderTableOptions) => {

  return (
    <Empty
      className={`${style.className} test-placeholder-table`}
      imageStyle={{ height: '100%' }}
      description={
        <span
          className={`${style.className__text} test-placeholder-table__text`}
        >
          {label ?? ('TABLE_NO_ENTRIES')}
        </span>
      }
      {...props}
    />
  );
};

PlaceholderTable.defaultProps = {
  image: EmptyState,
};

export default memo(PlaceholderTable);
