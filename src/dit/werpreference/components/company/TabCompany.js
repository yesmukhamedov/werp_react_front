import React, { useState, useEffect } from 'react';
import { Button, Popup, Input } from 'semantic-ui-react';
import ReactTableWrapper from '../../../../utils/ReactTableWrapper';
import '../../style.css';
import ModalAddCompany from './ModalAddCompany';

export default function TabCompany({
    messages,
    companyList,
    get,
    post,
    put,
    del,
}) {
    const [openModal, setOpenModal] = useState(false);

    const [data, setData] = useState([]);

    useEffect(() => {
        companyList.map(item => {
            setData(el => [
                ...el,
                {
                    name: item.name,
                    spras: item.spras,
                    bukrs: item.bukrs,
                    edit: false,
                },
            ]);
        });
    }, [companyList]);

    const onClickEdit = (original, name) => {
        switch (name) {
            case 'save':
                const dt = data.map(el => {
                    if (el.bukrs === original.bukrs) {
                        if (original.name && original.spras && original.bukrs) {
                            el.edit = true;
                        } else {
                            el.edit = false;
                        }
                    }
                });
                setData(dt);

            case 'pencil':
                setData(
                    data.map(el =>
                        el.bukrs === original.bukrs
                            ? {
                                  ...el,
                                  edit: !original.edit,
                              }
                            : el,
                    ),
                );

            default:
                break;
        }
    };

    const onChangeInput = (e, original, fieldName) => {
        setData(
            data.map(el => {
                if (el.bukrs === original.bukrs) {
                    switch (fieldName) {
                        case 'name':
                            return { ...el, name: e.target.value };
                        case 'spras':
                            return { ...el, spras: e.target.value };
                        case 'bukrs':
                            return { ...el, bukrs: e.target.value };
                        default:
                            return el;
                    }
                } else {
                    return { ...el };
                }
            }),
        );
    };

    const cellInput = (original, cell) => {
        switch (cell) {
            case 'name':
                return original.edit ? (
                    <Input
                        placeholder={original.name}
                        value={original.name}
                        onChange={e => onChangeInput(e, original, 'name')}
                    />
                ) : (
                    <div>{original.name}</div>
                );
            case 'spras':
                return original.edit ? (
                    <Input
                        placeholder={original.spras}
                        value={original.spras}
                        onChange={e => onChangeInput(e, original, 'spras')}
                    />
                ) : (
                    <div>{original.spras}</div>
                );
            case 'bukrs':
                return original.edit ? (
                    <Input
                        placeholder={original.bukrs}
                        value={original.bukrs}
                        onChange={e => onChangeInput(e, original, 'bukrs')}
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
                            !original.edit ? (
                                <Button
                                    icon="pencil"
                                    circular
                                    color="yellow"
                                    onClick={() =>
                                        onClickEdit(original, 'pencil')
                                    }
                                />
                            ) : (
                                <Button
                                    icon="save"
                                    circular
                                    color="blue"
                                    onClick={() =>
                                        onClickEdit(original, 'save')
                                    }
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
                companyList={companyList}
                columns={columns}
                // setDataExample={setDataExample}
            />

            <div className="content-top">
                <h3>Компания</h3>
                <Button positive onClick={() => setOpenModal(true)}>
                    Добавить
                </Button>
            </div>
            <ReactTableWrapper data={data} columns={columns} />
        </div>
    );
}
