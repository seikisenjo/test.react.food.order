import { memo, ReactNode, MouseEvent } from 'react';
import {
  Button,
  ButtonProps,
  Dropdown,
  DropdownProps,
  Space,
  SpaceProps,
} from 'antd';
import { EllipsisOutlined } from '@ant-design/icons';
import { ItemType } from 'antd/es/menu/hooks/useItems';

enum Hierarchy {
  SuperAdmin = 1,
  House = 2,
  MasterAgent = 3,
  Agent = 4,
}

type PermissionType = {
  hierarchyId?: Hierarchy;
  category?: string | string[];
  actions?: string | string[];
};

type OptionType = ItemType & PermissionType;

export interface ButtonMoreActionsOptions extends SpaceProps {
  viewText?: string | ReactNode;
  viewButtonProps?: ButtonProps;
  updateText?: string | ReactNode;
  updateButtonProps?: ButtonProps;
  deleteText?: string | ReactNode;
  deleteButtonProps?: ButtonProps;
  onUpdate?: (event?: MouseEvent) => void | any;
  onView?: (event?: MouseEvent) => void | any;
  onDelete?: (event?: MouseEvent) => void | any;
  dropdownProps?: DropdownProps;
  dropdownItems?: OptionType[];
}

const ButtonMoreActions = ({
  viewText,
  viewButtonProps,
  updateText,
  updateButtonProps,
  deleteText,
  deleteButtonProps,
  onView,
  onUpdate,
  onDelete,
  dropdownProps,
  dropdownItems,
  ...props
}: ButtonMoreActionsOptions) => {
  const currentItems: ItemType[] = [];

  const getItems = (): ItemType[] => {
    dropdownItems?.map(({ ...itemProps }) => {
        currentItems.push(itemProps);
    });

    return currentItems;
  };

  return (
    <Space className="test-button-more-action" size="small" {...props}>
      {onView && (
          <Button
            className="test-button-more-action__view p-0"
            type="link"
            onClick={onView}
            {...viewButtonProps}
          >
          </Button>
      )}
      {onUpdate && (
          <Button
            className="test-button-more-action__update p-0"
            type="link"
            onClick={onUpdate}
            {...updateButtonProps}
          >
          </Button>
      )}
      {dropdownItems && getItems()?.length > 0 && (
        <Dropdown
          className="test-button-more-action__dropdown"
          menu={{ items: currentItems }}
          placement="bottomLeft"
          trigger={['click']}
          arrow={false}
          {...dropdownProps}
        >
          <Button
            className="test-button-more-action__dropdown__button p-0"
            type="ghost"
          >
            <EllipsisOutlined />
          </Button>
        </Dropdown>
      )}
    </Space>
  );
};

export default memo(ButtonMoreActions);
