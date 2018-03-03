import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import { Tab, Header, Container, Button, Segment, Grid, Table, Divider, Card } from 'semantic-ui-react'
import {ROOT_URL} from '../../../../utils/constants'
import moment from 'moment'
import DemoUpdateModal from './DemoUpdateModal'
import DemoCreateModal from './DemoCreateModal'
import {fetchDemo,toggleDemoUpdateModal,toggleDemoCreateModal} from '../actions/demoAction'
import { connect } from 'react-redux'

class DemoViewPage extends Component {
  constructor (props) {
    super(props)
    this.state = {
      callResultOptions: [],
      callRefuseOptions: [],
      items: [],
      createModalOpened: false
    }

    this.renderActions = this.renderActions.bind(this)
    this.openUpdateModal = this.openUpdateModal.bind(this)
    this.openCreateModal = this.openCreateModal.bind(this)
    this.onCloseCreateModal = this.onCloseCreateModal.bind(this)
  }

  componentWillMount () {
      this.props.fetchDemo(this.props.match.params.id, 10)
  }

    getSourceLink(demo){
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

    renderActions(){
        const {demo} = this.props
        const notDemoDone = demo.resultId === 0 || demo.resultId === 2 || demo.resultId === 3
        return <div>
            <Link className={'ui icon button'} to={`/crm/demo/current`}>
                В список текущих
            </Link>

            <Link className={'ui icon button'} to={`/crm/demo/archive`}>
                В Архив
            </Link>

            <Button onClick={() => window.open(`${ROOT_URL}` + '/crm/demo/print/' + demo.id, 'Print', 'width=1000,height=500')}>Печать</Button>
            <Button onClick={this.openUpdateModal}>Редактировать</Button>
            {notDemoDone ?'':<Link className={'ui icon button'} to={`/crm/reco/create/demo/` + demo.id}>
                    Добавить рекомендации
                </Link>}
            {notDemoDone?'':<Button onClick={this.openCreateModal}>Добавить демо</Button>}
        </div>
    }

  openUpdateModal () {
    this.props.toggleDemoUpdateModal(true)
  }

  openCreateModal () {
        this.props.toggleDemoCreateModal(true)
  }

  renderDemoTable () {
    let {demo} = this.props
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
                {this.getSourceLink(demo)}
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

  renderDemoRecosTable () {
    let {demo} = this.props
    if (!demo.recos) {
      return
    }
    return <Card fluid>
      <Card.Content>
        <Card.Header>
                    Рекомендации
        </Card.Header>
      </Card.Content>
      <Card.Content>
        <Table celled striped>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>#</Table.HeaderCell>
              <Table.HeaderCell>ФИО супруг</Table.HeaderCell>
              <Table.HeaderCell>Статус</Table.HeaderCell>
              <Table.HeaderCell />
            </Table.Row>
          </Table.Header>

                    <Table.Body>
                        {demo.recos.map((item,idx) => {
                            return <Table.Row key={item.id}>
                                    <Table.Cell>{idx+1}</Table.Cell>
                                    <Table.Cell>{item.clientName}</Table.Cell>
                                    <Table.Cell>{item.statusName}</Table.Cell>
                                <Table.Cell><Link className={'ui icon button mini'} to={`/crm/reco/view/` + item.id}>
                                    Просмотр
                                </Link></Table.Cell>
                                </Table.Row>
                        })}
                    </Table.Body>
                </Table>
            </Card.Content>
        </Card>
    }

  onCloseCreateModal () {
    this.setState({
      ...this.state,
      createModalOpened: false
    })
  }

  render () {
        const {demo} = this.props
    return (
      <Container fluid style={{ marginTop: '2em', marginBottom: '2em', paddingLeft: '2em', paddingRight: '2em'}}>
        <Segment clearing>
          <Header as='h2' floated='left'>
                        Демокарта № {this.props.demo.id}
          </Header>
        </Segment>
        {this.renderActions()}
        <DemoUpdateModal />
        <DemoCreateModal
          parentId={this.props.demo.id}
          visitId={0}
          recoId={0}
          dealerId={this.props.demo.dealerId}
          onClose={this.onCloseCreateModal}
        />
        <Divider />
        <Grid>
          <Grid.Row>
            <Grid.Column width={8}>
              {this.renderDemoTable()}
            </Grid.Column>

            <Grid.Column width={8}>
              {this.renderDemoRecosTable()}
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Container>
    )
  }
}

function mapStateToProps (state) {
    return {
        dealers:state.crmDemo.dealers,
        loader:state.loader,
        demo:state.crmDemo.demo
    }
}

export default connect(mapStateToProps, {fetchDemo,toggleDemoUpdateModal,toggleDemoCreateModal})(DemoViewPage)
