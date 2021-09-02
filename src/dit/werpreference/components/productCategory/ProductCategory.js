import React, { useState, useEffect } from 'react';
import { Button, Input, Popup } from 'semantic-ui-react';
import ReactTableWrapper from '../../../../utils/ReactTableWrapper';
import ModalAddCategory from './ModalAddCategory';
import '../../style.css';

export default function ProductCategory({
    create,
    getList,
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
        getList();
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

    const isFieldNullOrBlank = field =>
        field === '' || field === null || field === undefined;

    const validation = item => {
        let success = true;
        const arr = Object.values(item);

        arr.map(value => {
            if (isFieldNullOrBlank(value)) {
                success = false;
            }
        });

        setErrors(() => {
            let temporaryObj = {};
            Object.entries(item).map(keyAndValue => {
                const key = keyAndValue[0];
                const value = keyAndValue[1];
                temporaryObj = {
                    ...temporaryObj,
                    [key]: isFieldNullOrBlank(value),
                };
            });
            return temporaryObj;
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
                        case 'code':
                            return { ...el, code: value };
                        case 'info':
                            return { ...el, info: value };
                        case 'nameEn':
                            return { ...el, nameEn: value };
                        case 'nameKk':
                            return { ...el, nameKk: value };
                        case 'nameRu':
                            return { ...el, nameRu: value };
                        case 'nameTr':
                            return { ...el, nameTr: value };
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
            case 'code':
                return original.edit ? (
                    <Input
                        label={errors.code ? 'Заполнте поле' : null}
                        error={errors.code}
                        placeholder={original.code}
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
                        label={errors.info ? 'Заполнте поле' : null}
                        error={errors.info}
                        placeholder={original.info}
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
                        label={errors.nameEn ? 'Заполнте поле' : null}
                        error={errors.nameEn}
                        placeholder={original.nameEn}
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
                        label={errors.nameKk ? 'Заполнте поле' : null}
                        error={errors.nameKk}
                        placeholder={original.nameKk}
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
                        label={errors.nameRu ? 'Заполнте поле' : null}
                        error={errors.nameRu}
                        placeholder={original.nameRu}
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
                        label={errors.nameTr ? 'Заполнте поле' : null}
                        error={errors.nameTr}
                        placeholder={original.nameTr}
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
                getList={getList}
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
