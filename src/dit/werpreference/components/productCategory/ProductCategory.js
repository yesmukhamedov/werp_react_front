import React, { useState, useEffect } from 'react';
import { Button, Input, Popup } from 'semantic-ui-react';
import ReactTableWrapper from '../../../../utils/ReactTableWrapper';
import ModalAddCategory from './ModalAddCategory';

export default function ProductCategory({
    create,
    getCategoryList,
    categoryList,
    update,
    clear,
    messages,
}) {
    const [openModal, setOpenModal] = useState(false);

    const [tempData, setTempData] = useState([]);

    const [errors, setErrors] = useState([]);

    useEffect(() => {
        clear();
        getCategoryList();
    }, []);

    useEffect(() => {
        if (categoryList.length) {
            categoryList.map(item =>
                setTempData(prev => [
                    ...prev,
                    {
                        id: item.id,
                        code: item.code,
                        info: item.info,
                        nameEn: item.nameEn,
                        nameKk: item.nameKk,
                        nameRu: item.nameRu,
                        nameTr: item.nameTr,
                        edit: false,
                    },
                ]),
            );
        } else {
            setTempData([]);
        }
    }, [categoryList]);

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
                    [item.id]: {
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

    const onClickSave = id => {
        tempData.map(item => {
            if (item.id === id) {
                if (validation(item)) {
                    update(
                        {
                            id: item.id,
                            info: item.info,
                            code: item.code,
                            nameEn: item.nameEn,
                            nameKk: item.nameKk,
                            nameRu: item.nameRu,
                            nameTr: item.nameTr,
                        },
                        () => {
                            clear();
                            getCategoryList();
                        },
                    );
                }
            }
        });
    };

    const onChangeInput = (fieldName, data, value) => {
        setTempData(
            tempData.map(item => {
                if (item.id === data.id) {
                    switch (fieldName) {
                        case 'code':
                            return { ...item, code: value };
                        case 'info':
                            return { ...item, info: value };
                        case 'nameEn':
                            return { ...item, nameEn: value };
                        case 'nameKk':
                            return { ...item, nameKk: value };
                        case 'nameRu':
                            return { ...item, nameRu: value };
                        case 'nameTr':
                            return { ...item, nameTr: value };
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
            if (item.id === original.id) {
                switch (fieldName) {
                    case 'code':
                        if (
                            item['code'] === '' ||
                            item['code'] === null ||
                            item['code'] === undefined
                        ) {
                            redLine = true;
                        }
                        break;
                    case 'info':
                        if (
                            item['info'] === '' ||
                            item['info'] === null ||
                            item['info'] === undefined
                        ) {
                            redLine = true;
                        }
                        break;
                    case 'nameEn':
                        if (
                            item.nameEn === '' ||
                            item.nameEn === null ||
                            item.nameEn === undefined
                        ) {
                            redLine = true;
                        }
                        break;
                    case 'nameKk':
                        if (
                            item.nameKk === '' ||
                            item.nameKk === null ||
                            item.nameKk === undefined
                        ) {
                            redLine = true;
                        }
                        break;
                    case 'nameRu':
                        if (
                            item.nameRu === '' ||
                            item.nameRu === null ||
                            item.nameRu === undefined
                        ) {
                            redLine = true;
                        }
                        break;
                    case 'nameTr':
                        if (
                            item.nameTr === '' ||
                            item.nameTr === null ||
                            item.nameTr === undefined
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
            case 'code':
                return original.edit ? (
                    <Input
                        label={Object.values(errors).map(item =>
                            item.id === original.id
                                ? item.code === '' ||
                                  item.code === null ||
                                  item.code === undefined
                                    ? 'Заполните поле'
                                    : null
                                : null,
                        )}
                        error={setRedLine(original, 'code')}
                        value={original.code}
                        onChange={e =>
                            onChangeInput('code', original, e.target.value)
                        }
                    />
                ) : (
                    <div>{original.code}</div>
                );
            case 'info':
                return original.edit ? (
                    <Input
                        label={Object.values(errors).map(item =>
                            item.id === original.id
                                ? item.info === '' ||
                                  item.info === null ||
                                  item.info === undefined
                                    ? 'Заполните поле'
                                    : null
                                : null,
                        )}
                        error={setRedLine(original, 'info')}
                        value={original.info}
                        onChange={e =>
                            onChangeInput('info', original, e.target.value)
                        }
                    />
                ) : (
                    <div>{original.info} </div>
                );
            case 'nameEn':
                return original.edit ? (
                    <Input
                        label={Object.values(errors).map(item =>
                            item.id === original.id
                                ? item.nameEn === '' ||
                                  item.nameEn === null ||
                                  item.nameEn === undefined
                                    ? 'Заполните поле'
                                    : null
                                : null,
                        )}
                        error={setRedLine(original, 'nameEn')}
                        value={original.nameEn}
                        onChange={e =>
                            onChangeInput('nameEn', original, e.target.value)
                        }
                    />
                ) : (
                    <div>{original.nameEn}</div>
                );
            case 'nameKk':
                return original.edit ? (
                    <Input
                        label={Object.values(errors).map(item =>
                            item.id === original.id
                                ? item.nameKk === '' ||
                                  item.nameKk === null ||
                                  item.nameKk === undefined
                                    ? 'Заполните поле'
                                    : null
                                : null,
                        )}
                        error={setRedLine(original, 'nameKk')}
                        value={original.nameKk}
                        onChange={e =>
                            onChangeInput('nameKk', original, e.target.value)
                        }
                    />
                ) : (
                    <div>{original.nameKk}</div>
                );
            case 'nameRu':
                return original.edit ? (
                    <Input
                        label={Object.values(errors).map(item =>
                            item.id === original.id
                                ? item.nameRu === '' ||
                                  item.nameRu === null ||
                                  item.nameRu === undefined
                                    ? 'Заполните поле'
                                    : null
                                : null,
                        )}
                        error={setRedLine(original, 'nameRu')}
                        value={original.nameRu}
                        onChange={e =>
                            onChangeInput('nameRu', original, e.target.value)
                        }
                    />
                ) : (
                    <div>{original.nameRu}</div>
                );
            case 'nameTr':
                return original.edit ? (
                    <Input
                        label={Object.values(errors).map(item =>
                            item.id === original.id
                                ? item.nameTr === '' ||
                                  item.nameTr === null ||
                                  item.nameTr === undefined
                                    ? 'Заполните поле'
                                    : null
                                : null,
                        )}
                        error={setRedLine(original, 'nameTr')}
                        value={original.nameTr}
                        onChange={e =>
                            onChangeInput('nameTr', original, e.target.value)
                        }
                    />
                ) : (
                    <div>{original.nameTr}</div>
                );
        }
    };

    const columns = [
        {
            Header: 'ID',
            accessor: 'id',
            filterable: true,
            Cell: ({ original }) => <div>{original.id}</div>,
        },
        {
            Header: 'Код',
            accessor: 'code',
            filterable: true,
            Cell: ({ original }) => cellInput(original, 'code'),
        },
        {
            Header: 'Примичание',
            accessor: 'info',
            filterable: true,
            Cell: ({ original }) => cellInput(original, 'info'),
        },
        {
            Header: 'Наименование EN',
            accessor: 'nameEn',
            filterable: true,
            Cell: ({ original }) => cellInput(original, 'nameEn'),
        },
        {
            Header: 'Наименование KK',
            accessor: 'nameKk',
            filterable: true,
            Cell: ({ original }) => cellInput(original, 'nameKk'),
        },
        {
            Header: 'Наименование RU',
            accessor: 'nameRu',
            filterable: true,
            Cell: ({ original }) => cellInput(original, 'nameRu'),
        },
        {
            Header: 'Наименование TR',
            accessor: 'nameTr',
            filterable: true,
            Cell: ({ original }) => cellInput(original, 'nameTr'),
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
            <ModalAddCategory
                open={openModal}
                close={() => setOpenModal(false)}
                create={create}
                getList={getCategoryList}
                clear={clear}
                clearTempData={clearTempData}
                categoryList={categoryList}
            />
            <div className="content-top">
                <h3>Категория товара</h3>
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
