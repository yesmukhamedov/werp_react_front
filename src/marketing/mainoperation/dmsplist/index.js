import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import {
  Header,
  Icon,
  Segment,
  Button,
  Container,
  Modal,
  Checkbox,
  Grid,
} from 'semantic-ui-react';
import {
  fetchDmsplist,
  getDmspLstMatrns,
  updDmsplist,
  saveDmsplst,
  clearDynObjMarketing,
} from '../../marketingAction';
import {
  f4FetchCountryList,
  f4FetchWerksBranchList,
} from '../../../reference/f4/f4_action';
import { injectIntl } from 'react-intl';
import List from './list';
import NewDMSPLST from './newDmspLst';

function Dmsplist(props) {
  const emptyDmsp = {
    showStaff: false,
    pmScope: '',
    countryId: '',
    region: '',
    bukrs: '',
    bukrsName: '',
    branchId: '',
    matnr: '',
    matnr2: '',
    mName: '',
    discount: '',
    pmType: '',
    bonus: '',
    fromDealer: '',
    fdCurrency: '',
    name: '',
    dateStart: '',
    dateEnd: '',
    pmInfo: '',
  };

  const emptyFilter = {
    filter: false,
    countryfilter: false,
    regionfilter: false,
    brnchfilter: false,
    kindfilter: false,
    bonusfilter: false,
    extraInfofilter: false,
  };

  const { companyOptions, branchOptions, countryList, dynamicObject } = props;

  //componentDidMount
  useEffect(() => {
    if (!countryList || countryList.length === 0) props.f4FetchCountryList();
    if (Object.keys(dynamicObject).length === 0) props.fetchDmsplist();

    //unmount
    return () => {
      props.clearDynObjMarketing();
    };
  }, []);

  const [dmsp, setDmsp] = useState({ ...emptyDmsp });
  const [fOpen, setFOpen] = useState({ ...emptyFilter });
  const [errors, setErrors] = useState([]);

  const handleOpen = () => {
    setDmsp({ showStaff: true });
    props.getDmspLstMatrns();
  };

  const handleClose = () => {
    setDmsp({ showStaff: false });
  };

  const filterCheck = fieldName => {
    setFOpen(prev => {
      const varDmsp = { ...prev };
      switch (fieldName) {
        case 'filter':
          varDmsp.filter = !varDmsp.filter;
          break;
        case 'country':
          varDmsp.countryfilter = !varDmsp.countryfilter;
          break;
        case 'region':
          varDmsp.regionfilter = !varDmsp.regionfilter;
          break;
        case 'brnch':
          varDmsp.brnchfilter = !varDmsp.brnchfilter;
          break;
        case 'kind':
          varDmsp.kindfilter = !varDmsp.kindfilter;
          break;
        case 'bonus':
          varDmsp.bonusfilter = !varDmsp.bonusfilter;
          break;
        case 'extraInfo':
          varDmsp.extraInfofilter = !varDmsp.extraInfofilter;
          break;
        default:
          varDmsp[fieldName] = !varDmsp.fieldName;
      }
      return varDmsp;
    });
  };

  const selRow = r => {
    props.getDmspLstMatrns();
    setDmsp(prevState => {
      // Object.assign would also work
      return { ...prevState, ...r };
    });
  };

  const saveForm = () => {
    let errors = [];
    const errorTable = JSON.parse(localStorage.getItem('errorTableString'));
    const language = localStorage.getItem('language');
    const { pmScope, matnr2, fromDealer, fdCurrency, name } = dmsp;

    if (
      pmScope === null ||
      pmScope === undefined ||
      !pmScope ||
      matnr2 === null ||
      matnr2 === undefined ||
      !matnr2
    ) {
      errors.push(errorTable['138' + language]);
    }
    if (fromDealer === null || fromDealer === undefined || !fromDealer) {
      errors.push(errorTable['61' + language]);
    }
    if (fdCurrency === null || fdCurrency === undefined || !fdCurrency) {
      errors.push(errorTable['1' + language]);
    }
    if (name === null || name === undefined || !name) {
      errors.push(errorTable['151' + language]);
    }
    if (errors === null || errors === undefined || errors.length === 0) {
      props.saveDmsplst(dmsp);
    }
    setErrors(errors);
  };

  const updateDmsplst = () => {
    props.updDmsplist(dmsp);
  };

  const { messages } = props.intl;

  const onDmspChange = (o, fieldName) => {
    setDmsp(prev => {
      const varDmsp = { ...prev };
      switch (fieldName) {
        case 'pmScope':
          varDmsp.pmScope = o.value;
          break;
        case 'countryId':
          varDmsp.countryId = o.value;
          break;
        case 'regionId':
          varDmsp.region = o.value;
          break;
        case 'pmType':
          varDmsp.pmType = o.value;
          break;
        case 'bukrs':
          varDmsp.bukrs = o.value;
          o.options.some(c => {
            if (Number(c.key) === o.value) {
              varDmsp.bukrsName = c.text;
              return true;
            } else {
              return false;
            }
          });
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
        case 'fdCurrency':
          varDmsp.fdCurrency = o.value;
          break;
        case 'name':
          varDmsp.name = o.value;
          break;
        case 'dateStart':
          varDmsp.dateStart = o.format('DD.MM.YYYY');
          break;
        case 'dateEnd':
          varDmsp.dateEnd = o.format('DD.MM.YYYY');
          break;
        case 'pmInfo':
          varDmsp.pmInfo = o.value;
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
            {messages['promotion']}
          </Header>
          <Button
            floated="right"
            icon="filter"
            color="blue"
            content="Filter"
            onClick={() => filterCheck('filter')}
          />
          <Button floated="right" color="teal" onClick={handleOpen.bind(this)}>
            <Icon name="plus" /> {messages['BTN__ADD']}
          </Button>

          <Modal size={'large'} open={dmsp.showStaff}>
            <Modal.Header>{messages['newPromotion']}</Modal.Header>
            <Modal.Content>
              <NewDMSPLST
                messages={messages}
                companyOptions={companyOptions}
                branchOptions={branchOptions}
                countryList={countryList}
                dmsp={dmsp}
                onInputChange={onDmspChange}
                dynamicObject={dynamicObject}
                handleClose={handleClose.bind(this)}
                saveForm={saveForm.bind(this)}
                errors={errors}
              />
            </Modal.Content>
          </Modal>
        </Segment>
        {fOpen.filter ? (
          <Segment clearing>
            <Grid>
              <Grid.Row columns={6}>
                <Grid.Column>
                  <Checkbox
                    label={messages['country']}
                    onChange={(e, o) => filterCheck('country')}
                    checked={fOpen.countryfilter}
                  />
                </Grid.Column>
                <Grid.Column>
                  <Checkbox
                    label={messages['region']}
                    onChange={(e, o) => filterCheck('region')}
                    checked={fOpen.regionfilter}
                  />
                </Grid.Column>
                <Grid.Column>
                  <Checkbox
                    label={messages['brnch']}
                    onChange={(e, o) => filterCheck('brnch')}
                    checked={fOpen.brnchfilter}
                  />
                </Grid.Column>
                <Grid.Column>
                  <Checkbox
                    label={messages['kind']}
                    onChange={(e, o) => filterCheck('kind')}
                    checked={fOpen.kindfilter}
                  />
                </Grid.Column>
                <Grid.Column>
                  <Checkbox
                    label={messages['bonus']}
                    onChange={(e, o) => filterCheck('bonus')}
                    checked={fOpen.bonusfilter}
                  />
                </Grid.Column>
                <Grid.Column>
                  <Checkbox
                    label={messages['extraInfo']}
                    onChange={(e, o) => filterCheck('extraInfo')}
                    checked={fOpen.extraInfofilter}
                  />
                </Grid.Column>
              </Grid.Row>
            </Grid>
          </Segment>
        ) : (
          ''
        )}

        <List
          messages={messages}
          companyOptions={companyOptions}
          branchOptions={branchOptions}
          onInputChange={onDmspChange}
          dmsp={dmsp}
          fOpen={fOpen}
          dynamicObject={props.dynamicObject}
          selRow={selRow.bind(this)}
          countryList={countryList}
          updateDmsplst={updateDmsplst.bind(this)}
        />
      </Container>
    </div>
  );
}

function mapStateToProps(state) {
  return {
    countryList: state.f4.countryList,
    companyOptions: state.userInfo.companyOptions,
    branchOptions: state.userInfo.branchOptionsAll,
    dynamicObject: state.marketing.dynamicObject,
  };
}

export default connect(mapStateToProps, {
  f4FetchCountryList,
  f4FetchWerksBranchList,
  fetchDmsplist,
  getDmspLstMatrns,
  updDmsplist,
  saveDmsplst,
  clearDynObjMarketing,
})(injectIntl(Dmsplist));
