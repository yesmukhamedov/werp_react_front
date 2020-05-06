import React, { useState, useEffect } from 'react';
import {
  Button,
  Segment,
  Header,
  Icon,
  Grid,
  Modal,
  Label,
  Table,
  Input,
  Dropdown,
} from 'semantic-ui-react';
import { injectIntl } from 'react-intl';
import { connect } from 'react-redux';
import {
  f4FetchWerksBranchList,
  f4FetchCountryList,
} from '../../../reference/f4/f4_action';
import {
  fetchSmsetplp,
  fetchSmsetplpId,
  editSmsetplp,
  fetchOperationTypeList,
} from '../../serviceAction';
import './index.css';
const Edit = props => {
  const {
    intl: { messages },
    countryList,
    companyOptions,
    branchOptions,
    getCountryOptions,
    getBranchOptions,
    editSmsetplp,
    getOperationList,
    operationTypeList,
    fetchSmsetplp,
    row,
  } = props;

  useEffect(() => {
    if (!countryList || countryList.length === 0) props.f4FetchCountryList();
    fetchOperationTypeList();
  }, []);

  const [editParams, setEditParams] = useState({});
  const [brnchErr, setBrnchErr] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  console.log('opop', operationTypeList);

  const handleOpenEdit = () => {
    setOpenModal(true);
    let bukr = companyOptions.find(({ text }) => row.bukrs === text).value;
    let opTypeId = operationTypeList.find(
      ({ name }) => row.operationTypeId === name,
    );

    let editObj = {
      bukrs: bukr,
      countryId: countryList.find(({ country }) => row.countryId === country)
        .countryId,
      branchId: branchOptions[bukr].find(({ text }) => row.branchId === text)
        .value,
      operationTypeId: opTypeId ? opTypeId.id : row.operationTypeId,
      currentBasePlan: row.currentBasePlan,
      currentPlan: row.currentPlan,
      overDueBasePlan: row.overDueBasePlan,
      overDuePlan: row.overDuePlan,
      totalSumPlan: row.totalSumPlan,
      id: row.id,
    };
    setEditParams({ ...editObj });
  };

  const handleChange = (label, o) => {
    let temporaryObj = { ...editParams };

    switch (label) {
      case 'bukrs': {
        if (
          temporaryObj.bukrs !== o.value &&
          temporaryObj.bukrs &&
          temporaryObj.branchId
        ) {
          temporaryObj.branchId = '';
          setBrnchErr(true);
        }
        temporaryObj.bukrs = o.value;
        break;
      }
      case 'countryId': {
        if (
          temporaryObj.countryId !== o.value &&
          temporaryObj.countryId &&
          temporaryObj.branchId
        ) {
          temporaryObj.branchId = '';
          setBrnchErr(true);
        }
        temporaryObj.countryId = o.value;
        break;
      }
      case 'branchId': {
        temporaryObj.branchId = o.value;
        setBrnchErr(false);
        break;
      }

      case 'currentBasePlan': {
        temporaryObj.currentBasePlan = Number(o.value);
        break;
      }
      case 'currentPlan': {
        temporaryObj.currentPlan = Number(o.value);
        break;
      }
      case 'operationTypeId': {
        temporaryObj.operationTypeId = Number(o.value);
        break;
      }
      case 'overDueBasePlan': {
        temporaryObj.overDueBasePlan = Number(o.value);
        break;
      }
      case 'overDuePlan': {
        temporaryObj.overDuePlan = Number(o.value);
        break;
      }
    }

    temporaryObj.totalSumPlan =
      (temporaryObj.currentPlan || 0) + (temporaryObj.overDuePlan || 0);

    setEditParams({ ...temporaryObj });
  };

  const handleSave = () => {
    setOpenModal(false);
    editSmsetplp({ ...editParams }, () => {
      fetchSmsetplp(editParams.bukrs, editParams.branchId);
      setOpenModal(false);
    });
  };

  return (
    <div>
      <Modal
        trigger={
          <h5>
            <span className="btn" onClick={handleOpenEdit}>
              <Icon name="pencil" size="large" color="blue" />
            </span>
          </h5>
        }
        size="tiny"
        open={openModal}
      >
        <Segment style={{ padding: 0 }} clearing inverted color="blue">
          <Button
            size="mini"
            color="red"
            floated="right"
            icon
            onClick={() => setOpenModal(false)}
          >
            <Icon name="close" />
          </Button>{' '}
          <br />
          <br />
          <Header style={{ margin: 0 }} textAlign="center" as="h2">
            {messages['BTN__EDIT']}
          </Header>
          <br />
        </Segment>
        <Modal.Content>
          <Grid centered>
            <Grid.Row>
              <Grid.Column>
                <Table striped>
                  <Table.Body>
                    <Table.Row>
                      <Table.Cell width={7}>
                        <Label size="large" basic>
                          {messages['bukrs']}{' '}
                        </Label>
                      </Table.Cell>
                      <Table.Cell>
                        <Dropdown
                          fluid
                          selection
                          search
                          value={editParams.bukrs}
                          onChange={(e, o) => {
                            handleChange('bukrs', o);
                          }}
                          options={companyOptions || []}
                        />
                      </Table.Cell>
                    </Table.Row>

                    <Table.Row>
                      <Table.Cell>
                        <Label size="large" basic>
                          {' '}
                          {messages['country']}{' '}
                        </Label>
                      </Table.Cell>

                      <Table.Cell>
                        <Dropdown
                          fluid
                          selection
                          search
                          value={editParams.countryId}
                          onChange={(e, o) => {
                            handleChange('countryId', o);
                          }}
                          options={getCountryOptions(countryList)}
                        />
                      </Table.Cell>
                    </Table.Row>
                    <Table.Row>
                      <Table.Cell>
                        {' '}
                        <Label size="large" basic>
                          {' '}
                          {messages['brnch']}{' '}
                        </Label>
                      </Table.Cell>

                      <Table.Cell>
                        <Dropdown
                          fluid
                          selection
                          search
                          value={editParams.branchId}
                          error={brnchErr ? true : false}
                          onChange={(e, o) => {
                            handleChange('branchId', o);
                          }}
                          options={
                            editParams.bukrs
                              ? getBranchOptions(
                                  branchOptions[editParams.bukrs],
                                  editParams.countryId,
                                )
                              : []
                          }
                        />
                        {brnchErr ? (
                          <Label basic color="red" pointing>
                            {messages['enter_again']}
                          </Label>
                        ) : (
                          ''
                        )}
                      </Table.Cell>
                    </Table.Row>

                    <Table.Row>
                      <Table.Cell>
                        <Label size="large" basic>
                          {messages['type_of_operation']}{' '}
                        </Label>
                      </Table.Cell>

                      <Table.Cell>
                        <Dropdown
                          fluid
                          selection
                          search
                          value={editParams.operationTypeId}
                          options={getOperationList(operationTypeList) || []}
                          onChange={(e, o) => {
                            handleChange('operationTypeId', o);
                          }}
                        />
                      </Table.Cell>
                    </Table.Row>
                    <Table.Row>
                      <Table.Cell>
                        <Label size="large" basic>
                          {messages['current_base_plan']}
                        </Label>
                      </Table.Cell>

                      <Table.Cell>
                        <Input
                          fluid
                          value={editParams.currentBasePlan}
                          onChange={(e, o) => {
                            handleChange('currentBasePlan', o);
                          }}
                        />
                      </Table.Cell>
                    </Table.Row>

                    <Table.Row>
                      <Table.Cell>
                        <Label size="large" basic>
                          {' '}
                          {messages['current_plan']}{' '}
                        </Label>
                      </Table.Cell>

                      <Table.Cell>
                        <Input
                          fluid
                          value={editParams.currentPlan}
                          onChange={(e, o) => {
                            handleChange('currentPlan', o);
                          }}
                        />
                      </Table.Cell>
                    </Table.Row>

                    <Table.Row>
                      <Table.Cell>
                        <Label size="large" basic>
                          {' '}
                          {messages['overdue_base_plan']}{' '}
                        </Label>
                      </Table.Cell>
                      <Table.Cell>
                        <Input
                          fluid
                          value={editParams.overDueBasePlan}
                          onChange={(e, o) => {
                            handleChange('overDueBasePlan', o);
                          }}
                        />
                      </Table.Cell>
                    </Table.Row>

                    <Table.Row>
                      <Table.Cell>
                        <Label size="large" basic>
                          {' '}
                          {messages['overdue_plan']}{' '}
                        </Label>
                      </Table.Cell>
                      <Table.Cell>
                        <Input
                          fluid
                          value={editParams.overDuePlan}
                          onChange={(e, o) => {
                            handleChange('overDuePlan', o);
                          }}
                        />
                      </Table.Cell>
                    </Table.Row>

                    <Table.Row>
                      <Table.Cell>
                        <Label size="large" basic>
                          {' '}
                          {messages['total_plan_amount']}{' '}
                        </Label>
                      </Table.Cell>
                      <Table.Cell>
                        <Input fluid value={editParams.totalSumPlan} readOnly />
                      </Table.Cell>
                    </Table.Row>
                  </Table.Body>
                </Table>
                <div align="center">
                  <Button
                    primary
                    onClick={() => {
                      handleSave();
                    }}
                  >
                    {' '}
                    {messages['save']}{' '}
                  </Button>
                </div>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Modal.Content>
      </Modal>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    countryList: state.f4.countryList,
    companyOptions: state.userInfo.companyOptions,
    branchOptions: state.userInfo.branchOptionsAll,
    operationTypeList: state.serviceReducer.operationTypeList,
    data: state.serviceReducer.dataID,
  };
};

export default connect(mapStateToProps, {
  f4FetchCountryList,
  f4FetchWerksBranchList,
  fetchSmsetplp,
  editSmsetplp,
  fetchOperationTypeList,
  fetchSmsetplpId,
})(injectIntl(Edit));
