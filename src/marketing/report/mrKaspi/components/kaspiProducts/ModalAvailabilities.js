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
        tempData,
        rowAvails,
        storeList,
        updateKaspiProduct,
        clearKaspiProducts,
        fetchKaspiProducts,
        availabilitiesOptions = [],
        rowData,
    } = props;

    const [changedAvail, setChangedAvail] = useState([]);
    const [tempProducts, setTempProducts] = useState([]);
    const [tempOneProduct, setTempOneProduct] = useState([]);

    useEffect(() => {
        setChangedAvail(rowAvails);
    }, [rowAvails]);

    useEffect(() => {
        setTempProducts(tempData);
    }, [tempData]);

    useEffect(() => {
        setTempOneProduct(rowData);
    }, [rowData]);

    let sku = rowAvails.map(item => item.sku);
    // sku = sku.toString();

    const onClickSave = () => {
        setTempOneProduct({
            ...tempOneProduct,
            availabilities: changedAvail,
        });

        let changedProduct = {
            sku: tempOneProduct.sku,
            model: tempOneProduct.model,
            price: tempOneProduct.price,
            company: tempOneProduct.company,
            brand: tempOneProduct.brand,
            availabilities: changedAvail,
        };

        updateKaspiProduct(changedProduct, () => {
            close();
            clearKaspiProducts();
            fetchKaspiProducts();
        });
    };

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
                            const value = changedAvail.find(
                                ({ storeId }) => storeId === item.id,
                            );
                            return (
                                <Table.Row key={index}>
                                    <Table.Cell>{item.id}</Table.Cell>
                                    <Table.Cell>{item.name}</Table.Cell>
                                    <Table.Cell>
                                        <Dropdown
                                            options={availabilitiesOptions}
                                            selectOnBlur={false}
                                            onChange={(e, { value }) => {
                                                const found = changedAvail.findIndex(
                                                    ({ storeId }) =>
                                                        storeId === item.id,
                                                );
                                                if (found >= 0) {
                                                    setChangedAvail(prev => {
                                                        const newAvail = JSON.parse(
                                                            JSON.stringify(
                                                                prev,
                                                            ),
                                                        );

                                                        newAvail[
                                                            found
                                                        ].available = value;
                                                        return newAvail;
                                                    });
                                                } else {
                                                    setChangedAvail(prev => [
                                                        ...prev,
                                                        {
                                                            available: value,
                                                            sku: sku[0],
                                                            storeId: item.id,
                                                        },
                                                    ]);
                                                }
                                            }}
                                            value={value ? value.available : ''}
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
                <Button color="green" onClick={() => onClickSave()}>
                    <Icon name="checkmark" /> Сохранить
                </Button>
            </Modal.Actions>
        </Modal>
    );
};

export default ModalAvailabilities;
