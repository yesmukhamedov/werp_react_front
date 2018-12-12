import React, { Component } from 'react';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import { Link } from 'react-router-dom';
import moment from 'moment';
import { Checkbox, Icon } from 'semantic-ui-react';

class SpListTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedIdx: undefined,
    };
    this.handleAttributeChange = this.handleAttributeChange.bind(this);
  }

  handleAttributeChange(field, value) {
    console.log('FIELD', field, 'VALUE', value);
  }

  render() {
    const columns = [
      {
        Header: '#',
        accessor: 'timestamp',
        Cell: props => {
          const { index } = props;
          return <div>{index + 1}</div>;
        },
        maxWidth: 60,
      },
      {
        Header: 'Название',
        accessor: 'name',
        Cell: props => {
          const { id, name } = props.original;
          return (
            <div>
              {id} - {name}
            </div>
          );
        },
      },
      {
        Header: 'Компания',
        accessor: 'companyName',
        maxWidth: 260,
      },
      {
        Header: 'Страна',
        accessor: 'countryName',
        maxWidth: 100,
      },
      {
        Header: 'Дата начала',
        accessor: 'startDate',
        Cell: props => {
          const { startDate } = props.original;
          return moment(startDate).format('LL');
        },
        maxWidth: 160,
      },
      {
        Header: 'Категория',
        accessor: 'productCategory',
        maxWidth: 260,
      },
      {
        Header: 'Товар/МодельВремя',
        accessor: 'productName',
        maxWidth: 260,
      },
      {
        Header: 'Статус',
        accessor: 'active',
        Cell: props => {
          const { id, active } = props.original;
          return (
            <Checkbox
              slider
              checked={active}
              onClick={() => this.props.handleActivate(id, active)}
            />
          );
        },
        maxWidth: 60,
      },
      {
        Header: 'Просмотр',
        accessor: '',
        Cell: props => {
          const { id } = props.original;
          return (
            <div style={{ textAlign: 'center' }}>
              <Link target="_blank" to={`/service/packets/spview/${id}`}>
                <Icon name="eye" size="large" />
              </Link>
            </div>
          );
        },
        maxWidth: 120,
      },
    ];
    return (
      <ReactTable
        loading={this.props.loading}
        data={this.props.data}
        columns={columns}
        pageSizeOptions={[10, 20, 50, 100]}
        defaultPageSize={20}
        previousText="Предыдущий"
        nextText="Следующий"
        loadingText="Загружается..."
        noDataText="Нет записей"
        pageText="Страница"
        ofText="из"
        rowsText="записей"
        className="-highlight"
        getTrProps={(state, rowInfo, column) => ({
          style: {
            background:
              rowInfo === undefined
                ? ''
                : this.state.selectedIdx === rowInfo.index
                ? 'rgba(60, 143, 255, 0.5)'
                : !rowInfo.original.active
                ? 'rgba(241, 241, 241, 0.8)'
                : '',
          },
          onClick: (e, handleOriginal) => {
            console.log('A Td Element was clicked!');
            console.log('it produced this event:', e);
            console.log('It was in this column:', column);
            console.log('It was in this row:', rowInfo);

            const { index } = rowInfo;

            // IMPORTANT! React-Table uses onClick internally to trigger
            // events like expanding SubComponents and pivots.
            // By default a custom 'onClick' handler will override this functionality.
            // If you want to fire the original onClick handler, call the
            // 'handleOriginal' function.
            this.setState({ ...this.state, selectedIdx: index });
          },
        })}
      />
    );
  }
}

export default SpListTable;
