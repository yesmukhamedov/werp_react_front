import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import {
  Header,
  Icon,
  Segment,
  Button,
  Container,
  Modal,
} from 'semantic-ui-react';
import List from './list';
//
import { fetchDmsplist, getDmspLstMatrns } from '../../marketingAction';
import {
  f4FetchCountryList,
  f4FetchWerksBranchList,
} from '../../../reference/f4/f4_action';
import { injectIntl } from 'react-intl';
import NewDMSPLST from './newDmspLst';

function Dmsplist(props) {
  const emptyDmsp = {
    showStaff: false,
    pmscope: '',
    countryId: '',
    regionId: '',
    bukrs: '',
    branchId: '',
    matnr: '',
    matnr2: '',
    discount: '',
    pmType: '',
    bonus: '',
    fromDealer: '',
    waers: '',
    pmName: '',
    dateFrom: '',
    dateTo: '',
    pmInfo: '',
  };

  //componentDidMount
  useEffect(() => {
    props.fetchDmsplist();
    props.f4FetchCountryList();
    //unmount
    return () => {};
  }, []);

  const [dmsp, setDmsp] = useState({ ...emptyDmsp });

  const handleOpen = () => {
    setDmsp({ showStaff: true });
    props.getDmspLstMatrns();
  };

  const handleClose = () => {
    setDmsp({ showStaff: false });
  };

  const saveForm = () => {
    console.log('in save ', dmsp);
  };

  const { companyOptions, branchOptions, countryList } = props;
  const { messages } = props.intl;

  const onDmspChange = (o, fieldName) => {
    setDmsp(prev => {
      const varDmsp = { ...prev };
      switch (fieldName) {
        case 'pmscope':
          varDmsp.pmscope = o.value;
          break;
        case 'countryId':
          varDmsp.countryId = o.value;
          break;
        case 'regionId':
          varDmsp.regionId = o.value;
          break;
        case 'pmType':
          varDmsp.pmType = o.value;
          break;
        case 'bukrs':
          varDmsp.bukrs = o.value;
          break;
        case 'branchId':
          varDmsp.branchId = o.value;
          break;
        case 'matnr':
          varDmsp.matnr = o.value;
          break;
        case 'matnr2':
          varDmsp.matnr2 = o.value;
          break;
        case 'discount':
          varDmsp.discount = o.value;
          break;
        case 'bonus':
          varDmsp.bonus = o.value;
          break;
        case 'fromDealer':
          varDmsp.fromDealer = o.value;
          break;
        case 'waers':
          varDmsp.waers = o.value;
          break;
        case 'pmName':
          varDmsp.pmName = o.value;
          break;
        case 'dateFrom':
          varDmsp.dateFrom = o;
          break;
        case 'dateTo':
          varDmsp.dateTo = o;
          break;
        case 'pmInfo':
          varDmsp.pmInfo = o;
          break;
        default:
          varDmsp[fieldName] = o.value;
      }
      return varDmsp;
    });
  };

  return (
    <div>
      <Container
        fluid
        style={{
          marginTop: '2em',
          marginBottom: '2em',
          paddingLeft: '4em',
          paddingRight: '4em',
        }}
      >
        <Segment clearing>
          <Header as="h2" floated="left">
            {' '}
            {messages['promotion']}{' '}
          </Header>
          <Modal
            size={'large'}
            trigger={
              <Button
                floated="right"
                onClick={handleOpen.bind(this)}
                color="teal"
              >
                <Icon name="plus" /> {messages['BTN__ADD']}
              </Button>
            }
            open={dmsp.showStaff}
          >
            <Modal.Header>{"messages['newPromotion']"}</Modal.Header>
            <Modal.Content>
              <NewDMSPLST
                messages={messages}
                companyOptions={companyOptions}
                branchOptions={branchOptions}
                countryList={countryList}
                dmsp={dmsp}
                onInputChange={onDmspChange}
                dynDmsplst={props.dynDmsplst}
                handleClose={handleClose.bind(this)}
                saveForm={saveForm.bind(this)}
              />
            </Modal.Content>
          </Modal>
        </Segment>

        <List messages={messages} dynDmsplst={props.dynDmsplst} />
      </Container>
    </div>
  );
}

function mapStateToProps(state) {
  return {
    countryList: state.f4.countryList,
    companyOptions: state.userInfo.companyOptions,
    branchOptions: state.userInfo.branchOptionsAll,
    dynDmsplst: state.marketing.dynDmsplst,
  };
}

export default connect(
  mapStateToProps,
  {
    f4FetchCountryList,
    f4FetchWerksBranchList,
    fetchDmsplist,
    getDmspLstMatrns,
  },
)(injectIntl(Dmsplist));
