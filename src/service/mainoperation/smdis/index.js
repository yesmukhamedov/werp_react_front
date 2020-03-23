import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';

import Smcrld from './tabs/Smcrld';
import Smvod from './tabs/Smvod';
import Smrd from './tabs/Smrd';
import {
  fetchSmvodList,
  fetchSmrdOperator,
  postSmrdOperatorsByBranch,
} from './smdisAction';

import { Container, Tab, Menu, Label } from 'semantic-ui-react';

import '../../service.css';
import './style.css';
import { momentToStringYYYYMMDD } from '../../../utils/helpers';

const Smdis = props => {
  const {
    intl: { messages },
    language,
    smvod,
    smrdOperator,
    operatorsByBranch = [],
  } = props;

  console.log('operatorsByBranch', operatorsByBranch);

  const emptyParam = {
    bukrs: '1000',
    categoryId: 2,
    dateAt: '',
  };

  const [param, setParam] = useState({ ...emptyParam });
  const [branch, setBranch] = useState('');

  const [defaultPane, setDefaultPane] = useState(0);

  //Operator options
  const operatorOptions = operatorsByBranch.map(item => {
    return {
      key: item.staffId,
      text: `${item.lastname} ${item.firstname} ${item.middlename}`,
      value: item.staffId,
    };
  });

  //Распределение списка замена картриджа
  const clickViewService = data => {
    console.log('DATA', data);
    setDefaultPane(1);

    let paramSmvod = {
      branchId: data.branchId,
      categoryId: param.categoryId,
      dateAt: param.dateAt,
    };

    props.fetchSmvodList({ ...paramSmvod });
  };

  //Просмотр распределения по операторам
  const clickSmvodRow = data => {
    setDefaultPane(2);
    console.log('DATA CLICK SMVOD', data);

    let smrdOperatorParam = {
      branchId: data.branchId,
      categoryId: param.categoryId,
      dateAt: param.dateAt,
      operatorId: data.operatorId,
    };

    setBranch(data.branchId);

    props.fetchSmrdOperator({ ...smrdOperatorParam });
  };

  //Получить список операторов
  const clickAddOperator = () => {
    let paramOp = {
      branchId: branch,
      categoryId: param.categoryId,
      dateAt: param.dateAt,
    };
    console.log('clickAddOperator param', paramOp);
    props.postSmrdOperatorsByBranch({ ...paramOp });
  };

  const onInputChange = (o, fieldName) => {
    setParam(prev => {
      const prevParam = { ...prev };
      switch (fieldName) {
        case 'bukrs':
          prevParam.bukrs = o.value;
          break;

        case 'categoryId':
          prevParam.categoryId = o.value;
          break;

        case 'date':
          prevParam.dateAt = momentToStringYYYYMMDD(o);
          break;
        default:
          prevParam[fieldName] = o.value;
      }
      return prevParam;
    });
  };

  //Вкладки
  const panes = [
    {
      menuItem: (
        <Menu.Item key={0} onClick={() => setDefaultPane(0)}>
          Распределение списка замена картриджа
        </Menu.Item>
      ),
      pane: (
        <Tab.Pane key={0}>
          <Smcrld
            clickViewService={clickViewService}
            onInputChange={onInputChange}
            param={param}
          />
        </Tab.Pane>
      ),
    },
    {
      menuItem: (
        <Menu.Item key={1} onClick={() => setDefaultPane(1)}>
          Просмотр распределения по операторам
        </Menu.Item>
      ),
      pane: (
        <Tab.Pane key={1}>
          <Smvod smvod={smvod} clickSmvodRow={clickSmvodRow} />
        </Tab.Pane>
      ),
    },
    {
      menuItem: (
        <Menu.Item key={2} onClick={() => setDefaultPane(2)}>
          Перераспределение
        </Menu.Item>
      ),
      pane: (
        <Tab.Pane key={2}>
          <Smrd
            intl={props.intl}
            data={smrdOperator}
            clickAddOperator={clickAddOperator}
            operatorOptions={operatorOptions}
          />
        </Tab.Pane>
      ),
    },
  ];

  return (
    <Container
      fluid
      style={{
        marginTop: '2em',
        marginBottom: '2em',
        paddingLeft: '2em',
        paddingRight: '2em',
      }}
    >
      <Tab
        activeIndex={defaultPane}
        menu={{ attached: true, tabular: false, pointing: true }}
        panes={panes}
        renderActiveOnly={false}
      />
    </Container>
  );
};

function mapStateToProps(state) {
  return {
    smvod: state.smdisReducer.smvod,
    smrdOperator: state.smdisReducer.smrdOperator,
    operatorsByBranch: state.smdisReducer.operatorsByBranch,
  };
}

export default connect(mapStateToProps, {
  fetchSmvodList,
  fetchSmrdOperator,
  postSmrdOperatorsByBranch,
})(injectIntl(Smdis));
