import React, { useState, useEffect } from 'react';

import ReactTableWrapper from '../../../utils/ReactTableWrapper';
import { moneyFormat } from '../../../utils/helpers';
import { LinkToFa03BelnrBukrsGjahr } from '../../../utils/outlink';
import {
  Modal,
  Table,
  Checkbox,
  Icon,
  Loader,
  Menu,
  Button,
} from 'semantic-ui-react';
import './foea.css';
const FoeaOutput = props => {
  const {
    messages = [],
    language,
    types,
    statuses,
    fetchingDetailTable = false,
    fetchDetailTable = () => {},
    detailTable = [],
    processingSelectedItems = false,
    processSelectedItems = () => {},
    selectedStatuses = [],
  } = props;

  const [outputTable, setOutputTable] = useState([]);
  const [isSelectedAll, setIsSelectedAll] = useState(false);
  const [isExtraInfoOpen, setIsExtraInfoOpen] = useState(false);

  //componentDidMount
  useEffect(() => {
    setIsSelectedAll(false);
    if (props.outputTable && props.outputTable.length > 0) {
      // console.log(types, statuses, 'types, statuses');
      let tempList = props.outputTable.map(element => {
        let tempRow = {
          ...element,
          isSelected: false,
          blartName: types.find(wa => wa.key === element.blart).text,
          statusName: statuses.find(wa => wa.key === element.status).text,
        };
        return tempRow;
      });
      setOutputTable(tempList);
    } else {
      setIsSelectedAll(false);
      setOutputTable([]);
    }
    //unmount
    return () => {
      // clearAnyObject('CLEAR_FOEA');
    };
  }, [props.outputTable]);
  // console.log(outputTable, 'outputTable');

  const onSelectAll = () => {
    let newVal = !isSelectedAll;

    setIsSelectedAll(newVal);
    setOutputTable(prev => {
      let newItemList = [...prev];

      newItemList.forEach(element => {
        element.isSelected = newVal;
      });
      return newItemList;
    });
  };

  const onSelectItem = (item, index, columnId) => {
    if (columnId === 'belnr') return '';
    let wa = { ...item };

    setOutputTable(prev => {
      let newItem = { ...wa, isSelected: !wa.isSelected };
      let newItemList = [...prev];
      // let index = newItemList.findIndex(
      //   element => element.prebkpfId === wa.prebkpfId,
      // );

      newItemList[index] = newItem;
      // setIsSelectedAll(checkIfAllSelected(newItemList));
      // returnAllSelected(newItemList);
      return newItemList;
    });
  };

  const onClickExtraInfo = prebkpfId => {
    setIsExtraInfoOpen(true);
    fetchDetailTable({ prebkpfId });
  };

  let t1columns = [];

  let t1r1c1 = {
    Header: ({ value }) => (
      <b>
        <Checkbox checked={isSelectedAll} onChange={() => onSelectAll()} />
      </b>
    ),
    accessor: 'isSelected',
    Cell: obj => (
      <span className={'center'}>
        <Checkbox checked={obj.original.isSelected} onChange={() => {}} />
      </span>
    ),
    width: 75,
    className: 'clickableItem',
  };

  let t1r1c2 = {
    Header: ({ value }) => <b>{'ID'}</b>,
    accessor: 'prebkpfId',
    width: 75,
    Cell: props => (
      <span
        className={props.original.isSelected ? 'selectedRow' : 'unSelectedRow'}
      >
        {props.value}
      </span>
    ),
    className: 'clickableItem',
  };

  let t1r1c3 = {
    Header: ({ value }) => <b>{messages['brnch']}</b>,
    accessor: 'branchName',
    width: 100,

    Cell: props => (
      <span
        className={props.original.isSelected ? 'selectedRow' : 'unSelectedRow'}
      >
        {props.value}
      </span>
    ),
    className: 'clickableItem',
  };

  let t1r1c4 = {
    Header: ({ value }) => <b>{messages['blart']}</b>,
    accessor: 'blartName',
    width: 200,
    Cell: props => (
      <span
        className={props.original.isSelected ? 'selectedRow' : 'unSelectedRow'}
      >
        {props.value}
      </span>
    ),
    className: 'clickableItem',
  };

  let t1r1c5 = {
    Header: ({ value }) => <b>{messages['bldat']}</b>,
    accessor: 'bldat',
    width: 100,
    Cell: props => (
      <span
        className={props.original.isSelected ? 'selectedRow' : 'unSelectedRow'}
      >
        {props.value}
      </span>
    ),
    className: 'clickableItem',
  };

  let t1r1c6 = {
    Header: ({ value }) => <b>{messages['waers']}</b>,
    accessor: 'waers',
    width: 70,
    Cell: props => (
      <span
        className={props.original.isSelected ? 'selectedRow' : 'unSelectedRow'}
      >
        {props.value}
      </span>
    ),
    className: 'clickableItem',
  };

  let t1r1c7 = {
    Header: ({ value }) => <b>{messages['amount']} </b>,
    accessor: 'dmbtr',
    Cell: obj => (
      <span
        className={obj.original.isSelected ? 'selectedRow' : 'unSelectedRow'}
      >
        {moneyFormat(obj.original.dmbtr)}
      </span>
    ),
    width: 120,
    className: 'clickableItem',
  };

  let t1r1c8 = {
    Header: ({ value }) => <b>Debit</b>,
    accessor: 'hkontD',
    width: 170,
    Cell: props => (
      <span
        className={props.original.isSelected ? 'selectedRow' : 'unSelectedRow'}
      >
        {props.value}
      </span>
    ),
    className: 'clickableItem',
  };

  let t1r1c9 = {
    Header: ({ value }) => <b>Credit</b>,
    accessor: 'hkontK',
    width: 170,
    Cell: props => (
      <span
        className={props.original.isSelected ? 'selectedRow' : 'unSelectedRow'}
      >
        {props.value}
      </span>
    ),
    className: 'clickableItem',
  };
  let t1r1c10 = {
    Header: ({ value }) => <b>{messages['user']} </b>,
    accessor: 'uname',
    width: 100,
    Cell: props => (
      <span
        className={props.original.isSelected ? 'selectedRow' : 'unSelectedRow'}
      >
        {props.value}
      </span>
    ),
    className: 'clickableItem',
  };

  let t1r1c11 = {
    Header: ({ value }) => <b>{messages['bktxt']} </b>,
    accessor: 'bktxt',
    width: 220,
    Cell: props => (
      <span
        className={props.original.isSelected ? 'selectedRow' : 'unSelectedRow'}
      >
        {props.value}
      </span>
    ),
    className: 'clickableItem',
  };

  let t1r1c12 = {
    Header: ({ value }) => <b>{messages['customer']} </b>,
    accessor: 'cname',
    width: 170,
    Cell: props => (
      <span
        className={props.original.isSelected ? 'selectedRow' : 'unSelectedRow'}
      >
        {props.value}
      </span>
    ),
    className: 'clickableItem',
  };

  let t1r1c13 = {
    Header: ({ value }) => <b>{messages['extraInfo']} </b>,
    accessor: 'awkey',
    Cell: obj => (
      <span
        className={obj.original.isSelected ? 'selectedRow' : 'unSelectedRow'}
      >
        {obj.original.awkey === null ? '' : messages['reward']}
      </span>
    ),
    width: 140,
    className: 'clickableItem',
  };

  let t1r1c14 = {
    Header: ({ value }) => <b>{messages['status']} </b>,
    accessor: 'statusName',
    width: 80,
    Cell: props => (
      <span
        className={props.original.isSelected ? 'selectedRow' : 'unSelectedRow'}
      >
        {props.value}
      </span>
    ),
    className: 'clickableItem',
  };

  let t1r1c15 = {
    Header: ({ value }) => <b>{messages['L__CREATE_DATE']}</b>,
    accessor: 'createdDate',
    width: 100,
    Cell: props => (
      <span
        className={props.original.isSelected ? 'selectedRow' : 'unSelectedRow'}
      >
        {props.value}
      </span>
    ),
    className: 'clickableItem',
  };

  let t1r1c16 = {
    Header: ({ value }) => <b>{messages['details']}</b>,
    accessor: 'belnr',

    Cell: obj => (
      <span
        className={obj.original.isSelected ? 'selectedRow' : 'unSelectedRow'}
      >
        <LinkToFa03BelnrBukrsGjahr
          belnr={obj.original.belnr}
          bukrs={obj.original.bukrs}
          gjahr={obj.original.gjahr}
        />

        <Icon
          name={'info circle'}
          onClick={() => onClickExtraInfo(obj.original.prebkpfId)}
        />
      </span>
    ),
    width: 120,
  };

  t1columns.push(t1r1c1);
  t1columns.push(t1r1c2);
  t1columns.push(t1r1c3);
  t1columns.push(t1r1c4);
  t1columns.push(t1r1c5);
  t1columns.push(t1r1c6);
  t1columns.push(t1r1c7);
  t1columns.push(t1r1c8);
  t1columns.push(t1r1c9);
  t1columns.push(t1r1c10);
  t1columns.push(t1r1c11);
  t1columns.push(t1r1c12);
  t1columns.push(t1r1c13);
  t1columns.push(t1r1c14);
  t1columns.push(t1r1c15);
  t1columns.push(t1r1c16);

  const onProcessButtonClicked = processType => {
    let temp = outputTable
      .filter(filterEl => filterEl.isSelected)
      .map(mapEl => mapEl.prebkpfId)
      .join();

    if (temp && temp.length > 0) {
      processSelectedItems({ processType, selectedItems: temp });
    }
  };
  return (
    <div>
      {selectedStatuses && selectedStatuses.includes('0') && (
        <Menu stackable size="small">
          <Menu.Item>
            <Button
              icon
              labelPosition="left"
              primary
              size="small"
              onClick={() => onProcessButtonClicked('save')}
              loading={processingSelectedItems}
              disabled={processingSelectedItems}
            >
              <Icon name="save" size="large" />
              {messages['save']}
            </Button>
          </Menu.Item>
          <Menu.Item>
            <Button
              icon
              labelPosition="left"
              primary
              size="small"
              loading={processingSelectedItems}
              disabled={processingSelectedItems}
              onClick={() => onProcessButtonClicked('cancel')}
            >
              <Icon name="cancel" size="large" />
              {messages['cancel']}
            </Button>
          </Menu.Item>
        </Menu>
      )}
      <ReactTableWrapper
        data={outputTable}
        columns={t1columns}
        defaultPageSize={20}
        showPagination={true}
        onRowClick={(row, index, columnId) =>
          onSelectItem(row, index, columnId)
        }
      />
      <Modal
        closeIcon
        open={isExtraInfoOpen}
        onClose={() => setIsExtraInfoOpen(false)}
        content={
          <div>
            {fetchingDetailTable ? (
              <Loader />
            ) : (
              <Table compact>
                <Table.Body>
                  {detailTable.map((item, index) => {
                    return (
                      <Table.Row key={index}>
                        <Table.Cell>{item.hkont}</Table.Cell>
                        <Table.Cell>
                          {item.shkzg === 'S' ? 'Debit' : 'Credit'}
                        </Table.Cell>
                        <Table.Cell>{item.waers}</Table.Cell>
                        <Table.Cell>{moneyFormat(item.dmbtr)}</Table.Cell>
                        <Table.Cell>{moneyFormat(item.wrbtr)} </Table.Cell>
                        <Table.Cell>{item.matnr}</Table.Cell>
                        <Table.Cell>{item.menge}</Table.Cell>
                        <Table.Cell>{item.werks}</Table.Cell>
                      </Table.Row>
                    );
                  })}
                </Table.Body>
              </Table>
            )}
          </div>
        }
      />
    </div>
  );
};

export default FoeaOutput;
