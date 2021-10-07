import React, { useState, useEffect } from 'react';
import ReactTableWrapper from '../../../utils/ReactTableWrapper';
import { Popup, Button, Modal, Icon } from 'semantic-ui-react';
import { excelDownload } from '../../../utils/helpers';

const Detail = props => {
    const {
        messages = {},
        detail = [],
        setModalDetalOpen,
        modalDetalOpen,
    } = props;
    const widthd = 250;

    // const [loaderTableDetal, setLoaderTableDetal] = useState(false);

    // const [detalParam, setDetalParam] = useState({});

    // useEffect(() => {
    //   if (Object.keys(detalParam).length > 0) {
    //     setLoaderTableDetal(true);
    //     props.fetchSrkpisoDetal(
    //       { ...detalParam, dateAt: param.dateAt, dateTo: param.dateTo },
    //       () => setLoaderTableDetal(false),
    //     );
    //   }
    // }, [detalParam]);

    const exportExcel = () => {
        let excelHeaders = [];
        excelHeaders.push(messages['branches']);
        excelHeaders.push(messages['hkont']);
        excelHeaders.push(messages['waers']);
        excelHeaders.push(messages['amount'] + 'USD');
        excelHeaders.push(messages['operator_award']);

        excelDownload(
            'finance/report/frep3/downloadExcel/detail',
            'frep3_Detail_Result.xls',
            'outputTable',
            detail,
            excelHeaders,
        );
    };

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
            onClose={() => setModalDetalOpen(false)}
            open={modalDetalOpen}
            size="fullscreen"
        >
            <Modal.Header>
                {`${messages['transNameFrep3']}(${messages['Detailing']})`}
                <Button
                    //floated="right"
                    //marginRight='50'
                    color="green"
                    className="alignTopBottom"
                    icon
                    disabled={detail.length == 0 ? true : false}
                    onClick={() => exportExcel()}
                >
                    <Icon name="download" size="large" />
                    {messages['export_to_excel']}
                </Button>
            </Modal.Header>
            <Modal.Content>
                <ReactTableWrapper
                    data={detail ? detail : []}
                    filterable={true}
                    //loading={loaderTableDetal}
                    defaultPageSize={20}
                    showPagination={true}
                    columns={detalColumns}
                />
            </Modal.Content>
            <Modal.Actions>
                <Button color="blue" onClick={() => setModalDetalOpen(false)}>
                    Ok
                </Button>
            </Modal.Actions>
        </Modal>
    );
};

export default Detail;
