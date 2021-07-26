import React, { useState } from 'react';
import { Button, Popup, Input, Modal, Icon, Header } from 'semantic-ui-react';
import ReactTableWrapper from '../../../utils/ReactTableWrapper';
import '../style.css';
import ModalAddCompany from './ModalAddCompany';

export default function TabCompany({ messages, get, post, put, del }) {
    const [openModal, setOpenModal] = useState(false);

    const [data, setData] = useState([
        {
            id: 1,
            name: 'AURA',
            spras: 'en',
            bukrs: 1000,
            edit: false,
        },
        {
            id: 2,
            name: 'CEBILON',
            spras: 'ru',
            bukrs: 570,
            edit: false,
        },
    ]);

    console.log('data', data);

    const onChangeData = (e, original, fieldName) => {
        setData(
            data.map(el => {
                switch (fieldName) {
                    case 'companyName':
                        if (el.id === original.id) {
                            return {
                                ...el,
                                name: e.target.value,
                            };
                        }
                    case 'companyLang':
                        if (el.id === original.id) {
                            return {
                                ...el,
                                spras: e.target.value,
                            };
                        }
                    case 'companyId':
                        if (el.id === original.id) {
                            return {
                                ...el,
                                bukrs: e.target.value,
                            };
                        }
                    default:
                        return el;
                }
            }),
        );
    };

    const onClickEdit = original => {
        setData(
            data.map(el =>
                el.id === original.id
                    ? {
                          ...el,
                          edit: !original.edit,
                      }
                    : el,
            ),
        );
    };

    const onClickDelete = original => {
        const filtredItems = data.filter(el => el.id !== original.id);
        setData([...filtredItems]);
    };

    const columns = [
        {
            Header: 'Наименование',
            accessor: 'name',
            filterable: true,
            Cell: ({ original }) => {
                return original.edit ? (
                    <div>
                        <Input
                            size="mini"
                            placeholder={original.name}
                            name="companyName"
                            value={original.name}
                            onChange={e =>
                                onChangeData(e, original, 'companyName')
                            }
                        />
                    </div>
                ) : (
                    <div>{original.name}</div>
                );
            },
        },

        {
            Header: 'SPRAS',
            accessor: 'spras',
            filterable: true,
            Cell: ({ original }) => {
                return original.edit ? (
                    <div>
                        <Input
                            size="mini"
                            placeholder={original.spras}
                            value={original.spras}
                            name="companyLang"
                            onChange={e =>
                                onChangeData(e, original, 'companyLang')
                            }
                        />
                    </div>
                ) : (
                    <div>{original.spras}</div>
                );
            },
        },

        {
            Header: 'BUKRS',
            accessor: 'bukrs',
            filterable: true,
            Cell: ({ original }) => {
                return original.edit ? (
                    <div>
                        <Input
                            size="mini"
                            placeholder={original.bukrs}
                            value={original.bukrs}
                            name="companyId"
                            onChange={e =>
                                onChangeData(e, original, 'companyId')
                            }
                        />
                    </div>
                ) : (
                    <div>{original.bukrs}</div>
                );
            },
        },

        {
            filterable: false,
            Cell: ({ original }) => (
                <div style={{ textAlign: 'center' }}>
                    <Popup
                        content={messages['BTN__EDIT']}
                        trigger={
                            !original.edit ? (
                                <Button
                                    icon="pencil"
                                    circular
                                    color="yellow"
                                    onClick={() => onClickEdit(original)}
                                />
                            ) : (
                                <Button
                                    icon="save"
                                    circular
                                    color="blue"
                                    onClick={() => onClickEdit(original)}
                                />
                            )
                        }
                    />
                    <Popup
                        content={messages['Crm.ToDelete']}
                        trigger={
                            <Button
                                icon="remove"
                                circular
                                color="red"
                                onClick={() => onClickDelete(original)}
                            />
                        }
                    />
                </div>
            ),
        },
    ];
    const setDataExample = tempData => {
        console.log('tempData fun', tempData);
        setData([...data, tempData]);
    };

    return (
        <div>
            <ModalAddCompany
                open={openModal}
                close={() => setOpenModal(false)}
                data={data}
                columns={columns}
                setDataExample={setDataExample}
            />

            <div className="content-top">
                <h3>Компания</h3>
                <Button
                    positive
                    style={{ width: '164px' }}
                    onClick={() => setOpenModal(true)}
                >
                    Добавить
                </Button>
            </div>
            <ReactTableWrapper key={data.id} data={data} columns={columns} />
        </div>
    );
}
