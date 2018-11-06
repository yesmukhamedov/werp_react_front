import React from 'react';
import { Table,Card } from 'semantic-ui-react'
import {renderCallResultLabel} from '../../../CrmHelper'
import moment from 'moment'

/**
 * Компонент для рендеринга звонки
 */

export default function ChildCallsTable(props){

    //Список звонков
    const {items, messages} = props;

    return <Card fluid>
        <Card.Content>
            <Card.Header>
                {messages['Crm.Calls']}
            </Card.Header>
        </Card.Content>
        <Card.Content>
            <Table celled striped>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell>#</Table.HeaderCell>
                        <Table.HeaderCell>{messages['brnch']}</Table.HeaderCell>
                        <Table.HeaderCell>{messages['Crm.CallDateTime']}</Table.HeaderCell>
                        <Table.HeaderCell>{messages['Crm.Caller']}</Table.HeaderCell>
                        <Table.HeaderCell>{messages['Form.PhoneNumber']}</Table.HeaderCell>
                        <Table.HeaderCell>{messages['Crm.ResultOfCall']}</Table.HeaderCell>
                        <Table.HeaderCell>{messages['Table.Note']}</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>

                <Table.Body>
                    {items.map((item,idx) => {
                        return <Table.Row key={idx}>
                            <Table.Cell>{idx+1}</Table.Cell>
                            <Table.Cell>{item.branchName}</Table.Cell>
                            <Table.Cell>{item.dateTime?moment(item.dateTime).format('DD.MM.YYYY HH:mm'):''}</Table.Cell>
                            <Table.Cell>{item.callerName}</Table.Cell>
                            <Table.Cell>{item.phoneNumber}</Table.Cell>
                            <Table.Cell>{renderCallResultLabel(item.resultId,item.resultName)}</Table.Cell>
                            <Table.Cell>{item.note}</Table.Cell>
                        </Table.Row>
                    })}
                </Table.Body>
            </Table>
        </Card.Content>
    </Card>
}