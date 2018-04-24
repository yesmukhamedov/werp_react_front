import React from 'react'
import {Modal,List } from 'semantic-ui-react'
import ReactTable from 'react-table';
import "react-table/react-table.css";

export default function StaffListModal (props) {
    const {staffs,opened} = props
    const positionRenderer = (positions) => {
        if(typeof positions !== 'undefined' && positions.length>0){
            return <List bulleted>
                {positions.map((p,idx) => {
                    return <List.Item key={idx}>{p.positionName} ({p.branchName})</List.Item>;
                })}
            </List>
        }

        return '';
    }
    const columns = [
        {
            Header: 'staffId',
            accessor: 'staffId'
        },
        {
            Header:"Фамилия",
            accessor:"lastname"
        },
        {
            Header:"Имя",
            accessor:"firstname"
        },
        {
            Header:"Отчество",
            accessor:"middlename"
        },
        {
            Header: "Должности",
            id:"positions",
            accessor: row => positionRenderer(row.positions)
        }
    ]
    return (
        <Modal size={'large'} open={opened}>
            <Modal.Header>Список сотрудников</Modal.Header>
            <Modal.Content>
                <ReactTable
                    filterable
                    data={staffs || []}
                    columns={columns}
                    defaultPageSize={20}
                    showPagination={true}
                    loadingText= 'Loading...'
                    noDataText= 'Нет записей'
                    className="-striped -highlight"
                    previousText={'Пред.'}
                    nextText={'След.'}
                    rowsText={'строк'}
                    pageText={'Страница'}
                    ofText={'из'}
                    showPageSizeOptions= {false}
                    getTrProps={(state, rowInfo, column) => {
                        return {
                            onClick: (e, handleOriginal) => {
                                props.onSelect(rowInfo.original);
                            },
                        };
                    }}

                />
            </Modal.Content>
        </Modal>
    )
}