import React from 'react';
import { injectIntl } from 'react-intl';
import ReactTableWrapper from '../../../../../utils/ReactTableWrapper';
import TextAlignCenter from '../../../../../utils/TextAlignCenter';

const LogisticsRateTable = ({ data, intl: { messages } }) => {
    const columns = [
        {
            Header: 'id',
            accessor: 'id',
            Cell: row => <TextAlignCenter text={row.value} />,
            filterAll: true,
        },
        {
            Header: messages['TBL_H__DATE'],
            accessor: 'dateOpen',
            Cell: row => <TextAlignCenter text={row.value} />,
            filterAll: true,
        },
        {
            Header: 'percentAmount',
            accessor: 'percentAmount',
            Cell: row => <TextAlignCenter text={row.value} />,
            filterAll: true,
        },
    ];

    return (
        <ReactTableWrapper
            data={data}
            columns={columns}
            defaultPageSize={5}
            className="-striped -highlight"
            showPagination={true}
        />
    );
};

export default injectIntl(LogisticsRateTable);
