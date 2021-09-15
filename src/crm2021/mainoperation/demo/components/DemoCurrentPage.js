import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Header, Container, Segment } from 'semantic-ui-react';
import { fetchDemoCurrentData } from '../actions/demoAction';
import { connect } from 'react-redux';
import ReactTableWrapper from '../../../../utils/ReactTableWrapper';

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
            <ReactTableWrapper
                data={items}
                columns={columns}
                filterable
                showPagination
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
