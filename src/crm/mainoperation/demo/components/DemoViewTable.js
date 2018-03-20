import React from 'react';
import { Table,Card,Header } from 'semantic-ui-react'
import {Link} from 'react-router-dom'
import moment from 'moment'

/**
 * Компонент для рендеринга Таблицу одного демо
 */

export default function DemoViewTable(props){

    //Single Demo
    const {demo} = props;

    return <Card fluid>
        <Card.Content>
            <Card.Header>Основная информация</Card.Header>
        </Card.Content>
        <Card.Content>
            <Table celled striped>
                <Table.Body>
                    <Table.Row>
                        <Table.Cell>
                            <Header as={'h4'}>Компания</Header>
                        </Table.Cell>
                        <Table.Cell>
                            {demo.bukrsName}
                        </Table.Cell>
                    </Table.Row>

                    <Table.Row>
                        <Table.Cell>
                            <Header as={'h4'}>Филиал</Header>
                        </Table.Cell>
                        <Table.Cell>
                            {demo.branchName}
                        </Table.Cell>
                    </Table.Row>

                    <Table.Row>
                        <Table.Cell>
                            <Header as={'h4'}>Дилер</Header>
                        </Table.Cell>
                        <Table.Cell>
                            {demo.dealerName}
                        </Table.Cell>
                    </Table.Row>

                    <Table.Row>
                        <Table.Cell>
                            <Header as={'h4'}>Назначел(а)</Header>
                        </Table.Cell>
                        <Table.Cell>
                            {demo.appointerName}
                        </Table.Cell>
                    </Table.Row>

                    <Table.Row>
                        <Table.Cell>
                            <Header as={'h4'}>Номер телефона</Header>
                        </Table.Cell>
                        <Table.Cell>
                            {demo.phoneNumber}
                        </Table.Cell>
                    </Table.Row>

                    <Table.Row>
                        <Table.Cell>
                            <Header as={'h4'}>Источник</Header>
                        </Table.Cell>
                        <Table.Cell>
                            {getSourceLink(demo)}
                        </Table.Cell>
                    </Table.Row>

                    <Table.Row>
                        <Table.Cell>
                            <Header as={'h4'}>Дата-время проведения</Header>
                        </Table.Cell>
                        <Table.Cell>
                            {moment(demo.dateTime).format('DD.MM.YYYY H:mm')}
                        </Table.Cell>
                    </Table.Row>

                    <Table.Row>
                        <Table.Cell>
                            <Header as={'h4'}>Клиент</Header>
                        </Table.Cell>
                        <Table.Cell>
                            {demo.clientName}
                        </Table.Cell>
                    </Table.Row>

                    <Table.Row>
                        <Table.Cell>
                            <Header as={'h4'}>Адрес</Header>
                        </Table.Cell>
                        <Table.Cell>
                            {demo.address}
                        </Table.Cell>
                    </Table.Row>

                    <Table.Row>
                        <Table.Cell>
                            <Header as={'h4'}>Результат демо</Header>
                        </Table.Cell>
                        <Table.Cell>
                            {demo.resultName}
                        </Table.Cell>
                    </Table.Row>

                    <Table.Row>
                        <Table.Cell>
                            <Header as={'h4'}>Причина</Header>
                        </Table.Cell>
                        <Table.Cell>
                            {demo.reasonName}
                        </Table.Cell>
                    </Table.Row>

                    <Table.Row>
                        <Table.Cell>
                            <Header as={'h4'}>Примечание</Header>
                        </Table.Cell>
                        <Table.Cell>
                            {demo.note}
                        </Table.Cell>
                    </Table.Row>

                    <Table.Row>
                        <Table.Cell>
                            <Header as={'h4'}>№ договора</Header>
                        </Table.Cell>
                        <Table.Cell>
                            {demo.contractNumber}
                        </Table.Cell>
                    </Table.Row>

                    <Table.Row>
                        <Table.Cell>
                            <Header as={'h4'}>Дата продажи</Header>
                        </Table.Cell>
                        <Table.Cell>
                            {demo.saleDate ? moment(demo.saleDate).format('DD.MM.YYYY') : ''}
                        </Table.Cell>
                    </Table.Row>

                    <Table.Row>
                        <Table.Cell>
                            <Header as={'h4'}>Дата-время создания</Header>
                        </Table.Cell>
                        <Table.Cell>
                            {moment(demo.createdAt).format('DD.MM.YYYY H:mm')}
                        </Table.Cell>
                    </Table.Row>

                </Table.Body>
            </Table>
        </Card.Content>
    </Card>
}

function getSourceLink(demo){
    if(demo.visitId > 0){
        return <Link className={'button'} to={`/crm/visit/view/` + demo.visitId}>
            Визит № {demo.visitId}
        </Link>
    }else if(demo.recoId > 0){
        return <Link className={'button'} to={`/crm/reco/view/` + demo.recoId}>
            Рекомендация № {demo.recoId}
        </Link>
    }else if(demo.parentId > 0){
        return <Link className={'button'} to={`/crm/demo/view/` + demo.recoId}>
            Демо № {demo.parentId}
        </Link>
    }else{
        return;
    }
}