import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import { Header, Container, Segment } from 'semantic-ui-react';
//import moment from 'moment';
import { fetchDemoCurrentData } from '../actions/demoAction';
import { connect } from 'react-redux';

class DemoCurrentPage extends Component {
  constructor(props) {
    super(props);

    this.renderTable = this.renderTable.bind(this);
  }

  componentWillMount() {
    this.props.fetchDemoCurrentData();
  }

  renderTable() {
    return (
      <div>
        <ReactTable
          loading={this.props.loader.active}
          data={this.props.items}
          columns={[
            {
              Header: '№',
              accessor: 'id',
              maxWidth: 100,
            },
            {
              Header: 'Клиент',
              accessor: 'clientName',
            },
            {
              Header: 'Адрес',
              accessor: 'address',
            },
            {
              Header: 'Дата-время',
              accessor: 'dateTime',
              //Cell: row => moment(row.value).format('DD.MM.YYYY HH:mm'),
            },
            {
              Header: 'Дилер',
              accessor: 'dealerName',
            },

            {
              Header: 'Примечание',
              accessor: 'note',
            },

            {
              Header: 'Результат',
              accessor: 'resultName',
            },
            {
              Header: '',
              accessor: 'id',
              filterable: false,
              maxWidth: 100,
              Cell: ({ value }) => (
                <Link
                  target="_blank"
                  className="ui icon button mini"
                  to={`/crm2021/demo/view/${value}`}
                >
                  Просмотр
                </Link>
              ),
            },
          ]}
          previousText="Пред."
          nextText="След."
          rowsText="строк"
          pageText="Страница"
          filterable
          className="-striped -highlight"
        />
      </div>
    );
  }

  render() {
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
        <Segment clearing>
          <Header as="h2" floated="left">
            Текущие демонстрации
          </Header>
        </Segment>
        {this.renderTable()}
      </Container>
    );
  }
}

function mapStateToProps(state) {
  return {
    items: state.crmDemo2021.items,
    loader: state.loader,
  };
}

export default connect(mapStateToProps, { fetchDemoCurrentData })(
  DemoCurrentPage,
);
