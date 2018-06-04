import React,{Component} from 'react'
import _ from 'lodash'
import { Table,Icon,Label,Button,Message } from 'semantic-ui-react'
import {YEAR_OPTIONS,MONTH_OPTIONS} from '../../../../../utils/constants'
import moment from 'moment'
import {REP_954} from '../../hrRepUtil'
import ReactTable from 'react-table';
import 'react-table/react-table.css';

import '../../css/hrRepStyle.css'

export  function RepTable954(props){

    let {items} = props
    if(!items){
        items = []
    }

    const renderPositions = (positions) => {
        return <ul>
            {positions.map((pos => {
                return <li key={pos.salaryId}>{pos.positionName} ({pos.branchName})</li>
            }))}
        </ul>
    }

    const columns = [
        {
            Header: '#',
            accessor: 'timestamp',
            Cell: (props) => {
                const { index } = props;
                return <div>{index + 1}</div>;
            },
            maxWidth: 50,
            Footer: (
                <span>
            <strong>Всего:</strong>{' '}
                    {_.size(items)}
          </span>
            )
        },
        {
            Header: 'Фамилия',
            accessor: 'lastname'
        },
        {
            Header: 'Имя',
            accessor: 'firstname'
        },
        {
            Header: 'Отчество',
            accessor: 'middlename'
        },
        {
            Header: 'Должности',
            id: 'positions',
            accessor: (row) => renderPositions(row.positions || [])
        }
    ];
    return (<ReactTable
        data={items}
        columns={columns}
        pageSizeOptions={[10, 20, 30, 50]}
        defaultPageSize={50}
        previousText="Предыдущий"
        nextText="Следующий"
        loadingText="Загружается..."
        noDataText="Нет записей"
        pageText="Страница"
        ofText="из"
        rowsText="записей"
        className="-highlight"
    />);
}