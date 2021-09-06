import React, { useState, useEffect } from 'react';
import { Button, Popup, Input } from 'semantic-ui-react';
import { ValidationError } from 'yup';
import ReactTableWrapper from '../../../../utils/ReactTableWrapper';
// import '../../style.css';
import ModalAddCompany from './ModalAddCompany';

export default function TabCompany({
    getList,
    companyList,
    create,
    update,
    clear,
    messages,
}) {
    const [openModal, setOpenModal] = useState(false);

    const [tempData, setTempData] = useState([]);

    const [errors, setErrors] = useState([]);

    useEffect(() => {
        clear();
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
        } else {
            setTempData([]);
        }
    }, [companyList]);

    const clearTempData = () => {
        setTempData([]);
    };

    const onClickEdit = original => {
        setTempData(
            tempData.map(item =>
                item.bukrs === original.bukrs
                    ? {
                          ...item,
                          edit: true,
                      }
                    : item,
            ),
        );
    };

    const isFieldEmpty = field => {
        return field === '' || field === null || field === undefined;
    };

    const validation = item => {
        let success = true;

        setErrors(() => {
            let temporaryObj = {};
            Object.entries(item).map(keyAndVal => {
                temporaryObj = {
                    ...errors,
                    [item.bukrs]: {
                        ...item,
                        [keyAndVal[0]]: isFieldEmpty(keyAndVal[1]),
                    },
                };
            });
            return temporaryObj;
        });

        const arr = Object.values(item);

        arr.map(value => {
            if (isFieldEmpty(value)) {
                success = false;
            }
        });

        return success;
    };

    const onClickSave = bukrs => {
        tempData.map(item => {
            if (item.bukrs === bukrs) {
                if (validation(item)) {
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
                if (el.bukrs === data.bukrs) {
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

    const setRedLine = (original, fieldName) => {
        var redLine = false;
        Object.values(errors).map(item => {
            if (item.bukrs === original.bukrs) {
                switch (fieldName) {
                    case 'name':
                        if (
                            item['name'] === '' ||
                            item['name'] === null ||
                            item['name'] === undefined
                        ) {
                            redLine = true;
                        }
                        break;
                    case 'spras':
                        if (
                            item['spras'] === '' ||
                            item['spras'] === null ||
                            item['spras'] === undefined
                        ) {
                            redLine = true;
                        }
                        break;
                    case 'bukrs':
                        if (
                            item.bukrs === '' ||
                            item.bukrs === null ||
                            item.bukrs === undefined
                        ) {
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

    const cellInput = (original, fieldName) => {
        switch (fieldName) {
            case 'name':
                return original.edit ? (
                    <Input
                        label={Object.values(errors).map(item =>
                            item.bukrs === original.bukrs
                                ? item.name === '' ||
                                  item.name === null ||
                                  item.name === undefined
                                    ? 'Заполните поле'
                                    : null
                                : null,
                        )}
                        error={setRedLine(original, 'name')}
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
                        label={Object.values(errors).map(item =>
                            item.bukrs === original.bukrs
                                ? item.spras === '' ||
                                  item.spras === null ||
                                  item.spras === undefined
                                    ? 'Заполните поле'
                                    : null
                                : null,
                        )}
                        error={setRedLine(original, 'spras')}
                        placeholder={original.spras}
                        value={original.spras}
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
                        label={Object.values(errors).map(item =>
                            item.bukrs === original.bukrs
                                ? item.bukrs === '' ||
                                  item.bukrs === null ||
                                  item.bukrs === undefined
                                    ? 'Заполните поле'
                                    : null
                                : null,
                        )}
                        error={setRedLine(original, 'bukrs')}
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
                                    onClick={() => onClickSave(original.bukrs)}
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
