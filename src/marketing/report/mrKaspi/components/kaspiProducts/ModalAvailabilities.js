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
    const [emptyAvail, setEmptyAvail] = useState(false);
    const [boolArr, setBoolArr] = useState([]);
    const [emptyStore, setEmptyStore] = useState(false);

    useEffect(
        () => {
            setChangedAvail(rowAvails);
            setTempProducts(tempData);
            setTempOneProduct(rowData);
        },
        [rowAvails],
        [tempData],
        [rowData],
    );

    let sku = rowAvails.map(item => item.sku);

    const validation = item => {
        let success = true;

        let filteredAvails = [];

        item.availabilities.map((avail, index) => {
            if (avail.available === '' || avail.available === null) {
            } else {
                filteredAvails[index] = avail;
            }

            // if (avail.available !== '' || avail.available !== null){
            //     filteredAvails[index] = avail;
            // }
        });

        item.availabilities = filteredAvails;

        if (item.availabilities.length < 1) {
            success = false;
            setEmptyStore(true);
        } else {
            setEmptyStore(false);
            return item;
        }

        return success;
    };

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
        if (validation(changedProduct)) {
            updateKaspiProduct(changedProduct, () => {
                close();
                clearKaspiProducts();
                fetchKaspiProducts();
            });
        }
    };

    return (
        <Modal closeIcon open={open} onClose={close}>
            <Header content="Пункты выдачи" />
            <Modal.Content>
                Товар {sku[0]}
                <Table>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell>ID</Table.HeaderCell>
                            <Table.HeaderCell>Пункт выдачи </Table.HeaderCell>
                            <Table.HeaderCell>
                                В наличии
                                <h4
                                    style={{
                                        color: 'red',
                                        display: emptyStore ? 'block' : 'none',
                                    }}
                                >
                                    Выберите хотя бы один пункт
                                </h4>
                            </Table.HeaderCell>
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
                                                    if (value !== '') {
                                                        setChangedAvail(
                                                            prev => [
                                                                ...prev,
                                                                {
                                                                    available: value,
                                                                    sku: sku[0],
                                                                    storeId:
                                                                        item.id,
                                                                },
                                                            ],
                                                        );
                                                    }
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
