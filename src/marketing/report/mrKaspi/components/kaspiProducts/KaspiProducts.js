import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Segment, Checkbox, Dropdown, Button, Icon } from 'semantic-ui-react';
import ReactTableWrapper from '../../../../../utils/ReactTableWrapper';
import {
    fetchKaspiProducts,
    fetchStoreList,
    fetchBrandList,
} from '../../../../marketingAction';
import ModalAvailabilities from './ModalAvailabilities';
import ModalAdd from './ModalAdd';
import '../../style.css';

const KaspiProducts = props => {
    const {
        fetchKaspiProducts,
        clearKaspiProducts,
        kaspiProducts,
        fetchStoreList,
        storeList,
    } = props;

    const [tempData, setTempData] = useState([]);
    const [modalAvailabilities, setModalAvailabilities] = useState(false);
    const [modalAdd, setModalAdd] = useState(false);
    const [avails, setAvails] = useState([]);

    useEffect(() => {
        clearKaspiProducts();
        fetchKaspiProducts();
        // fetchStoreList();
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

    console.log('TEMP_DATA', tempData);

    /*  const brandListOptions = Object.entries(brandList).map(item => {
        return {
            text: item[0],
            value: item[1],
        };
    }); */

    const getRowAvail = rowData => {
        tempData.map((item, idx) => {
            if (rowData.sku === item.sku) {
                setAvails(item.availabilities);
            }
        });
    };

    const columns = [
        {
            Header: 'ID',
            accessor: 'sku',
            filterable: true,
            Cell: original => <div>{original.value}</div>,
        },
        {
            Header: 'Бренд',
            accessor: 'brand',
            filterable: true,
            Cell: original => <div>{original.value}</div>,
        },
        {
            Header: 'Компания',
            accessor: 'company',
            filterable: true,
            Cell: original => <div>{original.value}</div>,
        },
        {
            Header: 'Модель',
            accessor: 'model',
            filterable: true,
            Cell: original => <div>{original.value}</div>,
        },
        {
            Header: 'Цена',
            accessor: 'price',
            filterable: true,
            Cell: original => <div>{original.value}</div>,
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
            <ModalAdd
                open={modalAdd}
                close={() => setModalAdd(false)}
                storeList={storeList}
                availabilitiesOptions={availabilitiesOptions}
            />
            <ModalAvailabilities
                open={modalAvailabilities}
                close={() => setModalAvailabilities(false)}
                kaspiProducts={kaspiProducts}
                rowAvails={avails}
                tempData={tempData}
                storeList={storeList}
                availabilitiesOptions={availabilitiesOptions}
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
                        {/* <Dropdown
                            selection
                            options={brandListOptions}
                            selectOnBlur={false}
                            style={{ marginRight: 4 }}
                        /> */}
                        <Button color="teal">Export to XML</Button>
                        <Button color="green" onClick={() => setModalAdd(true)}>
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
