import React from 'react';
import ReactTableWrapper from '../../../../utils/ReactTableWrapper';
import { moneyFormat } from '../../../../utils/helpers';
import { Button, Popup, Label } from 'semantic-ui-react';

const Table = props => {
    const { messages, data = [], approve, reject } = props;

    const columns = [
        {
            Header: 'ID',
            accessor: 'id',
            Cell: row => (
                <div className="text-wrap" style={{ textAlign: 'center' }}>
                    {row.value}
                </div>
            ),
            width: 50,
        },
        {
            Header: () => (
                <div className="text-wrap">
                    {messages['L__CONTRACT_NUMBER']}
                </div>
            ),
            accessor: 'contractNumber',
            Cell: row => {
                return (
                    <div className="text-wrap" style={{ textAlign: 'center' }}>
                        {row.value}
                    </div>
                );
            },
        },
        {
            Header: messages['L__COMPANY'],
            accessor: 'companyName',
            Cell: row => (
                <div className="text-wrap" style={{ textAlign: 'center' }}>
                    {row.value}
                </div>
            ),
        },
        {
            Header: messages['country'],
            accessor: 'countryName',
            Cell: row => {
                return (
                    <div className="text-wrap" style={{ textAlign: 'center' }}>
                        {row.value}
                    </div>
                );
            },
        },
        {
            Header: messages['L__BRANCH'],
            accessor: 'branchName',
            Cell: row => {
                return (
                    <div className="text-wrap" style={{ textAlign: 'center' }}>
                        {row.value}
                    </div>
                );
            },
        },
        {
            Header: () => <div className="text-wrap">Дата и время</div>,
            accessor: 'collectDateTime',
            Cell: row => {
                return (
                    <div className="text-wrap" style={{ textAlign: 'center' }}>
                        {row.value}
                    </div>
                );
            },
        },
        {
            Header: 'Фин. агент',
            accessor: 'collectorFIO',
            Cell: row => {
                return (
                    <div className="text-wrap" style={{ textAlign: 'center' }}>
                        {row.value}
                    </div>
                );
            },
        },
        {
            Header: messages['L__STATUS'],
            accessor: 'statusName',
            Cell: row => {
                return (
                    <div className="text-wrap" style={{ textAlign: 'center' }}>
                        {row.value}
                    </div>
                );
            },
        },
        {
            Header: messages['Table.PhoneNumber'],
            accessor: 'phoneNumber',
            Cell: row => {
                return (
                    <div className="text-wrap" style={{ textAlign: 'center' }}>
                        {row.value}
                    </div>
                );
            },
        },
        {
            Header: () => (
                <div className="text-wrap">{messages['payment_method']}</div>
            ),
            accessor: 'paymentMethodName',
            Cell: row => {
                return (
                    <div className="text-wrap" style={{ textAlign: 'center' }}>
                        {row.value}
                    </div>
                );
            },
        },

        {
            Header: messages['TBL_H__AMOUNT'],
            accessor: 'collectMoney',
            Cell: row => {
                return (
                    <div className="text-wrap" style={{ textAlign: 'center' }}>
                        {moneyFormat(row.value)}
                    </div>
                );
            },
        },
        {
            Header: messages['waers'],
            accessor: 'collectMoneyWears',
            Cell: row => {
                return (
                    <div className="text-wrap" style={{ textAlign: 'center' }}>
                        {row.value}
                    </div>
                );
            },
            width: 70,
        },
        {
            Header: 'Банк',
            accessor: 'bankName',
            Cell: row => {
                return (
                    <div className="text-wrap" style={{ textAlign: 'center' }}>
                        {row.value}
                    </div>
                );
            },
        },
        {
            Header: 'Действие',
            Cell: ({ original }) => {
                return (
                    <div className="text-wrap" style={{ textAlign: 'center' }}>
                        {original.statusId === 3 ? (
                            <Label color="green">{original.statusName}</Label>
                        ) : original.statusId === 4 ? (
                            <Label color="red">{original.statusName}</Label>
                        ) : (
                            <div>
                                <Popup
                                    content="Принять"
                                    trigger={
                                        <Button
                                            color="green"
                                            circular
                                            icon="check"
                                            onClick={() => approve(original.id)}
                                        />
                                    }
                                />
                                <Popup
                                    content="Отклонить"
                                    trigger={
                                        <Button
                                            color="red"
                                            circular
                                            icon="x"
                                            onClick={() => reject(original)}
                                        />
                                    }
                                />
                            </div>
                        )}
                    </div>
                );
            },
        },
    ];
    return (
        <div>
            <ReactTableWrapper
                data={data}
                columns={columns}
                defaultPageSize={20}
                pageSize={20}
                showPagination={true}
            />
        </div>
    );
};
export default Table;
