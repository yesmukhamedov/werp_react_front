import React, { useState, useEffect } from 'react';
import ReactTableWrapper from '../../../utils/ReactTableWrapper';
import { Popup, Button, Modal } from 'semantic-ui-react';
import Frep3 from './index';

const Modal = props => {
    const { messages = {}, detail = [] } = props;
    const widthd = 250;

    const emptyParam = {
        countryId: null,
        bukrs: null,
        branchId: null,
        categoryId: null,
        product: null,
        dateAt: null,
        dateTo: null,
    };

    const mainHeaderStyle = {
        whiteSpace: 'pre-wrap',
        background: '#fff',
        border: '1px solid #fff',
        color: '#2185d0',
    };
    const [param, setParam] = useState({ ...emptyParam });
    //const [modalDetalOpen, setModalDetalOpen] = useState(false);
    const [loaderTableDetal, setLoaderTableDetal] = useState(false);

    const [detailParam, setDetailParam] = useState({});

    useEffect(() => {
        if (Object.keys(detailParam).length > 0) {
            setLoaderTableDetal(true);
            props.fetchSrkpisoDetal(
                { ...detailParam, dateAt: param.dateAt, dateTo: param.dateTo },
                () => setLoaderTableDetal(false),
            );
        }
    }, [detailParam]);

    const detalColumns = [
        {
            Header: messages['belnr'],
            accessor: 'belnr',
            checked: true,
            Cell: row => (
                <div className="text-wrap" style={{ textAlign: 'center' }}>
                    {row.value}
                </div>
            ),
            filterable: false,
            width: widthd,
        },
        {
            Header: '2021',
            accessor: 'gjahr',
            checked: true,
            Cell: row => (
                <div className="text-wrap" style={{ textAlign: 'center' }}>
                    {row.value}
                </div>
            ),
            filterable: false,
            width: widthd,
        },
        {
            Header: messages['bukrs'],
            accessor: 'bukrs',
            checked: true,
            Cell: row => (
                <div className="text-wrap" style={{ textAlign: 'center' }}>
                    {row.value}
                </div>
            ),
            filterable: false,
            width: widthd,
        },
        {
            Header: messages['branches'],
            accessor: 'branchName',
            checked: true,
            Cell: row => (
                <div className="text-wrap" style={{ textAlign: 'center' }}>
                    {row.value}
                </div>
            ),
            filterable: false,
            width: widthd,
        },
        {
            Header: messages['customer'],
            accessor: 'customerName',
            checked: true,
            Cell: row => (
                <div className="text-wrap" style={{ textAlign: 'center' }}>
                    {row.value}
                </div>
            ),
            filterable: false,
            width: widthd,
        },
        {
            Header: messages['waers'],
            accessor: 'waers',
            checked: true,
            Cell: row => (
                <div className="text-wrap" style={{ textAlign: 'center' }}>
                    {row.value}
                </div>
            ),
            filterable: false,
            width: widthd,
        },
        {
            Header: messages['hkont'],
            accessor: 'hkont',
            checked: true,
            Cell: row => (
                <div className="text-wrap" style={{ textAlign: 'center' }}>
                    {row.value}
                </div>
            ),
            filterable: false,
            width: widthd,
        },
        {
            Header: messages['amount'] + ' USD',
            accessor: 'dmbtr',
            checked: true,
            Cell: row => (
                <div className="text-wrap" style={{ textAlign: 'center' }}>
                    {row.value}
                </div>
            ),
            filterable: false,
            width: widthd,
        },
        {
            Header: messages['amount'] + ' в валюте',
            accessor: 'wrbtr',
            checked: true,
            Cell: row => (
                <div className="text-wrap" style={{ textAlign: 'center' }}>
                    {row.value}
                </div>
            ),
            filterable: false,
            width: widthd,
        },
        {
            Header: 'Название ' + messages['hkont'],
            accessor: 'hkontName',
            checked: true,
            Cell: row => (
                <div className="text-wrap" style={{ textAlign: 'center' }}>
                    {row.value}
                </div>
            ),
            filterable: false,
            width: widthd,
        },
    ];

    return (
        <Modal
            closeIcon
            onClose={() => Frep3.setModalDetalOpen(false)}
            open={Frep3.modalDetalOpen}
            size="fullscreen"
        >
            <Modal.Header>{`${messages['KPI_Operator_Service']}(${messages['Detailing']})`}</Modal.Header>
            <Modal.Content>
                <ReactTableWrapper
                    data={detail ? detail : []}
                    filterable={true}
                    loading={loaderTableDetal}
                    defaultPageSize={10}
                    showPagination={true}
                    columns={detalColumns}
                />
            </Modal.Content>
            <Modal.Actions>
                <Button
                    color="blue"
                    onClick={() => Frep3.setModalDetalOpen(false)}
                >
                    Ok
                </Button>
            </Modal.Actions>
        </Modal>
    );
};

export default Modal;
