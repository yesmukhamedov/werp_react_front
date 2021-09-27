import { update } from 'lodash';
import React, { useEffect, useState } from 'react';
import { Button, Input, Popup, Dropdown } from 'semantic-ui-react';
import ReactTableWrapper from '../../../../utils/ReactTableWrapper';
import ModalAddDepartment from './ModalAddDepartment';

export default function TabDepartment({
    getDepartmentList,
    departmentList,
    clearDepartmentList,
    updateDepartment,
    createDepartment,
    messages,
}) {
    const [tempData, setTempData] = useState([]);
    const [errors, setErrors] = useState([]);
    const [openModal, setOpenModal] = useState(false);

    useEffect(() => {
        clearDepartmentList();
        getDepartmentList();
    }, []);

    useEffect(() => {
        if (departmentList.length > 0) {
            departmentList.map(item => {
                setTempData(prev => [
                    ...prev,
                    {
                        depId: item.depId,
                        nameEn: item.nameEn,
                        nameKk: item.nameKk,
                        nameRu: item.nameRu,
                        nameTr: item.nameTr,
                        edit: false,
                    },
                ]);
            });
        } else {
            setTempData([]);
        }
    }, [departmentList]);

    const clearTempData = () => {
        setTempData([]);
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
                    [item.depId]: {
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

    const onClickSave = depId => {
        tempData.map(item => {
            if (item.depId === depId) {
                if (validation(item)) {
                    updateDepartment(
                        {
                            depId: item.depId,
                            nameEn: item.nameEn,
                            nameKk: item.nameKk,
                            nameRu: item.nameRu,
                            nameTr: item.nameTr,
                        },
                        () => {
                            clearTempData();
                            clearDepartmentList();
                            getDepartmentList();
                        },
                    );
                }
            }
        });
    };

    const onClickEdit = depId => {
        setTempData(
            tempData.map(item => {
                return item.depId === depId ? { ...item, edit: true } : item;
            }),
        );
    };

    const setRedLine = (original, fieldName) => {
        var redLine = false;
        Object.values(errors).map(item => {
            if (item.depId === original.depId) {
                switch (fieldName) {
                    case 'nameEn':
                        if (
                            item['nameEn'] === '' ||
                            item['nameEn'] === null ||
                            item['nameEn'] === undefined
                        ) {
                            redLine = true;
                        }
                        break;
                    case 'nameKk':
                        if (
                            item['nameKk'] === '' ||
                            item['nameKk'] === null ||
                            item['nameKk'] === undefined
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

    const onChangeInput = (fieldName, data, value) => {
        setTempData(
            tempData.map(el => {
                if (el.depId === data.depId) {
                    switch (fieldName) {
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
            case 'nameEn':
                return original.edit ? (
                    <Input
                        label={Object.values(errors).map(item =>
                            item.depId === original.depId
                                ? item.nameEn === '' ||
                                  item.nameEn === null ||
                                  item.nameEn === undefined
                                    ? 'Заполните поле'
                                    : null
                                : null,
                        )}
                        error={setRedLine(original, 'nameEn')}
                        value={original.nameEn}
                        onChange={(e, { value }) =>
                            onChangeInput('nameEn', original, value)
                        }
                    />
                ) : (
                    <div>{original.nameEn}</div>
                );
            case 'nameKk':
                return original.edit ? (
                    <Input
                        label={Object.values(errors).map(item =>
                            item.depId === original.depId
                                ? item.nameKk === '' ||
                                  item.nameKk === null ||
                                  item.nameKk === undefined
                                    ? 'Заполните поле'
                                    : null
                                : null,
                        )}
                        error={setRedLine(original, 'nameKk')}
                        value={original.nameKk}
                        onChange={(e, { value }) =>
                            onChangeInput('nameKk', original, value)
                        }
                    />
                ) : (
                    <div>{original.nameKk}</div>
                );

            case 'nameRu':
                return original.edit ? (
                    <Input
                        label={Object.values(errors).map(item =>
                            item.depId === original.depId
                                ? item.nameRu === '' ||
                                  item.nameRu === null ||
                                  item.nameRu === undefined
                                    ? 'Заполните поле'
                                    : null
                                : null,
                        )}
                        error={setRedLine(original, 'nameRu')}
                        value={original.nameRu}
                        onChange={(e, { value }) =>
                            onChangeInput('nameRu', original, value)
                        }
                    />
                ) : (
                    <div>{original.nameRu}</div>
                );
            case 'nameTr':
                return original.edit ? (
                    <Input
                        label={Object.values(errors).map(item =>
                            item.depId === original.depId
                                ? item.nameTr === '' ||
                                  item.nameTr === null ||
                                  item.nameTr === undefined
                                    ? 'Заполните поле'
                                    : null
                                : null,
                        )}
                        error={setRedLine(original, 'nameTr')}
                        value={original.nameTr}
                        onChange={(e, { value }) =>
                            onChangeInput('nameTr', original, value)
                        }
                    />
                ) : (
                    <div>{original.nameTr}</div>
                );

            default:
                break;
        }
    };

    const columns = [
        {
            Header: 'ID',
            accessor: 'depId',
            filterable: true,
            Cell: ({ original }) => <div>{original.depId}</div>,
        },
        {
            Header: 'Наименование EN',
            accessor: 'nameEn',
            filterable: true,
            Cell: ({ original }) => cellInput(original, 'nameEn'),
        },
        {
            Header: 'Наименование KZ',
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
            Header: 'Наименование Tr',
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
                                    onClick={() => onClickSave(original.depId)}
                                />
                            ) : (
                                <Button
                                    icon="pencil"
                                    circular
                                    color="yellow"
                                    onClick={() => onClickEdit(original.depId)}
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
            <ModalAddDepartment
                open={openModal}
                close={() => setOpenModal(false)}
                createDepartment={createDepartment}
                getDepartmentList={getDepartmentList}
                departmentList={departmentList}
                clearDepartmentList={clearDepartmentList}
                clearTempData={clearTempData}
            />
            <div className="content-top">
                <h3>Отделы</h3>
                <Button positive onClick={() => setOpenModal(true)}>
                    Добавить
                </Button>
            </div>
            <ReactTableWrapper
                defaultPageSize={20}
                showPagination={true}
                data={tempData}
                columns={columns}
            />
        </div>
    );
}
