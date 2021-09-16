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
// import moment from 'moment';
// import DatePicker from 'react-datepicker';

/**
 * Используется в создании рекомендации
 */

export default function CcmvaCard(props) {
    // Single Card
    const { messages, index, key, item } = props;
    const [show, setShow] = useState(false);

    return (
        <Grid.Column color={'grey'} floated="left" width={4}>
            <Segment padded size="small" className="card-segment">
                <Label as="a" color={'teal'} ribbon>
                    № {index + 1}
                </Label>
                <Form className="recoGrid">
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

                    <Form.Dropdown
                        defaultValue={0}
                        fluid
                        selection
                        label={'Приоритет задачи'}
                        placeholder={'Приоритет задачи'}
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
                        label={'Исполнитель'}
                        placeholder={'Исполнитель'}
                    />

                    <Form.Input
                        label={'Дата/Время назначения исполнителя'}
                        placeholder={'Дата/Время назначения исполнителя'}
                    />

                    <Form.Input
                        label={'Дата/Время начала исполнения'}
                        placeholder={'Дата/Время начала исполнения'}
                    />

                    <Form.Input
                        label={'Дата/Время завершение исполнения'}
                        placeholder={'Дата/Время завершение исполнения'}
                    />

                    <Form.Input
                        label={'Дата/Время закрытия задачи'}
                        placeholder={'Дата/Время закрытия задачи'}
                    />
                    <Form.TextArea
                        rows={1}
                        label={'Комментарий'}
                        placeholder={'Комментарий'}
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

                    <Form.Input
                        required
                        label={'Адрес клиента'}
                        placeholder={'Адрес клиента'}
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
                                        label={'ФИО Дилера:'}
                                        placeholder={'Со слов клиента'}
                                    />
                                    <Form.Dropdown
                                        defaultValue={0}
                                        fluid
                                        selection
                                        label={'Категория проблем'}
                                        placeholder={'Категория проблем'}
                                    />
                                    <Form.TextArea
                                        rows={1}
                                        label={'Описание проблем'}
                                        placeholder={'Описание проблем'}
                                    />
                                </Form>
                            </Segment>
                        </Modal.Content>
                    </Modal>
                    <Form.Input
                        required
                        label={'Тема обращения'}
                        placeholder={'Тема обращения'}
                    />
                    <Form.Input
                        label={'Дата/Время создания задачи'}
                        placeholder={'Дата/Время создания задачи'}
                    />
                    <Form.Input
                        required
                        label={'Оператор'}
                        placeholder={'Оператор'}
                        onChange={(e, d) => console.log('on Change')}
                    />
                </Form>
            </Segment>
        </Grid.Column>
    );
}
