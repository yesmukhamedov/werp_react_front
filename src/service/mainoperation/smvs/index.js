import React, { useState } from 'react';
import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';
import { Segment, Grid, Form, Button, Icon } from 'semantic-ui-react';

import BasicInfo from './components/BasicInfo';
import SettingService from './components/SettingService';
import ReportService from './components/ReportService';
import './../../service.css';

const Smes = props => {
  const emptyTovar = {
    param: 555,
    name: 'Jaks',
  };

  //Поиск по номеру сервиса
  const handleSearchNumberService = () => {
    console.log('handleSearchNumberService');
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
        <Button color="green">
          <Icon name="pencil" />
          Редактировать
        </Button>
      </Segment>
      <Grid>
        <Grid.Row>
          {/*BASIC INFO*/}
          <Grid.Column width={5}>
            <BasicInfo />
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
  };
}

export default connect(mapStateToProps, {})(injectIntl(Smes));
