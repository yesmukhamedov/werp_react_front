import React from 'react';
import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';

import ReactTableWrapper from '../../../utils/ReactTableWrapper';

function HistoryReactTable(props) {
  const {
    intl: { messages },
    columns,
  } = props;

  const reactColumns = () => {
    let col = [];
    if (columns === 'all') {
      col = [
        {
          Header: () => <div style={{ textAlign: 'center' }}>Дата</div>,
          accessor: 'date',
          Cell: row => <div style={{ textAlign: 'center' }}>{row.value}</div>,
        },
        {
          Header: () => <div style={{ textAlign: 'center' }}>Время звонка</div>,
          accessor: 'date',
          Cell: row => <div style={{ textAlign: 'center' }}>{row.value}</div>,
        },
        {
          Header: () => <div style={{ textAlign: 'center' }}>Вид сервиса</div>,
          accessor: 'date',
          Cell: row => <div style={{ textAlign: 'center' }}>{row.value}</div>,
        },
        {
          Header: () => <div style={{ textAlign: 'center' }}>Вид звонка</div>,
          accessor: 'date',
          Cell: row => <div style={{ textAlign: 'center' }}>{row.value}</div>,
        },
        {
          Header: () => (
            <div style={{ textAlign: 'center' }}>Описание звонка</div>
          ),
          accessor: 'date',
          Cell: row => <div style={{ textAlign: 'center' }}>{row.value}</div>,
        },
        {
          Header: () => <div style={{ textAlign: 'center' }}>Сумма</div>,
          accessor: 'date',
          Cell: row => <div style={{ textAlign: 'center' }}>{row.value}</div>,
        },
        {
          Header: () => <div style={{ textAlign: 'center' }}>Мастер</div>,
          accessor: 'date',
          Cell: row => <div style={{ textAlign: 'center' }}>{row.value}</div>,
        },
        {
          Header: () => <div style={{ textAlign: 'center' }}>Оператор</div>,
          accessor: 'date',
          Cell: row => <div style={{ textAlign: 'center' }}>{row.value}</div>,
        },
        {
          Header: () => <div style={{ textAlign: 'center' }}>Сервис №</div>,
          accessor: 'date',
          Cell: row => <div style={{ textAlign: 'center' }}>{row.value}</div>,
        },
      ];
    } else if (columns === 'services') {
      col = [
        {
          Header: () => <div style={{ textAlign: 'center' }}>Дата</div>,
          accessor: 'date',
          Cell: row => <div style={{ textAlign: 'center' }}>{row.value}</div>,
        },
        {
          Header: () => <div style={{ textAlign: 'center' }}>Вид сервиса</div>,
          accessor: 'date',
          Cell: row => <div style={{ textAlign: 'center' }}>{row.value}</div>,
        },
        {
          Header: () => <div style={{ textAlign: 'center' }}>Сумма</div>,
          accessor: 'date',
          Cell: row => <div style={{ textAlign: 'center' }}>{row.value}</div>,
        },
        {
          Header: () => <div style={{ textAlign: 'center' }}>Мастер</div>,
          accessor: 'date',
          Cell: row => <div style={{ textAlign: 'center' }}>{row.value}</div>,
        },
        {
          Header: () => <div style={{ textAlign: 'center' }}>Сервис №</div>,
          accessor: 'date',
          Cell: row => <div style={{ textAlign: 'center' }}>{row.value}</div>,
        },
      ];
    } else if (columns === 'calls') {
      col = [
        {
          Header: () => <div style={{ textAlign: 'center' }}>Дата</div>,
          accessor: 'date',
          Cell: row => <div style={{ textAlign: 'center' }}>{row.value}</div>,
        },
        {
          Header: () => <div style={{ textAlign: 'center' }}>Время звонка</div>,
          accessor: 'date',
          Cell: row => <div style={{ textAlign: 'center' }}>{row.value}</div>,
        },
        {
          Header: () => <div style={{ textAlign: 'center' }}>Вид звонка</div>,
          accessor: 'date',
          Cell: row => <div style={{ textAlign: 'center' }}>{row.value}</div>,
        },
        {
          Header: () => (
            <div style={{ textAlign: 'center' }}>Описание звонка</div>
          ),
          accessor: 'date',
          Cell: row => <div style={{ textAlign: 'center' }}>{row.value}</div>,
        },
        {
          Header: () => <div style={{ textAlign: 'center' }}>Оператор</div>,
          accessor: 'date',
          Cell: row => <div style={{ textAlign: 'center' }}>{row.value}</div>,
        },
      ];
    } else if (columns === 'requests') {
      col = [
        {
          Header: () => <div style={{ textAlign: 'center' }}>Дата</div>,
          accessor: 'date',
          Cell: row => <div style={{ textAlign: 'center' }}>{row.value}</div>,
        },
        {
          Header: () => (
            <div style={{ textAlign: 'center' }}>Статус заявки</div>
          ),
          accessor: 'date',
          Cell: row => <div style={{ textAlign: 'center' }}>{row.value}</div>,
        },
        {
          Header: () => <div style={{ textAlign: 'center' }}>Вид заявки</div>,
          accessor: 'date',
          Cell: row => <div style={{ textAlign: 'center' }}>{row.value}</div>,
        },
        {
          Header: () => <div style={{ textAlign: 'center' }}>Оператор</div>,
          accessor: 'date',
          Cell: row => <div style={{ textAlign: 'center' }}>{row.value}</div>,
        },
        {
          Header: () => <div style={{ textAlign: 'center' }}>№ заявки</div>,
          accessor: 'date',
          Cell: row => <div style={{ textAlign: 'center' }}>{row.value}</div>,
        },
      ];
    }
    return col;
  };

  return (
    <ReactTableWrapper
      columns={reactColumns()}
      defaultPageSize={15}
      pages={2}
      previousText={messages['Table.Previous']}
      nextText={messages['Table.Next']}
      showPagination={true}
      className="-striped -highlight"
      pageSizeOptions={[20, 30, 40]}
      loadingText={messages['Table.Next']}
      noDataText={messages['Table.NoData']}
      rowsText={messages['Table.Rows']}
      pageText={messages['Table.Page']}
      ofText={messages['Table.Of']}
    />
  );
}

function mapStateToProps(state) {
  return {};
}

export default connect(mapStateToProps, {})(injectIntl(HistoryReactTable));
