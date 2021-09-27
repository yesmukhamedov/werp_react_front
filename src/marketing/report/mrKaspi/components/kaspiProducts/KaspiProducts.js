import React, { useState, useEffect } from 'react';
import {
    Segment,
    Checkbox,
    Popup,
    Dropdown,
    Button,
    Icon,
    Input,
} from 'semantic-ui-react';
import ReactTableWrapper from '../../../../../utils/ReactTableWrapper';
import ModalAvailabilities from './ModalAvailabilities';
import ModalAddProduct from './ModalAddProduct';
import '../../style.css';

const KaspiProducts = props => {
    const {
        fetchKaspiProducts,
        clearKaspiProducts,
        createKaspiProduct,
        updateKaspiProduct,
        kaspiProducts,
        fetchStoreList,
        storeList,
        clearStoreList,
        fetchKaspiBrands,
        brandList,
        fetchKaspiCompanies,
        companyList,
        deleteProduct,
    } = props;

    const [tempData, setTempData] = useState([]);
    const [modalAvailabilities, setModalAvailabilities] = useState(false);
    const [openModal, setOpenModal] = useState(false);
    const [avails, setAvails] = useState([]);
    const [rowData, setRowData] = useState([]);

    useEffect(() => {
        fetchKaspiProducts();
        clearKaspiProducts();
        fetchStoreList();
        clearStoreList();
        fetchKaspiBrands();
        fetchKaspiCompanies();
    }, []);

    useEffect(() => {
        if (kaspiProducts.length > 0) {
            kaspiProducts.map(item =>
                setTempData(prev => {
                    return [
                        ...prev,
                        {
                            brand: item.brand,
                            company: item.company,
                            model: item.model,
                            price: item.price,
                            sku: item.sku,
                            edit: false,
                            availabilities: item.availabilities.map(
                                itemAvailable => {
                                    return {
                                        available: itemAvailable.available,
                                        sku: itemAvailable.sku,
                                        storeId: itemAvailable.storeId,
                                    };
                                },
                            ),
                        },
                    ];
                }),
            );
        } else {
            setTempData([]);
        }
    }, [kaspiProducts]);

    const brandListOptions = Object.entries(brandList).map(item => {
        return {
            text: item[1],
            value: item[0],
        };
    });

    const companyListOptions = Object.entries(companyList).map(item => {
        return {
            text: item[1],
            value: item[0],
        };
    });

    const getRowAvail = rowData => {
        tempData.map((item, idx) => {
            if (rowData.sku === item.sku) {
                setAvails(item.availabilities);
                setRowData(item);
            }
        });
    };

    const onClickDelete = id => {
        deleteProduct(id, () => {
            fetchKaspiProducts();
            clearKaspiProducts();
        });
    };

    const onClickEdit = rowData => {
        console.log(rowData);
        setTempData(
            tempData.map(item => {
                return item.sku === rowData.sku
                    ? { ...item, edit: true }
                    : item;
            }),
        );
    };

    const cellInput = (fieldName, data) => {
        // console.log(fieldName);
        // console.log(data);

        switch (fieldName) {
            case 'brand':
                return data.edit ? (
                    <Dropdown
                        options={brandListOptions}
                        selection
                        value={data.brand}
                        // onChange={(e, { value }) =>
                        //     onChangeInput('nameEn', original, value)
                        // }
                    />
                ) : (
                    <div>{data.brand}</div>
                );
            case 'company':
                return data.edit ? (
                    <Dropdown
                        options={companyListOptions}
                        selection
                        value={data.company}
                        // onChange={(e, { value }) =>
                        //     onChangeInput('nameEn', original, value)
                        // }
                    />
                ) : (
                    <div>{data.company}</div>
                );
            case 'model':
                return data.edit ? (
                    <Input
                        value={data.model}
                        // onChange={(e, { value }) =>
                        //     onChangeInput('nameEn', original, value)
                        // }
                    />
                ) : (
                    <div>{data.model}</div>
                );
            case 'price':
                return data.edit ? (
                    <Input
                        value={data.price}
                        // onChange={(e, { value }) =>
                        //     onChangeInput('nameEn', original, value)
                        // }
                    />
                ) : (
                    <div>{data.price}</div>
                );

            default:
                break;
        }
    };

    const columns = [
        {
            Header: 'SKU',
            accessor: 'sku',
            filterable: true,
            Cell: ({ original }) => <div>{original.sku}</div>,
        },
        {
            Header: 'Бренд',
            accessor: 'brand',
            filterable: true,
            Cell: ({ original }) => cellInput('brand', original),
        },
        {
            Header: 'Компания',
            accessor: 'company',
            filterable: true,
            Cell: ({ original }) => cellInput('company', original),
        },
        {
            Header: 'Модель',
            accessor: 'model',
            filterable: true,
            Cell: ({ original }) => cellInput('model', original),
        },
        {
            Header: 'Цена',
            accessor: 'price',
            filterable: true,
            Cell: ({ original }) => cellInput('price', original),
        },
        {
            Header: 'Доступность',
            Cell: original => (
                <Button
                    onClick={() => {
                        setModalAvailabilities(true);
                        getRowAvail(original.row);
                    }}
                >
                    Пункты выдачи
                </Button>
            ),
        },
        {
            filterable: false,
            Cell: ({ original }) => (
                <div style={{ textAlign: 'center' }}>
                    <Popup
                        content="Редактировать"
                        trigger={
                            original.edit ? (
                                <Button icon="save" circular color="blue" />
                            ) : (
                                <Button
                                    icon="pencil"
                                    circular
                                    color="yellow"
                                    onClick={() => onClickEdit(original)}
                                />
                            )
                        }
                    />
                    <Popup
                        content="Удалить"
                        trigger={
                            <Button
                                icon="remove"
                                circular
                                color="red"
                                onClick={() => {
                                    const confirmBox = window.confirm(
                                        `Вы точно хотите удалить товар "${original.sku}" ?`,
                                    );
                                    if (confirmBox == true) {
                                        onClickDelete(original.sku);
                                    }
                                }}
                            />
                        }
                    />
                </div>
            ),
        },
    ];

    const availabilitiesOptions = [
        {
            key: '',
            text: '',
            value: '',
        },
        {
            key: true,
            text: 'есть',
            value: true,
        },
        {
            key: false,
            text: 'нет',
            value: false,
        },
    ];

    return (
        <div>
            <ModalAddProduct
                open={openModal}
                close={() => setOpenModal(false)}
                storeList={storeList}
                createKaspiProduct={createKaspiProduct}
                clearKaspiProducts={clearKaspiProducts}
                fetchKaspiProducts={fetchKaspiProducts}
                availabilitiesOptions={availabilitiesOptions}
                brandListOptions={brandListOptions}
                companyListOptions={companyListOptions}
            />
            <ModalAvailabilities
                open={modalAvailabilities}
                close={() => setModalAvailabilities(false)}
                kaspiProducts={kaspiProducts}
                updateKaspiProduct={updateKaspiProduct}
                clearKaspiProducts={clearKaspiProducts}
                fetchKaspiProducts={fetchKaspiProducts}
                rowAvails={avails}
                tempData={tempData}
                storeList={storeList}
                availabilitiesOptions={availabilitiesOptions}
                rowData={rowData}
                save={data => {
                    console.log('DATA', data);
                }}
            />
            <Segment>
                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                    }}
                >
                    <h3>Список товаров kaspi.kz</h3>
                    <div>
                        <Button color="teal">Export to XML</Button>
                        <Button
                            color="green"
                            onClick={() => setOpenModal(true)}
                        >
                            <Icon name="add" /> Добавить
                        </Button>
                    </div>
                </div>
            </Segment>
            <ReactTableWrapper data={tempData} columns={columns} />
        </div>
    );
};

export default KaspiProducts;
