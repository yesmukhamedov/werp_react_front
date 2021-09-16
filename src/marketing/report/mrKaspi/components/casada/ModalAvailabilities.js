import React, { useState } from 'react';
import { Label } from 'semantic-ui-react';
import {
    Button,
    Checkbox,
    Dropdown,
    Header,
    Icon,
    Modal,
    Table,
} from 'semantic-ui-react';

const ModalAvailabilities = props => {
    const {
        open,
        closeModal,
        casadaProducts,
        tempData,
        rowAvails,
        storeList,
    } = props;

    const availabilitiesOptions = [
        {
            // key: true,
            text: 'yes',
            value: true,
        },
        {
            // key: false,
            text: 'no',
            value: false,
        },
    ];
    // console.log('TEMP_DATA', tempData);
    // console.log('availabilitiesOptions', availabilitiesOptions);
    // console.log("rowAvails", rowAvails)
    let available = false;

    return (
        <Modal closeIcon open={open} onClose={closeModal}>
            <Header content="Пункты выдачи" />
            <Modal.Content>
                <Table>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell>ID</Table.HeaderCell>
                            <Table.HeaderCell>Пункт выдачи</Table.HeaderCell>
                            <Table.HeaderCell>В наличии</Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>
                    <Table.Body>
                        {storeList.map((item, index) => {
                            rowAvails.map(itemAv => {
                                available =
                                    itemAv.storeId === item.id
                                        ? itemAv.available
                                        : '';
                            });
                            return (
                                <Table.Row key={index}>
                                    <Table.Cell>{item.id}</Table.Cell>
                                    <Table.Cell>{item.name}</Table.Cell>
                                    <Table.Cell>
                                        <Dropdown
                                            options={availabilitiesOptions}
                                            selectOnBlur={false}
                                            defaultValue={available}
                                            selection
                                        />
                                    </Table.Cell>
                                </Table.Row>
                            );
                        })}
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

export default ModalAvailabilities;
/*{storeList.map(storeItem => {
    return storeItem.id ===
        availabilityItem.storeId
        ? storeItem.name
        : '';
    })}*/
