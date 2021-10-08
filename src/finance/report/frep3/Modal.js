import React from 'react';
import ReactTableWrapper from '../../../utils/ReactTableWrapper';
import { Button, Modal, Icon } from 'semantic-ui-react';

const Detail = props => {
    const {
        messages = {},
        detail = [],
        setModalDetalOpen,
        modalDetalOpen,
        exportExcelDetail,
    } = props;
    const widthd = 450;

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
                    color="green"
                    className="alignTopBottom"
                    icon
                    disabled={detail.length == 0 ? true : false}
                    onClick={() => exportExcelDetail()}
                >
                    <Icon name="download" size="large" />
                    {messages['export_to_excel']}
                </Button>
            </Modal.Header>
            <Modal.Content>
                <ReactTableWrapper
                    data={detail ? detail : []}
                    filterable={true}
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
