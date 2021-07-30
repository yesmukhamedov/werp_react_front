import React, { useState, useEffect } from 'react';
import { Button, Popup, Input } from 'semantic-ui-react';
import ReactTableWrapper from '../../../../utils/ReactTableWrapper';
import { errorTableText } from '../../../../utils/helpers';

export const ProductCategory = props => {
    const { getList, update, data = [], messages, clear } = props;
    const [tempData, setTempData] = useState([]);
    const [addData, setAddData] = useState({
        code: '',
        info: '',
        nameEn: '',
        nameKk: '',
        nameRu: '',
        nameTr: '',
    });
    const [error, setError] = useState([]);

    useEffect(() => {
        getList();
    }, []);

    useEffect(() => {
        if (data.length) {
            data.map(item =>
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
    }, [data]);

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
                if (
                    item.code &&
                    item.nameEn &&
                    item.nameKk &&
                    item.nameRu &&
                    item.nameTr
                ) {
                    update(
                        {
                            id: item.id,
                            code: item.code,
                            info: item.info,
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
                            // if(value){}
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
                        placeholder={original.info}
                        value={original.info}
                        onChange={e =>
                            onChangeInput('info', original, e.target.value)
                        }
                    />
                ) : (
                    <div>{original.info}</div>
                );
            case 'nameEn':
                return original.edit ? (
                    <Input
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
                    {original.edit ? (
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
                    )}
                </div>
            ),
        },
    ];

    return (
        <div>
            {/* <ModalAddCategory openModal /> */}
            <div className="content-top">
                <h3>Категория товара</h3>
                <Button positive>Добавить</Button>
            </div>
            <ReactTableWrapper data={tempData} columns={columns} />
        </div>
    );
};
