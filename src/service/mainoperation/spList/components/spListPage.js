import React, {Component} from 'react'
import {
    Table,
    Icon,
    Container,
    Checkbox
} from 'semantic-ui-react'
import SearchPanel from './SearchPanel'

export default class SpList extends Component {
    constructor(props) {
        super(props)
        this.state = {
            servicePacketNumber: 261,
            servicePacketData: undefined
        }
    }

    componentWillMount() {
    }

    render() { 
        return (
            <Container
                fluid
                style = {{
                marginTop: '2em',
                marginBottom: '2em',
                paddingLeft: '2em',
                paddingRight: '2em'
            }} > 
                <SearchPanel />
                <Table celled color='black' striped>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell collapsing>#</Table.HeaderCell>
                            <Table.HeaderCell>Название</Table.HeaderCell>
                            <Table.HeaderCell>Компания</Table.HeaderCell>
                            <Table.HeaderCell>Страна</Table.HeaderCell>
                            <Table.HeaderCell>Дата создания</Table.HeaderCell>
                            <Table.HeaderCell>Категория</Table.HeaderCell>
                            <Table.HeaderCell>Товар/Модель</Table.HeaderCell>
                            <Table.HeaderCell>Период</Table.HeaderCell>
                            <Table.HeaderCell collapsing></Table.HeaderCell>
                            <Table.HeaderCell collapsing></Table.HeaderCell>
                        </Table.Row>
                        <Table.Row>
                            <Table.Cell>1</Table.Cell>
                            <Table.Cell>John Lilki</Table.Cell>
                            <Table.Cell>John Lilki</Table.Cell>
                            <Table.Cell>John Lilki</Table.Cell>
                            <Table.Cell>John Lilki</Table.Cell>
                            <Table.Cell>John Lilki</Table.Cell>
                            <Table.Cell>John Lilki</Table.Cell>
                            <Table.Cell>John Lilki</Table.Cell>
                            <Table.Cell collapsing>
                                <Checkbox slider/>
                            </Table.Cell>
                            <Table.Cell collapsing>
                                <Icon name='eye' size='large'/>
                            </Table.Cell>
                        </Table.Row>
                    </Table.Header>
                    <Table.Body></Table.Body>
                </Table> 
            </Container>
        )
    }
}