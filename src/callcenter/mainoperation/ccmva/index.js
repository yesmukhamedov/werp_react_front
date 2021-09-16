import React, { useState } from 'react';
import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';
import {
    Form,
    Container,
    Icon,
    Grid,
    Segment,
    Input,
    Header,
    Accordion,
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
import '../../../service/service.css';
import ReactTableWrapperFixedColumns from '../../../utils/ReactTableWrapperFixedColumns';
import CcmvaCard from './ccmvaCard';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import {
    stringYYYYMMDDToMoment,
    momentToStringYYYYMMDD,
    moneyFormat,
} from '../../../utils/helpers';
const Ccmva = props => {
    const {
        language,
        intl: { messages },
    } = props;

    const emptyCard = {
        context: null,
        contextId: null,
        tempRecommender: '',
        recommenderInfo: '',
        responsibleId: null,
        items: [],
    };

    const [ccmracnCards, setCcmracnCards] = useState({ ...emptyCard });
    const [customerDataAccordion, setCustomerDataAccordion] = useState(false);
    const [financeDataAccordion, setFinanceDataAccordion] = useState(false);
    const [serviceDataAccordion, setServiceDataAccordion] = useState(false);
    const [productsDataAccordion, setProductsDataAccordion] = useState(false);
    const taskCount = ['', '', ''];
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const [startDate1, setStartDate1] = useState(new Date());
    const [endDate1, setEndDate1] = useState(new Date());
    const renderCcmracnCard = () => {
        return taskCount.map((item, index) => {
            return (
                <CcmvaCard
                    messages={messages}
                    key={taskCount.length}
                    index={index}
                />
            );
        });
    };
    return (
        <Container fluid className="containerMargin">
            <Segment className="justifySegment">
                <h3> Ccmva: Просмотр обращения </h3>
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

                        <Form.Field>
                            <label>Оператор</label>
                            <Input placeholder="Оператор" fluid />
                        </Form.Field>

                        <Form.Input
                            label="ФИО клиента"
                            placeholder="ФИО клиента"
                        />

                        <Form.Field>
                            <label>Телефон</label>
                            <Input placeholder="Телефон" fluid />
                        </Form.Field>

                        <Form.Field>
                            <label>Адрес</label>
                            <Input placeholder="Адрес" fluid />
                        </Form.Field>
                    </Form.Group>

                    <Form.Group widths="7">
                        <Form.Select
                            fluid
                            label="Вид обращения"
                            className="alignBottom"
                            placeholder="Вид обращения"
                            multiple
                        />
                        <Form.Select
                            fluid
                            label="Источник связи"
                            placeholder="Источник связи"
                            className="alignBottom"
                            multiple
                        />
                        <Form.Select
                            fluid
                            label="Тема обращения"
                            className="alignBottom"
                            placeholder="Тема обращения"
                            multiple
                        />
                        <Form.Select
                            fluid
                            label="Статус обращения"
                            className="alignBottom"
                            placeholder="Статус обращения"
                            multiple
                        />
                        <Form.Field>
                            <label>Дата/Время обращения</label>
                            <div className="flexDirectionRow">
                                <DatePicker
                                    showMonthYearPicker
                                    placeholderText="Начало"
                                    autoComplete="off"
                                    selected={stringYYYYMMDDToMoment(startDate)}
                                    dropdownMode="select" //timezone="UTC"
                                    locale={language}
                                    onChange={date => setStartDate(date)}
                                    withPortal
                                />
                                <DatePicker
                                    showMonthYearPicker
                                    placeholderText="Конец"
                                    autoComplete="off"
                                    selected={stringYYYYMMDDToMoment(endDate)}
                                    dropdownMode="select" //timezone="UTC"
                                    locale={language}
                                    onChange={date => setEndDate(date)}
                                    withPortal
                                />
                            </div>
                        </Form.Field>
                        <Form.Field>
                            <label>Дата/Время закрытия обращения</label>
                            <div className="flexDirectionRow">
                                <DatePicker
                                    showMonthYearPicker
                                    placeholderText="Начало"
                                    autoComplete="off"
                                    selected={stringYYYYMMDDToMoment(
                                        startDate1,
                                    )}
                                    dropdownMode="select" //timezone="UTC"
                                    locale={language}
                                    onChange={date => setStartDate1(date)}
                                    withPortal
                                />
                                <DatePicker
                                    showMonthYearPicker
                                    placeholderText="Конец"
                                    autoComplete="off"
                                    selected={stringYYYYMMDDToMoment(endDate1)}
                                    dropdownMode="select" //timezone="UTC"
                                    locale={language}
                                    onChange={date => setEndDate1(date)}
                                    withPortal
                                />
                            </div>
                        </Form.Field>
                    </Form.Group>
                    <Form.Group className="spaceBetween">
                        <div className="flexDirectionRow">
                            <Form.Button
                                color="green"
                                icon
                                labelPosition="left"
                            >
                                <Icon name="sitemap" />
                                {'Просмотреть задачи'}
                            </Form.Button>

                            <Form.Field className="alignBottom">
                                <label> Количество: {taskCount.length} </label>
                            </Form.Field>
                        </div>
                        <Form.Button
                            color="red"
                            icon
                            labelPosition="left"
                            onClick={() => {
                                console.log('Перейти на поиск клиента');
                            }}
                        >
                            <Icon name="close" />
                            Закрыт
                        </Form.Button>
                    </Form.Group>
                </Form>
            </Segment>

            <Segment>
                <h3>Допполнительная информация </h3>
            </Segment>
            <Accordion fluid styled>
                <Accordion.Title
                    active={false}
                    index={0}
                    onClick={() => {
                        setCustomerDataAccordion(!customerDataAccordion);
                    }}
                >
                    <Icon name="dropdown" />
                    Данные клиента
                </Accordion.Title>
                <Accordion.Content active={customerDataAccordion}>
                    <Header>Общие данные</Header>
                    <ReactTableWrapperFixedColumns
                        data={[]}
                        columns={[
                            {
                                Header: () => (
                                    <div style={{ textAlign: 'center' }}>
                                        Компания
                                    </div>
                                ),
                                accessor: 'company',
                                Cell: row => (
                                    <div style={{ textAlign: 'center' }}>
                                        {row.value}
                                    </div>
                                ),
                            },
                            {
                                Header: () => (
                                    <div style={{ textAlign: 'center' }}>
                                        Филиал
                                    </div>
                                ),
                                accessor: 'company',
                                Cell: row => (
                                    <div style={{ textAlign: 'center' }}>
                                        {row.value}
                                    </div>
                                ),
                            },

                            {
                                Header: () => (
                                    <div style={{ textAlign: 'center' }}>
                                        Номер договора
                                    </div>
                                ),
                                accessor: 'company',
                                Cell: row => (
                                    <div style={{ textAlign: 'center' }}>
                                        {row.value}
                                    </div>
                                ),
                            },
                            {
                                Header: () => (
                                    <div style={{ textAlign: 'center' }}>
                                        Дата договора
                                    </div>
                                ),
                                accessor: 'company',
                                Cell: row => (
                                    <div style={{ textAlign: 'center' }}>
                                        {row.value}
                                    </div>
                                ),
                            },

                            {
                                Header: () => (
                                    <div style={{ textAlign: 'center' }}>
                                        Продукт
                                    </div>
                                ),
                                accessor: 'company',
                                Cell: row => (
                                    <div style={{ textAlign: 'center' }}>
                                        {row.value}
                                    </div>
                                ),
                            },
                            {
                                Header: () => (
                                    <div style={{ textAlign: 'center' }}>
                                        Дилер
                                    </div>
                                ),
                                accessor: 'company',
                                Cell: row => (
                                    <div style={{ textAlign: 'center' }}>
                                        {row.value}
                                    </div>
                                ),
                            },

                            {
                                Header: () => (
                                    <div style={{ textAlign: 'center' }}>
                                        Дата продажи
                                    </div>
                                ),
                                accessor: 'company',
                                Cell: row => (
                                    <div style={{ textAlign: 'center' }}>
                                        {row.value}
                                    </div>
                                ),
                            },
                            {
                                Header: () => (
                                    <div style={{ textAlign: 'center' }}>
                                        Подарки
                                    </div>
                                ),
                                accessor: 'company',
                                Cell: row => (
                                    <div style={{ textAlign: 'center' }}>
                                        {row.value}
                                    </div>
                                ),
                            },

                            {
                                Header: () => (
                                    <div style={{ textAlign: 'center' }}>
                                        Рекомендатель
                                    </div>
                                ),
                                accessor: 'company',
                                Cell: row => (
                                    <div style={{ textAlign: 'center' }}>
                                        {row.value}
                                    </div>
                                ),
                            },
                        ]}
                        defaultPageSize={3}
                        showPagination={false}
                    />
                    <Header>Контактные данные</Header>
                    <ReactTableWrapperFixedColumns
                        data={[]}
                        columns={[
                            {
                                Header: () => (
                                    <div style={{ textAlign: 'center' }}>
                                        Адрес для клиента
                                    </div>
                                ),
                                accessor: 'company',
                                Cell: row => (
                                    <div style={{ textAlign: 'center' }}>
                                        {row.value}
                                    </div>
                                ),
                            },
                            {
                                Header: () => (
                                    <div style={{ textAlign: 'center' }}>
                                        {' '}
                                        Домашний телефон{' '}
                                    </div>
                                ),
                                accessor: 'company',
                                Cell: row => (
                                    <div style={{ textAlign: 'center' }}>
                                        {row.value}
                                    </div>
                                ),
                            },

                            {
                                Header: () => (
                                    <div style={{ textAlign: 'center' }}>
                                        {' '}
                                        Мобильный телефон{' '}
                                    </div>
                                ),
                                accessor: 'company',
                                Cell: row => (
                                    <div style={{ textAlign: 'center' }}>
                                        {row.value}
                                    </div>
                                ),
                            },
                        ]}
                        defaultPageSize={3}
                        showPagination={false}
                    />
                </Accordion.Content>

                <Accordion.Title
                    active={financeDataAccordion}
                    index={1}
                    onClick={() => {
                        setFinanceDataAccordion(!financeDataAccordion);
                    }}
                >
                    <Icon name="dropdown" />
                    Финансовые данные
                </Accordion.Title>
                <Accordion.Content active={financeDataAccordion}>
                    <Header>Общие данные</Header>
                    <ReactTableWrapperFixedColumns
                        data={[]}
                        columns={[
                            {
                                Header: () => (
                                    <div style={{ textAlign: 'center' }}>
                                        Предоплата
                                    </div>
                                ),
                                accessor: 'company',
                                Cell: row => (
                                    <div style={{ textAlign: 'center' }}>
                                        {row.value}
                                    </div>
                                ),
                            },
                            {
                                Header: () => (
                                    <div style={{ textAlign: 'center' }}>
                                        Срок рассрочки
                                    </div>
                                ),
                                accessor: 'company',
                                Cell: row => (
                                    <div style={{ textAlign: 'center' }}>
                                        {row.value}
                                    </div>
                                ),
                            },

                            {
                                Header: () => (
                                    <div style={{ textAlign: 'center' }}>
                                        {' '}
                                        Остаток суммы{' '}
                                    </div>
                                ),
                                accessor: 'company',
                                Cell: row => (
                                    <div style={{ textAlign: 'center' }}>
                                        {row.value}
                                    </div>
                                ),
                            },
                            {
                                Header: () => (
                                    <div style={{ textAlign: 'center' }}>
                                        {' '}
                                        Скидка от дилера
                                    </div>
                                ),
                                accessor: 'company',
                                Cell: row => (
                                    <div style={{ textAlign: 'center' }}>
                                        {row.value}
                                    </div>
                                ),
                            },

                            {
                                Header: () => (
                                    <div style={{ textAlign: 'center' }}>
                                        {' '}
                                        Скидка от рекомендателя
                                    </div>
                                ),
                                accessor: 'company',
                                Cell: row => (
                                    <div style={{ textAlign: 'center' }}>
                                        {row.value}
                                    </div>
                                ),
                            },
                            {
                                Header: () => (
                                    <div style={{ textAlign: 'center' }}>
                                        {' '}
                                        Оплата через
                                    </div>
                                ),
                                accessor: 'company',
                                Cell: row => (
                                    <div style={{ textAlign: 'center' }}>
                                        {row.value}
                                    </div>
                                ),
                            },

                            {
                                Header: () => (
                                    <div style={{ textAlign: 'center' }}>
                                        {' '}
                                        Финансовый агент
                                    </div>
                                ),
                                accessor: 'company',
                                Cell: row => (
                                    <div style={{ textAlign: 'center' }}>
                                        {row.value}
                                    </div>
                                ),
                            },
                            {
                                Header: () => (
                                    <div style={{ textAlign: 'center' }}>
                                        Trade-In
                                    </div>
                                ),
                                accessor: 'company',
                                Cell: row => (
                                    <div style={{ textAlign: 'center' }}>
                                        {row.value}
                                    </div>
                                ),
                            },

                            {
                                Header: () => (
                                    <div style={{ textAlign: 'center' }}>
                                        {' '}
                                        Ссылка на документ
                                    </div>
                                ),
                                accessor: 'company',
                                Cell: row => (
                                    <div style={{ textAlign: 'center' }}>
                                        {row.value}
                                    </div>
                                ),
                            },
                        ]}
                        defaultPageSize={3}
                        showPagination={false}
                    />
                    <Header>График платежей</Header>
                    <ReactTableWrapperFixedColumns
                        data={[]}
                        columns={[
                            {
                                Header: () => (
                                    <div style={{ textAlign: 'center' }}>
                                        Дата
                                    </div>
                                ),
                                accessor: 'company',
                                Cell: row => (
                                    <div style={{ textAlign: 'center' }}>
                                        {row.value}
                                    </div>
                                ),
                            },
                            {
                                Header: () => (
                                    <div style={{ textAlign: 'center' }}>
                                        Сумма
                                    </div>
                                ),
                                accessor: 'company',
                                Cell: row => (
                                    <div style={{ textAlign: 'center' }}>
                                        {row.value}
                                    </div>
                                ),
                            },

                            {
                                Header: () => (
                                    <div style={{ textAlign: 'center' }}>
                                        {' '}
                                        Выплачено{' '}
                                    </div>
                                ),
                                accessor: 'company',
                                Cell: row => (
                                    <div style={{ textAlign: 'center' }}>
                                        {row.value}
                                    </div>
                                ),
                            },
                        ]}
                        defaultPageSize={3}
                        showPagination={false}
                    />
                </Accordion.Content>
                <Accordion.Title
                    active={serviceDataAccordion}
                    index={2}
                    onClick={() => {
                        setServiceDataAccordion(!serviceDataAccordion);
                    }}
                >
                    <Icon name="dropdown" />
                    Данные по сервису
                </Accordion.Title>
                <Accordion.Content active={serviceDataAccordion}>
                    <Header> Общие данные </Header>
                    <ReactTableWrapperFixedColumns
                        data={[]}
                        columns={[
                            {
                                Header: () => (
                                    <div style={{ textAlign: 'center' }}>
                                        Сервис Филиал
                                    </div>
                                ),
                                accessor: 'company',
                                Cell: row => (
                                    <div style={{ textAlign: 'center' }}>
                                        {row.value}
                                    </div>
                                ),
                            },
                            {
                                Header: () => (
                                    <div style={{ textAlign: 'center' }}>
                                        {' '}
                                        Продукт{' '}
                                    </div>
                                ),
                                accessor: 'company',
                                Cell: row => (
                                    <div style={{ textAlign: 'center' }}>
                                        {row.value}
                                    </div>
                                ),
                            },

                            {
                                Header: () => (
                                    <div style={{ textAlign: 'center' }}>
                                        {' '}
                                        Заводской номер
                                    </div>
                                ),
                                accessor: 'company',
                                Cell: row => (
                                    <div style={{ textAlign: 'center' }}>
                                        {row.value}
                                    </div>
                                ),
                            },
                            {
                                Header: () => (
                                    <div style={{ textAlign: 'center' }}>
                                        {' '}
                                        Мастер по установке
                                    </div>
                                ),
                                accessor: 'company',
                                Cell: row => (
                                    <div style={{ textAlign: 'center' }}>
                                        {row.value}
                                    </div>
                                ),
                            },

                            {
                                Header: () => (
                                    <div style={{ textAlign: 'center' }}>
                                        {' '}
                                        Дата установки
                                    </div>
                                ),
                                accessor: 'company',
                                Cell: row => (
                                    <div style={{ textAlign: 'center' }}>
                                        {row.value}
                                    </div>
                                ),
                            },
                            {
                                Header: () => (
                                    <div style={{ textAlign: 'center' }}>
                                        Срок гарантии
                                    </div>
                                ),
                                accessor: 'company',
                                Cell: row => (
                                    <div style={{ textAlign: 'center' }}>
                                        {row.value}
                                    </div>
                                ),
                            },

                            {
                                Header: () => (
                                    <div style={{ textAlign: 'center' }}>
                                        Срок замены
                                    </div>
                                ),
                                accessor: 'company',
                                Cell: row => (
                                    <div style={{ textAlign: 'center' }}>
                                        {row.value}
                                    </div>
                                ),
                            },
                        ]}
                        defaultPageSize={3}
                        showPagination={false}
                    />
                    <Header>История сервисов</Header>
                    <ReactTableWrapperFixedColumns
                        data={[]}
                        columns={[
                            {
                                Header: () => (
                                    <div style={{ textAlign: 'center' }}>
                                        Вид сервиса
                                    </div>
                                ),
                                accessor: 'company',
                                Cell: row => (
                                    <div style={{ textAlign: 'center' }}>
                                        {row.value}
                                    </div>
                                ),
                            },
                            {
                                Header: () => (
                                    <div style={{ textAlign: 'center' }}>
                                        {' '}
                                        Мастер{' '}
                                    </div>
                                ),
                                accessor: 'company',
                                Cell: row => (
                                    <div style={{ textAlign: 'center' }}>
                                        {row.value}
                                    </div>
                                ),
                            },
                            {
                                Header: () => (
                                    <div style={{ textAlign: 'center' }}>
                                        {' '}
                                        Дата сервиса{' '}
                                    </div>
                                ),
                                accessor: 'company',
                                Cell: row => (
                                    <div style={{ textAlign: 'center' }}>
                                        {row.value}
                                    </div>
                                ),
                            },
                            {
                                Header: () => (
                                    <div style={{ textAlign: 'center' }}>
                                        {' '}
                                        Описание{' '}
                                    </div>
                                ),
                                accessor: 'company',
                                Cell: row => (
                                    <div style={{ textAlign: 'center' }}>
                                        {row.value}
                                    </div>
                                ),
                            },
                            {
                                Header: () => (
                                    <div style={{ textAlign: 'center' }}>
                                        {' '}
                                        Ссылка на сервис карту{' '}
                                    </div>
                                ),
                                accessor: 'company',
                                Cell: row => (
                                    <Icon name="chevron circle right" />
                                ),
                            },
                        ]}
                        defaultPageSize={3}
                        showPagination={false}
                    />
                </Accordion.Content>
                <Accordion.Title
                    active={productsDataAccordion}
                    index={2}
                    onClick={() => {
                        setProductsDataAccordion(!productsDataAccordion);
                    }}
                >
                    <Icon name="dropdown" />
                    Продукты
                </Accordion.Title>
                <Accordion.Content active={productsDataAccordion}>
                    <ReactTableWrapperFixedColumns
                        data={[]}
                        columns={[
                            {
                                Header: () => (
                                    <div style={{ textAlign: 'center' }}>
                                        Наименование продукта{' '}
                                    </div>
                                ),
                                accessor: 'company',
                                Cell: row => (
                                    <div style={{ textAlign: 'center' }}>
                                        {row.value}
                                    </div>
                                ),
                            },
                            {
                                Header: () => (
                                    <div style={{ textAlign: 'center' }}>
                                        Номер договора (ссылка)
                                    </div>
                                ),
                                accessor: 'company',
                                Cell: row => (
                                    <div style={{ textAlign: 'center' }}>
                                        {row.value}
                                    </div>
                                ),
                            },

                            {
                                Header: () => (
                                    <div style={{ textAlign: 'center' }}>
                                        Дилер
                                    </div>
                                ),
                                accessor: 'company',
                                Cell: row => (
                                    <div style={{ textAlign: 'center' }}>
                                        {row.value}
                                    </div>
                                ),
                            },
                            {
                                Header: () => (
                                    <div style={{ textAlign: 'center' }}>
                                        Дата продажи
                                    </div>
                                ),
                                accessor: 'company',
                                Cell: row => (
                                    <div style={{ textAlign: 'center' }}>
                                        {row.value}
                                    </div>
                                ),
                            },

                            {
                                Header: () => (
                                    <div style={{ textAlign: 'center' }}>
                                        Дата возврата
                                    </div>
                                ),
                                accessor: 'company',
                                Cell: row => (
                                    <div style={{ textAlign: 'center' }}>
                                        {row.value}
                                    </div>
                                ),
                            },
                        ]}
                        defaultPageSize={3}
                        showPagination={false}
                    />
                </Accordion.Content>
            </Accordion>
            <br />
            <Grid> {renderCcmracnCard()}</Grid>
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
})(injectIntl(Ccmva));
