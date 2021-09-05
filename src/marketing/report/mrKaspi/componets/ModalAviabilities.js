import React, { useState } from 'react';
import {
    Button,
    Checkbox,
    Dropdown,
    Header,
    Icon,
    Modal,
    Table,
} from 'semantic-ui-react';

const ModalAviabilities = props => {
    const { open, closeModal, aviabilities = [] } = props;
    return (
        <Modal closeIcon open={open} onClose={closeModal}>
            <Header content="Пункты выдачи" />
            <Modal.Content>
                <Table>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell>#</Table.HeaderCell>
                            <Table.HeaderCell>Пункт выдачи</Table.HeaderCell>
                            <Table.HeaderCell>Доступность</Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>
                    <Table.Body>
                        {aviabilities.map((item, index) => (
                            <Table.Row key={index}>
                                <Table.Cell>
                                    <Checkbox />
                                </Table.Cell>
                                <Table.Cell>{item.name}</Table.Cell>
                                <Table.Cell>
                                    <Dropdown
                                        selection
                                        options={[
                                            {
                                                key: 'yes',
                                                text: 'yes',
                                                value: 'yes',
                                            },
                                            {
                                                key: 'no',
                                                text: 'no',
                                                value: 'no',
                                            },
                                        ]}
                                    />
                                </Table.Cell>
                            </Table.Row>
                        ))}
                    </Table.Body>
                </Table>
            </Modal.Content>
            <Modal.Actions>
                <Button color="red" onClick={closeModal}>
                    <Icon name="remove" /> Отмена
                </Button>
                <Button color="green" onClick={closeModal}>
                    <Icon name="checkmark" /> Сохранить
                </Button>
            </Modal.Actions>
        </Modal>
    );
};

export default ModalAviabilities;
