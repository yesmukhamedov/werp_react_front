import React, {Component} from 'react';
import { Header,Container,Segment,Form,Table,Loader,Image } from 'semantic-ui-react'
import moment from 'moment'
const hiddenTable = {
    display:'none'
}

const headerStyle = {
    marginLeft:10
}

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
            <Container fluid style={{ margin: '10px', paddingLeft: '2em', paddingRight: '2em'}}>
                <Image src={'/assets/img/demo-card-logo-aura.png'}/>
                {this.renderTable(demo)}
                <br/><br/>
                {this.renderTable(demo)}
            </Container>
        )
    }

    renderTable(demo){
        return <Table celled striped >
            <Table.Body>
                <Table.Row>
                    <Table.Cell>
                        <Header style={{marginLeft:20}} as={'h4'}>Дата-время проведения</Header>
                    </Table.Cell>
                    <Table.Cell>
                        {moment(demo.dateTime).format('DD.MM.YYYY H:mm')}
                    </Table.Cell>
                </Table.Row>

                <Table.Row>
                    <Table.Cell>
                        <Header style={{marginLeft:20}} as={'h4'}>ФИО дилера</Header>
                    </Table.Cell>
                    <Table.Cell>
                        {demo.dealerName}
                    </Table.Cell>
                </Table.Row>

                <Table.Row>
                    <Table.Cell>
                        <Header style={{marginLeft:20}} as={'h4'}>Менеджер</Header>
                    </Table.Cell>
                    <Table.Cell>Man</Table.Cell>
                </Table.Row>

                <Table.Row>
                    <Table.Cell>
                        <Header style={{marginLeft:20}} as={'h4'}>Демо секретарь</Header>
                    </Table.Cell>
                    <Table.Cell>
                        {demo.appointerName}
                    </Table.Cell>
                </Table.Row>


                <Table.Row>
                    <Table.Cell>
                        <Header style={{marginLeft:20}} as={'h4'}>ФИО рекомендателя</Header>
                    </Table.Cell>
                    <Table.Cell>{demo.recommender.name}</Table.Cell>
                </Table.Row>

                <Table.Row>
                    <Table.Cell>
                        <Header style={{marginLeft:20}} as={'h4'}>ФИО клиента</Header>
                    </Table.Cell>
                    <Table.Cell>{demo.clientName}</Table.Cell>
                </Table.Row>

                <Table.Row>
                    <Table.Cell>
                        <Header style={{marginLeft:20}} as={'h4'}>Тел. номер клиента</Header>
                    </Table.Cell>
                    <Table.Cell>{demo.phoneNumber}</Table.Cell>
                </Table.Row>

                <Table.Row>
                    <Table.Cell>
                        <Header style={{marginLeft:20}} as={'h4'}>Адрес клиента</Header>
                    </Table.Cell>
                    <Table.Cell>{demo.address}</Table.Cell>
                </Table.Row>

                <Table.Row>
                    <Table.Cell>
                        <Header style={{marginLeft:20}} as={'h4'}>Примечание</Header>
                    </Table.Cell>
                    <Table.Cell>
                        {demo.note}
                    </Table.Cell>
                </Table.Row>
            </Table.Body>
        </Table>
    }
}
export default DemoPrintPage;