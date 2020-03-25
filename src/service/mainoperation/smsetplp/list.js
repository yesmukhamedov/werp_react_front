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

  const handleOpenEdit = rowDates => {
    setEditOpen(!editOpen);
    let editObj = {
      bukrs: rowDates.bukrs,
      countryId: rowDates.countryId,
      branchId: rowDates.branchId,
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
        temporaryObj.currentBasePlan = o.value;
        break;
      }
      case 'currentPlan': {
        temporaryObj.currentPlan = o.value;
        break;
      }
      case 'operationId': {
        temporaryObj.operationId = o.value;
        break;
      }
      case 'overDueBasePlan': {
        temporaryObj.overDueBasePlan = o.value;
        break;
      }
      case 'overDuePlan': {
        temporaryObj.overDuePlan = o.value;
        break;
      }
      case 'totalSumPlan': {
        temporaryObj.totalSumPlan = o.value;
        break;
      }
    }

    setEditParams({ ...temporaryObj });
  };

  const handleSave = () => {
    editSmsetplp({ ...editParams });
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
                          defaultValue={editParams.bukrs}
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
                          defaultValue={editParams.countryId}
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
                          defaultValue={editParams.branchId}
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
                          {' '}
                          {messages['type_of_operation']}{' '}
                        </Label>
                      </Table.Cell>

                      <Table.Cell>
                        <Dropdown
                          fluid
                          selection
                          search
                          options={getOperationList(operationTypeList) || []}
                          onChange={(e, o) => {
                            handleChange('operationId', o);
                          }}
                        />
                      </Table.Cell>
                    </Table.Row>
                    <Table.Row>
                      <Table.Cell>
                        <Label size="large" basic>
                          {messages['current_base_plan']}{' '}
                        </Label>
                      </Table.Cell>

                      <Table.Cell>
                        <Input
                          fluid
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
                        <Input
                          fluid
                          onChange={(e, o) => {
                            handleChange('totalSumPlan', o);
                          }}
                        />
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
