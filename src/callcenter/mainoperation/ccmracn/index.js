import React, { useState } from 'react';
import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';
import {
    Form,
    Container,
    Icon,
    Segment,
    Input,
    Header,
    Accordion,
    Grid,
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
import CcmracnCard from './ccmracnCard';
import ReactTableWrapperFixedColumns from '../../../utils/ReactTableWrapperFixedColumns';
const Ccmracn = props => {
    const {
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

    const addCcmracnCard = () => {
        setCcmracnCards(prev => {
            const vars = { ...prev };
            let itemIndex = vars.items.length;
            let form = {
                clientName: '',
                district: '',
                profession: '',
                relative: '',
                callDate: null,
                callerIsDealer: 0,
                note: '',
                phoneNumber1: '',
                displayPhone1: '',
                phoneNumber2: '',
                displayPhone2: '',
                category: null,
                switchDate: 0,
            };
            vars.items[itemIndex] = form;
            return vars;
        });
    };

    const renderCcmracnCard = () => {
        return ccmracnCards.items.map((item, index) => {
            return (
                <CcmracnCard
                    messages={messages}
                    removeCard={removeCard}
                    key={index}
                    item={item}
                    index={index}
                />
            );
        });
    };

    const removeCard = (index, id) => {
        setCcmracnCards(prev => {
            const vars = { ...prev };
            if (vars.items[index]) {
                vars.items.splice(index, 1);
            }
            return vars;
        });
    };
    return (
        <Container fluid className="containerMargin">
            <Segment className="justifySegment">
                <h3> Регистрация обращения c CN </h3>
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
                            <label>Номер договора</label>
                            <Input placeholder="Номер договора" fluid />
                        </Form.Field>

                        <Form.Field>
                            <label> Продукт </label>
                            <Input placeholder=" Продукт " fluid />
                        </Form.Field>

                        <Form.Field>
                            <label>Заводской номер</label>
                            <Input placeholder="Заводской номер" fluid />
                        </Form.Field>

                        <Form.Field>
                            <label>Дата продажи</label>
                            <Input placeholder="Дата продажи" fluid />
                        </Form.Field>
                    </Form.Group>

                    <Form.Group widths="7">
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

                        <Form.Field>
                            <label>Оператор</label>
                            <Input placeholder="Оператор" fluid />
                        </Form.Field>

                        <Form.Select
                            fluid
                            label="Статус договора"
                            className="alignBottom"
                            placeholder="Статус договора"
                            multiple
                        />
                        <Form.Select
                            fluid
                            label="Вид обращения"
                            className="alignBottom"
                            placeholder="Вид обращения"
                            multiple
                        />
                        <Form.Select
                            fluid
                            label="Тема обращения"
                            className="alignBottom"
                            placeholder="Тема обращения"
                            multiple
                        />
                    </Form.Group>

                    <Form.Group widths="7">
                        <Form.Field>
                            <label>Дата/Время обращения</label>
                            <Input placeholder="Дата/Время обращения" fluid />
                        </Form.Field>

                        <Form.Select
                            fluid
                            label="Статус обращения"
                            className="alignBottom"
                            placeholder="Статус обращения"
                            multiple
                        />
                        <Form.Select
                            fluid
                            label="Источник связи"
                            placeholder="Источник связи"
                            className="alignBottom"
                            multiple
                        />
                    </Form.Group>
                    <Form.Group className="spaceBetween">
                        <div className="flexDirectionRow">
                            <Form.Button
                                color="green"
                                icon
                                labelPosition="left"
                                onClick={addCcmracnCard}
                            >
                                <Icon name="plus circle" />
                                {messages['BTN__ADD']}
                            </Form.Button>

                            <Form.Field className="alignBottom">
                                <label>
                                    {' '}
                                    Количество: {ccmracnCards.items.length}{' '}
                                </label>
                            </Form.Field>
                        </div>
                        <div className="flexDirectionRow">
                            <Form.Button color="blue">
                                {messages['save']}
                            </Form.Button>

                            <Form.Button
                                color="red"
                                onClick={() => {
                                    console.log('Перейти на поиск клиента');
                                }}
                            >
                                Отмена
                            </Form.Button>
                        </div>
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
})(injectIntl(Ccmracn));
