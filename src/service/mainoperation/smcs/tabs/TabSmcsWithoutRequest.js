import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';
import {
  Segment,
  Grid,
  Form,
  Button,
  Table,
  Input,
  Icon,
  Divider,
  Dropdown,
  Checkbox,
} from 'semantic-ui-react';

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
} from '../smcsAction';

import {
  f4FetchConTypeList,
  f4FetchBranches,
  f4FetchCountryList,
  f4FetchCompanyOptions,
  f4fetchCategory,
  f4FetchCustomersById,
} from '../../../../reference/f4/f4_action';

import StaffF4Modal from '../../../../reference/f4/staff/staffF4Modal';

import ModalAddServicePacket from '../modals/ModalAddServicePacket';
import ModalAddSparePart from '../modals/ModalAddSparePart';
import ModalAddCartridge from '../modals/ModalAddCartridge';
import 'react-datepicker/dist/react-datepicker.css';
import Services from './components/Services';
import SaleOfSparePart from './components/SaleOfSparePart';
import SaleCartridge from './components/SaleCartridge';
import BasicInfoWithoutRequest from './components/BasicInfoWithoutRequest';
import ServicePackage from './components/ServicePackage';
import TableReportWithoutRequest from './components/TableReportWithoutRequest';

//Создание сервиса без заявки
const TabSmcsWithoutRequest = props => {
  const {
    contract,
    companyOptions = [],
    branches,
    serviceTypeId = [],
    matnrPriceSparePart = [],
    matnrPriceCartridge = [],
    matnrServicePackage = [],
    servicePacketDetails = [],
    servicePacketProps = [],
    positionSumm,
    checkSmcs,
    saveSmcs,
    operatorList = [],
  } = props;

  const emptyService = {
    address: '',
    applicationNumber: '',
    awkey: null,
    branchId: 0,
    branchName: '',
    bukrs: '',
    bukrsName: '',
    categoryId: 2,
    categoryName: '',
    contractDate: '',
    contractId: 0,
    contractNumber: '',
    countryId: 0,
    countryName: '',
    currencyId: 0,
    currencyName: '',
    customerFullName: '',
    customerId: 0,
    discount: 0,
    id: null,
    masterFullName: '',
    masterId: null,
    masterPremium: 0,
    operatorFullName: null,
    operatorId: null,
    operatorPremium: 0,
    paid: 0,
    positions: [],
    serviceDate: '',
    serviceStatusId: null,
    serviceStatusName: null,
    sumForPay: 0,
    sumTotal: 0,
    tovarId: 0,
    tovarName: '',
    tovarSn: '4134-031589',
    warrantyPeriodDate: '',
    warrantyPeriodInMonth: 0,
    status: '',
  };

  //Основной объект сервиса
  const [service, setService] = useState({ ...emptyService });

  const [editStatus, setEditStatus] = useState(true);

  //BasicInfo
  const onBasicInfoInputChange = (value, fieldName) => {
    switch (fieldName) {
      //Поиск по серииному номеру товара(tovarSn)
      case 'searchTovarSN':
        let tovarSn = service.tovarSn;
        props.fetchServiceSmcs({ tovarSn });
        props.fetchServiceTypeId();
        break;

      //Изменить серииный номер товара
      case 'inputChangeTovarSN':
        setService({ ...service, tovarSn: value.target.value });
        break;

      case 'clearMaster':
        setService({
          ...service,
          masterFullName: '',
          masterId: 0,
        });
        break;

      case 'masterModalOpen':
        setModalOpen({ staffF4ModalOpen: true });
        break;

      case 'changeOperator':
        setService({ ...service, operatorId: value.value });
        break;

      default:
        alert('Нет таких значений');
    }
  };

  useEffect(() => {
    //let tovarSn = service.tovarSn;
    // props.fetchServiceSmcs({ tovarSn });
    props.fetchServiceTypeId();
  }, []);

  const [modalOpen, setModalOpen] = useState({
    matnrF4ModalOpen: false,
    staffF4ModalOpen: false,
  });

  const [staffF4ModalPosition, setStaffF4ModalPosition] = useState('');
  const [serBranches, setSerBranches] = useState({});

  useEffect(() => {
    let serviceBA = [5, 6, 9];
    let waSerBranches = {};
    //getting all branches and making fin branch options and service branch options
    function optFunction(item) {
      let option = {
        key: item.branch_id,
        value: item.branch_id,
        text: item.text45,
      };
      if (serviceBA.includes(item.business_area_id)) {
        if (!waSerBranches[item.bukrs]) {
          waSerBranches[item.bukrs] = [];
        }
        waSerBranches[item.bukrs].push(option);
      }
    }

    branches.forEach(optFunction);
    setSerBranches(waSerBranches);
  }, [branches]);

  //Поиск по заводскому номеру

  const inputChange = value => {
    setService({
      ...service,
      masterId: value.staffId,
      masterFullName: value.fio,
    });
  };

  useEffect(() => {
    if (Object.keys(contract).length > 0) {
      setService({ ...contract, positions: [] });
      let operParam = {
        branchId: contract.branchId,
        bukrs: contract.bukrs,
        categoryId: contract.categoryId,
      };
      props.fetchOperatorList({ ...operParam });
      let contractId = contract.contractId;
      props.fetchMatnrPriceServicePackage({ contractId });
    }
  }, [contract]);

  const operatorOptions = operatorList.map(item => {
    return {
      key: item.staffId,
      text: item.fullName,
      value: item.staffId,
    };
  });

  useEffect(() => {
    props.f4FetchBranches();
  }, []);

  useEffect(() => {
    let paramMatnrSparePart = {
      branchId: service.branchId,
      bukrs: service.bukrs,
      masterId: service.masterId,
      serviceTypeId: 3,
      tovarId: service.tovarId,
    };

    let paramMatnrCartridge = {
      branchId: service.branchId,
      bukrs: service.bukrs,
      masterId: service.masterId,
      serviceTypeId: 1,
      tovarId: service.tovarId,
    };

    let master = service.masterId;

    if (master === null || master === undefined || master === '') {
      setService({ ...service, positions: [] });
      setEditStatus(true);
    } else {
      props.fetchMatnrPriceSparePart({ ...paramMatnrSparePart });
      props.fetchMatnrPriceCartridge({ ...paramMatnrCartridge });
      setEditStatus(false);
    }
  }, [service.masterId]);

  //УСЛУГИ========================================================================================

  const [services, setServices] = useState([]);

  const serviceOptions = serviceTypeId
    .filter(item => item.id === '2')
    .map(item => {
      return {
        key: item.id,
        text: item.name,
        value: item.id,
      };
    });

  // Добавить услуги
  const addServices = e => {
    let length = service.positions.length;

    setServices([
      ...services,
      {
        currencyId: null,
        fno: null,
        id: '2' + length,
        matnr: null,
        matnrPrice: null,
        operationId: null,
        quantity: null,
        serviceId: null,
        servicePackageId: null,
        serviceTypeId: 2,
        sum: 0,
        warranty: null,
      },
    ]);
  };

  //Select services
  const selectServices = (id, value) => {
    setServices(
      services.map(item =>
        item.id === id ? { ...item, serviceTypeId: value.value } : item,
      ),
    );

    props.fetchPositionSumm(service.branchId, service.bukrs, ...services);
  };

  useEffect(() => {
    setServices(
      services.map(item =>
        item.serviceTypeId === '2' ? { ...item, sum: positionSumm.sum } : item,
      ),
    );
  }, [positionSumm]);

  //Удалить услуг
  const handleRemoveService = value => {
    let servicesFilter = services.filter(item => item.id !== value.id);
    setServices([...servicesFilter]);
  };

  //ПРОДАЖА ЗАПЧАСТЕЙ========================================================================================
  const [sparePartInitial, setSparePartInitial] = useState([]);

  const [sparePartList, setSparePartList] = useState([]);

  const [modalSparePart, setModalSparePart] = useState(false);

  const onChangeSparePart = (value, fildName, original) => {
    switch (fildName) {
      //Кнопка добавить запчасти
      case 'addSparePartBtn':
        setModalSparePart(true);
        break;

      //Удалить запчасть
      case 'deleteSparePart':
        let deleteFilter = sparePartInitial.filter(
          item => item.id !== value.id,
        );
        setSparePartInitial([...deleteFilter]);

        setSparePartList(
          sparePartList.map(item =>
            item.id === value.id
              ? {
                  ...item,
                  checked: false,
                }
              : item,
          ),
        );
        break;

      //Количество запчастей
      case 'quantitySparePart':
        let val = value.target.value;
        if (val <= original.menge) {
          setSparePartInitial(
            sparePartInitial.map(item =>
              item.id === original.id
                ? {
                    ...item,
                    quantity: val,
                    sum: val * item.matnrPrice,
                  }
                : item,
            ),
          );
        } else {
          alert(`У Вас в подотчете ${original.menge}`);
        }
        break;

      default:
        break;
    }
  };

  useEffect(() => {
    matnrPriceSparePart.map((item, index) => {
      setSparePartList(prev => [
        ...prev,
        {
          index: null,
          currencyId: item.currencyId,
          currencyName: item.currencyName,
          fno: null,
          id: item.matnrId + index,
          matnr: item.matnr,
          matnrName: item.matnrName,
          matnrCode: item.matnrCode,
          matnrPrice: item.price,
          menge: item.menge,
          qinit: item.qinit,
          qminus: item.qminus,
          operationId: null,
          quantity: 1,
          serviceId: null,
          servicePackageId: null,
          serviceTypeId: 3,
          sum: null,
          warranty: false,
          checked: false,
        },
      ]);
    });
  }, [matnrPriceSparePart]);

  //Выбрать запчасть
  const checkedSparePart = value => {
    if (value.checked === true) {
      setSparePartList(
        sparePartList.map(item =>
          item.id === value.id
            ? {
                ...item,
                checked: false,
                quantity: item.quantity,
                sum: item.sum,
              }
            : item,
        ),
      );
    } else {
      setSparePartList(
        sparePartList.map(item =>
          item.id === value.id
            ? {
                ...item,
                checked: true,
                quantity: item.quantity,
                sum: item.matnrPrice * item.quantity,
              }
            : item,
        ),
      );
    }
  };

  // Применить выбранные запчасти
  const handleApplySparePart = () => {
    setModalSparePart(false);
  };

  useEffect(() => {
    let filterSparePart = sparePartList.filter(item => item.checked === true);
    setSparePartInitial([...filterSparePart]);
  }, [sparePartList]);

  //ПРОДАЖА КАРТРИДЖЕЙ==================================================================================
  const [cartridge, setCartridge] = useState([]); //Для сортировки своиств
  //=======
  const [cartridgeInitial, setCartridgeInitial] = useState([]);
  //=======
  const [cartridgeList, setCartridgeList] = useState([]);
  const [modalCartridge, setModalCartridge] = useState(false);

  const onChangeCartridge = (value, fieldName, original) => {
    switch (fieldName) {
      //Добавить картридж в список
      case 'checkedCartridge':
        if (value.checked === true) {
          setCartridgeList(
            cartridgeList.map(item =>
              item.id === value.id
                ? {
                    ...item,
                    checked: false,
                    quantity: item.quantity,
                    sum: item.sum,
                  }
                : item,
            ),
          );
        } else {
          setCartridgeList(
            cartridgeList.map(item =>
              item.id === value.id
                ? {
                    ...item,
                    checked: true,
                    quantity: item.quantity,
                    sum: item.matnrPrice * item.quantity,
                  }
                : item,
            ),
          );
        }
        break;
      // Закрыть модальное окно
      case 'closeModalCartridge':
        setModalCartridge(false);
        break;
      //Кнопка добавить картридж
      case 'addCartridgeBtn':
        setModalCartridge(true);
        break;
      //F№ изменение
      case 'fnoEdit':
        setCartridgeInitial(
          cartridgeInitial.map(item =>
            item.id === original.id
              ? {
                  ...item,
                  fno: value.value,
                }
              : item,
          ),
        );
        break;
      //Удалить картридж
      case 'deleteCartridge':
        let deleteFilter = cartridgeInitial.filter(
          item => item.id !== value.id,
        );
        setCartridgeInitial([...deleteFilter]);

        setCartridgeList(
          cartridgeList.map(item =>
            item.id === value.id
              ? {
                  ...item,
                  checked: false,
                }
              : item,
          ),
        );
        break;

      //Количество картриджей
      case 'quantityCartridge':
        let val = value.target.value;
        if (val <= original.menge) {
          setCartridgeInitial(
            cartridgeInitial.map(item =>
              item.id === original.id
                ? {
                    ...item,
                    quantity: val,
                    sum: val * item.matnrPrice,
                  }
                : item,
            ),
          );
        } else {
          alert(`У Вас в подотчете ${original.menge}`);
        }
        break;

      default:
        alert('Нет таких значений');
    }
  };

  useEffect(() => {
    matnrPriceCartridge.map((item, index) => {
      setCartridgeList(prev => [
        ...prev,
        {
          index: null,
          currencyId: item.currencyId,
          currencyName: item.currencyName,
          fno: null,
          id: item.matnrId + index,
          matnr: item.matnr,
          matnrName: item.matnrName,
          matnrCode: item.matnrCode,
          matnrPrice: item.price,
          menge: item.menge,
          qinit: item.qinit,
          qminus: item.qminus,
          operationId: null,
          quantity: 1,
          serviceId: null,
          servicePackageId: null,
          serviceTypeId: 3,
          sum: null,
          warranty: false,
          checked: false,
        },
      ]);
    });
  }, [matnrPriceCartridge]);

  useEffect(() => {
    let filterCartridge = cartridgeList.filter(item => item.checked === true);
    setCartridgeInitial([...filterCartridge]);
  }, [cartridgeList]);

  //СЕРВИС ПАКЕТ========================================================================================
  const [servicePackageList, setServicePackageList] = useState([]);
  const servicePackageListFilter = servicePackageList.filter(
    item => item.checked === true,
  );
  const [modalServicePackage, setModalServicePackage] = useState(false);
  console.log('servicePackageList', servicePackageList);

  const onChangeServicePackage = (value, fieldName, original) => {
    switch (fieldName) {
      case 'checkedServicePackage':
        console.log('CHECKED', value.checked);
        if (value.checked === true) {
          setServicePackageList(
            servicePackageList.map(item =>
              item.id === value.id
                ? {
                    ...item,
                    checked: false,
                  }
                : item,
            ),
          );
        } else {
          setServicePackageList(
            servicePackageList.map(item =>
              item.id === value.id
                ? {
                    ...item,
                    checked: true,
                  }
                : item,
            ),
          );
          let paramServicePackageDetails = {
            branchId: service.branchId,
            bukrs: service.bukrs,
            servicePackageId: value.id,
          };

          props.fetchServicePackageDetails({ ...paramServicePackageDetails });
        }
        break;
      case 'modalOpenServicePackage':
        setModalServicePackage(true);
        break;
      case 'closeOpenServicePackage':
        setModalServicePackage(false);
        break;

      case 'deleteServicePackage':
        let deleteFilterSP = servicePackageList.filter(
          item => item.id !== value.id,
        );
        setServicePackageList([...deleteFilterSP]);
        break;

      case 'dimmerClose':
        console.log('DIMMER');
        break;
      default:
        console.log('нет таких!');
        break;
    }
  };

  useEffect(() => {
    matnrServicePackage.map((item, index) => {
      setServicePackageList(prev => [
        ...prev,
        {
          index: null,
          currencyId: item.currencyId,
          currencyName: item.waers,
          fno: null,
          id: item.id,
          matnr: item.matnr,
          matnrName: item.name,
          matnrCode: null,
          matnrPrice: null,
          menge: null,
          qinit: null,
          qminus: null,
          operationId: null,
          quantity: 1,
          serviceId: null,
          servicePackageId: item.id,
          serviceTypeId: 4,
          sum: item.summ,
          warranty: null,
          checked: false,
          details: [],
        },
      ]);
    });
  }, [matnrServicePackage]);

  useEffect(() => {
    if (servicePacketDetails.length > 0) {
      let detailsId = servicePacketDetails[0].servicePackageId;
      setServicePackageList(
        servicePackageList.map(item =>
          item.id === detailsId
            ? {
                ...item,
                details: [...servicePacketDetails],
              }
            : item,
        ),
      );
    }
  }, [servicePacketDetails]);

  useEffect(() => {
    let filterSparePartInitial = sparePartInitial.filter(
      item => item.checked === true,
    );
    setService({
      ...service,
      positions: [...services, ...filterSparePartInitial],
    });
  }, [services, sparePartInitial]);

  return (
    <Form>
      <StaffF4Modal
        open={modalOpen.staffF4ModalOpen}
        closeModal={bool => setModalOpen({ staffF4ModalOpen: bool })}
        onStaffSelect={item => inputChange(item, staffF4ModalPosition)}
        trans="mmcc"
        brnch={service.branchId}
        branchOptions={serBranches}
        bukrs={service.bukrs}
        companyOptions={companyOptions}
        bukrsDisabledParent
      />

      <Grid>
        <Grid.Row>
          {/*BASIC INFO*/}
          <Grid.Column width={5}>
            <BasicInfoWithoutRequest
              data={service}
              operatorOptions={operatorOptions}
              onBasicInfoInputChange={onBasicInfoInputChange}
            />
          </Grid.Column>

          <Grid.Column readOnly width={11}>
            {/*Услуги */}
            <Services
              data={services}
              addServices={addServices}
              servicesOptions={serviceOptions}
              handleRemoveService={handleRemoveService}
              selectServices={selectServices}
              waers={service.currencyName}
              editStatus={editStatus}
            />

            {/*Продажа запчастей */}
            <SaleOfSparePart
              data={sparePartInitial}
              onChangeSparePart={onChangeSparePart}
              editStatus={editStatus}
            />

            <ModalAddSparePart
              data={sparePartList}
              modalOpen={modalSparePart}
              checkedSparePart={checkedSparePart}
              handleApplySparePart={handleApplySparePart}
            />

            {/*Продажа картриджей */}
            <SaleCartridge
              data={cartridgeInitial}
              onChangeCartridge={onChangeCartridge}
              editStatus={editStatus}
            />

            <ModalAddCartridge
              data={cartridgeList}
              modalOpen={modalCartridge}
              onChangeCartridge={onChangeCartridge}
            />

            {/*Сервис пакет*/}
            <ServicePackage
              data={servicePackageListFilter}
              onChangeServicePackage={onChangeServicePackage}
              editStatus={editStatus}
            />
            <ModalAddServicePacket
              data={servicePackageList}
              modalStatus={modalServicePackage}
              onChangeServicePackage={onChangeServicePackage}
            />

            {/*Таблица*/}
            <TableReportWithoutRequest />
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Form>
  );
};

function mapStateToProps(state) {
  return {
    language: state.locales.lang,
    countryList: state.f4.countryList,
    contractTypeList: state.f4.contractTypeList,
    branches: state.f4.branches,
    contract: state.smcsReducer.contract,
    companyOptions: state.userInfo.companyOptions,
    branchOptions: state.userInfo.branchOptionsMarketing,
    category: state.f4.category,
    customersById: state.f4.customersById,
    tovar: state.smcsReducer.tovar,
    serviceTypeId: state.smcsReducer.serviceTypeId,
    matnrPriceSparePart: state.smcsReducer.matnrPriceSparePart,
    matnrPriceCartridge: state.smcsReducer.matnrPriceCartridge,
    matnrServicePackage: state.smcsReducer.matnrServicePackage,
    servicePacketDetails: state.smcsReducer.servicePacketDetails,
    servicePacketProps: state.smcsReducer.smcsServicePacket,
    positionSumm: state.smcsReducer.smcsFetchPositionSumm,
    checkSmcs: state.smcsReducer.checkSmcs,
    saveSmcs: state.smcsReducer.saveSmcs,
    operatorList: state.smcsReducer.operatorList,
  };
}

export default connect(mapStateToProps, {
  fetchServiceSmcs,
  f4FetchConTypeList,
  f4FetchBranches,
  f4FetchCountryList,
  f4FetchCompanyOptions,
  f4fetchCategory,
  f4FetchCustomersById,
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
})(injectIntl(TabSmcsWithoutRequest));
