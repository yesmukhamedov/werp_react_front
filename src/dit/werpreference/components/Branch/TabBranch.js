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

    console.log('TEMP_DATA', tempData);

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

    const onChangeDropdown = (data, value) => {
        // setTempDVALUE
        //     tempData.map(el => {
        //         if (el.countryId === data.countryId) {
        //             return {
        //                 ...el,
        //                 currency: getCurrency(value),
        //                 currencyId: value,
        //             };
        //         } else {
        //             return { ...el };
        //         }
        //     }),
        // );
    };

    const cellInput = (original, fieldName) => {
        switch (fieldName) {
            case 'bukrs':
                return original.edit ? (
                    <Dropdown
                        options
                        selection
                        value={original.bukrs}
                        onChange={(e, { value }) => {
                            onChangeDropdown(original, value);
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
                return original.edit ? <Input /> : <div>{original.text45}</div>;

            case 'countryId':
                return original.edit ? (
                    <Dropdown
                        options={countryOptionsForDropdown}
                        selection
                        value={original.bukrs}
                        onChange={(e, { value }) => {
                            onChangeDropdown(original, value);
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
                    // onChange={e =>
                    //     onChangeInput('type', original, e.target.value)
                    // }
                    />
                ) : (
                    <div>{original.type}</div>
                );
            case 'tovarCategory':
                return original.edit ? (
                    <Input
                    // onChange={e =>
                    //     onChangeInput('tovarCategory', original, e.target.value)
                    // }
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
                    <Input
                    // onChange={e =>
                    //     onChangeInput(
                    //         'businessAreaId',
                    //         original,
                    //         e.target.value,
                    //     )
                    // }
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
                    <Input
                    // onChange={e =>
                    //     onChangeInput('stateId', original, e.target.value)
                    // }
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
                                    // onClick={() =>
                                    //     onClickSave(original.branchId)
                                    // }
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
