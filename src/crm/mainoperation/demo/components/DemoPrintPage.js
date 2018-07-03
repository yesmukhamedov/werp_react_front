import React, {Component} from 'react';
import { Header,Table,Image,Card } from 'semantic-ui-react'
import moment from 'moment'


class DemoPrintPage extends Component{

    constructor(props) {
        super(props)
    }

    render(){
        const {demo} = this.props
        if(!demo.id){
            return null
        }
        return (
            <Card fluid>
                <Card.Content>
                <Image src={'/assets/img/demo-card-logo-aura.png'}/>
                </Card.Content>
                <Card.Content>
                {this.renderTable(demo,this.props.recommender)}
                <br/>
                {this.renderTable(demo,this.props.recommender)}
                </Card.Content>
            </Card>
        )
    }

    renderTable(demo,recommender){
        let parentReco = Object.assign({},demo.parentReco)
        let phones = Object.assign([],parentReco.phones)
        return <Table celled striped className='printTable'>
                            <Table.Body>
                                <Table.Row>
                                    <Table.Cell>
                                        <h3>Демокарта №{demo.id}</h3>
                                    </Table.Cell>
                                    <Table.Cell>
                                        <h4><i>Дилер:</i> {demo.dealerName}</h4>
                                    </Table.Cell>
                                </Table.Row>
                                <Table.Row>
                                    <Table.Cell>
                                        <Header style={{marginLeft:20}} as={'h4'}>Дата-время проведения</Header>
                                    </Table.Cell>
                                    <Table.Cell>
                                        {moment(demo.dateTime).format('DD.MM.YYYY H:mm')}
                                    </Table.Cell>
                                </Table.Row>

                                <Table.Row>
                                    <Table.Cell style={{textAlign:'right'}}>
                                        <Header style={{marginLeft:20}} as={'h4'}>Демо секретарь</Header>
                                    </Table.Cell>
                                    <Table.Cell>
                                        {demo.appointerName}
                                    </Table.Cell>
                                </Table.Row>


                                <Table.Row>
                                    <Table.Cell>
                                        <Header style={{marginLeft:20}} as={'h4'}>Рекомендатель</Header>
                                    </Table.Cell>
                                    <Table.Cell>
                                        {recommender.clientName},
                                        {recommender.phones?recommender.phones.map(p => {
                                            return <span key={p.id} style={{marginLeft: '5px'}}>{p.phoneNumber}</span>
                                        }):''}
                                    </Table.Cell>
                                </Table.Row>

                                <Table.Row>
                                    <Table.Cell>
                                        <Header style={{marginLeft:20}} as={'h4'}>Род. отношение</Header>
                                    </Table.Cell>
                                    <Table.Cell>{recommender.relative}</Table.Cell>
                                </Table.Row>

                                <Table.Row>

                                <Table.Cell style={{textAlign:'right'}}>
                                        <Header style={{marginLeft:20}} as={'h4'}>ФИО клиента</Header>
                                    </Table.Cell>
                                    <Table.Cell>{demo.clientName}</Table.Cell>

                                </Table.Row>

                                <Table.Row>
                                    <Table.Cell>
                                        <Header style={{marginLeft:20}} as={'h4'}>Тел. номер клиента</Header>
                                    </Table.Cell>
                                    <Table.Cell>
                                        {phones.map(p => {
                                            return <span key={p.id}>{p.phoneNumber} &nbsp;</span>
                                        })}
                                    </Table.Cell>
                                </Table.Row>
                                <Table.Row>

                                    <Table.Cell style={{textAlign:'right'}}>
                                        <Header style={{marginLeft:20}} as={'h4'}>Примечание</Header>
                                    </Table.Cell>
                                    <Table.Cell>
                                        {demo.note}
                                    </Table.Cell>

                                </Table.Row>

                                <Table.Row>
                                    <Table.Cell>
                                        <Header style={{marginLeft:20}} as={'h4'}>Адрес клиента</Header>
                                    </Table.Cell>
                                    <Table.Cell>{demo.address}</Table.Cell>
                                </Table.Row>

                                <Table.Row>

                                </Table.Row>
                            </Table.Body>
                        </Table>
    }
}
export default DemoPrintPage;