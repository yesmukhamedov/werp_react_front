import React, { useState, useEffect } from 'react';
import { Segment, Checkbox, Dropdown, Button, Icon } from 'semantic-ui-react';
import ReactTableWrapper from '../../../utils/ReactTableWrapper';
import { LinkToSmcsEmpty } from '../../../utils/outlink';
import { connect } from 'react-redux';
import {
    fetchCasadaProducts,
    fetchStoreList,
    fetchBrandList,
} from '../../marketingAction';
import ModalAvailabilities from './components/casada/ModalAvailabilities';
import './style.css';

const Mrkaspi = props => {
    const {
        fetchCasadaProducts,
        casadaProducts,
        fetchStoreList,
        storeList,
        fetchBrandList,
        brandList,
    } = props;

    const [tempData, setTempData] = useState([]);
    const [rowID, setRowID] = useState('');
    const [modalAvailabilities, setModalAvailabilities] = useState(false);
    const [avails, setAvails] = useState([]);

    useEffect(() => {
        fetchCasadaProducts();
        fetchStoreList();
        fetchBrandList();
    }, []);

    useEffect(() => {
        if (casadaProducts.length > 0) {
            casadaProducts.map(item =>
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
    }, [casadaProducts]);

    const brandListOptions = Object.entries(brandList).map(item => {
        return {
            text: item[0],
            value: item[1],
        };
    });

    const getRowAvail = rowData => {
        tempData.map((item, idx) => {
            if (rowData.sku === item.sku) {
                setAvails(item.availabilities);
            }
        });
    };
    console.log('tempData', tempData);
    console.log('brandList', brandList);
    console.log('brandListOptions', brandListOptions);
    console.log('casadaProducts', casadaProducts);

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

    return (
        <div>
            <ModalAvailabilities
                casadaProducts={casadaProducts}
                open={modalAvailabilities}
                rowAvails={avails}
                tempData={tempData}
                storeList={storeList}
                closeModal={() => setModalAvailabilities(false)}
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
                        <Dropdown
                            selection
                            options={brandListOptions}
                            selectOnBlur={false}
                            // defaultValue={brandListOptions[0]}
                            style={{ marginRight: 4 }}
                        />
                        <Button color="teal">Export to XML</Button>
                        <Button color="green">
                            <Icon name="add" /> Добавить
                        </Button>
                    </div>
                </div>
            </Segment>
            <ReactTableWrapper data={tempData} columns={columns} />
        </div>
    );
};

function mapStateToProps(state) {
    return {
        casadaProducts: state.marketing.casadaProducts,
        storeList: state.marketing.storeList,
        brandList: state.marketing.brandList,
    };
}

export default connect(mapStateToProps, {
    fetchCasadaProducts,
    fetchStoreList,
    fetchBrandList,
})(Mrkaspi);
