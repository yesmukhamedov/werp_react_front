import React, { useState } from 'react';
import ReactTableWrapper from '../../../utils/ReactTableWrapper';
import 'react-table/react-table.css';
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
import 'react-table/react-table.css';

const List = props => {
  const {
    messages,
    dynamicObject,
    countryList,
    companyOptions,
    branchOptions,
    getCountryOptions,
    getBranchOptions,
    editSmsetplp,
    getOperationList,
    operationTypeList,
  } = props;

  const [editOpen, setEditOpen] = useState(false);
  const [editParams, setEditParams] = useState({});
  const [brnchErr, setBrnchErr] = useState(false);

  const handleOpenEdit = rowData => {
    setEditOpen(!editOpen);
    let bukr = companyOptions.find(({ text }) => rowData.bukrs === text).value;
    let editObj = {
      bukrs: bukr,
      countryId: countryList.find(
        ({ country }) => rowData.countryId === country,
      ).countryId,
      branchId: branchOptions[bukr].find(
        ({ text }) => rowData.branchId === text,
      ).value,
      operationTypeId: operationTypeList.find(
        ({ name }) => rowData.operationTypeId === name,
      ).id,
      currentBasePlan: rowData.currentBasePlan,
      currentPlan: rowData.currentPlan,
      overDueBasePlan: rowData.overDueBasePlan,
      overDuePlan: rowData.overDuePlan,
      totalSumPlan: rowData.totalSumPlan,
      id: rowData.id,
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
    editSmsetplp({ ...editParams });
    setEditOpen(false);
  };

  let dj = [{ bukrs: '1000' }, { bukrs: '1000' }];

  let columns = [
    {
      Header: 'ID',
      accessor: 'id',
      Cell: row => <div style={{ textAlign: 'center' }}>{row.value}</div>,
      filterAll: true,
    },
    {
      Header: messages['bukrs'],
      accessor: 'bukrs', //Name Ф
      Cell: row => <div style={{ textAlign: 'center' }}>{row.value}</div>,
      filterAll: true,
    },
    {
      Header: messages['country'],
      accessor: 'countryId', //Name
      Cell: row => <div style={{ textAlign: 'center' }}>{row.value}</div>,
      filterAll: true,
    },
    {
      Header: messages['brnch'],
      accessor: 'branchId', //Name
      Cell: row => <div style={{ textAlign: 'center' }}>{row.value}</div>,
      filterAll: true,
    },

    {
      Header: messages['type_of_operation'],
      accessor: 'operationTypeId', //Name
      Cell: row => <div style={{ textAlign: 'center' }}>{row.value}</div>,
      filterAll: true,
    },
    {
      Header: messages['current_base_plan'],
      accessor: 'currentBasePlan',
      Cell: row => <div style={{ textAlign: 'center' }}>{row.value}</div>,
      filterAll: true,
    },
    {
      Header: messages['current_plan'],
      accessor: 'currentPlan', //Name', //Name
      Cell: row => <div style={{ textAlign: 'center' }}>{row.value}</div>,
      filterAll: true,
    },
    {
      Header: messages['overdue_base_plan'],
      accessor: 'overDueBasePlan', //Name
      Cell: row => <div style={{ textAlign: 'center' }}>{row.value}</div>,
      filterAll: true,
    },
    {
      Header: messages['overdue_plan'],
      accessor: 'overDuePlan', //Name
      Cell: row => <div style={{ textAlign: 'center' }}>{row.value}</div>,
      filterAll: true,
    },
    {
      Header: messages['total_plan_amount'],
      accessor: 'totalSumPlan', //Name
      Cell: row => <div style={{ textAlign: 'center' }}>{row.value}</div>,
      filterAll: true,
    },
    {
      Header: messages['BTN__EDIT'],
      Cell: row => (
        <div style={{ textAlign: 'center' }}>
          <Button
            icon
            onClick={() => {
              handleOpenEdit(row.original);
            }}
          >
            <Icon name="pencil" size="large" color="blue" />
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div>
      <ReactTableWrapper
        data={dynamicObject ? dynamicObject.data : []}
        columns={columns}
        defaultPageSize={20}
        showPagination={true}
        className="-striped -highlight"
      />

      <Modal open={editOpen} size="tiny">
        <Segment clearing inverted color="blue">
          <Button
            size="mini"
            color="red"
            icon
            floated="right"
            onClick={() => setEditOpen(false)}
          >
            <Icon name="close" />{' '}
          </Button>
          <Header className="addHeader" textAlign="center" as="h2">
            {messages['BTN__EDIT']}{' '}
          </Header>
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
                          {' '}
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

export default List;
