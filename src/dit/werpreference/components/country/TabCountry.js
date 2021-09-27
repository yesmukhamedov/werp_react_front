import React, { useEffect, useState } from 'react';
import { Button, Input, Popup, Dropdown } from 'semantic-ui-react';
import ReactTableWrapper from '../../../../utils/ReactTableWrapper';
import ModalAddCategory from './ModalAddCountry';

export default function TabCountry({
    create,
    getCountryList,
    countryList,
    updateCountry,
    clearCountryList,
    currencyList,
    currencyOptions = [],
    messages,
}) {
    const [tempData, setTempData] = useState([]);
    const [errors, setErrors] = useState([]);
    const [openModal, setOpenModal] = useState(false);

    useEffect(() => {
        clearCountryList();
        getCountryList();
    }, []);

    useEffect(() => {
        if (countryList.length) {
            countryList.map(item =>
                setTempData(prev => [
                    ...prev,
                    {
                        countryId: item.countryId,
                        code: item.code,
                        country: item.country,
                        currency: item.currency,
                        currencyId: item.currencyId,
                        phoneCode: item.phoneCode,
                        telPattern: item.telPattern,
                        edit: false,
                    },
                ]),
            );
        } else {
            setTempData([]);
        }
    }, [countryList]);

    const onClickEdit = original => {
        setTempData(
            tempData.map(item => {
                return item.countryId === original.countryId
                    ? {
                          ...item,
                          edit: true,
                      }
                    : item;
            }),
        );
    };

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
                    [item.countryId]: {
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

    const onClickSave = countryId => {
        tempData.map(item => {
            if (item.countryId === countryId) {
                if (validation(item)) {
                    updateCountry(
                        {
                            countryId: item.countryId,
                            code: item.code,
                            country: item.country,
                            currency: item.currency,
                            phoneCode: item.phoneCode,
                            telPattern: item.telPattern,
                            currencyId: item.currencyId,
                        },
                        () => {
                            setTempData([]);
                            clearCountryList();
                            getCountryList();
                        },
                    );
                }
            }
        });
    };
    const currencyOptionsForDropdown = countryList.map(item => {
        return {
            key: item.currencyId,
            text: item.currency,
            value: item.currencyId,
        };
    });

    const getCurrency = value => {
        let currencyName = '';
        currencyOptionsForDropdown.map(item => {
            if (item.key == value) {
                currencyName = item.text;
            }
        });
        return currencyName;
    };

    const onChangeInput = (fieldName, data, value) => {
        setTempData(
            tempData.map(el => {
                if (el.countryId === data.countryId) {
                    switch (fieldName) {
                        case 'code':
                            return { ...el, code: value };
                        case 'country':
                            return { ...el, country: value };
                        case 'currency':
                            return { ...el, currencyId: value };
                        case 'phoneCode':
                            return { ...el, phoneCode: value };
                        case 'telPattern':
                            return { ...el, telPattern: value };
                        default:
                            break;
                    }
                } else {
                    return { ...el };
                }
            }),
        );
    };

    const onChangeDropdown = (data, value) => {
        setTempData(
            tempData.map(el => {
                if (el.countryId === data.countryId) {
                    return {
                        ...el,
                        currency: getCurrency(value),
                        currencyId: value,
                    };
                } else {
                    return { ...el };
                }
            }),
        );
    };

    const setRedLine = (original, fieldName) => {
        var redLine = false;
        Object.values(errors).map(item => {
            if (item.countryId === original.countryId) {
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
                    case 'country':
                        if (
                            item['country'] === '' ||
                            item['country'] === null ||
                            item['country'] === undefined
                        ) {
                            redLine = true;
                        }
                        break;
                    case 'currency':
                        if (
                            item.currency === '' ||
                            item.currency === null ||
                            item.currency === undefined
                        ) {
                            redLine = true;
                        }
                        break;
                    case 'phoneCode':
                        if (
                            item.phoneCode === '' ||
                            item.phoneCode === null ||
                            item.phoneCode === undefined
                        ) {
                            redLine = true;
                        }
                        break;
                    case 'telPattern':
                        if (
                            item.telPattern === '' ||
                            item.telPattern === null ||
                            item.telPattern === undefined
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
                            item.countryId === original.countryId
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
            case 'country':
                return original.edit ? (
                    <Input
                        label={Object.values(errors).map(item =>
                            item.countryId === original.countryId
                                ? item.country === '' ||
                                  item.country === null ||
                                  item.country === undefined
                                    ? 'Заполните поле'
                                    : null
                                : null,
                        )}
                        error={setRedLine(original, 'country')}
                        value={original.country}
                        onChange={e =>
                            onChangeInput('country', original, e.target.value)
                        }
                    />
                ) : (
                    <div>{original.country} </div>
                );
            case 'currency':
                return original.edit ? (
                    <Dropdown
                        options={currencyOptionsForDropdown}
                        selection
                        value={original.currencyId}
                        onChange={(e, { value }) => {
                            onChangeDropdown(original, value);
                        }}
                    />
                ) : (
                    <div>{original.currency}</div>
                );
            case 'phoneCode':
                return original.edit ? (
                    <Input
                        label={Object.values(errors).map(item =>
                            item.countryId === original.countryId
                                ? item.phoneCode === '' ||
                                  item.phoneCode === null ||
                                  item.phoneCode === undefined
                                    ? 'Заполните поле'
                                    : null
                                : null,
                        )}
                        error={setRedLine(original, 'phoneCode')}
                        value={original.phoneCode}
                        onChange={e =>
                            onChangeInput('phoneCode', original, e.target.value)
                        }
                    />
                ) : (
                    <div>{original.phoneCode}</div>
                );
            case 'telPattern':
                return original.edit ? (
                    <Input
                        label={Object.values(errors).map(item =>
                            item.countryId === original.countryId
                                ? item.telPattern === '' ||
                                  item.telPattern === null ||
                                  item.telPattern === undefined
                                    ? 'Заполните поле'
                                    : null
                                : null,
                        )}
                        error={setRedLine(original, 'telPattern')}
                        value={original.telPattern}
                        onChange={e =>
                            onChangeInput(
                                'telPattern',
                                original,
                                e.target.value,
                            )
                        }
                    />
                ) : (
                    <div>{original.telPattern}</div>
                );
        }
    };

    const columns = [
        {
            Header: 'ID',
            accessor: 'countryId',
            filterable: true,
            Cell: ({ original }) => <div>{original.countryId}</div>,
        },
        {
            Header: 'Код',
            accessor: 'code',
            filterable: true,
            Cell: ({ original }) => cellInput(original, 'code'),
        },
        {
            Header: 'Страна',
            accessor: 'country',
            filterable: true,
            Cell: ({ original }) => cellInput(original, 'country'),
        },
        {
            Header: 'Валюта',
            accessor: 'currency',
            filterable: true,
            Cell: ({ original }) => cellInput(original, 'currency'),
        },
        {
            Header: 'Код телефон',
            accessor: 'phoneCode',
            filterable: true,
            Cell: ({ original }) => cellInput(original, 'phoneCode'),
        },
        {
            Header: 'Тел',
            accessor: 'telPattern',
            filterable: true,
            Cell: ({ original }) => cellInput(original, 'telPattern'),
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
                                        onClickSave(original.countryId)
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
            <ModalAddCategory
                open={openModal}
                close={() => setOpenModal(false)}
                create={create}
                getCountryList={getCountryList}
                countryList={countryList}
                clearCountryList={clearCountryList}
                clearTempData={clearTempData}
                currencyOptionsForDropdown={currencyOptionsForDropdown}
            />
            <div className="content-top">
                <h3>Страны</h3>
                <Button positive onClick={() => setOpenModal(true)}>
                    Добавить
                </Button>
            </div>
            <ReactTableWrapper data={tempData} columns={columns} />
        </div>
    );
}
