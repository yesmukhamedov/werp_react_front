import React, { useState, useEffect } from 'react';
import { Button, Popup, Input } from 'semantic-ui-react';
import ReactTableWrapper from '../../../../utils/ReactTableWrapper';
import '../../style.css';
import ModalAddCompany from './ModalAddCompany';
import ModalUpdateCompany from './ModalUpdateCompany';

export default function TabCompany({
    messages,
    companyList,
    get,
    create,
    put,
    del,
}) {
    const [openModal, setOpenModal] = useState(false);

    const [data, setData] = useState([]);
    const [addData, setAddData] = useState({
        name: '',
        spras: '',
        bukrs: 0,
    });

    const onChangeAdd = (fieldName, value) => {
        switch (fieldName) {
            case 'name':
                setAddData({ ...tempData, name: value });
                break;
            case 'spras':
                setAddData({ ...tempData, spras: value });
                break;
            case 'bukrs':
                setAddData({ ...tempData, bukrs: value });
                break;
            default:
                break;
        }
    };

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

    const getData = e => {
        console.log(e);
    };

    const columns = [
        {
            Header: 'Наименование',
            accessor: 'name',
            filterable: true,
            Cell: ({ original }) => <div>{original.name}</div>,
        },
        {
            Header: 'SPRAS',
            accessor: 'spras',
            filterable: true,
            Cell: ({ original }) => <div>{original.spras}</div>,
        },
        {
            Header: 'BUKRS',
            accessor: 'bukrs',
            filterable: true,
            Cell: ({ original }) => <div>{original.bukrs}</div>,
        },
        {
            filterable: false,
            Cell: ({ original }) => (
                <div style={{ textAlign: 'center' }}>
                    <Popup
                        content={messages['BTN__EDIT']}
                        trigger={
                            <Button
                                icon="pencil"
                                circular
                                color="yellow"
                                onClick={e => getData(e)}
                            />
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
                onChangeAdd={onChangeAdd}
            />

            <ModalUpdateCompany
                open={openModal}
                close={() => setOpenModal(false)}
                columns={columns}
                data={data}
            />

            <div className="content-top">
                <h3>Компания</h3>
                <Button
                    positive
                    onClick={() => {
                        //create();
                        setOpenModal(true);
                    }}
                >
                    Добавить
                </Button>
            </div>

            <ReactTableWrapper data={data} columns={columns} />
        </div>
    );
}
