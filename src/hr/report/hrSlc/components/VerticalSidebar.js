import React, { useState, useEffect } from 'react';
import DropdownClearable from '../../../../utils/DropdownClearable';
import {
  Button,
  Grid,
  Header,
  Segment,
  Sidebar,
  Divider,
  Form,
  Menu,
  Icon,
  Radio,
} from 'semantic-ui-react';
const VerticalSidebar = props => {
  const {
    animation,
    direction,
    visible,
    companyOptions = [],
    branchOptions = [],
    countryOptions = [],
    positionOptions = [],
    param = {},
    onChangeVerticalSideBar = () => {},
    toggleStatus,
  } = props;
  return (
    <Sidebar
      animation={animation}
      direction={direction}
      icon="labeled"
      visible={visible}
      width="wide"
    >
      <Form style={{ padding: '20px' }}>
        <Divider horizontal>Карта</Divider>
        <Radio
          toggle
          checked={toggleStatus}
          label="Показать на карте"
          onChange={() => onChangeVerticalSideBar('toggleFilter')}
        />
        <Divider horizontal>Фильтр</Divider>
        <Form.Field>
          <label>Страна</label>
          <DropdownClearable
            fluid
            placeholder="Страна"
            value={param.countryId ? param.countryId : ''}
            options={countryOptions ? countryOptions : []}
            onChange={(e, { value }) =>
              onChangeVerticalSideBar('changeCountry', value)
            }
            className="alignBottom"
            handleClear={() => onChangeVerticalSideBar('clearCountry')}
            allSelect={false}
          />
        </Form.Field>
        <Form.Field required>
          <label>Компания</label>
          <DropdownClearable
            fluid
            placeholder="Компания"
            value={param.bukrs ? param.bukrs : ''}
            options={companyOptions ? companyOptions : []}
            onChange={(e, { value }) =>
              onChangeVerticalSideBar('changeCompany', value)
            }
            className="alignBottom"
            handleClear={() => onChangeVerticalSideBar('clearCompany')}
            allSelect={false}
          />
        </Form.Field>
        <Form.Field>
          <label>Филиал</label>
          <DropdownClearable
            fluid
            placeholder="Филиал"
            value={param.branchId ? param.branchId : ''}
            options={branchOptions}
            onChange={(e, { value }) =>
              onChangeVerticalSideBar('changeBranch', value)
            }
            className="alignBottom"
            handleClear={() => onChangeVerticalSideBar('clearBranch')}
            allSelect={false}
          />
        </Form.Field>
        <Form.Field>
          <label>Должность</label>
          <DropdownClearable
            fluid
            placeholder="Должность"
            value={param.positionId ? param.positionId : ''}
            options={positionOptions ? positionOptions : []}
            onChange={(e, { value }) =>
              onChangeVerticalSideBar('changePosition', value)
            }
            className="alignBottom"
            handleClear={() => onChangeVerticalSideBar('clearPosition')}
            allSelect={false}
          />
        </Form.Field>

        <Button
          color="blue"
          type="submit"
          onClick={() => onChangeVerticalSideBar('buttonSearch')}
        >
          Поиск
        </Button>
        <Divider horizontal>Отчеты</Divider>
        <h5>Количество дилеров: 55</h5>
        <Divider></Divider>
        <h5>Количество мастеров: 15</h5>
      </Form>
    </Sidebar>
  );
};

export default VerticalSidebar;
