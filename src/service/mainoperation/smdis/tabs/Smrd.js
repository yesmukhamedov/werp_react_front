import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';
import { Container, Segment, Button, Popup, Divider } from 'semantic-ui-react';
import { postRedistSmrdOperator, fetchSmrdOperator } from '../smdisAction';
import { f4FetchFilterPlanStatus } from '../../../../reference/f4/f4_action';
import 'react-datepicker/dist/react-datepicker.css';
import TableReDistribution1 from './tables/TableReDistribution1';
import TableRedistribution2 from './tables/TableRedistribution2';
require('moment/locale/ru');
require('moment/locale/tr');

const Smrd = props => {
  const {
    intl: { message },
    data = [],
    clickAddOperator = [],
    operatorsByBranch = [],
    params,
    setSmrd,
    smrd = [],
    setshowTable,
    showTable = [],
    filterPlanStatus = [],
  } = props;

  useEffect(() => {
    props.f4FetchFilterPlanStatus();
  }, []);

  const operatorOptions = operatorsByBranch.map(item => {
    return {
      key: item.staffId,
      text: item.fullName,
      value: item.staffId,
    };
  });

  const addOperatorRow = () => {
    if (operatorOptions.length > smrd.length || operatorOptions.length === 0) {
      let length = smrd.length;
      setSmrd([
        ...smrd,
        {
          id: 1 + length,
          toOperatorId: null,
          amountPercent: '',
          currentF1: 0,
          currentF1M1: 0,
          currentF2: 0,
          currentF2M1: 0,
          currentF3: 0,
          currentF3M1: 0,
          currentF4: 0,
          currentF4M1: 0,
          currentM1: 0,
          currentSum: 0,
          overDueF1: 0,
          overDueF1M1: 0,
          overDueF2: 0,
          overDueF2M1: 0,
          overDueF3: 0,
          overDueF3M1: 0,
          overDueF4: 0,
          overDueF4M1: 0,
          overDueM1: 0,
          overDueSum: 0,
          totalSum: 0,
        },
      ]);
      setshowTable(true);
    }
  };

  useEffect(() => {
    if (data.toOperators) {
      setOperatorData();
    }
  }, [data.toOperators]);

  const changePercent = (e, row) => {
    setSmrd(
      smrd.map(item =>
        item.id === row.id
          ? {
              ...item,
              amountPercent: e.target.value,
            }
          : item,
      ),
    );
  };

  const removeOperator = row => {
    let filterRemove = smrd.filter(item => item.id != row.id);
    setSmrd(filterRemove);
  };

  const onOperatorSelect = (o, row) => {
    setSmrd(
      smrd.map(item =>
        item.id === row
          ? {
              ...item,
              toOperatorId: o,
            }
          : item,
      ),
    );
  };

  const onStatusSelect = (o, row) => {
    console.log(o, row);
    setSmrd(
      smrd.map(item =>
        item.id === row
          ? {
              ...item,
              planStatusId: o,
            }
          : item,
      ),
    );
  };

  const redistributionData = () => {
    const toOperators = smrd.map(item => {
      return {
        toOperatorId: item.toOperatorId,
        amountPercent: parseInt(item.amountPercent, 10),
        planStatusId: item.planStatusId,
      };
    });
    const operatorParam = {
      branchId: params.branchId,
      bukrsId: params.bukrsId,
      countryId: params.countryId,
      categoryId: params.categoryId,
      dateAt: params.dateAt,
      operatorId: params.fromOperatorId,
    };

    props.postRedistSmrdOperator({ ...params }, toOperators, () =>
      props.fetchSmrdOperator({ ...operatorParam }),
    );
    setOperatorData();
  };

  const setOperatorData = () => {
    if (data.toOperators.length !== 0) {
      setSmrd(
        data.toOperators.map((item, i) => {
          if (item.toOperatorId === smrd.toOperatorId) {
            onOperatorSelect(item.operatorId, smrd.id);
            clickAddOperator();
            return {
              ...item,
              id: ++i,
              toOperatorId: item.operatorId,
              currentF1: item.currentF1,
              currentF1M1: item.currentF1M1,
              currentF2: item.currentF2,
              currentF2M1: item.currentF2M1,
              currentF3: item.currentF3,
              currentF3M1: item.currentF3M1,
              currentF4: item.currentF4,
              currentF4M1: item.currentF4M1,
              currentM1: item.currentM1,
              currentSum: item.currentSum,
              overDueF1: item.overDueF1,
              overDueF1M1: item.overDueF1M1,
              overDueF2: item.overDueF2,
              overDueF2M1: item.overDueF2M1,
              overDueF3: item.overDueF3,
              overDueF3M1: item.overDueF3M1,
              overDueF4: item.overDueF4,
              overDueF4M1: item.overDueF4M1,
              overDueM1: item.overDueM1,
              overDueSum: item.overDueSum,
              totalSum: item.totalSum,
            };
          } else {
            return item;
          }
        }),
      );
      setshowTable(true);
    } else {
      setshowTable(false);
      setSmrd([]);
    }
  };

  return (
    <Container fluid>
      <Segment>
        <h3>Перераспределение</h3>
      </Segment>
      <TableReDistribution1 data={data ? data.fromOperator : []} />
      <Divider />
      {showTable ? (
        <Segment>
          <TableRedistribution2
            data={smrd}
            pageSize={smrd.length}
            operatorOptions={operatorOptions}
            changePercent={changePercent}
            removeOperator={removeOperator}
            onOperatorSelect={onOperatorSelect}
            onStatusSelect={onStatusSelect}
            filterStatus={getFilterStatus(filterPlanStatus)}
          />
        </Segment>
      ) : null}
      <Segment className="justifySegment">
        <Popup
          content="Добавить оператора"
          trigger={
            <Button
              color="green"
              icon="add"
              onClick={() => {
                addOperatorRow();
                clickAddOperator();
              }}
            />
          }
        />
        <Popup
          content="Перераспределить список"
          trigger={
            <Button
              color="blue"
              onClick={() => {
                redistributionData();
              }}
            >
              Перераспределение
            </Button>
          }
        />
      </Segment>
    </Container>
  );
};

const getFilterStatus = filterStatus => {
  const filterStatusPlan = filterStatus;
  if (!filterStatusPlan) {
    return [];
  }
  let out = filterStatus.map(item => {
    return {
      key: item.id,
      text: item.name,
      value: item.id,
    };
  });
  return out;
};

function mapStateToProps(state) {
  return {
    filterPlanStatus: state.f4.filterPlanStatus,
  };
}

export default connect(mapStateToProps, {
  postRedistSmrdOperator,
  fetchSmrdOperator,
  f4FetchFilterPlanStatus,
})(injectIntl(Smrd));
