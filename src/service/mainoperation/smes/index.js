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
import ModalAddSparePart from '../smcs/modals/ModalAddSparePart';
import ModalAddCartridge from '../smcs/modals/ModalAddCartridge';
import ModalAddServicePacket from '../smcs/modals/ModalAddServicePacket';
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
  const { smesList = {}, paymentOptions = [], acceptPayment } = props;

  const {
    matnrPriceSparePart = [],
    matnrPriceCartridge = [],
    matnrServicePackage = [],
    servicePacketDetails = [],
  } = props;

  const [service, setService] = useState({ ...emptyService });
  const [tempService, setTempService] = useState({ ...emptyService });

  useEffect(() => {
    if (Object.keys(tempService).length > 0) {
      setService({
        ...tempService,
        positions: tempService.positions.map((item, index) => {
          return {
            currencyId: item.currencyId,
            currencyName: item.currencyName,
            fno: item.fno,
            id: item.id,
            matnrId: item.matnrId,
            matnrName: item.matnrName,
            matnrPrice: item.matnrPrice,
            operationId: item.operationId,
            operationName: item.operationName,
            quantity: item.quantity,
            serviceId: item.serviceId,
            servicePackageId: item.servicePackageId,
            servicePackageName: item.servicePackageName,
            serviceTypeId: item.serviceTypeId,
            serviceTypeName: item.serviceTypeName,
            sum: item.sum,
            warranty: item.warranty,
            tempId: item.tempId,
          };
        }),
      });
    }
  }, [tempService]);

  console.log('SERVICE TEMP', tempService);

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
      setTempService({
        ...smesList,
        positions: smesList.positions.map((item, index) => {
          return {
            currencyId: item.currencyId,
            currencyName: item.currencyName,
            fno: item.fno,
            id: item.id,
            matnrId: item.matnrId,
            matnrName: item.matnrName,
            matnrPrice: item.matnrPrice,
            operationId: item.operationId,
            operationName: item.operationName,
            quantity: item.quantity,
            serviceId: item.serviceId,
            servicePackageId: item.servicePackageId,
            servicePackageName: item.servicePackageName,
            serviceTypeId: item.serviceTypeId,
            serviceTypeName: item.serviceTypeName,
            sum: item.sum,
            warranty: item.warranty,
            tempId: item.matnrId * 96 + index,
            checked: true,
          };
        }),
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

      if (smesList.masterId) {
        let paramMatnrSparePart = {
          branchId: smesList.branchId,
          bukrs: smesList.bukrs,
          masterId: smesList.masterId,
          serviceTypeId: 3,
          tovarId: smesList.tovarId,
        };

        let paramMatnrCartridge = {
          branchId: smesList.branchId,
          bukrs: smesList.bukrs,
          masterId: smesList.masterId,
          serviceTypeId: 1,
          tovarId: smesList.tovarId,
        };

        props.fetchMatnrPriceSparePart({ ...paramMatnrSparePart });
        props.fetchMatnrPriceCartridge({ ...paramMatnrCartridge });
      }

      if (smesList.branchId && smesList.bukrs && smesList.tovarId) {
        let param = {
          branchId: smesList.branchId,
          bukrs: smesList.bukrs,
          productId: smesList.tovarId,
        };

        props.fetchSmcsServicePacket({ ...param });
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

  //ПРОДАЖА ЗАПЧАСТЕЙ=================================================================================================================
  //==================================================================================================================================
  const tempSparePartList = tempService.positions.filter(
    item => item.serviceTypeId == 3,
  );

  const [sparePartList, setSparePartList] = useState([]);
  const [modalSparePart, setModalSparePart] = useState(false);

  const onChangeSparePart = (value, fildName, original, id) => {
    switch (fildName) {
      //Кнопка добавить запчасти
      case 'addSparePartBtn':
        setModalSparePart(true);
        break;

      default:
        break;
    }
  };

  //Выбрать запчасть
  const checkedSparePart = () => {
    console.log('VALUE');
  };

  // Применить выбранные запчасти
  const handleApplySparePart = () => {
    setModalSparePart(false);
  };
  useEffect(() => {
    matnrPriceSparePart.map((item, index) => {
      setSparePartList(prev => [
        ...prev,
        {
          currencyId: item.currencyId,
          currencyName: item.currencyName,
          fno: null,
          id: null,
          matnrId: item.matnrId,
          matnrCode: item.matnrCode,
          matnrName: item.matnrName,
          matnrPrice: item.price,
          operationId: null,
          operationName: null,
          menge: item.menge,
          quantity: 1,
          serviceId: null,
          servicePackageId: null,
          servicePackageName: null,
          serviceTypeId: 3,
          serviceTypeName: null,
          sum: null,
          warranty: false,
          checked: false,
          tempId: parseInt(`33${item.matnrId * 63 + index}`),
        },
      ]);
    });
  }, [matnrPriceSparePart]);

  //ПРОДАЖА КАРТРИДЖЕЙ=================================================================================================================
  //==================================================================================================================================

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

  const toSmvs = (data, id) => {
    console.log('data tosmvs', data);
    console.log('id tosmvs', id);
  };

  const cancelPaymentClick = () => {
    props.cancelPayment(serviceNumber, toSmvs);
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
        <div>
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
            onClick={cancelPaymentClick}
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
          <Grid.Column readOnly width={11}>
            {/*Услуги */}
            <Services
            //data={servicesList}
            // addServices={addServices}
            // servicesOptions={serviceOptions}
            // handleRemoveService={handleRemoveService}
            // selectServices={selectServices}
            // waers={service.currencyName}
            // editStatus={editStatus}
            // currency={service.currencyName}
            />

            {/*Продажа запчастей */}
            <SaleOfSparePart
              data={tempSparePartList}
              onChangeSparePart={onChangeSparePart}
              // editStatus={editStatus}
              // currency={service.currencyName}
            />

            <ModalAddSparePart
              data={sparePartList}
              modalOpen={modalSparePart}
              checkedSparePart={checkedSparePart}
              handleApplySparePart={handleApplySparePart}
            />

            {/*Продажа картриджей */}
            <SaleCartridge
            // data={cartridgeInitial}
            // onChangeCartridge={onChangeCartridge}
            // editStatus={editStatus}
            // currency={service.currencyName}
            />

            <ModalAddCartridge
            // data={cartridgeList}
            // modalOpen={modalCartridge}
            // onChangeCartridge={onChangeCartridge}
            />

            {/*Сервис пакет*/}
            <ServicePackage
            // data={servicePackageInitial}
            // onChangeServicePackage={onChangeServicePackage}
            // editStatus={editStatus}
            // currency={service.currencyName}
            />
            <ModalAddServicePacket
            // data={servicePackageList}
            // modalStatus={modalServicePackage}
            // onChangeServicePackage={onChangeServicePackage}
            />

            {/*Таблица*/}
            <TableReportWithoutRequest
            // data={service}
            // currency={service.currencyName}
            />

            {/*Проверить*/}
            <Button
              color="green"
              //  onClick={handleCheck}
            >
              <Icon name="check" size="large" />
              Проверить
            </Button>

            {/*Сохранить*/}
            <Button
              type="submit"
              primary
              //onClick={handleSave}
            >
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
    matnrPriceSparePart: state.smcsReducer.matnrPriceSparePart,
    matnrPriceCartridge: state.smcsReducer.matnrPriceCartridge,
    matnrServicePackage: state.smcsReducer.matnrServicePackage,
    servicePacketDetails: state.smcsReducer.servicePacketDetails,
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
  fetchMatnrPriceServicePackage,
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
