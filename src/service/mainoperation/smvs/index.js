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

import { fetchMatnrPriceServicePackage } from '../smcs/smcsAction';

const Smes = props => {
  const { smvsList = {}, matnrServicePackage = [] } = props;

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

  const url = window.location.search;

  //СПИСОК УСЛУГ
  const servicesList = dataSmvs.positions.filter(
    item =>
      item.serviceTypeId == 2 ||
      item.serviceTypeId == 5 ||
      item.serviceTypeId == 6 ||
      item.serviceTypeId == 7,
  );

  //СПИСОК ПРОДАЖА ЗАПЧАСТЕЙ
  const sparePartList = dataSmvs.positions.filter(
    item => item.serviceTypeId == 3,
  );
  //СПИСОК ПРОДАЖА КАРТРИДЖЕЙ
  const cartridgeList = dataSmvs.positions.filter(
    item => item.serviceTypeId == 1,
  );
  //СПИСОК СЕРВИС ПАКЕТОВ
  const servicePackageList = dataSmvs.positions.filter(
    item => item.serviceTypeId == 4,
  );

  const urlNumberService = url.slice(url.indexOf('=') + 1);

  const [serviceNumber, setServiceNumber] = useState(urlNumberService);

  useEffect(() => {
    if (serviceNumber) {
      props.fetchSmvsList(serviceNumber);
    }
  }, []);

  useEffect(() => {
    if (Object.keys(smvsList).length > 0) {
      setDataSmvs({
        ...smvsList,
      });

      if (smvsList.branchId && smvsList.bukrs && smvsList.tovarId) {
        let param = {
          branchId: smvsList.branchId,
          bukrs: smvsList.bukrs,
          productId: smvsList.tovarId,
        };
        props.fetchMatnrPriceServicePackage({ ...param });
      }
    }
  }, [smvsList]);

  const onChangeBasicInfo = (value, fieldName) => {
    switch (fieldName) {
      case 'changeServiceNumber':
        setServiceNumber(value);
        break;
      case 'searchByServiceNumber':
        props.fetchSmvsList(serviceNumber);
        setDataSmvs({ ...emptyDataSmvs });
        break;
      case '':
        break;
    }
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
          <a
            target="_blank"
            href={`smes?serviceNumber=${serviceNumber}`}
            rel="noopener noreferrer"
          >
            Редактировать
          </a>
        </Button>
      </Segment>
      <Grid>
        <Grid.Row>
          {/*BASIC INFO*/}
          <Grid.Column width={5}>
            <BasicInfo
              data={dataSmvs}
              serviceNumber={serviceNumber}
              onChangeBasicInfo={onChangeBasicInfo}
            />
          </Grid.Column>

          {/*SETTING*/}
          <Grid.Column width={11}>
            <Services data={servicesList} />

            {/*Продажа запчастей */}
            <SaleOfSparePart data={sparePartList} />

            {/*Продажа картриджи  */}
            <SaleCartridge data={cartridgeList} />

            {/*Сервис пакет  */}
            <ServicePackage
              data={servicePackageList}
              // disabledEdit={disabledEdit}

              matnrServicePackage={matnrServicePackage}
            />
            <ReportService data={dataSmvs} />
          </Grid.Column>
        </Grid.Row>
      </Grid>
      <Divider />
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
    matnrServicePackage: state.smcsReducer.matnrServicePackage,
  };
}

export default connect(mapStateToProps, {
  fetchSmvsList,
  fetchMatnrPriceServicePackage,
})(injectIntl(Smes));
