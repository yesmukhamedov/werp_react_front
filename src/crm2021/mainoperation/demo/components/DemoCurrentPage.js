import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import { Header, Container, Segment } from 'semantic-ui-react';
import { fetchDemoCurrentData } from '../actions/demoAction';
import { connect } from 'react-redux';
import moment from 'moment';
import { reverse } from 'lodash';

const DemoCurrentPage = props => {
    const { items = [] } = props;

    useEffect(() => {
        props.fetchDemoCurrentData();
    }, []);

    const columns = [
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
            accessor: row => moment(row.value).format('x'),
            id: 'dateTime',
            Cell: row => moment(row.original.value).format('DD.MM.YYYY HH:mm'),
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
    ];
    console.log(
        '1: ',
        moment('06.30.2018 20:30').format('x'),
        '2: ',
        moment('04.06.2018 19:30').format('x'),
    );
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
            <ReactTable
                // loading={this.props.loader.active}
                data={
                    items
                        ? items.map(item => {
                              let itemDate = item.dateTime
                                  .split('.')
                                  .splice(2, item.dateTime.length);
                              return {
                                  ...item,
                                  dateTime: item.dateTime
                                      ? item.dateTime
                                            .split('.')
                                            .splice(0, 2)
                                            .reverse()
                                            .concat(itemDate)
                                            .join('-')
                                      : '',
                              };
                          })
                        : []
                }
                columns={columns}
                previousText="Пред."
                nextText="След."
                rowsText="строк"
                pageText="Страница"
                filterable
                className="-striped -highlight"
            />
        </Container>
    );
};

function mapStateToProps(state) {
    return {
        items: state.crmDemo2021.items,
        loader: state.loader,
    };
}

export default connect(mapStateToProps, { fetchDemoCurrentData })(
    DemoCurrentPage,
);
