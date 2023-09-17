import { memo, useReducer, useEffect } from 'react';
import {
  Card,
  Form,
  Input,
  ModalProps,
  Table,
} from 'antd';
import { PlusOutlined, ArrowRightOutlined } from '@ant-design/icons';
import FormDetails from '../FormDetails/FormDetails';
import loadable from '@loadable/component';
import { UseQuery } from '@reduxjs/toolkit/dist/query/react/buildHooks';

import { reducerHelpers } from '../../lib/helpers';
import { getLocaleStorage, setLocaleStorage } from '../../lib/storage';

export interface DashboardOptions extends ModalProps {
  initialValues?: any;
  onSubmit: (data: any) => void;
  showMore?: boolean;
  useCountryQuery?: UseQuery<any>;
}

const ButtonMoreActions = loadable(() => import('../../components/Button'), {
  resolveComponent: (component) => component.ButtonMoreActions,
});

const TableSummaryButton = loadable(() => import('../../components/Table'), {
  resolveComponent: (component) => component.TableSummaryButton,
});

const { Search } = Input
const getLabel = (key?: any) => (key === 'task');

const Dashboard = ({
  initialValues,
  onSubmit,
  showMore,
}: DashboardOptions) => {

  const [form] = Form.useForm();
  const [state, setState] = useReducer(reducerHelpers, {
    selectedKey: initialValues?.type ?? 'task',
    label: getLabel(initialValues?.type),
    search: '',
    taskVisible: false,
    searchVisible: false,
    updateData: false,
  });

  const handleOnAdd = (add: any) => {
    form.validateFields().then(() => add());
    if (form.getFieldValue('list')?.length > 0 && state?.searchVisible === false) {
      setState({ searchVisible: true});
    }
    setLocaleStorage('task', JSON.stringify(form.getFieldValue(['list'])));
  }

  const columns = [
    {
      key: 'value',
      width: 'auto',
      filteredValue: [state?.search],
      onFilter: (value: any, record: any) => {
        return String(record?.value).toLowerCase().includes(value.toLowerCase())
      },
      render: (_: any, record: any) => (
        <Form.Item
          className="mb-0"
          name={[record?.name, 'value']}
          rules={[{ required: true, message: 'This field is required' }]}
        >
          <Input placeholder={state.label} />
        </Form.Item>
      ),
    },
    {
      key: 'action',
      fixed: 'right',
      align: 'right' as const,
      width: 140,
      render: (_: any, record: any) => (
        <ButtonMoreActions
          viewButtonProps={{icon: <PlusOutlined/>}}
          updateButtonProps={{icon: <ArrowRightOutlined/>}}
          onView={()=> console.log('in progress')}
          onUpdate={() => setState({ taskVisible: true, index: _?.key})}
        />
      ),
    },
  ];

  useEffect(() => {
    if (form.getFieldValue('list') === undefined && getLocaleStorage('task') !== undefined) {
      form.setFieldValue(['list'], JSON.parse(getLocaleStorage('task')));
    }
    if (form.getFieldValue('list')?.length > 0 && state?.searchVisible === false) {
      setState({ searchVisible: true});
    }
  }, []);

  return (
    <>
    <Card>
      {state?.taskVisible ? (
        <FormDetails 
          form={form}
          index={state?.index}
          onSubmit={() => setState({ taskVisible: false })}
        />
      ) : (
        <Form
        className="mt-3"
        colon={false}
        form={form}
        initialValues={
          initialValues ?? undefined
        }
        layout="horizontal"
        labelCol={{ span: 6 }}
        onFinish={onSubmit}
      >
        {state?.searchVisible ? (
          <Search placeholder="Please input task name" enterButton="Search" size="large" onSearch={(value)=>{setState ({search: value})}}/>
        ) : (
          <></>
        )}  
        <Form.List name="list">
          {(fields, { add, remove }) => {
          
          return(
            <div className="d-flex justify-content-end">
              <Table
                columns={columns}
                scroll={{ y: '60vh' }}
                defaultExpandAllRows={true}
                dataSource={fields.map((field) => ({ ...field, remove }))}
                locale={{ emptyText: <></> }}
                summary={() =>
                  showMore ? (
                    <TableSummaryButton onClick={() => handleOnAdd(add)}>
                      Add New Task
                    </TableSummaryButton>
                  ) : (
                    <></>
                  )
                }
                pagination={false}
              />
            </div>
          )}}
        </Form.List>  
      </Form>
      )}
      </Card>
    </>
  );
};

Dashboard.defaultProps = {
  showMore: true,
};

export default memo(Dashboard);
