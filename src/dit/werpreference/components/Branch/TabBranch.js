import React, { useEffect, useState } from 'react';
import { Button, Input, Popup, Dropdown } from 'semantic-ui-react';
import ReactTableWrapper from '../../../../utils/ReactTableWrapper';
import ModalAddBranch from './ModalAddBranch';

export default function TabBranch({
    getBranchList,
    branchList,
    clearBranchList,
    createBranch,
    updateBranch,
    messages,
    companyOptions,
    countryOptions,
    getCategoryList,
    categoryList,
    businessAreaList,
    stateList,
}) {
    const [tempData, setTempData] = useState([]);
    const [errors, setErrors] = useState([]);
    const [openModal, setOpenModal] = useState(false);

    useEffect(() => {
        clearBranchList();
        getBranchList();
        getCategoryList();
    }, []);

    useEffect(() => {
        if (branchList.length) {
            branchList.map(item =>
                setTempData(prev => [
                    ...prev,
                    {
                        branchId: item.branchId,
                        bukrs: item.bukrs,
                        businessAreaId: item.businessAreaId,
                        centerLat: item.centerLat,
                        centerLong: item.centerLong,
                        countryId: item.countryId,
                        latitude: item.latitude,
                        longitude: item.longitude,
                        parentBranchId: item.parentBranchId,
                        stateId: item.stateId,
                        text45: item.text45,
                        tovarCategory: item.tovarCategory,
                        type: item.type,
                        edit: false,
                    },
                ]),
            );
        } else {
            setTempData([]);
        }
    }, [branchList]);

    const countryOptionsForDropdown = countryOptions.map(item => {
        return {
            text: item.country,
            value: item.countryId,
        };
    });
    // console.log(countryOptionsForDropdown)

    const categoryOptionsForDropdown = categoryList.map(item => {
        return {
            text: item.code,
            value: item.id,
        };
    });

    const businessAreaOptionsForDropdown = businessAreaList.map(item => {
        return {
            text: item.name,
            value: item.business_area_id,
        };
    });
    const stateOptionsForDropdown = stateList.map(item => {
        return {
            text: item.statename,
            value: item.idstate,
        };
    });

    const onClickEdit = original => {
        setTempData(
            tempData.map(item => {
                return item.branchId === original.branchId
                    ? {
                          ...item,
                          edit: true,
                      }
                    : item;
            }),
        );
    };

    const onClickSave = branchId => {
        tempData.map(item => {
            if (item.branchId === branchId) {
                if (validation(item)) {
                    updateBranch(
                        {
                            branchId: item.branchId,
                            bukrs: item.bukrs,
                            text45: item.text45,
                            countryId: item.countryId,
                            type: item.type,
                            tovarCategory: item.tovarCategory,
                            businessAreaId: item.businessAreaId,
                            stateId: item.stateId,
                        },
                        () => {
                            setTempData([]);
                            clearBranchList();
                            getBranchList();
                        },
                    );
                }
            }
        });
    };

    const isFieldEmpty = val => val === '' || val === undefined;

    const validation = item => {
        let success = true;

        setErrors(() => {
            let temporaryObj = {};
            Object.entries(item).map(keyAndVal => {
                temporaryObj = {
                    ...errors,
                    [item.branchId]: {
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

    const onChangeData = (fieldName, data, value) => {
        setTempData(
            tempData.map(el => {
                if (el.branchId === data.branchId) {
                    switch (fieldName) {
                        case 'bukrs':
                            return { ...el, bukrs: value };
                        case 'text45':
                            return { ...el, text45: value };
                        case 'countryId':
                            return { ...el, countryId: value };
                        case 'type':
                            return { ...el, type: value };
                        case 'tovarCategory':
                            return { ...el, tovarCategory: value };
                        case 'businessAreaId':
                            return { ...el, businessAreaId: value };
                        case 'stateId':
                            return { ...el, stateId: value };
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
            if (item.branchId === original.branchId) {
                switch (fieldName) {
                    case 'text45':
                        if (
                            item['text45'] === '' ||
                            item['text45'] === undefined
                        ) {
                            redLine = true;
                        }
                        break;
                    case 'type':
                        if (item['type'] === '' || item['type'] === undefined) {
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
            case 'bukrs':
                return original.edit ? (
                    <Dropdown
                        options={companyOptions}
                        selection
                        value={original.bukrs}
                        onChange={(e, { value }) => {
                            onChangeData('bukrs', original, value);
                        }}
                    />
                ) : (
                    <div>
                        {companyOptions.map(item => {
                            return item.value === original.bukrs
                                ? item.text
                                : '';
                        })}
                    </div>
                );
            case 'text45':
                return original.edit ? (
                    <Input
                        label={Object.values(errors).map(item =>
                            item.branchId === original.branchId
                                ? item.country === '' ||
                                  item.country === undefined
                                    ? 'Заполните поле'
                                    : null
                                : null,
                        )}
                        error={setRedLine(original, 'text45')}
                        value={original.text45}
                        onChange={(e, { value }) => {
                            onChangeData('text45', original, value);
                        }}
                    />
                ) : (
                    <div>{original.text45}</div>
                );

            case 'countryId':
                return original.edit ? (
                    <Dropdown
                        options={countryOptionsForDropdown}
                        selection
                        value={original.countryId}
                        onChange={(e, { value }) => {
                            onChangeData('countryId', original, value);
                        }}
                    />
                ) : (
                    <div>
                        {countryOptionsForDropdown.map(item => {
                            return item.value === original.countryId
                                ? item.text
                                : '';
                        })}
                    </div>
                );
            case 'type':
                return original.edit ? (
                    <Input
                        label={Object.values(errors).map(item =>
                            item.branchId === original.branchId
                                ? item.country === '' ||
                                  item.country === undefined
                                    ? 'Заполните поля'
                                    : null
                                : null,
                        )}
                        error={setRedLine(original, 'type')}
                        value={original.type}
                        onChange={e =>
                            onChangeData('type', original, e.target.value)
                        }
                    />
                ) : (
                    <div>{original.type}</div>
                );
            case 'tovarCategory':
                return original.edit ? (
                    <Dropdown
                        options={categoryOptionsForDropdown}
                        selection
                        value={original.tovarCategory}
                        onChange={(e, { value }) => {
                            onChangeData('tovarCategory', original, value);
                        }}
                    />
                ) : (
                    <div>
                        {categoryOptionsForDropdown.map(item => {
                            return item.value === original.tovarCategory
                                ? item.text
                                : '';
                        })}
                    </div>
                );
            case 'businessAreaId':
                return original.edit ? (
                    <Dropdown
                        options={businessAreaOptionsForDropdown}
                        selection
                        value={original.businessAreaId}
                        onChange={(e, { value }) => {
                            onChangeData('businessAreaId', original, value);
                        }}
                    />
                ) : (
                    <div>
                        {businessAreaOptionsForDropdown.map(item => {
                            return item.value === original.businessAreaId
                                ? item.text
                                : '';
                        })}
                    </div>
                );

            case 'stateId':
                return original.edit ? (
                    <Dropdown
                        options={stateOptionsForDropdown}
                        selection
                        value={original.stateId}
                        onChange={(e, { value }) => {
                            onChangeData('stateId', original, value);
                        }}
                    />
                ) : (
                    <div>
                        {stateOptionsForDropdown.map(item => {
                            return item.value === original.stateId
                                ? item.text
                                : '';
                        })}
                    </div>
                );
            default:
                break;
        }
    };

    const clearTempData = () => {
        setTempData([]);
    };

    const columns = [
        {
            Header: 'ID',
            accessor: 'branchId',
            filterable: true,
            Cell: ({ original }) => <div>{original.branchId}</div>,
        },
        {
            Header: 'Компания',
            accessor: 'bukrs',
            filterable: true,
            Cell: ({ original }) => cellInput(original, 'bukrs'),
        },
        {
            Header: 'Наименование филиала',
            accessor: 'text45',
            filterable: true,
            Cell: ({ original }) => cellInput(original, 'text45'),
        },
        {
            Header: 'Страна',
            accessor: 'countryId',
            filterable: true,
            Cell: ({ original }) => cellInput(original, 'countryId'),
        },
        {
            Header: 'Тип',
            accessor: 'type',
            filterable: true,
            Cell: ({ original }) => cellInput(original, 'type'),
        },
        {
            Header: 'Категория товара',
            accessor: 'tovarCategory',
            filterable: true,
            Cell: ({ original }) => cellInput(original, 'tovarCategory'),
        },
        {
            Header: 'Сфера бизнеса',
            accessor: 'businessAreaId',
            filterable: true,
            Cell: ({ original }) => cellInput(original, 'businessAreaId'),
        },
        {
            Header: 'Область',
            accessor: 'stateId',
            filterable: true,
            Cell: ({ original }) => cellInput(original, 'stateId'),
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
                                    onClick={() =>
                                        onClickSave(original.branchId)
                                    }
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
            <ModalAddBranch
                open={openModal}
                close={() => setOpenModal(false)}
                createBranch={createBranch}
                getBranchList={getBranchList}
                branchList={branchList}
                clearBranchList={clearBranchList}
                clearTempData={clearTempData}
                companyOptions={companyOptions}
                countryOptionsForDropdown={countryOptionsForDropdown}
                categoryOptionsForDropdown={categoryOptionsForDropdown}
                businessAreaOptionsForDropdown={businessAreaOptionsForDropdown}
                stateOptionsForDropdown={stateOptionsForDropdown}
            />
            <div className="content-top">
                <h3>Филиал</h3>
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
