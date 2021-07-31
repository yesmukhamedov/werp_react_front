import React, { useState, useEffect } from 'react';
import { Button, Popup, Input } from 'semantic-ui-react';
import ReactTableWrapper from '../../../../utils/ReactTableWrapper';
import '../../style.css';
import ModalAddCompany from './ModalAddCompany';

export default function TabCompany({
    messages,
    companyList = [],
    getList,
    clear,
    create,
    update,
}) {
    const [openModal, setOpenModal] = useState(false);
    const [tempData, setTempData] = useState([]);

    useEffect(() => {
        clear();
        setTempData([]);
        getList();
    }, []);

    useEffect(() => {
        if (companyList.length > 0) {
            companyList.map(item =>
                setTempData(prev => {
                    return [
                        ...prev,
                        {
                            name: item.name,
                            spras: item.spras,
                            bukrs: item.bukrs,
                            edit: false,
                        },
                    ];
                }),
            );
        } else setTempData([]);
    }, [companyList]);

    const clearTempData = () => {
        setTempData([]);
    };

    const onClickEdit = original => {
        setTempData(
            tempData.map(item =>
                item.id === original.id
                    ? {
                          ...item,
                          edit: true,
                      }
                    : item,
            ),
        );
    };

    const onClickSave = id => {
        tempData.map(item => {
            if (item.id === id) {
                if (item.name && item.spras && item.bukrs) {
                    update(
                        {
                            name: item.name,
                            spras: item.spras,
                            bukrs: item.bukrs,
                        },
                        () => {
                            clear();
                            getList();
                        },
                    );
                }
            }
        });
    };

    const onChangeInput = (fieldName, data, value) => {
        setTempData(
            tempData.map(el => {
                if (el.id === data.id) {
                    switch (fieldName) {
                        case 'name':
                            return { ...el, name: value };
                        case 'spras':
                            return { ...el, spras: value };
                        case 'bukrs':
                            return { ...el, bukrs: value };
                        default:
                            break;
                    }
                } else {
                    return { ...el };
                }
            }),
        );
    };

    const cellInput = (original, fieldName) => {
        switch (fieldName) {
            case 'name':
                return original.edit ? (
                    <Input
                        placeholder={original.name}
                        value={original.name}
                        onChange={e =>
                            onChangeInput('name', original, e.target.value)
                        }
                    />
                ) : (
                    <div>{original.name}</div>
                );
            case 'spras':
                return original.edit ? (
                    <Input
                        placeholder={original.spras}
                        value={original.isprasnsprasfo}
                        onChange={e =>
                            onChangeInput('spras', original, e.target.value)
                        }
                    />
                ) : (
                    <div>{original.spras}</div>
                );
            case 'bukrs':
                return original.edit ? (
                    <Input
                        placeholder={original.bukrs}
                        value={original.bukrs}
                        onChange={e =>
                            onChangeInput('bukrs', original, e.target.value)
                        }
                    />
                ) : (
                    <div>{original.bukrs}</div>
                );
        }
    };

    const columns = [
        {
            Header: 'Наименование',
            accessor: 'name',
            filterable: true,
            Cell: ({ original }) => cellInput(original, 'name'),
        },
        {
            Header: 'SPRAS',
            accessor: 'spras',
            filterable: true,
            Cell: ({ original }) => cellInput(original, 'spras'),
        },
        {
            Header: 'BUKRS',
            accessor: 'bukrs',
            filterable: true,
            Cell: ({ original }) => cellInput(original, 'bukrs'),
        },
        {
            filterable: false,
            Cell: ({ original }) => (
                <div style={{ textAlign: 'center' }}>
                    <Popup
                        content={messages['BTN__EDIT']}
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
                                    onClick={() => onClickEdit(original)}
                                />
                            )
                        }
                    />
                </div>
            ),
        },
    ];

    return (
        <div>
            <ModalAddCompany
                open={openModal}
                close={() => setOpenModal(false)}
                create={create}
                getList={getList}
                clear={clear}
                clearTempData={clearTempData}
            />

            <div className="content-top">
                <h3>Компания</h3>
                <Button
                    positive
                    onClick={() => {
                        setOpenModal(true);
                    }}
                >
                    Добавить
                </Button>
            </div>

            <ReactTableWrapper data={tempData} columns={columns} />
        </div>
    );
}
