import React, { useState, useEffect } from 'react';
import {
    Label,
    Form,
    Grid,
    Segment,
    Button,
    Icon,
    Modal,
    Input,
} from 'semantic-ui-react';
import {
    getCallerOptionsByLanguage,
    getRecoCategoriesOptionsByLanguage,
} from '../../../crm2021/crmUtil';
// import moment from 'moment';
// import DatePicker from 'react-datepicker';

/**
 * Используется в создании рекомендации
 */
const errorBlockCss = {
    display: 'block',
    color: 'red',
    marginTop: '-10px',
};
export default function CcmraCard(props) {
    // Single Card
    const { messages, index, key, item } = props;

    const [show, setShow] = useState(false);

    return (
        <Grid.Column color={'grey'} floated="left" width={4}>
            <Segment padded size="small" className="card-segment">
                <Label as="a" color={'teal'} ribbon></Label>
                <Button
                    size={'mini'}
                    color={'red'}
                    icon="delete"
                    className="right floated"
                    onClick={e => props.removeCard(index, item)}
                />

                <Form className="recoGrid">
                    <Form.Input
                        required
                        label={'Оператор'}
                        placeholder={'Оператор'}
                        onChange={(e, d) => console.log('on Change')}
                    />

                    <Form.Input
                        required
                        label={'Страна'}
                        placeholder={'Страна'}
                    />

                    <Form.Input
                        required
                        label={'Компания'}
                        placeholder={'Компания'}
                    />

                    <Form.Input
                        required
                        label={'Филиал'}
                        placeholder={'Филиал'}
                    />

                    <Form.Input
                        required
                        label={'Тема обращения'}
                        placeholder={'Тема обращения'}
                    />

                    <Form.Input
                        required
                        label={'ФИО Клиента'}
                        placeholder={'ФИО Клиента'}
                    />

                    <Form.Input
                        required
                        label={'Номер телефона клиента'}
                        placeholder={'Номер телефона клиента'}
                    />
                    <Form.Button
                        fluid
                        label={'Категория обращений'}
                        color="violet"
                        icon
                        labelPosition="right"
                        onClick={() => {
                            setShow(true);
                        }}
                    >
                        <Icon name="file outline" />
                        {'Категория обращений'}
                    </Form.Button>

                    <Modal
                        open={show}
                        closeIcon
                        size={'mini'}
                        onClose={() => {
                            setShow(false);
                        }}
                    >
                        <Modal.Header>
                            <h2 align="center">Общие данные</h2>
                        </Modal.Header>

                        <Modal.Content>
                            <Segment>
                                <Form>
                                    <Form.Input
                                        label={'Номер задачи'}
                                        placeholder={'Оператор'}
                                        onChange={(e, d) =>
                                            console.log('on Change')
                                        }
                                    />

                                    <Form.Input
                                        label={'Категория обращения'}
                                        placeholder={'Страна'}
                                    />
                                    <Form.Dropdown
                                        defaultValue={0}
                                        fluid
                                        selection
                                        label={'Выбор продукта'}
                                        placeholder={'Выбор продукта'}
                                    />
                                    <Form.Input
                                        label={'Описание запроса'}
                                        placeholder={'Описание запроса'}
                                    />
                                </Form>
                            </Segment>
                        </Modal.Content>

                        <Modal.Actions>
                            <div align="center">
                                <Button color="teal">
                                    <Icon name="checkmark" />
                                    {messages['Table.Add']}
                                </Button>

                                <Button
                                    negative
                                    onClick={() => {
                                        setShow(false);
                                    }}
                                >
                                    <Icon name="remove" />
                                    {messages['BTN__CANCEL']}
                                </Button>
                            </div>
                        </Modal.Actions>
                    </Modal>
                    <Form.Input
                        label={'Описание проблем'}
                        placeholder={'Описание проблем'}
                    />
                    <Form.TextArea
                        rows={1}
                        label={'Комментарий'}
                        placeholder={'Комментарий'}
                    />
                    <Form.Dropdown
                        defaultValue={0}
                        fluid
                        selection
                        label={'Отдел исполнителя'}
                        placeholder={'Отдел исполнителя'}
                    />

                    <Form.Dropdown
                        defaultValue={0}
                        fluid
                        selection
                        label={'Приоритет задачи'}
                        placeholder={'Приоритет задачи'}
                    />
                    <Form.Input
                        label={'Описание проблем'}
                        placeholder={'Описание проблем'}
                    />
                </Form>
            </Segment>
        </Grid.Column>
    );
}
