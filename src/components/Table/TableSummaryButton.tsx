import { memo } from 'react';
import { Button, ButtonProps, Form, Table } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

export interface TableSummaryButtonOptions extends ButtonProps {}

const TableSummaryButton = (props: TableSummaryButtonOptions) => (
  <Table.Summary fixed="bottom">
    <Table.Summary.Row>
      <Table.Summary.Cell index={0}>
        <Form.Item style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
          <Button type="link" icon={<PlusOutlined />} {...props} />
        </Form.Item>
      </Table.Summary.Cell>
    </Table.Summary.Row>
  </Table.Summary>
);

export default memo(TableSummaryButton);
