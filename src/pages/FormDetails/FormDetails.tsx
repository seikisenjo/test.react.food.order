import { memo, useReducer, useEffect } from 'react';
import {
  Button,
  Card,
  Form,
  FormInstance,
  Input,
  ModalProps,
  Descriptions,
  Row,
} from 'antd';
import { reducerHelpers } from '../../lib/helpers';
import { getLocaleStorage, setLocaleStorage } from '../../lib/storage';

export interface FormDetailsOptions extends ModalProps {
  form: FormInstance<any>;
  index?: any;
  initialValues?: any;
  onSubmit?: (e?: MouseEvent) => void | any;
}

const { TextArea } = Input;
const getLabel = (key?: any) => (key === 'task');

const TaskForm = ({
  form,
  index,
  initialValues,
  onSubmit,
}: FormDetailsOptions) => {
  const [state, setState] = useReducer(reducerHelpers, {
    selectedKey: initialValues?.type ?? 'task',
    label: getLabel(initialValues?.type),
    taskName: '',
    timeElapsed: '',
    remark: '',
  });

  const handleDeleteTask = () => {
    const handleTempData = JSON.parse(getLocaleStorage('task')) ?? [];
    handleTempData.splice(index, 1);
    setLocaleStorage('task', JSON.stringify(handleTempData));
  }

  useEffect(() => {
      setState({ taskName: form.getFieldValue(['list'])[index].value})
  }, []);

  return (
    <>
      <Card>
        <Form
          className="mt-3"
          colon={false}
          form={form}
          initialValues={
            initialValues ?? {
              type: state.selectedKey,
              list: [{ value: undefined, remark: undefined }],
            }
          }
          layout="horizontal"
          labelCol={{ span: 6 }}
          onFinish={onSubmit}
        >
          <Descriptions
            colon={false}
            column={1}
            className="test-formview-basic-information"
          >
            <Descriptions.Item label='Previous Task' span={1.5}>
              {state?.taskName}
            </Descriptions.Item>
            <Descriptions.Item label='Time Elapsed' span={1.5}>
              {state?.timeElapsed}
            </Descriptions.Item>
            <Descriptions.Item label='Remark' span={1.5}>
            </Descriptions.Item>
          </Descriptions>
          <Row gutter={[16, 16]}>
          <Form.Item name='remark' noStyle>
            <TextArea rows={4} placeholder="Enter remark here " maxLength={6} style={{resize: 'none'}}/>
          </Form.Item>
          <Button type="primary" block onClick={onSubmit}>
            Complete
          </Button>
          <Button type="primary" block danger onClick={handleDeleteTask}>
            Delete
          </Button>
          </Row>
        </Form>
      </Card>
    </>
  );
};

TaskForm.defaultProps = {
  showMore: true,
};

export default memo(TaskForm);
