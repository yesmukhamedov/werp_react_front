import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import { Header,Container,Button,Segment,Grid,Table,Divider,Card,Modal } from 'semantic-ui-react'
import axios from 'axios';
import {ROOT_URL} from '../../../../utils/constants';
import RecoUpdateModal from './RecoUpdateModal';
import Phone from './Phone';
import moment from 'moment';
import {fetchSingleReco,toggleRecoUpdateModal,fetchCallResults} from '../actions/recoAction'
import {fetchReasons} from '../../demo/actions/demoAction'
import { connect } from 'react-redux'

class RecoViewPage extends Component {
  constructor (props) {
    super(props)
    this.loadedSuccess = true
    this.state = {
      calls: [],
      demos: [],
      callResultOptions: [],
      callRefuseOptions: [],
      items: [],
      loading: false,
      updateModalOpened: false,
      showDeleteModal: false,
      showPhoneUpdateModal: false
    }

    this.renderActions = this.renderActions.bind(this)
    this.openUpdateModal = this.openUpdateModal.bind(this)
    this.onCloseUpdateModal = this.onCloseUpdateModal.bind(this)
    this.deleteModalTrigger = this.deleteModalTrigger.bind(this)
    this.deleteItem = this.deleteItem.bind(this)
  }

    componentWillMount(){
        const id = parseInt(this.props.match.params.id, 10)
        this.props.fetchSingleReco(id)
        this.props.fetchCallResults()
        this.props.fetchReasons()
  }

    deleteItem(){
        axios.delete(`${ROOT_URL}/api/crm/reco/` + this.state.reco.id,{
            headers: {
                authorization: localStorage.getItem('token')}
        }).then((response) => {
            window.location = '/crm/reco/current';
        }).catch(e => {
            this.deleteModalTrigger(false);
            if(e.response && e.response.data){
                alert(e.response.data['message']);
            }
        })
    }

  deleteModalTrigger (showDeleteModal) {
    this.setState({
      ...this.state,
      showDeleteModal: showDeleteModal
    })
  }

    renderDeleteConfirmModal(){
        return <Modal open={this.state.showDeleteModal}>
            <Modal.Header>ПРЕДУПРЕЖДЕНИЕ!</Modal.Header>
            <Modal.Content>
                <p>Удалятся все демонстрации, рекомендации и звонки связанные с данной рекомендацией!</p>
                <p>Удалятся: Демо, Звонки, Тел. номера связанные с данной рекомендацией!</p>
            </Modal.Content>
            <Modal.Actions>
                <Button onClick={() => this.deleteModalTrigger(false)} negative>
                    Отмена
        </Button>
        <Button onClick={this.deleteItem} positive icon='checkmark' labelPosition='right' content='Удалить' />
      </Modal.Actions>
    </Modal>
  }

    renderActions(){
        return <div>
            <Link className={'ui icon button'} to={`/crm/reco/current`}>
                В список текущих
            </Link>

            <Link className={'ui icon button'} to={`/crm/reco/archive`}>
                В Архив
            </Link>

            <Button onClick={() => this.props.toggleRecoUpdateModal(true)}>Редактировать</Button>
            <Button color={'red'} onClick={() => this.deleteModalTrigger(true)}>Удалить</Button>
    </div>
  }

  openUpdateModal () {
    this.setState({
      ...this.state,
      updateModalOpened: true
    })
  }

  renderPhones (phones) {
    if (!phones) {
      return
    }

    return <div>
      {phones.map((p) => {
        return <Phone
          key={p.id}
          phoneNumber={p.phoneNumber}
          phoneId={p.id}
          recoId={this.props.reco.id}
          onCallSaved={this.onCallSaved}
        />
      })}
    </div>
  }

  renderRecoTable () {
    let {reco} = this.props
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
                {reco.districtName}
              </Table.Cell>
            </Table.Row>

            <Table.Row>
              <Table.Cell>
                <Header as={'h4'}>Тел номера</Header>
              </Table.Cell>
              <Table.Cell>
                {this.renderPhones(reco.phones)}
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

  renderCallsTable () {
    let {reco} = this.props
      let calls = reco.calls || []

    return <Card fluid>
      <Card.Content>
        <Card.Header>
                    Звонки
        </Card.Header>
      </Card.Content>
      <Card.Content>
        <Table celled striped>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>#</Table.HeaderCell>
              <Table.HeaderCell>Филиал</Table.HeaderCell>
              <Table.HeaderCell>Дата-время звонка</Table.HeaderCell>
              <Table.HeaderCell>Звонил(а)</Table.HeaderCell>
              <Table.HeaderCell>Номер</Table.HeaderCell>
              <Table.HeaderCell>Результат</Table.HeaderCell>
              <Table.HeaderCell>Примечание</Table.HeaderCell>
            </Table.Row>
          </Table.Header>

                    <Table.Body>
                        {calls.map((item,idx) => {
                            return <Table.Row key={idx}>
                                <Table.Cell>{idx+1}</Table.Cell>
                                <Table.Cell>{item.branchName}</Table.Cell>
                                <Table.Cell>{item.callDate?moment(item.callDate).format('DD.MM.YYYY HH:mm'):''}</Table.Cell>
                                <Table.Cell>{item.callerName}</Table.Cell>
                                <Table.Cell>{item.phoneNumber}</Table.Cell>
                                <Table.Cell>{item.callResultName}</Table.Cell>
                                <Table.Cell>{item.callNote}</Table.Cell>
                            </Table.Row>
                        })}
                    </Table.Body>
                </Table>
            </Card.Content>
        </Card>
    }

  renderDemosTable () {
    let {reco} = this.props
    let demos = reco.demos || []

    return <Card fluid>
      <Card.Content>
        <Card.Header>
                    Демонстрации
        </Card.Header>
      </Card.Content>
      <Card.Content>
        <Table celled striped>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>#</Table.HeaderCell>
              <Table.HeaderCell>Филиал</Table.HeaderCell>
              <Table.HeaderCell>Клиент</Table.HeaderCell>
              <Table.HeaderCell>Дата-время</Table.HeaderCell>
              <Table.HeaderCell>Звонил(а)</Table.HeaderCell>
              <Table.HeaderCell>Результат</Table.HeaderCell>
              <Table.HeaderCell>Примечание</Table.HeaderCell>
            </Table.Row>
          </Table.Header>

                    <Table.Body>
                        {demos.map((item,idx) => {
                            return <Table.Row key={idx}>
                                <Table.Cell>
                                    <Link to={`/crm/demo/view/` + item.demoId}>
                                        {idx+1}
                                    </Link>
                                </Table.Cell>
                                <Table.Cell>{item.branchName}</Table.Cell>
                                <Table.Cell>{item.demoClientName}</Table.Cell>
                                <Table.Cell>{item.demoDate?moment(item.demoDate).format('DD.MM.YYYY HH:mm'):''}</Table.Cell>
                                <Table.Cell>{item.callerName}</Table.Cell>
                                <Table.Cell>{item.demoResultName}</Table.Cell>
                                <Table.Cell>{item.demoNote}</Table.Cell>
                            </Table.Row>
                        })}
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
    this.loadItem(this.state.reco.id)
  }

  render () {
    return (
      <Container fluid style={{ marginTop: '2em', marginBottom: '2em', paddingLeft: '2em', paddingRight: '2em'}}>
        <Segment clearing>
          <Header as='h2' floated='left'>Рекомендация № {this.props.reco.id}</Header>
        </Segment>
        {this.renderActions()}
        <RecoUpdateModal
          modalOpened={this.state.updateModalOpened}
          reco={this.state.reco}
          onClose={this.onCloseUpdateModal}
        />
        <Divider />
        <Grid>
          <Grid.Row>
            <Grid.Column width={6}>
              {this.renderRecoTable()}
            </Grid.Column>

            <Grid.Column width={10}>
              {this.renderCallsTable()}
              {this.renderDemosTable()}
            </Grid.Column>
          </Grid.Row>
        </Grid>
        {this.renderDeleteConfirmModal()}
      </Container>
    )
  }
}

function mapStateToProps (state) {
    return {
        reco:state.crmReco.reco,
        loader:state.loader
    }
}

export default connect(mapStateToProps, {fetchSingleReco,toggleRecoUpdateModal,fetchCallResults,fetchReasons})(RecoViewPage)
