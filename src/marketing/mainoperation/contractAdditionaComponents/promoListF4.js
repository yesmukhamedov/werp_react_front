import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import {
  Modal,
  Icon,
  Checkbox,
  List,
  Button,
  Loader,
  Dimmer,
} from 'semantic-ui-react';
import { injectIntl } from 'react-intl';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import { moneyFormat } from '../../../utils/helpers';

const PromoListF4 = props => {
  const {
    intl: { messages },
    promoList = [],
    isLoadingPromoList = false,
  } = props;

  const [localPromoList, setLocalPromoList] = useState([]);

  //componentWillRecieveProps
  useEffect(() => {
    //get Promo List
    if (promoList && promoList.length > 0) {
      let newArray = promoList.map(item => {
        let newObj = { ...item, checked: false };
        return newObj;
      });
      setLocalPromoList(newArray);
    }
  }, [promoList]);

  const onCheckBoxClicked = id => {
    setLocalPromoList(prev => {
      const idx = prev.findIndex(item => item.id === id);
      const oldItem = prev[idx];
      const newItem = { ...oldItem, checked: !oldItem.checked };
      const newArray = [...prev.slice(0, idx), newItem, ...prev.slice(idx + 1)];

      // console.log(newArray);
      return newArray;
    });
  };

  const onSelectButtonClicked = () => {
    props.onPromoSelect(
      localPromoList
        .filter(item => item.checked)
        .map(item => {
          let newObj = { ...item };
          return newObj;
        }),
    );

    props.onClosePromoF4(false);
  };

  const getScopeName = str => {
    switch (str) {
      case 'INT':
        return messages['scopeINT'];
      case 'REG':
        return messages['scopeREG'];
      case 'GEN':
        return messages['scopeGEN'];
      case 'COM':
        return messages['scopeCOM'];
      default:
        return '';
    }
  };

  const getPromoTypeName = str => {
    switch (str) {
      case 1:
        return messages['gift'];
      case 2:
        return messages['discount'];
      case 3:
        return messages['bonus'];
      default:
        return '';
    }
  };

  const getColumns = () => {
    let t1columns = [];
    let t1r1c1 = {},
      t1r1c2 = {},
      t1r1c3 = {},
      t1r1c4 = {},
      t1r1c5 = {},
      t1r1c6 = {},
      t1r1c7 = {},
      t1r1c8 = {},
      t1r1c9 = {},
      t1r1c10 = {},
      t1r1c11 = {};

    t1r1c1 = {
      Header: ({ value }) => <b>#</b>,
      accessor: 'id',
      width: 40,
      Cell: obj => (
        <span>
          {
            <Checkbox
              checked={obj.original.checked}
              onClick={() => onCheckBoxClicked(obj.original.id)}
            />
          }
        </span>
      ),
    };
    t1r1c2 = {
      Header: ({ value }) => <b>{messages['fromDealerAccount']}</b>,
      accessor: 'fromDealer',
      width: 160,
      Cell: obj => <span>{moneyFormat(obj.original.fromDealer)}</span>,
    };
    t1r1c3 = {
      Header: ({ value }) => <b>{messages['waers']}</b>,
      accessor: 'fdCurrency',
      width: 80,
      Cell: obj => <span>{obj.original.fdCurrency}</span>,
    };
    t1r1c4 = {
      Header: ({ value }) => <b>{messages['name']}</b>,
      accessor: 'name',
      width: 230,
      Cell: obj => <span>{obj.original.name}</span>,
    };
    t1r1c5 = {
      Header: ({ value }) => <b>{messages['matnr']}</b>,
      accessor: 'matnrName',
      width: 230,
      Cell: obj => <span>{obj.original.matnrName}</span>,
    };
    t1r1c6 = {
      Header: ({ value }) => <b>{messages['type']}</b>,
      accessor: 'pmType',
      width: 100,
      Cell: obj => <span>{getPromoTypeName(obj.original.pmType)}</span>,
    };
    t1r1c7 = {
      Header: ({ value }) => <b>{messages['scope']}</b>,
      accessor: 'pmScope',
      width: 130,
      Cell: obj => <span>{getScopeName(obj.original.pmScope)}</span>,
    };
    t1r1c8 = {
      Header: ({ value }) => <b>{messages['dateStart']}</b>,
      accessor: 'dateStart',
      width: 100,
      Cell: obj => <span>{obj.original.dateStart}</span>,
    };
    t1r1c9 = {
      Header: ({ value }) => <b>{messages['dateEnd']}</b>,
      accessor: 'dateEnd',
      width: 100,
      Cell: obj => <span>{obj.original.dateEnd}</span>,
    };
    t1r1c10 = {
      Header: ({ value }) => <b>{messages['discount']}</b>,
      accessor: 'discount',
      width: 100,
      Cell: obj => <span>{obj.original.discount}</span>,
    };
    t1r1c11 = {
      Header: ({ value }) => <b>{messages['bonus']}</b>,
      accessor: 'bonus',
      width: 100,
      Cell: obj => <span>{obj.original.bonus}</span>,
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

    return t1columns;
  };

  return (
    <Modal
      open={props.open}
      closeOnEscape={false}
      dimmer={'inverted'}
      onClose={() => props.onClosePromoF4(false)}
      size={'large'}
    >
      <Modal.Header>
        <Icon name="filter" size="big" />
        {messages['promotion']}
      </Modal.Header>
      <Modal.Content>
        <Dimmer active={isLoadingPromoList}>
          <Loader />
        </Dimmer>
        <List>
          <List.Item>
            <ReactTable
              data={localPromoList}
              columns={getColumns()}
              defaultPageSize={10}
              showPagination
              className="-striped -highlight"
              loadingText={messages['loadingText']}
              noDataText={messages['noDataText']}
              previousText={messages['previousText']}
              nextText={messages['nextText']}
              rowsText={messages['rowsText']}
              pageText={messages['pageText']}
              ofText={messages['ofText']}
              showPageSizeOptions={false}
            />
          </List.Item>
          <List.Item>
            <Button primary size="small" onClick={onSelectButtonClicked}>
              {messages['select']}
            </Button>
          </List.Item>
        </List>
      </Modal.Content>
    </Modal>
  );
};

function mapStateToProps(state) {
  return {};
}

export default connect(
  mapStateToProps,
  {},
)(injectIntl(PromoListF4));
