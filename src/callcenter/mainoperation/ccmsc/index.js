import React from 'react';
import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';
import {
    Form,
    Container,
    Divider,
    Icon,
    Segment,
    Input,
    Button,
    Header,
} from 'semantic-ui-react';
import {
    f4fetchCategory,
    f4FetchCountryList,
    f4FetchConStatusList,
    f4FetchConTypeList,
    f4FetchBranches,
    f4FetchPhysStatus,
    f4FetchCurrentStaff,
} from '../../../reference/f4/f4_action';
import ReactTableWrapperFixedColumns from '../../../utils/ReactTableWrapperFixedColumns';
import '../../../service/service.css';
const Ccmsc = props => {
    const {
        intl: { messages },
    } = props;
    const headerStyle = {
        whiteSpace: 'pre-wrap',
    };
    let statusColor = 'red';
    let iconName = 'file alternate outline';
    let buttonColor = 'aqua';
    return (
        <Container fluid className="containerMargin">
            <Segment className="justifySegment">
                <Header as="h2" floated="left">
                    Поиск клиента
                </Header>
                <Button color="blue" floated="right" icon labelPosition="left">
                    <Icon name="add circle" />
                    Регистрация
                </Button>
            </Segment>
            <Segment>
                <Form>
                    <Form.Group widths="7">
                        <Form.Select
                            fluid
                            label={messages['country']}
                            placeholder={messages['country']}
                            className="alignBottom"
                        />

                        <Form.Select
                            fluid
                            label={messages['bukrs']}
                            placeholder={messages['bukrs']}
                            className="alignBottom"
                        />

                        <Form.Select
                            fluid
                            label={messages['brnch']}
                            placeholder={messages['brnch']}
                            className="alignBottom"
                        />

                        <Form.Select
                            fluid
                            label={'Продкут'}
                            placeholder={'Продкут'}
                            className="alignBottom"
                        />

                        <Form.Field>
                            <label>CN</label>
                            <Input placeholder="CN" fluid />
                        </Form.Field>

                        <Form.Field>
                            <label>Заводской номер</label>
                            <Input placeholder={'Заводской номер'} fluid />
                        </Form.Field>

                        <Form.Field>
                            <label>{'ФИО клиента'}</label>
                            <Input placeholder={'ФИО клиента'} fluid />
                        </Form.Field>
                    </Form.Group>

                    <Form.Group widths="7">
                        <Form.Field>
                            <label>{'ИИН клиента'}</label>
                            <Input placeholder={messages['Phone']} fluid />
                        </Form.Field>

                        <Form.Field>
                            <label>{'Адрес клиента'}</label>
                            <Input placeholder={messages['Phone']} fluid />
                        </Form.Field>

                        <Form.Field>
                            <label>{messages['Phone']}</label>
                            <Input placeholder={messages['Phone']} fluid />
                        </Form.Field>

                        <Form.Select
                            fluid
                            label="Статус договора"
                            placeholder="Статус договора"
                            className="alignBottom"
                            multiple
                        />
                        <Form.Select
                            fluid
                            label="Физ. статус"
                            placeholder="Физ. статус"
                            className="alignBottom"
                            multiple
                        />
                        <Form.Select
                            fluid
                            label="Фин. статус"
                            placeholder="Фин. статус"
                            className="alignBottom"
                            multiple
                        />
                        <Form.Field>
                            <label>{'Период продажи товара'}</label>
                            <Input
                                placeholder={'Период продажи товара'}
                                fluid
                            />
                        </Form.Field>
                    </Form.Group>
                    <Form.Group widths="7">
                        <Form.Field>
                            <label>{'Период создания товара'}</label>
                            <Input
                                placeholder={'Период создания товара'}
                                fluid
                            />
                        </Form.Field>
                        <div className="flexDirectionRow">
                            <Form.Button
                                color="blue"
                                className="alignBottom"
                                icon
                                labelPosition="left"
                            >
                                <Icon name="search"></Icon>
                                Поиск
                            </Form.Button>

                            <Form.Button
                                className="alignBottom"
                                color="red"
                                icon
                                labelPosition="left"
                                onClick={() => {
                                    console.log('Перейти на поиск клиента');
                                }}
                            >
                                <Icon name="cancel"></Icon>
                                Отмена
                            </Form.Button>
                        </div>
                    </Form.Group>
                </Form>
                <Divider />
                <ReactTableWrapperFixedColumns
                    data={[
                        { id: 1, status: 'Необработанный' },
                        { id: 2, status: 'Необработанный' },
                        { id: 3, status: 'В обработке' },
                        { id: 4, status: 'В обработке' },
                        { id: 5, status: 'Необработанный' },
                        { id: 6, status: 'Необработанный' },
                        { id: 7, status: 'Обработан' },
                        { id: 8, status: 'Необработанный' },
                        { id: 9, status: 'Необработанный' },
                        { id: 10, status: 'Необработанный' },
                    ]}
                    columns={[
                        {
                            width: 50,
                            Header: '№',
                            accessor: 'id',
                            Cell: row => (
                                <div style={{ textAlign: 'center' }}>
                                    {row.value}
                                </div>
                            ),
                        },

                        {
                            Header: 'Страна',
                            accessor: 'id',
                            Cell: row => (
                                <div style={{ textAlign: 'center' }}>
                                    {row.value}
                                </div>
                            ),
                        },
                        {
                            Header: 'Компания',
                            accessor: 'id',
                            Cell: row => (
                                <div style={{ textAlign: 'center' }}>
                                    {row.value}
                                </div>
                            ),
                        },
                        {
                            Header: 'Филиал',
                            accessor: 'id',
                            Cell: row => (
                                <div style={{ textAlign: 'center' }}>
                                    {row.value}
                                </div>
                            ),
                        },
                        {
                            Header: 'Продукт',
                            accessor: 'id',
                            Cell: row => (
                                <div style={{ textAlign: 'center' }}>
                                    {row.value}
                                </div>
                            ),
                        },
                        {
                            Header: 'Номер договора',
                            headerStyle: headerStyle,
                            accessor: 'id',
                            Cell: row => (
                                <div style={{ textAlign: 'center' }}>
                                    {row.value}
                                </div>
                            ),
                        },
                        {
                            Header: 'Заводской номер',
                            headerStyle: headerStyle,
                            accessor: 'id',
                            Cell: row => (
                                <div style={{ textAlign: 'center' }}>
                                    {row.value}
                                </div>
                            ),
                        },
                        {
                            Header: 'ФИО',
                            accessor: 'id',
                            Cell: row => (
                                <div style={{ textAlign: 'center' }}>
                                    {row.value}
                                </div>
                            ),
                        },
                        {
                            Header: 'Дата продажи',
                            headerStyle: headerStyle,
                            accessor: 'id',
                            Cell: row => (
                                <div style={{ textAlign: 'center' }}>
                                    {row.value}
                                </div>
                            ),
                        },
                        {
                            Header: 'Дата создания договора',
                            headerStyle: headerStyle,
                            accessor: 'id',
                            Cell: row => (
                                <div style={{ textAlign: 'center' }}>
                                    {row.value}
                                </div>
                            ),
                        },
                        {
                            Header: 'Адрес клиента',
                            headerStyle: headerStyle,
                            accessor: 'id',
                            Cell: row => (
                                <div style={{ textAlign: 'center' }}>
                                    {row.value}
                                </div>
                            ),
                        },
                        {
                            Header: 'Статус обработки договора',
                            headerStyle: headerStyle,
                            accessor: 'status',

                            Cell: row => {
                                switch (row.value) {
                                    case 'Необработанный':
                                        statusColor = 'red';
                                        iconName = 'plus';
                                        buttonColor = 'blue';
                                        break;
                                    case 'В обработке':
                                        statusColor = 'teal';
                                        iconName = 'file alternate outline';
                                        buttonColor = 'teal';
                                        break;
                                    case 'Обработан':
                                        statusColor = 'blue';
                                        iconName = 'file alternate outline';
                                        buttonColor = 'teal';
                                        break;
                                }
                                return (
                                    <div
                                        style={{
                                            textAlign: 'center',
                                            color: statusColor,
                                        }}
                                    >
                                        {row.value}
                                    </div>
                                );
                            },
                        },
                        {
                            Header: ' Физ статус',
                            headerStyle: headerStyle,
                            accessor: 'id',
                            Cell: row => (
                                <div style={{ textAlign: 'center' }}>
                                    {row.value}
                                </div>
                            ),
                        },
                        {
                            Header: 'Фин статус',
                            headerStyle: headerStyle,
                            accessor: 'id',
                            Cell: row => (
                                <div style={{ textAlign: 'center' }}>
                                    {row.value}
                                </div>
                            ),
                        },
                        {
                            Header: 'Оператор',
                            headerStyle: headerStyle,
                            accessor: 'id',
                            Cell: row => (
                                <div style={{ textAlign: 'center' }}>
                                    {row.value}
                                </div>
                            ),
                        },
                        {
                            Header: 'Регистрация',
                            headerStyle: headerStyle,
                            filterable: false,
                            fixed: 'right',
                            Cell: ({ row }) => (
                                <div style={{ textAlign: 'center' }}>
                                    <Button
                                        color={buttonColor}
                                        icon
                                        onClick={() => console.log('Link')}
                                    >
                                        <Icon name={iconName}></Icon>
                                    </Button>
                                </div>
                            ),
                        },
                    ]}
                    defaultPageSize={10}
                    showPagination={true}
                    pageSizeOptions={[10, 20, 30, 40]}
                />
            </Segment>
        </Container>
    );
};

function mapStateToProps(state) {
    return {
        language: state.locales.lang,
        //
        companyOptions: state.userInfo.companyOptions,
        countryList: state.f4.countryList,
        category: state.f4.category,
        contractStatusList: state.f4.contractStatusList,
        contractTypeList: state.f4.contractTypeList,
        branches: state.f4.branches,
        physStatusOptions: state.f4.physStatus,
    };
}

export default connect(mapStateToProps, {
    f4fetchCategory,
    f4FetchCountryList,
    f4FetchConStatusList,
    f4FetchConTypeList,
    f4FetchBranches,
    f4FetchPhysStatus,
    f4FetchCurrentStaff,
})(injectIntl(Ccmsc));
