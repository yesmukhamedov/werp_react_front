import React, { useState } from 'react';
import { Button, Popup, Input } from 'semantic-ui-react';
import ReactTableWrapper from '../../../../utils/ReactTableWrapper';
// import { ModalAddCategory } from './ModalAddCategory';

export const ProductCategory = ({ messages }) => {
    // const [openModal, setOpenModal] = useState(false);

    const [data, setData] = useState([
        {
            id: 1,
            code: 123456,
            note: 'asdf',
            name_en: 'english',
            name_kk: 'қазақша',
            name_ru: 'русский',
            name_tr: 'turkce',
            edit: false,
        },
        {
            id: 2,
            code: 654321,
            note: 'note',
            name_en: 'english2',
            name_kk: 'қазақша2',
            name_ru: 'русский2',
            name_tr: 'turkce2',
            edit: false,
        },
    ]);

    const onClickEdit = (original, name) => {
        switch (name) {
            case 'save':
                setData(
                    data.map(el => {
                        if (el.id === original.id) {
                            if (
                                original.code &&
                                original.note &&
                                original.name_en &&
                                original.name_kk &&
                                original.name_ru &&
                                original.name_tr
                            ) {
                                el.edit = true;
                            } else {
                                el.edit = false;
                            }
                        }
                    }),
                );
            case 'pencil':
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

            default:
                break;
        }
    };

    const onChangeInput = (e, original, fieldName) => {
        setData(
            data.map(el => {
                if (el.id === original.id) {
                    switch (fieldName) {
                        case 'code':
                            return { ...el, code: e.target.value };
                        case 'note':
                            return { ...el, note: e.target.value };
                        case 'name_en':
                            return { ...el, name_en: e.target.value };
                        case 'name_kk':
                            return { ...el, name_kk: e.target.value };
                        case 'name_ru':
                            return { ...el, name_ru: e.target.value };
                        case 'name_tr':
                            return { ...el, name_tr: e.target.value };
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
            case 'code':
                return original.edit ? (
                    <Input
                        placeholder={original.code}
                        value={original.code}
                        onChange={e => onChangeInput(e, original, 'code')}
                    />
                ) : (
                    <div>{original.code}</div>
                );
            case 'note':
                return original.edit ? (
                    <Input
                        placeholder={original.note}
                        value={original.note}
                        onChange={e => onChangeInput(e, original, 'note')}
                    />
                ) : (
                    <div>{original.note}</div>
                );
            case 'name_en':
                return original.edit ? (
                    <Input
                        placeholder={original.name_en}
                        value={original.name_en}
                        onChange={e => onChangeInput(e, original, 'name_en')}
                    />
                ) : (
                    <div>{original.name_en}</div>
                );
            case 'name_kk':
                return original.edit ? (
                    <Input
                        placeholder={original.name_kk}
                        value={original.name_kk}
                        onChange={e => onChangeInput(e, original, 'name_kk')}
                    />
                ) : (
                    <div>{original.name_kk}</div>
                );
            case 'name_ru':
                return original.edit ? (
                    <Input
                        placeholder={original.name_ru}
                        value={original.name_ru}
                        onChange={e => onChangeInput(e, original, 'name_ru')}
                    />
                ) : (
                    <div>{original.name_ru}</div>
                );
            case 'name_tr':
                return original.edit ? (
                    <Input
                        placeholder={original.name_tr}
                        value={original.name_tr}
                        onChange={e => onChangeInput(e, original, 'name_tr')}
                    />
                ) : (
                    <div>{original.name_tr}</div>
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
            accessor: 'note',
            filterable: true,
            Cell: ({ original }) => cellInput(original, 'note'),
        },
        {
            Header: 'Наименование EN',
            accessor: 'name_en',
            filterable: true,
            Cell: ({ original }) => cellInput(original, 'name_en'),
        },
        {
            Header: 'Наименование KK',
            accessor: 'name_kk',
            filterable: true,
            Cell: ({ original }) => cellInput(original, 'name_kk'),
        },
        {
            Header: 'Наименование RU',
            accessor: 'name_ru',
            filterable: true,
            Cell: ({ original }) => cellInput(original, 'name_ru'),
        },
        {
            Header: 'Наименование TR',
            accessor: 'name_tr',
            filterable: true,
            Cell: ({ original }) => cellInput(original, 'name_tr'),
        },
        {
            filterable: false,
            Cell: ({ original }) => (
                <div style={{ textAlign: 'center' }}>
                    <Popup
                        content={messages['BTN_EDIT']}
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
            {/* <ModalAddCategory openModal/> */}
            <div className="content-top">
                <h3>Категория товара</h3>
                <Button positive>Добавить</Button>
            </div>
            <ReactTableWrapper data={data} columns={columns} />
        </div>
    );
};
