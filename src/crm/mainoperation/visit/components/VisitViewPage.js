import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import { Header, Container,   Button, Segment, Grid, Table, Divider, Card } from 'semantic-ui-react'
import moment from 'moment'
import DemoCreateModal from '../../demo/components/DemoCreateModal'
import {fetchSingleVisit} from '../actions/visitAction'
import { connect } from 'react-redux'
import {toggleDemoCreateModal,fetchGroupDealers,fetchDemoResults,fetchReasons} from '../../demo/actions/demoAction'
import ChildDemosTable from '../../demo/components/ChildDemosTable'
import ChildRecosTable from '../../reco/components/ChildRecosTable'

class VisitViewPage extends Component {
  constructor (props) {
    super(props)
    this.loadedSuccess = true
    this.state = {
      updateModalOpened: false,
      demoCreateModalOpened: false
    }

    this.renderActions = this.renderActions.bind(this)
    this.onCloseUpdateModal = this.onCloseUpdateModal.bind(this)
    this.onCloseDemoCreateModal = this.onCloseDemoCreateModal.bind(this)
  }

    componentWillMount(){
        const id = parseInt(this.props.match.params.id, 10)
        this.props.fetchSingleVisit(id)
        //Для создания демо
        this.props.fetchGroupDealers()
        this.props.fetchDemoResults()
        this.props.fetchReasons()
    }

  renderActions () {
    return <div>
      <Link className={'ui icon button'} to={`/crm/visit/archive`}>
                В список
      </Link>
      {/* <Button onClick={this.openUpdateModal}>Редактировать</Button> */}
      <Link className={'ui icon button'} to={`/crm/reco/create/visit/` + this.props.visit.id}>
                Добавить рекомендации
      </Link>

      <Button onClick={() => this.props.toggleDemoCreateModal(true)}>Добавить демо</Button>
    </div>
  }

  renderPhones (phones) {
    if (!phones) {
      return
    }

    return <div>
      {phones.map((p) => {
        return <div key={p.id}>{' ' + p.phoneNumber}</div>
      })}
    </div>
  }

  renderVisitTable () {
    let {visit} = this.props
    return <Card fluid>
      <Card.Content>
        <Card.Header>
                    Данные по визиту
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
                {visit.bukrsName}
              </Table.Cell>
            </Table.Row>

            <Table.Row>
              <Table.Cell>
                <Header as={'h4'}>Филиал</Header>
              </Table.Cell>
              <Table.Cell>
                {visit.branchName}
              </Table.Cell>
            </Table.Row>

            <Table.Row>
              <Table.Cell>
                <Header as={'h4'}>Посетитель</Header>
              </Table.Cell>
              <Table.Cell>
                {visit.visitorName}
              </Table.Cell>
            </Table.Row>

            <Table.Row>
              <Table.Cell>
                <Header as={'h4'}>Дата посещения</Header>
              </Table.Cell>
              <Table.Cell>
                {moment(visit.docDate).format('DD.MM.YYYY')}
              </Table.Cell>
            </Table.Row>

            <Table.Row>
              <Table.Cell>
                <Header as={'h4'}>Адрес</Header>
              </Table.Cell>
              <Table.Cell>
                {visit.address}
              </Table.Cell>
            </Table.Row>

            <Table.Row>
              <Table.Cell>
                <Header as={'h4'}>ФИО супруг</Header>
              </Table.Cell>
              <Table.Cell>
                {visit.clientName}
              </Table.Cell>
            </Table.Row>

            <Table.Row>
              <Table.Cell>
                <Header as={'h4'}>Примечание</Header>
              </Table.Cell>
              <Table.Cell>
                {visit.note}
              </Table.Cell>
            </Table.Row>

          </Table.Body>
        </Table>
      </Card.Content>
    </Card>
  }

  onCloseUpdateModal () {
    this.setState({
      ...this.state,
      updateModalOpened: false
    })
    this.loadItem(this.state.visit.id)
  }

  onCloseDemoCreateModal () {
    this.setState({
      ...this.state,
      demoCreateModalOpened: false
    })
    this.loadItem(this.state.visit.id)
  }

  render () {
        const {visit} = this.props
    return (
      <Container fluid style={{ marginTop: '2em', marginBottom: '2em', paddingLeft: '2em', paddingRight: '2em'}}>
        <Segment clearing>
          <Header as='h2' floated='left'>
                        Визит № {this.props.visit.id}
          </Header>
        </Segment>
        {this.renderActions()}

        <DemoCreateModal
          parentId={0}
          visitId={this.props.visit.id}
          recoId={0}
          dealerId={this.props.visit.visitorId}
          onClose={this.onCloseDemoCreateModal}
        />
        <Divider />
        <Grid>
          <Grid.Row>
            <Grid.Column width={8}>
              {this.renderVisitTable()}
            </Grid.Column>

            <Grid.Column width={8}>
              {<ChildRecosTable items={visit.recos || []}/>}
                {<ChildDemosTable items={visit.demos || []}/>}
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Container>
    )
  }
}
function mapStateToProps (state) {
    return {
        visit:state.crmVisit.visit,
        loader:state.loader
    }
}

export default connect(mapStateToProps, {fetchSingleVisit,toggleDemoCreateModal,fetchGroupDealers,fetchDemoResults,fetchReasons})(VisitViewPage)