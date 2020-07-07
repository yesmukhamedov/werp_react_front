import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';
import {
  Segment,
  Grid,
  Form,
  Divider,
  Header,
  Modal,
  Button,
  Icon,
  Dropdown,
} from 'semantic-ui-react';
import BasicInfo from './components/BasicInfo';

import Services from '../smcs/tabs/components/Services';
import SaleOfSparePart from '../smcs/tabs/components/SaleOfSparePart';
import SaleCartridge from '../smcs/tabs/components/SaleCartridge';
import ServicePackage from '../smcs/tabs/components/ServicePackage';
import TableReportWithoutRequest from '../smcs/tabs/components/TableReportWithoutRequest';
import {
  fetchSmesList,
  fetchPaymentOptions,
  acceptPayment,
} from './smesAction';
import './../../service.css';

import { fetchMatnrPriceServicePackage } from '../smcs/smcsAction';
import { emptyService } from '../smcs/components/directory';

const Smes = props => {
  const {
    smesList = {},
    matnrServicePackage = [],
    paymentOptions = [],
    acceptPayment,
  } = props;

  const [dataSmes, setDataSmes] = useState({ ...emptyService });
  const [modalPay, setModalPay] = useState(false);

  console.log('dataSmes', dataSmes);

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
      console.log('serviceNumber', serviceNumber);
      props.fetchSmesList(serviceNumber);
    }
  }, []);

  useEffect(() => {
    if (Object.keys(smesList).length > 0) {
      setDataSmes({
        ...smesList,
      });

      if (smesList.branchId && smesList.bukrs && smesList.tovarId) {
        let param = {
          branchId: smesList.branchId,
          bukrs: smesList.bukrs,
          productId: smesList.tovarId,
        };
        props.fetchMatnrPriceServicePackage({ ...param });
      }

      if (smesList.branchId && smesList.bukrs) {
        let param = {
          brnch: smesList.branchId,
          bukrs: smesList.bukrs,
        };

        props.fetchPaymentOptions({ ...param });
      }
    }
  }, [smesList]);

  const onChangeBasicInfo = (value, fieldName) => {
    switch (fieldName) {
      case 'changeServiceNumber':
        setServiceNumber(value);
        break;
      case 'searchByServiceNumber':
        props.fetchSmesList(serviceNumber);
        setDataSmes({ ...emptyService });
        break;
      case '':
        break;
    }
  };
  const [payData, setPayData] = useState({
    hkontS: '',
    id: parseInt(serviceNumber),
  });

  const onChangePay = value => {
    setPayData({
      ...payData,
      hkontS: value.value.toString(),
    });
  };

  const handlePay = () => {
    console.log('payData', payData.hkontS);
    setModalPay(false);
    props.acceptPayment({ ...payData });
  };

  return (
    <Form>
      <Modal open={modalPay} closeIcon onClose={() => setModalPay(false)}>
        <Header content="Оплата" />
        <Modal.Content>
          <Dropdown
            selection
            fluid
            options={paymentOptions}
            value={parseInt(payData.hkontS)}
            onChange={(e, value) => onChangePay(value)}
          />
        </Modal.Content>
        <Modal.Actions>
          <Button color="red" onClick={() => setModalPay(false)}>
            <Icon name="remove" /> Отменить
          </Button>
          <Button color="green" onClick={handlePay}>
            <Icon name="checkmark" /> Оплатить
          </Button>
        </Modal.Actions>
      </Modal>
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
        {dataSmes.serviceStatusId == 1 ? (
          <Button color="orange" onClick={() => setModalPay(true)}>
            Оплатить
          </Button>
        ) : (
          ''
        )}
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
          <Grid.Column width={11}>
            <Services data={servicesList} />
            <SaleOfSparePart data={sparePartList} />
            <SaleCartridge data={cartridgeList} />
            <ServicePackage data={servicePackageList} />
            <TableReportWithoutRequest
              data={dataSmes}
              currency={dataSmes.currencyName}
            />
            {/*Проверить*/}
            <Button color="green">
              <Icon name="check" size="large" />
              Проверить
            </Button>

            {/*Сохранить*/}
            <Button type="submit" primary>
              <Icon name="save" size="large" />
              Сохранить
            </Button>
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
    smesList: state.smesReducer.smesList,
    editStat: state.smvsReducer.editStat,
    matnrServicePackage: state.smcsReducer.matnrServicePackage,
    paymentOptions: state.smesReducer.paymentOptions,
    acceptPayment: state.smesReducer.acceptPayment,
  };
}

export default connect(mapStateToProps, {
  fetchSmesList,
  fetchMatnrPriceServicePackage,
  fetchPaymentOptions,
  acceptPayment,
})(injectIntl(Smes));
