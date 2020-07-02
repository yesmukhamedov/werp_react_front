import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';
import { Segment, Grid, Form, Button, Icon, Divider } from 'semantic-ui-react';
import BasicInfo from './components/BasicInfo';
import ReportService from './components/ReportService';
import Services from './components/Services';
import SaleOfSparePart from './components/SaleOfSparePart';
import SaleCartridge from './components/SaleCartridge';
import ServicePackage from './components/ServicePackage';

import { fetchSmvsList } from './smvsAction';
import './../../service.css';

const Smes = props => {
  const { smvsList = {} } = props;

  const emptyDataSmvs = {
    address: null,
    applicationNumber: null,
    awkey: null,
    branchId: null,
    branchName: null,
    bukrs: null,
    bukrsName: null,
    categoryId: null,
    categoryName: null,
    contractDate: null,
    contractId: null,
    contractNumber: null,
    countryId: null,
    countryName: null,
    currencyId: null,
    currencyName: null,
    customerFullName: null,
    customerId: null,
    discount: null,
    id: null,
    masterFullName: null,
    masterId: null,
    masterPremium: null,
    operatorFullName: null,
    operatorId: null,
    operatorPremium: null,
    paid: null,
    positions: [],
    serviceDate: null,
    serviceStatusId: 4,
    serviceStatusName: null,
    sumForPay: null,
    sumTotal: null,
    tovarId: null,
    tovarName: null,
    tovarSn: null,
    warrantyPeriodDate: null,
    warrantyPeriodInMonth: null,
  };

  const [dataSmvs, setDataSmvs] = useState({ ...emptyDataSmvs });

  console.log('dataSmvs', dataSmvs);
  const url = window.location.search;

  const urlNumberService = url.slice(url.indexOf('=') + 1);

  const [serviceNumber, setServiceNumber] = useState(urlNumberService);

  const [checkStatus, setCheckStatus] = useState(false);

  useEffect(() => {
    if (serviceNumber !== '') {
      console.log('serviceNumber', serviceNumber);
      props.fetchSmvsList(serviceNumber);
    }
  }, []);

  useEffect(() => {
    if (Object.keys(smvsList).length > 0) {
      setDataSmvs({
        ...smvsList,
      });
    }
  }, [smvsList]);

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
        <Button icon labelPosition="left" color="green">
          <Icon name="pencil" />
          Редактировать
        </Button>
      </Segment>
      <Grid>
        <Grid.Row>
          {/*BASIC INFO*/}
          <Grid.Column width={5}>
            <BasicInfo
              data={dataSmvs}
              serviceNumber={serviceNumber}
              // onChangeBasicInfo={onChangeBasicInfo}
            />
          </Grid.Column>

          {/*SETTING*/}
          <Grid.Column width={11}>
            <Services
            // data={servicesPos}
            // servicesOptions={servicesOptions}
            />

            {/*Продажа запчастей */}
            <SaleOfSparePart
            // data={sparePartPos}
            // disabledEdit={disabledEdit}
            />

            {/*Продажа картриджи  */}
            <SaleCartridge
            // data={cartridgePos}
            // disabledEdit={disabledEdit}
            />

            {/*Сервис пакет  */}
            <ServicePackage
            // disabledEdit={disabledEdit}
            />
            <ReportService data={dataSmvs} />
            <Button
              color="green"
              onClick={() => {
                setCheckStatus(true);
              }}
            >
              Проверить
            </Button>
            <Button color="blue" disabled={checkStatus === true ? false : true}>
              Сохранить
            </Button>
            <Divider />
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
    editStat: state.smvsReducer.editStat,
  };
}

export default connect(mapStateToProps, {
  fetchSmvsList,
})(injectIntl(Smes));
