import React, { useEffect, useState } from 'react';
import { Checkbox, Input } from 'semantic-ui-react';
import ReactTableWrapper from '../../../utils/ReactTableWrapper';
import '../style.css';

const Sent = props => {
    const { getSentMessages, clearSentMessages, sentMessages } = props;

    const [sentList, setSentList] = useState([]);

    useEffect(() => {
        clearSentMessages();
        getSentMessages();
    }, []);

    // console.log("sentMessages",sentMessages)

    useEffect(() => {
        if (sentMessages.length > 0) {
            setSentList(
                sentMessages.map(item => {
                    return {
                        date: item.date,
                        sendTo: item.sendTo,
                        isRead: item.isRead,
                        messageId: item.messageId,
                        title: item.title,
                        checked: false,
                    };
                }),
            );
        }
    }, [sentMessages]);

    const handleCheckbox = (rowData, event) => {
        if (event) {
            setSentList(
                sentList.map(item =>
                    item.messageId === rowData.messageId
                        ? {
                              ...item,
                              checked: true,
                          }
                        : item,
                ),
            );
        } else {
            setSentList(
                sentList.map(item =>
                    item.messageId === rowData.messageId
                        ? {
                              ...item,
                              checked: false,
                          }
                        : item,
                ),
            );
        }
    };

    const columns = [
        {
            accessor: 'acces',
            filterable: false,
            width: 50,
            Cell: ({ original }) => {
                return (
                    <input
                        checked={original.checked}
                        type="checkbox"
                        onChange={e =>
                            handleCheckbox(original, e.currentTarget.checked)
                        }
                    />
                );
            },
        },
        {
            Header: 'Кому',
            accessor: 'sendTo',
            filterable: true,
            width: 300,
        },
        {
            Header: 'Зоголовок',
            accessor: 'title',
            filterable: true,
        },
        {
            Header: 'Дата',
            accessor: 'date',
            filterable: true,
            width: 100,
        },
    ];

    return (
        <div>
            <ReactTableWrapper
                columns={columns}
                data={sentList}
                defaultPageSize={50}
                showPagination={true}
            />
        </div>
    );
};

export default Sent;
