import React, { useState, useEffect } from 'react';
import { change } from 'redux-form';
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
        close,
        casadaProducts,
        tempData,
        rowAvails,
        storeList,
        availabilitiesOptions,
    } = props;

    const [changedAvail, setChangedAvail] = useState([]);

    useEffect(() => {
        if (rowAvails.length > 0) {
            setChangedAvail(
                rowAvails.map(item => {
                    return {
                        available: item.available,
                        sku: item.sku,
                        storeId: item.storeId,
                    };
                }),
            );
        }
    }, [rowAvails]);

    let sku = '';

    console.log('ROW_AVAILS', rowAvails);
    console.log('changedAvail', changedAvail);

    rowAvails.map(item => (sku = item.sku));

    // const onChangedAvail = (value, storeId) => {

    //     rowAvails.map((item, index) => {
    //         if (item.storeId == storeId) {
    //             rowAvails[index].available = value;
    //         } else {
    //             let tempObj = {
    //                 available: value,
    //                 sku: item.sku,
    //                 storeId: storeId
    //             };
    //             rowAvails.push(tempObj);
    //         }
    //     });
    // };

    // const onChangedAvail = (value, storeId) => {
    //     console.log(value, storeId)
    //     setChangedAvail([
    //         ...changedAvail,
    //         {
    //             available: value,
    //             sku: sku,
    //             storeId: storeId
    //         }

    //     ]);
    // };

    let available = false;

    return (
        <Modal closeIcon open={open} onClose={close}>
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
                                            onChange={(e, { value }) =>
                                                onChangedAvail(value, item.id)
                                            }
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
                <Button color="red" onClick={close}>
                    <Icon name="remove" /> Отмена
                </Button>
                <Button color="green" onClick={close}>
                    <Icon name="checkmark" /> Сохранить
                </Button>
            </Modal.Actions>
        </Modal>
    );
};

export default ModalAvailabilities;
