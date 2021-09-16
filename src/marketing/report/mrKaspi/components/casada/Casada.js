import React, { useState, useEffect } from 'react';
import { Segment, Dropdown, Button, Icon } from 'semantic-ui-react';
import ReactTableWrapper from '../../../../../utils/ReactTableWrapper';
import ModalAvailabilities from './ModalAvailabilities';
// import { fetchCompanyListInKaspi } from '../../../marketingAction';

const Casada = props => {
    const { fetchCompanyListInKaspi } = props;

    // useEffect(() => {
    //     fetchCompanyListInKaspi();
    // }, []);

    const [modalAvailabilities, setModalAvailabilities] = useState(false);

    const availabilityOptions = [
        {
            key: 1,
            text: 'PP1',
            value: 1,
        },
        {
            key: 2,
            text: 'PP2',
            value: 2,
        },
        {
            key: 3,
            text: 'PP3',
            value: 3,
        },
    ];

    const [data, setData] = useState([
        {
            sku: 'CMK-321',
            brand: 'Casada',
            model: 'Quattromed 5',
            price: 230000,
            available: [
                {
                    available: 'yes',
                    storeId: 'PP1,',
                },
                {
                    available: 'no',
                    storeId: 'PP2,',
                },
            ],
        },
        {
            sku: 'CMK-323',
            brand: 'Casada',
            model: 'Quattromed 5',
            price: 260000,
            available: {
                available: 'yes',
                storeId: 'PP1',
            },
        },
        {
            sku: 'CR-102',
            brand: 'Casada',
            model: 'Reflexomed 2',
            price: 260000,
            availabilities: {
                available: 'no',
                storeId: 'PP1',
            },
        },
    ]);

    const availabilities = [
        {
            id: 1,
            name: 'PP1',
        },
        {
            id: 2,
            name: 'PP2',
        },
        {
            id: 3,
            name: 'PP3',
        },
        {
            id: 4,
            name: 'PP4',
        },
        {
            id: 5,
            name: 'PP5',
        },
        {
            id: 6,
            name: 'PP6',
        },
    ];

    const columns = [
        {
            Header: `SKU`,
            accessor: 'sku',

            Cell: original => (
                <div className="text-wrap" style={{ textAlign: 'center' }}>
                    {original.value}
                </div>
            ),
        },
        {
            Header: `Brand`,
            accessor: 'brand',

            Cell: row => (
                <div className="text-wrap" style={{ textAlign: 'center' }}>
                    {row.value}
                </div>
            ),
        },
        {
            Header: `Model`,
            accessor: 'model',

            Cell: row => (
                <div className="text-wrap" style={{ textAlign: 'center' }}>
                    {row.value}
                </div>
            ),
        },
        {
            Header: `Price`,
            accessor: 'price',
            Cell: row => (
                <div className="text-wrap" style={{ textAlign: 'center' }}>
                    {row.value}
                </div>
            ),
        },
        {
            Header: `availabilities`,
            Cell: () => (
                <Button onClick={() => setModalAvailabilities(true)}>
                    Пункты выдачи
                </Button>
            ),
        },
    ];

    return (
        <div>
            <ModalAvailabilities
                availabilities={availabilities}
                open={modalAvailabilities}
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
                        <Dropdown selection />
                        <Button color="teal">Export to XML</Button>
                        <Button color="green">
                            <Icon name="add" /> Добавить
                        </Button>
                    </div>
                </div>
            </Segment>
            <ReactTableWrapper data={data} columns={columns} />
        </div>
    );
};

export default Casada;
