import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import { Header, Container, Button, Segment, Grid, Table, Divider, Card,Modal } from 'semantic-ui-react'
import ReactToPrint from "react-to-print";
import {ROOT_URL} from '../../../../utils/constants'
import DemoUpdateModal from './DemoUpdateModal'
import DemoCreateModal from './DemoCreateModal'
import {fetchDemo,toggleDemoUpdateModal,toggleDemoCreateModal,deleteDemo} from '../actions/demoAction'
import { connect } from 'react-redux'
import ChildDemosTable from './ChildDemosTable'
import ChildRecosTable from '../../reco/components/ChildRecosTable'
import DemoViewTable from './DemoViewTable'
import DemoPrintPage from './DemoPrintPage'

class DemoViewPage extends Component {
  constructor (props) {
    super(props)
    this.state = {
      callResultOptions: [],
      callRefuseOptions: [],
      items: [],
      createModalOpened: false,
        showDeleteModal:false,
        showPrintPage:false
    }

    this.renderActions = this.renderActions.bind(this)
    this.openUpdateModal = this.openUpdateModal.bind(this)
    this.openCreateModal = this.openCreateModal.bind(this)
    this.onCloseCreateModal = this.onCloseCreateModal.bind(this)
      this.onBeforePrint = this.onBeforePrint.bind(this)
      this.onAfterPrint = this.onAfterPrint.bind(this)
  }

  componentWillMount () {
      const id = parseInt(this.props.match.params.id, 10);
      this.props.fetchDemo(id)
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
            <ReactToPrint
                trigger={() => <Button>Печать</Button>}
                content={() => this.componentRef}
            />
            <Button onClick={this.openUpdateModal}>Редактировать</Button>
            {notDemoDone ?'':<Link className={'ui icon button'} to={`/crm/reco/create/demo/` + demo.id}>
                    Добавить рекомендации
                </Link>}
            {notDemoDone?'':<Button onClick={this.openCreateModal}>Добавить демо</Button>}
            <Button color={'red'} onClick={() => this.deleteModalTrigger(true)}>Удалить</Button>
        </div>
    }

    onBeforePrint(){
        this.setState({
            ...this.state,
            showPrintPage:true
        })
    }

    onAfterPrint(){
        this.setState({
            ...this.state,
            showPrintPage:false
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
                <p>Удалятся все демонстрации, рекомендации и звонки связанные с данной демо!</p>
                <p>Удалятся: Демо, Звонки, Тел. номера связанные с данной демо!</p>
            </Modal.Content>
            <Modal.Actions>
                <Button onClick={() => this.deleteModalTrigger(false)} negative>
                    Отмена
                </Button>
                <Button onClick={() => this.props.deleteDemo(this.props.demo.id)} positive icon='checkmark' labelPosition='right' content='Удалить' />
            </Modal.Actions>
        </Modal>
    }

  openUpdateModal () {
    this.props.toggleDemoUpdateModal(true)
  }

  openCreateModal () {
        this.props.toggleDemoCreateModal(true)
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
          {this.renderDeleteConfirmModal()}
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
              {<DemoViewTable demo={demo}/>}
            </Grid.Column>

            <Grid.Column width={8}>
              {<ChildRecosTable items={demo.recos || []}/>}
                {<ChildDemosTable items={demo.childDemos || []}/>}
            </Grid.Column>
          </Grid.Row>

            <Grid.Column width={8}>
                <h3>Версия для печати</h3>
                <DemoPrintPage demo={demo} ref={el => (this.componentRef = el)}/>
            </Grid.Column>
            <Grid.Column width={8}>
            </Grid.Column>
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

export default connect(mapStateToProps, {fetchDemo,toggleDemoUpdateModal,toggleDemoCreateModal,deleteDemo})(DemoViewPage)
