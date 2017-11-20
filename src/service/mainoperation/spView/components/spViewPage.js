import React, {Component} from 'react'
import {Button, Table, Icon, Label, Input, Form, Dropdown, Grid, Header, Segment, Container} from 'semantic-ui-react'
import axios from 'axios'
import {ROOT_URL} from '../../../../utils/constants'

export default class extends Component {
    constructor(props) {
        super(props)
        this.state = {
            servicePacketNumber: 261,
            servicePacketData: undefined
        }
    }

    componentWillMount() {
        axios.get(`${ROOT_URL}/api/service/packets/${this.state.servicePacketNumber}`, {
            headers: {
                authorization: localStorage.getItem('token')
            }
        })
        .then(({data}) => {
            this.setState({servicePacketData: data})
        }, () => {
            console.log("SPVIEW state:", this.state)
        })
        .catch(err => console.log(err))
    }

    render() {
        return (
            <Container fluid style={{marginTop: '2em', marginBottom: '2em', paddingLeft: '2em', paddingRight: '2em'}}>
                <Form>
                    <Segment padded size='small'>
                        <Label attached='top'>
                            <Header as='h3'>Создать сервис пакет</Header>
                        </Label>
                        <Grid columns='five' divided>
                            <Grid.Row>
                                <Grid.Column width={3}>
                                    <Form.Field>
                                        <label>Компания</label>
                                    </Form.Field>
                                    <Form.Field>
                                        <label>Страна</label>
                                    </Form.Field>
                                    <Form.Field>
                                        <label>Категория</label>
                                    </Form.Field>
                                    <Form.Field>
                                        <label>Товар</label>
                                    </Form.Field>
                                </Grid.Column>
                                <Grid.Column width={5}>
                                    <Form.Field>
                                        <label>Название</label>
                                        <Input
                                            type='text'
                                            placeholder='Название' />
                                    </Form.Field>
                                    <Form.Field>
                                        <label>Примечание</label>
                                        <Input
                                            type='text'
                                            placeholder='Примечание' />
                                    </Form.Field>
                                    <Form.Field>
                                        <label>Дата начала действия</label>
                                        <Input
                                            type='text'
                                            placeholder='Примечание' />
                                    </Form.Field>
                                </Grid.Column>
                            </Grid.Row>
                        </Grid>
                    </Segment>
                </Form>

                <Table celled color='black' striped>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell/>
                            <Table.HeaderCell colSpan='8'></Table.HeaderCell>
                        </Table.Row>
                        <Table.Row>
                            <Table.HeaderCell collapsing>#</Table.HeaderCell>
                            <Table.HeaderCell>Операция</Table.HeaderCell>
                            <Table.HeaderCell collapsing>Материал</Table.HeaderCell>
                            <Table.HeaderCell>Код</Table.HeaderCell>
                            <Table.HeaderCell>Описание</Table.HeaderCell>
                            <Table.HeaderCell>Цена</Table.HeaderCell>
                            <Table.HeaderCell>Количество (шт.)</Table.HeaderCell>
                            <Table.HeaderCell>Сумма</Table.HeaderCell>
                            <Table.HeaderCell collapsing></Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>
                    <Table.Body>
                    </Table.Body>
                    <Table.Footer fullWidth>
                        <Table.Row>
                            <Table.HeaderCell
                                colSpan='8'
                                style={{
                                textAlign: 'right'
                            }}>Total</Table.HeaderCell>
                            <Table.HeaderCell
                                style={{
                                textAlign: 'center'
                            }}></Table.HeaderCell>
                        </Table.Row>
                    </Table.Footer>
                </Table>

                <Table celled color='black' striped>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell colSpan='6'/>
                        </Table.Row>
                        <Table.Row>
                            <Table.HeaderCell collapsing>#</Table.HeaderCell>
                            <Table.HeaderCell collapsing>Материал</Table.HeaderCell>
                            <Table.HeaderCell>Код</Table.HeaderCell>
                            <Table.HeaderCell>Описание</Table.HeaderCell>
                            <Table.HeaderCell>Гарантия (в мес.)</Table.HeaderCell>
                            <Table.HeaderCell collapsing></Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>
                    <Table.Body>
                    </Table.Body>
                </Table>

                <Grid columns={3}>
                    <Grid.Row>
                        <Grid.Column>
                            <Segment padded>
                                <Form>
                                    <Form.Input label='Сумма к оплате' placeholder='Сумма к оплате'/>
                                    <Form.Input
                                        label='Премия Мастера'
                                        placeholder='Премия Мастера' />
                                    <Form.Input
                                        label='Премия оператора'
                                        placeholder='Премия оператора' />
                                </Form>
                            </Segment>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </Container>
        )
    }
}