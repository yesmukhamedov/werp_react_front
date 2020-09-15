import React, { useState } from 'react';
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
import { errorTableText } from '../../../utils/helpers';
import { Container, Tab, Menu, Header } from 'semantic-ui-react';

import '../../service.css';
import './style.css';
import { momentToStringYYYYMMDD } from '../../../utils/helpers';

const Smdis = props => {
  const {
    intl: { messages },
    //language,
    smvod,
    smrdOperator,
    operatorsByBranch = [],
  } = props;

  const emptyParam = {
    branchId: '',
    bukrsId: '',
    countryId: '',
    categoryId: '',
    dateAt: null,
    fromOperatorId: '',
    planStatusId: '',
  };

  const [param, setParam] = useState({ ...emptyParam });
  //const [branch, setBranch] = useState('');
  const [error, setError] = useState([]);
  const [smrd, setSmrd] = useState([]);
  const [showTable, setshowTable] = useState(false);

  const [defaultPane, setDefaultPane] = useState(0);
  console.log('PARAM', param);
  //Operator options

  //Распределение списка замена картриджа
  const clickViewService = data => {
    setDefaultPane(1);

    let paramSmvod = {
      branchId: data.branchId,
      bukrsId: data.bukrsId,
      countryId: data.countryId,
      categoryId: param.categoryId,
      dateAt: param.dateAt,
    };

    props.fetchSmvodList({ ...paramSmvod });
  };

  //Просмотр распределения по операторам
  const clickSmvodRow = data => {
    setDefaultPane(2);

    setParam({
      ...param,
      branchId: data.branchId,
      countryId: data.countryId,
      fromOperatorId: data.operatorId,
    });

    let smrdOperatorParam = {
      branchId: data.branchId,
      bukrsId: data.bukrsId,
      countryId: data.countryId,
      categoryId: param.categoryId,
      dateAt: param.dateAt,
      operatorId: data.operatorId,
    };

    //setBranch(data.branchId);
    setSmrd([]);
    setshowTable(false);
    props.fetchSmrdOperator({ ...smrdOperatorParam });
  };

  //Получить список операторов
  const clickAddOperator = () => {
    let paramOp = {
      branchId: param.branchId,
      bukrsId: param.bukrsId,
      countryId: param.countryId,
      categoryId: param.categoryId,
      dateAt: param.dateAt,
    };
    props.postSmrdOperatorsByBranch({ ...paramOp });
  };

  const onInputChange = (o, fieldName) => {
    setParam(prev => {
      const prevParam = { ...prev };
      switch (fieldName) {
        case 'bukrsId':
          prevParam.bukrsId = o.value;
          break;

        case 'categoryId':
          prevParam.categoryId = o.value;
          break;
        case 'clearBukrsId':
          prevParam.bukrsId = '';
          break;

        case 'clearCategoryId':
          prevParam.categoryId = '';
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

  const validate = () => {
    const errors = [];
    if (param.bukrsId === '') {
      errors.push(errorTableText(5));
    }
    if (param.categoryId === '') {
      errors.push(errorTableText(109));
    }
    if (param.dateAt === null) {
      errors.push(errorTableText(22));
    }
    setError(() => errors);
  };

  //Вкладки
  const panes = [
    {
      menuItem: (
        <Menu.Item key={0} onClick={() => setDefaultPane(0)}>
          {messages['cartridge_replacement_distribution']}
        </Menu.Item>
      ),
      pane: (
        <Tab.Pane key={0}>
          <Smcrld
            clickViewService={clickViewService}
            onInputChange={onInputChange}
            param={param}
            validate={validate}
            error={error}
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
            operatorsByBranch={operatorsByBranch}
            params={param}
            setParams={setParam}
            smrd={smrd}
            setSmrd={setSmrd}
            showTable={showTable}
            setshowTable={setshowTable}
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
      <Header as="h2" floated="left">
        {messages['cartridge_replacement_distribution']}
      </Header>
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
