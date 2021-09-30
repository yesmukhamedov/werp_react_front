import React, { useState, useEffect } from 'react';
import { Checkbox } from 'semantic-ui-react';
import {
    Button,
    Dropdown,
    Header,
    Icon,
    Modal,
    Table,
    Form,
    Input,
} from 'semantic-ui-react';

export default function ModalAddProduct(props) {
    const {
        open,
        close,
        storeList,
        availabilitiesOptions,
        createKaspiProduct,
        clearKaspiProducts,
        fetchKaspiProducts,
        brandListOptions,
        companyListOptions,
    } = props;

    const initialProducts = {
        sku: '',
        brand: '',
        company: '',
        model: '',
        price: 0,
        availabilities: [],
    };

    useEffect(() => {
        if (storeList.length > 0) {
            setStoreListTemp(
                storeList.map(item => {
                    return {
                        id: item.id,
                        name: item.name,
                        checked: false,
                    };
                }),
            );
        }
    }, [storeList]);

    const [storeListTemp, setStoreListTemp] = useState([]);
    const [tempKaspiProduct, setTempKaspiProduct] = useState(initialProducts);
    const [errors, setErrors] = useState([]);
    const [emptyStore, setEmptyStore] = useState(false);
    const [emptyAvail, setEmptyAvail] = useState(false);

    const onChangeAdd = (fieldName, value, id) => {
        switch (fieldName) {
            case 'sku':
                setTempKaspiProduct({
                    ...tempKaspiProduct,
                    sku: value,
                });
                break;
            case 'brand':
                setTempKaspiProduct({
                    ...tempKaspiProduct,
                    brand: value,
                });
                break;
            case 'company':
                setTempKaspiProduct({
                    ...tempKaspiProduct,
                    company: value,
                });
                break;
            case 'model':
                setTempKaspiProduct({
                    ...tempKaspiProduct,
                    model: value,
                });
                break;
            case 'price':
                setTempKaspiProduct({
                    ...tempKaspiProduct,
                    price: parseInt(value),
                });
                break;
            case 'available':
                setTempKaspiProduct({
                    ...tempKaspiProduct,
                    availabilities: tempKaspiProduct.availabilities.map(el =>
                        el.storeId === id
                            ? {
                                  ...el,
                                  available: value,
                              }
                            : el,
                    ),
                });

                break;
            case 'checked':
                if (id) {
                    setTempKaspiProduct({
                        ...tempKaspiProduct,
                        availabilities: [
                            ...tempKaspiProduct.availabilities,
                            {
                                storeId: value.id,
                                sku: tempKaspiProduct.sku,
                                available: '',
                            },
                        ],
                    });
                    setStoreListTemp(
                        storeListTemp.map(el =>
                            el.id === value.id
                                ? {
                                      ...el,
                                      checked: true,
                                  }
                                : el,
                        ),
                    );
                } else {
                    let deleteFilter = tempKaspiProduct.availabilities.filter(
                        el => el.storeId != value.id,
                    );
                    setTempKaspiProduct({
                        ...tempKaspiProduct,
                        availabilities: deleteFilter,
                    });
                    setStoreListTemp(
                        storeListTemp.map(el =>
                            el.id === value.id
                                ? {
                                      ...el,
                                      checked: false,
                                  }
                                : el,
                        ),
                    );
                }

            default:
                break;
        }
    };

    const storeListForDropdown = storeList.map(item => {
        return {
            value: item.id,
            text: item.name,
        };
    });

    const isFieldEmpty = val => val === '' || val === null || val === undefined;

    const validation = item => {
        let newObj = {
            sku: item.sku,
            brand: item.brand,
            company: item.company,
            model: item.model,
        };

        let success = true;
        setErrors(() => {
            let tempObj = {};
            Object.entries(item).map(keyAndVal => {
                tempObj = {
                    ...tempObj,
                    [keyAndVal[0]]: isFieldEmpty(keyAndVal[1]),
                };
            });
            return tempObj;
        });

        const arr = Object.values(item);
        arr.map(val => {
            if (isFieldEmpty(val)) {
                success = false;
            }
        });

        //check array availabilities is empty or not
        if (item.availabilities.length < 1) {
            success = false;
            setEmptyStore(true);
        } else {
            setEmptyStore(false);
        }

        //check available is empty or not
        const avails = item.availabilities;
        avails.map(avail => {
            if (avail.available === '') {
                success = false;
                setEmptyAvail(true);
            } else {
                setEmptyAvail(false);
            }
        });

        return success;
    };

    const onClickSave = () => {
        if (validation(tempKaspiProduct)) {
            createKaspiProduct(tempKaspiProduct, () => {
                clearKaspiProducts();
                fetchKaspiProducts();
                close();
                window.location.reload();
            });
        }
    };

    // console.log("tempKaspiProduct",tempKaspiProduct);

    return (
        <Modal closeIcon open={open} onClose={close}>
            <Header content="Добавление" />
            <Modal.Content>
                <Form>
                    <Form.Field error={errors.sku}>
                        <label>ID</label>
                        <Input
                            type="text"
                            error={errors.sku}
                            onChange={(e, { value }) =>
                                onChangeAdd('sku', value)
                            }
                        />
                    </Form.Field>

                    <Form.Field error={errors.brand}>
                        <label>Бренд</label>
                        <Dropdown
                            options={brandListOptions}
                            selection
                            selectOnBlur={false}
                            type="text"
                            onChange={(e, { value }) =>
                                onChangeAdd('brand', value)
                            }
                        />
                    </Form.Field>

                    <Form.Field error={errors.company}>
                        <label>Компания</label>
                        <Dropdown
                            options={companyListOptions}
                            selection
                            selectOnBlur={false}
                            type="text"
                            onChange={(e, { value }) =>
                                onChangeAdd('company', value)
                            }
                        />
                    </Form.Field>

                    <Form.Field error={errors.model}>
                        <label>Модель</label>
                        <Input
                            type="text"
                            onChange={(e, { value }) =>
                                onChangeAdd('model', value)
                            }
                        />
                    </Form.Field>

                    <Form.Field error={errors.price}>
                        <label>Цена</label>
                        <Input
                            type="number"
                            onChange={(e, { value }) =>
                                onChangeAdd('price', value)
                            }
                        />
                    </Form.Field>
                    <Header content="Пункт выдачи" />
                    <Table>
                        <Table.Header>
                            <Table.Row>
                                <Table.HeaderCell></Table.HeaderCell>
                                <Table.HeaderCell>
                                    Пункт выдачи
                                    <h4
                                        style={{
                                            color: 'red',
                                            display: emptyStore
                                                ? 'block'
                                                : 'none',
                                        }}
                                    >
                                        Выберите пункт выдачи
                                    </h4>
                                </Table.HeaderCell>
                                <Table.HeaderCell>
                                    В наличии
                                    <h4
                                        style={{
                                            color: 'red',
                                            display: emptyAvail
                                                ? 'block'
                                                : 'none',
                                        }}
                                    >
                                        Выберите "есть" или "нет"
                                    </h4>
                                </Table.HeaderCell>
                            </Table.Row>
                        </Table.Header>
                        <Table.Body>
                            {storeListTemp.map((item, index) => (
                                <Table.Row key={index}>
                                    <Table.Cell>
                                        <Checkbox
                                            disabled={
                                                tempKaspiProduct.sku === ''
                                            }
                                            onChange={(e, { checked }) => {
                                                onChangeAdd(
                                                    'checked',
                                                    item,
                                                    checked,
                                                );
                                            }}
                                        />
                                    </Table.Cell>
                                    <Table.Cell>{item.name}</Table.Cell>
                                    <Table.Cell>
                                        <Dropdown
                                            disabled={!item.checked}
                                            selection
                                            selectOnBlur={false}
                                            options={availabilitiesOptions}
                                            // defaultValue={true}
                                            onChange={(e, { value }) =>
                                                onChangeAdd(
                                                    'available',
                                                    value,
                                                    item.id,
                                                )
                                            }
                                        />
                                    </Table.Cell>
                                </Table.Row>
                            ))}
                        </Table.Body>
                    </Table>
                </Form>
            </Modal.Content>
            <Modal.Actions>
                <Button color="red" onClick={close}>
                    <Icon name="remove" /> Отмена
                </Button>
                <Button color="green" onClick={() => onClickSave()}>
                    <Icon name="checkmark" />
                    Сохранить
                </Button>
            </Modal.Actions>
        </Modal>
    );
}
