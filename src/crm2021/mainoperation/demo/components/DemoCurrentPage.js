import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import { Header, Container, Segment } from 'semantic-ui-react';
import { fetchDemoCurrentData } from '../actions/demoAction';
import { connect } from 'react-redux';

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
            accessor: 'dateTime',
            Cell: row => {
                return row.value
                    .split('-')
                    .reverse()
                    .join('.');
            },
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
                              return {
                                  ...item,
                                  dateTime: item.dateTime
                                      ? item.dateTime
                                            .split('.')
                                            .reverse()
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
