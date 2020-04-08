import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';
import { Segment, Grid, Form, Button, Icon } from 'semantic-ui-react';

import BasicInfo from './components/BasicInfo';
import SettingService from './components/SettingService';
import ReportService from './components/ReportService';
import { fetchSmvsList } from './smvsAction';
import './../../service.css';
import { LinkToSmes } from '../../../utils/outlink';
import { ROOT_URL } from './../../../utils/constants';

const Smes = props => {
  const { smvsList } = props;
  const url = window.location.search;
  const numberService = url.slice(url.indexOf('=') + 1);

  console.log('smvsList', smvsList);

  const [serviceNumber, setServiceNumber] = useState('');

  useEffect(() => {
    setServiceNumber(numberService);
    if (numberService) {
      props.fetchSmvsList(numberService);
    }
  }, [numberService]);

  const onChangeServiceNumber = value => {
    setServiceNumber(value);
  };
  //Поиск по номеру сервиса
  const searchByServiceNumber = () => {
    console.log('Service Number', serviceNumber);
    props.fetchSmvsList(serviceNumber);
  };

  return (
    <Form>
      <Segment
        style={{
          marginRight: '1rem',
          marginLeft: '1rem',
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}
      >
        <h3>Просмотр сервис карты</h3>
        <LinkToSmes serviceNumber={serviceNumber} />
      </Segment>
      <Grid>
        <Grid.Row>
          {/*BASIC INFO*/}
          <Grid.Column width={5}>
            <BasicInfo
              serviceNumber={serviceNumber}
              searchByServiceNumber={searchByServiceNumber}
              onChangeServiceNumber={onChangeServiceNumber}
            />
          </Grid.Column>

          {/*SETTING*/}
          <Grid.Column width={11}>
            <SettingService />
            <ReportService />
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Form>
  );
};

function mapStateToProps(state) {
  return {
    language: state.locales.lang,
    companyOptions: state.userInfo.companyOptions,
    branchOptions: state.userInfo.branchOptionsAll,
    smvsList: state.smvsReducer.smvsList,
  };
}

export default connect(mapStateToProps, { fetchSmvsList })(injectIntl(Smes));
