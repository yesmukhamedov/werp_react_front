import React, { useEffect, useState } from 'react';
import { Checkbox, Input, Button, Icon } from 'semantic-ui-react';
import ReactTableWrapper from '../../../utils/ReactTableWrapper';
import Create from './Create';
import { Route, Link } from 'react-router-dom';
import '../style.css';
import { doGet, doPost, doPut, doDelete } from '../../../utils/apiActions';
const Inbox = props => {
    const {
        getInboxMessages,
        clearInboxMessages,
        inboxMessages,
        getUnreadMessagesCount,
        toggleMarkMessage,
        getchOneMessage,
        oneMessage,
    } = props;

    const [inboxList, setInboxList] = useState([]);
    const [selectedItems, setSelectedItems] = useState([]);

    useEffect(() => {
        clearInboxMessages();
        getInboxMessages();
        getUnreadMessagesCount();
        getchOneMessage(29349);
    }, []);

    console.log('inboxList', inboxList);

    useEffect(() => {
        if (inboxMessages.length > 0) {
            setInboxList(
                inboxMessages.map(item => {
                    return {
                        date: item.date,
                        from: item.from,
                        isRead: item.isRead,
                        messageId: item.messageId,
                        title: item.title,
                        checked: false,
                    };
                }),
            );
        }
    }, [inboxMessages]);

    const handleCheckbox = (rowData, event) => {
        if (event) {
            setInboxList(
                inboxList.map(item =>
                    item.messageId === rowData.messageId
                        ? {
                              ...item,
                              checked: true,
                          }
                        : item,
                ),
            );
            setSelectedItems([...selectedItems, rowData.messageId]);
        } else {
            setInboxList(
                inboxList.map(item =>
                    item.messageId === rowData.messageId
                        ? {
                              ...item,
                              checked: false,
                          }
                        : item,
                ),
            );
            setSelectedItems(
                selectedItems.filter(item => item !== rowData.messageId),
            );
        }
    };

    const markRead = () => {
        toggleMarkMessage(false, selectedItems, () => {
            selectedItems.forEach(messageId => {
                setInboxList(prev => {
                    let tempData = prev;
                    tempData = tempData.map(item =>
                        item.messageId == messageId
                            ? {
                                  ...item,
                                  isRead: false,
                              }
                            : item,
                    );
                    return tempData;
                });
            }, getUnreadMessagesCount());
        });
    };

    const markUnread = () => {
        toggleMarkMessage(true, selectedItems, () => {
            selectedItems.forEach(messageId => {
                setInboxList(prev => {
                    let tempData = prev;
                    tempData = tempData.map(item =>
                        item.messageId == messageId
                            ? {
                                  ...item,
                                  isRead: true,
                              }
                            : item,
                    );
                    return tempData;
                });
            }, getUnreadMessagesCount());
        });
    };

    const columns = [
        {
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
            Header: 'От кого',
            accessor: 'from',
            filterable: true,
            width: 300,
            Cell: rowInfo => {
                return (
                    <div
                        style={{
                            fontWeight:
                                rowInfo.row._original.isRead == true
                                    ? 'bold'
                                    : null,
                        }}
                    >
                        {rowInfo.row._original.from}
                    </div>
                );
            },
        },
        {
            Header: 'Зоголовок',
            accessor: 'title',
            filterable: true,
            Cell: rowInfo => {
                return (
                    <div
                        style={{
                            fontWeight:
                                rowInfo.row._original.isRead == true
                                    ? 'bold'
                                    : null,
                        }}
                    >
                        {rowInfo.row._original.title}
                    </div>
                );
            },
        },
        {
            Header: 'Дата',
            accessor: 'date',
            filterable: true,
            width: 100,
            Cell: rowInfo => {
                return (
                    <div
                        style={{
                            fontWeight:
                                rowInfo.row._original.isRead == true
                                    ? 'bold'
                                    : null,
                        }}
                    >
                        {rowInfo.row._original.date}
                    </div>
                );
            },
        },
        {
            Header: '',
            accessor: 'id',
            filterable: false,
            Cell: ({ value }) => (
                <Link to="/dit/message" exact>
                    <Icon name="search" color="blue" />
                </Link>
            ),
        },
    ];

    const getTrProps = (state, rowInfo) => ({
        onClick: () => {
            // console.log(rowInfo)
            return (
                <Link target="_blank" className="ui icon button mini" to="" />
            );
        },
    });

    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <div>
                    <Button color="teal">Выделить все</Button>
                </div>
                <div>
                    <Button
                        color="teal"
                        onClick={() => {
                            markUnread();
                        }}
                    >
                        Пометить непрочитанным
                    </Button>
                    <Button
                        color="teal"
                        onClick={() => {
                            markRead();
                        }}
                    >
                        Пометить прочитанным
                    </Button>
                    <Button color="teal">Удалить</Button>
                </div>
            </div>

            <ReactTableWrapper
                style={{ marginTop: 10 }}
                columns={columns}
                data={inboxList}
                defaultPageSize={50}
                showPagination={true}
                getTrProps={(state, rowInfo) => getTrProps(state, rowInfo)}
            />
        </div>
    );
};

export default Inbox;
