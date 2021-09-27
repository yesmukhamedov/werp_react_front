import React, { useState, useEffect } from 'react';
import {
    Segment,
    Checkbox,
    Dropdown,
    Input,
    Button,
    Icon,
    Popup,
} from 'semantic-ui-react';
import ReactTableWrapper from '../../../../../utils/ReactTableWrapper';
import ModalAddStore from './ModalAddStore';
import '../../style.css';

const KaspiStore = props => {
    const {
        fetchStoreList,
        clearStoreList,
        creatStore,
        updateStore,
        storeList,
        deleteStore,
    } = props;

    const [tempStoreList, setTempStoreList] = useState([]);
    const [openModal, setOpenModal] = useState(false);
    const [errors, setErrors] = useState([]);

    useEffect(() => {
        clearStoreList();
        fetchStoreList();
    }, []);

    useEffect(() => {
        if (storeList.length > 0) {
            storeList.map(item => {
                setTempStoreList(prev => {
                    return [
                        ...prev,
                        {
                            id: item.id,
                            name: item.name,
                            edit: false,
                        },
                    ];
                });
            });
        } else {
            setTempStoreList([]);
        }
    }, [storeList]);

    const isFieldEmpty = val => val === '' || val === null || val === undefined;

    const validation = item => {
        let success = true;
        setErrors(() => {
            let tempObj = {};
            Object.entries(item).map(keyAndVal => {
                tempObj = {
                    ...errors,
                    [item.id]: {
                        ...item,
                        [keyAndVal[0]]: isFieldEmpty(keyAndVal[1]),
                    },
                };
            });

            return tempObj;
        });

        const arr = Object.values(item);
        arr.map(val => {
            if (isFieldEmpty(val)) {
                success = false;
            }
        });
        return success;
    };

    const onClickDelete = id => {
        // setTempStoreList(tempStoreList.filter(item => item.id !== id));
        deleteStore(id, () => {
            clearStoreList();
            fetchStoreList();
        });
    };

    const onClickEdit = id => {
        setTempStoreList(
            tempStoreList.map(item => {
                return item.id === id
                    ? {
                          ...item,
                          edit: true,
                      }
                    : item;
            }),
        );
    };

    const onClickSave = id => {
        tempStoreList.map(item => {
            if (item.id === id) {
                if (validation(item)) {
                    updateStore(
                        {
                            id: item.id,
                            name: item.name,
                        },
                        () => {
                            clearStoreList();
                            fetchStoreList();
                        },
                    );
                }
            }
        });
    };

    const onChangeInput = (fieldName, data, value) => {
        setTempStoreList(
            tempStoreList.map(item => {
                if (item.id === data.id) {
                    switch (fieldName) {
                        case 'id':
                            return { ...item, id: value };
                        case 'name':
                            return { ...item, name: value };
                        default:
                            break;
                    }
                } else {
                    return { ...item };
                }
            }),
        );
    };

    const setRedLine = (original, fieldName) => {
        var redLine = false;
        Object.values(errors).map(item => {
            if (item.name === original.name) {
                switch (fieldName) {
                    case 'name':
                        if (item['name'] === '' || item['name'] === undefined) {
                            redLine = true;
                        }
                        break;

                    default:
                        break;
                }
            }
        });
        return redLine;
    };

    const cellInput = (fieldName, original) => {
        switch (fieldName) {
            case 'name':
                return original.edit ? (
                    <Input
                        label={Object.values(errors).map(item =>
                            item.name === original.name
                                ? item.name === '' || item.name === undefined
                                    ? 'Заполните поля'
                                    : null
                                : null,
                        )}
                        error={setRedLine(original, 'name')}
                        value={original.name}
                        onChange={(e, { value }) =>
                            onChangeInput('name', original, value)
                        }
                    />
                ) : (
                    <div>{original.name}</div>
                );
            default:
                break;
        }
    };

    const columns = [
        {
            Header: 'ID',
            accessor: 'id',
            filterable: true,
            width: 200,
            Cell: ({ original }) => <div>{original.id}</div>,
        },
        {
            Header: 'Название',
            accessor: 'name',
            filterable: true,
            Cell: ({ original }) => cellInput('name', original),
        },
        {
            filterable: false,
            Cell: ({ original }) => (
                <div style={{ textAlign: 'center' }}>
                    <Popup
                        content="Редактировать"
                        trigger={
                            original.edit ? (
                                <Button
                                    icon="save"
                                    circular
                                    color="blue"
                                    onClick={() => onClickSave(original.id)}
                                />
                            ) : (
                                <Button
                                    icon="pencil"
                                    circular
                                    color="yellow"
                                    onClick={() => onClickEdit(original.id)}
                                />
                            )
                        }
                    />
                    <Popup
                        content="Удалить"
                        trigger={
                            <Button
                                icon="remove"
                                circular
                                color="red"
                                onClick={() => {
                                    const confirmBox = window.confirm(
                                        'Вы точно хотите удалить?',
                                    );
                                    if (confirmBox == true) {
                                        onClickDelete(original.id);
                                    }
                                }}
                            />
                        }
                    />
                </div>
            ),
        },
    ];

    return (
        <div>
            <ModalAddStore
                open={openModal}
                close={() => setOpenModal(false)}
                fetchStoreList={fetchStoreList}
                creatStore={creatStore}
                clearStoreList={clearStoreList}
            />

            <Segment>
                <div style={{ textAlign: 'right', marginBottom: 10 }}>
                    <Button color="green" onClick={() => setOpenModal(true)}>
                        <Icon name="add" /> Добавить
                    </Button>
                </div>
                <ReactTableWrapper columns={columns} data={tempStoreList} />
            </Segment>
        </div>
    );
};

export default KaspiStore;
