import React, { Component } from 'react';
import { connect } from 'react-redux';

import {
  Header,
  Container,
  Segment,
  Divider,
  Loader,
  Form,
  Modal,
  Button,
} from 'semantic-ui-react';
import HrDocActions from './HrDocActions';
import HrDocMainData from './HrDocMainData';
import HrDocData from './HrDocData';
import HrDocApprovers from './HrDocApprovers';
import HrDocLog from './HrDocLog';
import {
  fetchDocument,
  handleAction,
  localUpdateDocItems,
  toggleItemAmountEditMode,
  addAmount,
  removeApprove,
} from '../actions/hrDocAction';
import {
  DOC_ACTION_GO_TO_LIST,
  DOC_ACTION_ADD_APPROVER,
  DOC_ACTION_REJECT,
  DOC_ACTION_ADD_AMOUNT,
} from '../../../hrUtil';
import browserHistory from '../../../../utils/history';
import StaffListModal from '../../staff/components/StaffListModal';
import {
  fetchAllCurrentStaffs,
  toggleStaffListModal,
} from '../../staff/actions/hrStaffAction';
import { f4FetchCurrencyList } from '../../../../reference/f4/f4_action';
import StaffF4Modal from '../../../../reference/f4/staff/staffF4Modal';

let STAFF_MODAL_OPENED_ON_ACTION = -10;
const DOC_STATUS_ON_EXECUTION = 4;

class HrDocViewPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      //Модальное окно для добавление Согласующих
      approversModalOpened: false,
      //Модальное окно для примечание, в случае отказа
      rejectNoteModalOpened: false,
      refuseNote: '',
      //Редактирование Оклада
      amountEditMode: false,
    };
  }

  componentWillMount() {
    const id = parseInt(this.props.match.params.id, 10);
    this.props.fetchDocument(id);
    this.props.fetchAllCurrentStaffs([]);
    this.props.f4FetchCurrencyList('hr_doc');
  }

  handleAction = actionType => {
    switch (actionType) {
      case DOC_ACTION_GO_TO_LIST:
        browserHistory.push('/hr/doc/recruitment');
        break;

      case DOC_ACTION_ADD_APPROVER:
        STAFF_MODAL_OPENED_ON_ACTION = actionType;
        this.setState({
          approversModalOpened: true,
        });
        break;

      case DOC_ACTION_REJECT:
        this.setState({
          rejectNoteModalOpened: true,
          refuseNote: '',
        });
        break;

      case DOC_ACTION_ADD_AMOUNT:
        this.props.toggleItemAmountEditMode(true);
        break;

      default:
        let document = Object.assign({}, this.props.document);
        this.props.handleAction(document, actionType);
        break;
    }
  };

  handleRejectAction = () => {
    let document = Object.assign({}, this.props.document);
    this.props.handleAction(document, DOC_ACTION_REJECT, this.state.refuseNote);
  };

  addApprover = staff => {
    let document = Object.assign({}, this.props.document);
    let approvers = document.approvers || [];
    let positions = staff.positions || [];
    let pos = positions[0] || {};
    approvers.push({
      id: null,
      positionId: pos.positionId,
      positionName: pos.positionName,
      staffId: staff.staffId,
      staffName: staff.staffName,
      statusId: 0,
      statusName: 'Не делал действии',
    });

    document['approvers'] = approvers;

    this.props.handleAction(document, DOC_ACTION_ADD_APPROVER, staff);
  };

  handleStaffSelect = staff => {
    switch (STAFF_MODAL_OPENED_ON_ACTION) {
      case DOC_ACTION_ADD_APPROVER:
        this.addApprover(staff);
        break;

      default:
        console.log(staff);
        break;
    }
  };

  onRefuseModalNoteChange = v => {
    this.setState({
      refuseNote: v,
    });
  };

  renderRejectNoteModal = () => {
    return (
      <Modal
        open={this.state.rejectNoteModalOpened}
        onClose={this.close}
        dimmer={'inverted'}
        size="small"
      >
        <Modal.Header>Напишите причину отказа</Modal.Header>
        <Modal.Content>
          <Form>
            <Form.Group widths="equal">
              <textarea
                className="ui fluid"
                onChange={e => this.onRefuseModalNoteChange(e.target.value)}
              />
            </Form.Group>
            <Form.Group widths="equal">
              <Button primary onClick={this.handleRejectAction}>
                Отправить
              </Button>

              <Button
                color={'red'}
                onClick={() =>
                  this.setState({
                    rejectNoteModalOpened: false,
                    refuseNote: '',
                  })
                }
              >
                Отмена
              </Button>
            </Form.Group>
          </Form>
        </Modal.Content>
      </Modal>
    );
  };

  handleItemChange = (fieldName, id, value) => {
    let document = Object.assign({}, this.props.document);
    let items = document.items || [];
    let updatedItems = [];
    for (let k in items) {
      if (items[k]['id'] === id) {
        items[k][fieldName] = value;
      }

      updatedItems[k] = items[k];
    }

    this.props.localUpdateDocItems(updatedItems);
  };

  saveDocumentItems = () => {
    let document = Object.assign({}, this.props.document);
    let items = document.items || [];
    this.props.addAmount(document, items);
  };

  removeApprover = id => {
    this.props
      .removeApprove(id)
      .then(({ data }) => {
        window.location.reload();
      })
      .catch(e => {
        if (e.response && e.response.data && e.response.data.message) {
          window.alert(e.response.data.message);
        } else {
          window.alert('Ошибка! Обратитесь администратору!');
        }
      });
  };

  render() {
    let document = Object.assign({}, this.props.document);
    return (
      <Container
        fluid
        style={{
          marginTop: '2em',
          marginBottom: '2em',
          paddingLeft: '2em',
          paddingRight: '2em',
        }}
      >
        <Segment clearing>
          <Header as="h2" floated="left">
            Просмотр документа {document.typeName}, № {document.id}
          </Header>
          <HrDocActions
            handleAction={this.handleAction}
            items={this.props.actions}
          />
        </Segment>
        <Divider clearing />
        <StaffF4Modal
          open={this.state.approversModalOpened}
          messages={[]}
          closeModal={() => this.setState({ approversModalOpened: false })}
          onStaffSelect={item => this.handleStaffSelect(item)}
          trans={'hr_doc_approvers'}
          branchOptions={this.props.branchOptions}
          companyOptions={this.props.bukrsOptions}
          bukrsDisabledParent={false}
        />
        {this.renderRejectNoteModal()}
        {this.props.pageLoading ? (
          <Loader inline="centered" active />
        ) : (
          <div>
            <HrDocMainData item={document} />
            <HrDocData
              saveDocumentItems={this.saveDocumentItems}
              handleItemChange={this.handleItemChange}
              amountEditMode={this.props.itemAmountEditMode}
              typeId={this.props.document.typeId}
              items={this.props.document.items}
              currencyList={this.props.currencyList}
            />
            <HrDocApprovers
              showRemoveButtons={document.statusId === DOC_STATUS_ON_EXECUTION}
              removeApprover={this.removeApprover}
              items={this.props.approvers}
            />
            <HrDocLog items={this.props.actionLogs} />
          </div>
        )}
      </Container>
    );
  }
}

function mapStateToProps(state) {
  return {
    document: state.hrDocReducer.document,
    actions: state.hrDocReducer.actions,
    approvers: state.hrDocReducer.approvers,
    actionLogs: state.hrDocReducer.actionLogs,
    pageLoading: state.hrDocReducer.pageLoading,
    itemAmountEditMode: state.hrDocReducer.itemAmountEditMode,
    staffListModalOpened: state.hrStaff.staffListModalOpened,
    allCurrentStaffs: state.hrStaff.allCurrentStaffs,
    currencyList: state.f4.currencyList,
    bukrsOptions: state.userInfo.companyOptions,
    branchOptions: state.userInfo.branchOptionsAll,
  };
}

export default connect(
  mapStateToProps,
  {
    fetchDocument,
    handleAction,
    fetchAllCurrentStaffs,
    toggleStaffListModal,
    localUpdateDocItems,
    toggleItemAmountEditMode,
    addAmount,
    f4FetchCurrencyList,
    removeApprove,
  },
)(HrDocViewPage);
