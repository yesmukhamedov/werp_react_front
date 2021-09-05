import React, { useState } from 'react';
import { Segment, Checkbox, Dropdown, Button, Icon } from 'semantic-ui-react';
import ReactTableWrapper from '../../../utils/ReactTableWrapper';
import ModalAviabilities from './componets/ModalAviabilities';
import { LinkToSmcsEmpty } from '../../../utils/outlink';

const Mrkaspi = props => {
    const {} = props;

    const [modalAvialibities, setModalAvialibities] = useState(false);

    const aviabilitiOptions = [
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

    const aviabilities = [
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

            Cell: row => (
                <div className="text-wrap" style={{ textAlign: 'center' }}>
                    {row.value}
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
            Header: `Aviabilities`,
            Cell: () => (
                <Button onClick={() => setModalAvialibities(true)}>
                    Пункты выдачи
                </Button>
            ),
        },
    ];

    return (
        <div>
            <ModalAviabilities
                aviabilities={aviabilities}
                open={modalAvialibities}
                closeModal={() => setModalAvialibities(false)}
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

export default Mrkaspi;
