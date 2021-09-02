import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';
import {
  fetchCollectMonies,
  postApproveCollectMoney,
  postRejectCollectMoney,
} from './foacAction';
import { Segment, Container } from 'semantic-ui-react';
import Table from './components/Table';
import './style.css';
import ConfirmModal from '../../../utils/ConfirmModal';

const Foac = props => {
  const {
    intl: { messages },
    collectMoniesList = [],
  } = props;
  useEffect(() => {
    props.fetchCollectMonies({ bukrs: '1000' });
  }, []);

  const [confirmModal, setConfirmModal] = useState(false);
  const [tempModalData, setTempModalData] = useState({});

  const yesButtonModal = () => {
    props.postRejectCollectMoney(tempModalData.id, () => {
      props.fetchCollectMonies({ bukrs: '1000' });
      setConfirmModal(false);
    });
  };
  const noButtonModal = () => {
    setConfirmModal(false);
  };
  //Принять взнос
  const approveCollectMoney = id => {
    console.log('tempModalData', tempModalData);
    props.postApproveCollectMoney(id, () => {
      props.fetchCollectMonies({ bukrs: '1000' });
      setConfirmModal(false);
    });
  };
  //Отмена взноса
  const rejectCollectMoney = data => {
    setTempModalData(data);
    setConfirmModal(true);
  };
  return (
    <Container
      fluid
      style={{
        marginTop: '1em',
        marginBottom: '1em',
        paddingLeft: '1em',
        paddingRight: '1em',
      }}
    >
      <ConfirmModal
        data={tempModalData}
        text="Вы действительно хотите отменить взнос?"
        open={confirmModal}
        onClose={() => setConfirmModal(false)}
        yesButton={yesButtonModal}
        noButton={noButtonModal}
      />
      <Segment className="space-between">
        <h5>Утверждение взноса</h5>
      </Segment>
      <Table
        messages={messages}
        data={collectMoniesList}
        approve={approveCollectMoney}
        reject={rejectCollectMoney}
      />
    </Container>
  );
};

function mapStateToProps(state) {
  return {
    collectMoniesList: state.foacReducer.collectMoniesList,
  };
}

export default connect(mapStateToProps, {
  fetchCollectMonies,
  postApproveCollectMoney,
  postRejectCollectMoney,
})(injectIntl(Foac));
