import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';
import { Segment, Grid, Form, Divider } from 'semantic-ui-react';
import BasicInfo from './components/BasicInfo';

import { fetchSmvsList } from './smesAction';
import './../../service.css';

import { fetchMatnrPriceServicePackage } from '../smcs/smcsAction';
import { emptyService } from '../smcs/components/directory';
const Smes = props => {
  const { smvsList = {}, matnrServicePackage = [] } = props;

  const [dataSmes, setDataSmes] = useState({ ...emptyService });

  const url = window.location.search;

  //СПИСОК УСЛУГ
  const servicesList = dataSmes.positions.filter(
    item =>
      item.serviceTypeId == 2 ||
      item.serviceTypeId == 5 ||
      item.serviceTypeId == 6 ||
      item.serviceTypeId == 7,
  );

  //СПИСОК ПРОДАЖА ЗАПЧАСТЕЙ
  const sparePartList = dataSmes.positions.filter(
    item => item.serviceTypeId == 3,
  );
  //СПИСОК ПРОДАЖА КАРТРИДЖЕЙ
  const cartridgeList = dataSmes.positions.filter(
    item => item.serviceTypeId == 1,
  );
  //СПИСОК СЕРВИС ПАКЕТОВ
  const servicePackageList = dataSmes.positions.filter(
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
      setDataSmes({
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
        setDataSmes({ ...emptyService });
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
        <h3>Редактирование сервис карты</h3>
      </Segment>
      <Grid>
        <Grid.Row>
          {/*BASIC INFO*/}
          <Grid.Column width={5}>
            <BasicInfo
              data={dataSmes}
              serviceNumber={serviceNumber}
              onChangeBasicInfo={onChangeBasicInfo}
            />
          </Grid.Column>

          {/*SETTING*/}
          <Grid.Column width={11}></Grid.Column>
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
