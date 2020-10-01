import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';
//import { Link } from 'react-router-dom';
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
  Confirm,
} from 'semantic-ui-react';
import BasicInfo from './components/BasicInfo';

import Services from './components/Services';
import SaleOfSparePart from './components/SaleOfSparePart';
import SaleCartridge from './components/SaleCartridge';
import ServicePackage from './components/ServicePackage';
import ReportService from './components/ReportService';
import {
  fetchSmesList,
  fetchPaymentOptions,
  acceptPayment,
  cancelPayment,
} from './smesAction';
import './../../service.css';

import {
  fetchServiceSmcs,
  fetchTovarId,
  fetchServiceTypeId,
  fetchMatnrPriceSparePart,
  fetchMatnrPriceCartridge,
  fetchMatnrPriceServicePackage,
  fetchServicePackageDetails,
  fetchSmcsServicePacket,
  fetchPositionSumm,
  checkSmcsWithoutReques,
  saveSmcsWithoutReques,
  fetchOperatorList,
  fetchMasterList,
  fetchCheckWarranty,
} from '../smcs/smcsAction';

import {
  f4FetchConTypeList,
  f4fetchCategory,
  f4FetchCustomersById,
} from '../../../reference/f4/f4_action';

import { emptyService } from '../smcs/components/directory';

const Smes = props => {
  const {
    smesList = {},
    paymentOptions = [],
    //acceptPayment,
    matnrServicePackage = [],
  } = props;

  const [service, setService] = useState({ ...emptyService });

  const [modalPay, setModalPay] = useState(false);
  const url = window.location.search;
  const urlNumberService = url.slice(url.indexOf('=') + 1);

  const [serviceNumber, setServiceNumber] = useState(urlNumberService);

  useEffect(() => {
    if (serviceNumber) {
      props.fetchSmesList(serviceNumber);
    }
  }, []);

  useEffect(() => {
    if (Object.keys(smesList).length > 0) {
      setService({
        ...smesList,
      });

      if (smesList.branchId && smesList.bukrs && smesList.tovarId) {
        let param = {
          branchId: smesList.branchId,
          bukrs: smesList.bukrs,
          productId: smesList.tovarId,
        };
        props.fetchMatnrPriceServicePackage({ ...param }, 1);
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
        setService({ ...emptyService });
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

  const successPayment = () => {
    if (serviceNumber) {
      props.fetchSmesList(serviceNumber);
    }
  };

  const handlePay = () => {
    setModalPay(false);
    props.acceptPayment({ ...payData }, successPayment);
  };

  const [newServiceStatus, setNewServiceStatus] = useState(false);

  const toSmvs = () => {
    setNewServiceStatus(true);
    if (serviceNumber) {
      props.fetchSmesList(serviceNumber);
    }
  };

  //===================================NEW====================================
  //==========================================================================
  //СПИСОК УСЛУГ
  const servicesList = service.positions.filter(
    item =>
      item.serviceTypeId == 2 ||
      item.serviceTypeId == 5 ||
      item.serviceTypeId == 6 ||
      item.serviceTypeId == 7 ||
      item.serviceTypeId == 8,
  );

  //СПИСОК ПРОДАЖА ЗАПЧАСТЕЙ
  const sparePartList = service.positions.filter(
    item => item.serviceTypeId == 3,
  );
  //СПИСОК ПРОДАЖА КАРТРИДЖЕЙ
  const cartridgeList = service.positions.filter(
    item => item.serviceTypeId == 1,
  );
  //СПИСОК СЕРВИС ПАКЕТОВ
  const servicePackageList = service.positions.filter(
    item => item.serviceTypeId == 4,
  );

  const urlToSmcsClick = () => {
    service.applicationNumber != null
      ? props.history.push(
          `smcs?applicationNumber=${service.applicationNumber}`,
        ) // С заявкой
      : service.contractId == null
      ? props.history.push(`smcs`, {
          bukrs: service.bukrs,
          branchId: service.branchId,
          categoryId: service.categoryId,
          tovarId: service.tovarId,
          currencyId: service.currencyId,
          currencyName: service.currencyName,
        }) //Без договора
      : props.history.push(`smcs`, {
          tovarSn: service.tovarSn,
        }); //Без заявки
  };

  const [modalConfirm, setModalConfirm] = useState(false);
  const cancelPaymentClick = () => {
    setModalConfirm(false);
    props.cancelPayment(serviceNumber, toSmvs);
  };
  return (
    <Form>
      <Confirm
        header="Подтверждения"
        content="Вы действительно хотите отменить?"
        open={modalConfirm}
        onCancel={() => setModalConfirm(false)}
        onConfirm={cancelPaymentClick}
        confirmButton="Да"
        cancelButton="Нет"
      />
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
        <div>
          {service.serviceStatusId == 6 ? (
            <Button size="tiny" color="green" onClick={urlToSmcsClick}>
              <p>Новый сервис</p>
            </Button>
          ) : (
            ''
          )}

          <Button
            disabled={service.serviceStatusId === 1 ? false : true}
            color="orange"
            onClick={() => setModalPay(true)}
          >
            Оплатить
          </Button>

          <Button
            disabled={service.serviceStatusId != 6 ? false : true}
            color="red"
            onClick={() => setModalConfirm(true)}
          >
            Отменить
          </Button>
        </div>
      </Segment>
      <Grid>
        <Grid.Row>
          {/*BASIC INFO*/}
          <Grid.Column width={5}>
            <BasicInfo
              data={service}
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
            <ReportService data={service} />
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
    matnrServicePackage: state.smcsReducer.matnrServicePackage1,
    paymentOptions: state.smesReducer.paymentOptions,
    acceptPayment: state.smesReducer.acceptPayment,
  };
}

export default connect(mapStateToProps, {
  fetchSmesList,
  fetchMatnrPriceServicePackage,
  fetchPaymentOptions,
  acceptPayment,
  fetchServiceSmcs,
  fetchTovarId,
  fetchServiceTypeId,
  fetchMatnrPriceSparePart,
  fetchMatnrPriceCartridge,
  fetchServicePackageDetails,
  fetchSmcsServicePacket,
  fetchPositionSumm,
  checkSmcsWithoutReques,
  saveSmcsWithoutReques,
  fetchOperatorList,
  fetchMasterList,
  fetchCheckWarranty,
  f4FetchConTypeList,
  f4fetchCategory,
  f4FetchCustomersById,
  cancelPayment,
})(injectIntl(Smes));
