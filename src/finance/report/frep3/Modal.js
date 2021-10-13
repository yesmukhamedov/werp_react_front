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

    const div = element => {
        return (
            <div className="text-wrap" style={{ textAlign: 'center' }}>
                {element}
            </div>
        );
    };

    const detalColumns = [
        {
            Header: messages['belnr'],
            accessor: 'belnr',
            checked: true,
            filterable: false,
            Cell: row => div(row.value),
        },
        {
            Header: messages['brnch'],
            accessor: 'branchName',
            checked: true,
            filterable: false,
            Cell: row => div(row.value),
        },
        {
            Header: messages['name'],
            accessor: 'hkontName',
            checked: true,
            filterable: false,
            Cell: row => div(row.value),
        },
        {
            Header: messages['hkont'],
            accessor: 'hkont',
            checked: true,
            filterable: false,
            Cell: row => div(row.value),
        },
        {
            Header: messages['waers'],
            accessor: 'waers',
            checked: true,
            filterable: false,
            Cell: row => div(row.value),
        },
        {
            Header: messages['amount'] + ' USD',
            accessor: 'dmbtr',
            checked: true,
            filterable: false,
            Cell: row => div(row.value ? row.value.toLocaleString() : ''),
        },
        {
            Header: messages['amount'] + ' в валюте',
            accessor: 'wrbtr',
            checked: true,
            filterable: false,
            Cell: row => div(row.value ? row.value.toLocaleString() : ''),
        },
        {
            Header: messages['customer'],
            accessor: 'customerName',
            checked: true,
            filterable: false,
            Cell: row => div(row.value),
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
