import React from 'react';
import { Table,Card,Header } from 'semantic-ui-react'
import Phone from './Phone'
import {formatDMY} from '../../../../utils/helpers'

/**
 * Компонент для рендеринга Таблицу одного Рекоменда
 */

export default function RecoViewTable(props){

    //Single Reco
    const {reco} = props

    return <Card fluid>
        <Card.Content>
            <Card.Header>
                Основная информация
            </Card.Header>
        </Card.Content>
        <Card.Content>
            <Table celled striped>
                <Table.Body>
                    <Table.Row>
                        <Table.Cell>
                            <Header as={'h4'}>Компания</Header>
                        </Table.Cell>
                        <Table.Cell>
                            {reco.bukrsName}
                        </Table.Cell>
                    </Table.Row>

                    <Table.Row>
                        <Table.Cell>
                            <Header as={'h4'}>Филиал</Header>
                        </Table.Cell>
                        <Table.Cell>
                            {reco.branchName}
                        </Table.Cell>
                    </Table.Row>

                    <Table.Row>
                        <Table.Cell>
                            <Header as={'h4'}>Ответсвенный сотрудник</Header>
                        </Table.Cell>
                        <Table.Cell>
                            {reco.responsibleName}
                        </Table.Cell>
                    </Table.Row>

                    <Table.Row>
                        <Table.Cell>
                            <Header as={'h4'}>Дата</Header>
                        </Table.Cell>
                        <Table.Cell>
                            {formatDMY(reco.docDate)}
                        </Table.Cell>
                    </Table.Row>

                    <Table.Row>
                        <Table.Cell>
                            <Header as={'h4'}>ФИО супруг</Header>
                        </Table.Cell>
                        <Table.Cell>
                            {reco.clientName}
                        </Table.Cell>
                    </Table.Row>

                    <Table.Row>
                        <Table.Cell>
                            <Header as={'h4'}>Район</Header>
                        </Table.Cell>
                        <Table.Cell>
                            {reco.district}
                        </Table.Cell>
                    </Table.Row>

                    <Table.Row>
                        <Table.Cell>
                            <Header as={'h4'}>Тел номера</Header>
                        </Table.Cell>
                        <Table.Cell>
                            {<div>
                                {reco.phones ? reco.phones.map((p) => {
                                    return <Phone
                                        key={p.id}
                                        phoneNumber={p.phoneNumber}
                                        phoneId={p.id}
                                        recoId={reco.id}
                                    />
                                }):''}
                            </div>}
                        </Table.Cell>
                    </Table.Row>

                    <Table.Row>
                        <Table.Cell>
                            <Header as={'h4'}>Рекомендатель</Header>
                        </Table.Cell>
                        <Table.Cell>
                            {reco.recommenderName}
                        </Table.Cell>
                    </Table.Row>

                    <Table.Row>
                        <Table.Cell>
                            <Header as={'h4'}>Владелец</Header>
                        </Table.Cell>
                        <Table.Cell>
                            {reco.ownerName}
                        </Table.Cell>
                    </Table.Row>

                    <Table.Row>
                        <Table.Cell>
                            <Header as={'h4'}>Филиал владельца</Header>
                        </Table.Cell>
                        <Table.Cell>
                            {reco.ownerBranchName}
                        </Table.Cell>
                    </Table.Row>

                    <Table.Row>
                        <Table.Cell>
                            <Header as={'h4'}>Род. отношение</Header>
                        </Table.Cell>
                        <Table.Cell>
                            {reco.relative}
                        </Table.Cell>
                    </Table.Row>

                    <Table.Row>
                        <Table.Cell>
                            <Header as={'h4'}>Звонит будет</Header>
                        </Table.Cell>
                        <Table.Cell>
                            {reco.callerIsDealer === 1?'ДИЛЕР':'СЕКРЕТАРЬ'}
                        </Table.Cell>
                    </Table.Row>

                    <Table.Row>
                        <Table.Cell>
                            <Header as={'h4'}>Примечание</Header>
                        </Table.Cell>
                        <Table.Cell>
                            {reco.note}
                        </Table.Cell>
                    </Table.Row>

                    <Table.Row>
                        <Table.Cell>
                            <Header as={'h4'}>Доп. данные</Header>
                        </Table.Cell>
                        <Table.Cell>
                            {''}
                        </Table.Cell>
                    </Table.Row>

                    <Table.Row>
                        <Table.Cell>
                            <Header as={'h4'}>Категория</Header>
                        </Table.Cell>
                        <Table.Cell>
                            {reco.categoryName}
                        </Table.Cell>
                    </Table.Row>

                    <Table.Row>
                        <Table.Cell>
                            <Header as={'h4'}>Статус</Header>
                        </Table.Cell>
                        <Table.Cell>
                            {reco.statusName}
                        </Table.Cell>
                    </Table.Row>

                </Table.Body>
            </Table>
        </Card.Content>
    </Card>
}