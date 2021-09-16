import React, { useState } from 'react';
import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';
import {
    Form,
    Container,
    Divider,
    Icon,
    Segment,
    Input,
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
import CcmraCard from './ccmraCard';
const Ccmra = props => {
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

    const [ccmraCards, setCcmraCards] = useState({ ...emptyCard });

    const addCcmraCard = () => {
        setCcmraCards(prev => {
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

    const renderCcmreCard = () => {
        return ccmraCards.items.map((item, index) => {
            return (
                <CcmraCard
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
        setCcmraCards(prev => {
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
                <h3> Регистрация обращения без CN </h3>
            </Segment>

            <Segment>
                <Form>
                    <Form.Group widths="6">
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
                            <label>ФИО клиента</label>
                            <Input placeholder="ФИО клиента" fluid />
                        </Form.Field>

                        <Form.Field>
                            <label>Адрес</label>
                            <Input placeholder="Адрес" fluid />
                        </Form.Field>

                        <Form.Field>
                            <label>{messages['Phone']}</label>
                            <Input placeholder={messages['Phone']} fluid />
                        </Form.Field>
                    </Form.Group>

                    <Form.Group widths="6">
                        <Form.Select
                            fluid
                            label="Вид обращения"
                            placeholder="Вид обращения"
                            className="alignBottom"
                            multiple
                        />

                        <Form.Select
                            fluid
                            label={messages['subject_of_appeal']}
                            className="alignBottom"
                            placeholder={messages['subject_of_appeal']}
                            multiple
                        />
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
                        <Form.Field>
                            <label>Оператор</label>
                            <Input placeholder="Оператор" fluid />
                        </Form.Field>
                        <Form.Field>
                            <label>Дата/Время обращения</label>
                            <Input placeholder="Дата/Время обращения" fluid />
                        </Form.Field>
                    </Form.Group>
                    <Form.Group className="spaceBetween">
                        <div className="flexDirectionRow">
                            <Form.Button
                                color="green"
                                icon
                                labelPosition="left"
                                onClick={addCcmraCard}
                            >
                                <Icon name="plus circle" />
                                {messages['BTN__ADD']}
                            </Form.Button>

                            <Form.Field className="alignBottom">
                                <label>
                                    {' '}
                                    Количество: {ccmraCards.items.length}{' '}
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
                <Divider />
                <Grid> {renderCcmreCard()}</Grid>
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
})(injectIntl(Ccmra));
