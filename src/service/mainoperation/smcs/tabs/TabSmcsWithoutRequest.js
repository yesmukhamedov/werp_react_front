import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';
import {
  Grid,
  Form,
  Button,
  Icon,
  Confirm,
  Checkbox,
  Table,
  Dropdown,
} from 'semantic-ui-react';

import {
  fetchServiceSmcs,
  fetchTovarId,
  fetchServiceTypeId,
  fetchMatnrPriceSparePart,
  clearMatnrPriceSparePart,
  fetchMatnrPriceCartridge,
  clearMatnrPriceCartridge,
  fetchMatnrPriceServicePackage,
  clearMatnrPriceServicePackage,
  fetchServicePackageDetails,
  clearServicePackageDetails,
  fetchSmcsServicePacket,
  fetchPositionSumm,
  checkSmcsWithoutReques,
  saveSmcsWithoutReques,
  fetchOperatorList,
  fetchMasterList,
  fetchCheckWarranty,
  saveSmcsPayment,
  fetchPaymentOptions,
  fetchSmcsByContractNumber,
  postApplicationsMaster,
  postApplicationsOperator,
} from '../smcsAction';

import {
  f4FetchConTypeList,
  f4FetchCountryList,
  f4fetchCategory,
  f4FetchCustomersById,
} from '../../../../reference/f4/f4_action';

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
import ModalApplications from './components/ModalApplications';

import { emptyService } from '../components/directory';

//Создание сервиса без заявки
const TabSmcsWithoutRequest = props => {
  const {
    contract = {},
    serviceTypeId = [],
    matnrPriceSparePart1 = [],
    matnrPriceCartridge1 = [],
    matnrServicePackage1 = [],
    servicePacketDetails = [],
    positionSumm = {},
    checkSmcs1 = {},
    //saveSmcs,
    operatorList = [],
    masterList = [],
    //checkWarranty,
    tovarSnProps,
    paymentOptions1 = [],
    masterListApp = [],
    operatorListApp = [],
  } = props;

  console.log('paymentOptions1', paymentOptions1);

  //Основной объект сервиса
  const [service, setService] = useState({ ...emptyService });

  const [paymentChecked, setPaymentChecked] = useState(false);
  const [hkontS, setHkontS] = useState('');

  const [checkStatus, setCheckStatus] = useState(false);

  const [modalApplications, setModalApplications] = useState(false);
  const [contractApplications, setContractApplications] = useState([]);

  const successCheck = () => {
    setCheckStatus(true);
  };

  useEffect(() => {
    if (tovarSnProps != '') {
      let tovarSn = tovarSnProps;
      props.fetchServiceSmcs({ tovarSn });
      props.fetchServiceTypeId();
    }
  }, [tovarSnProps]);

  const funcWarranty = (param, data, item) => {
    if (parseInt(item.serviceTypeId) == 3) {
      setSparePartList(
        sparePartList.map(el =>
          el.id === item.id
            ? {
                ...el,
                warranty: data.data,
              }
            : el,
        ),
      );
    } else if (parseInt(item.serviceTypeId) == 1) {
      setCartridgeList(
        cartridgeList.map(el =>
          el.id === item.id
            ? {
                ...el,
                warranty: data.data,
              }
            : el,
        ),
      );
    }
  };

  const [editStatus, setEditStatus] = useState(true);

  //BasicInfo
  const onBasicInfoInputChange = (value, fieldName) => {
    switch (fieldName) {
      //Поиск по серииному номеру товара(tovarSn)
      case 'searchTovarSN':
        props.fetchServiceSmcs({ tovarSn: service.tovarSn });
        props.fetchServiceTypeId();
        setService({ ...emptyService, tovarSn: service.tovarSn });
        break;
      case 'searchCN':
        props.fetchSmcsByContractNumber({
          contractNumber: service.contractNumber,
        });
        setService({ ...emptyService, contractNumber: service.contractNumber });
        break;
      //Изменить серииный номер товара
      case 'inputChangeTovarSN':
        setService({ ...service, tovarSn: value.target.value });
        break;

      case 'inputChangeCN':
        setService({ ...service, contractNumber: value.target.value });
        break;

      case 'changeOperator':
        setService({ ...service, operatorId: value.value });
        break;
      case 'clearOperator':
        setService({ ...service, operatorId: null });
        break;

      case 'changeMaster':
        setService({ ...service, masterId: value.value });
        break;
      case 'clearMaster':
        setService({ ...service, masterId: null });
        break;
      case 'infoChange':
        setService({ ...service, info: value.value });
        break;
      case 'changeServiceDate':
        setService({ ...service, serviceDate: value });
        break;

      default:
        alert('Нет таких значений');
    }
  };

  useEffect(() => {
    props.fetchServiceTypeId();
  }, []);

  useEffect(() => {
    if (Object.keys(contract).length > 0) {
      if (contract.applications.length > 0) {
        setModalApplications(true);
        setContractApplications([...contract.applications]);
        let param = {
          branchId: contract.service.branchId,
          bukrs: contract.service.bukrs,
          categoryId: contract.service.categoryId,
        };
        props.fetchMasterList(
          {
            ...param,
          },
          1,
        );
        props.fetchOperatorList(
          {
            ...param,
          },
          1,
        );
      } else {
        setSparePartInitial([]);
        setSparePartList([]);
        setCartridgeInitial([]);
        setCartridgeList([]);
        setServicePackageInitial([]);
        setServicePackageList([]);
        setServices([]);
        setService({ ...contract.service });
        let param = {
          branchId: contract.service.branchId,
          bukrs: contract.service.bukrs,
          categoryId: contract.service.categoryId,
        };

        if (contract.service.branchId && contract.service.bukrs) {
          props.fetchOperatorList({
            ...param,
          });

          props.fetchMasterList({
            ...param,
          });
        }

        if (
          contract.service.branchId &&
          contract.service.bukrs &&
          contract.service.tovarId
        ) {
          let param = {
            branchId: contract.service.branchId,
            bukrs: contract.service.bukrs,
            productId: contract.service.tovarId,
          };
          props.fetchMatnrPriceServicePackage({ ...param }, 1);
        }
        if (
          contract.service.branchId &&
          contract.service.bukrs &&
          contract.service.currencyName
        ) {
          let param = {
            brnch: contract.service.branchId,
            bukrs: contract.service.bukrs,
            waers: contract.service.currencyName,
          };

          props.fetchPaymentOptions({ ...param }, 1);
        }
      }
    }
  }, [contract]);

  const operatorOptions = operatorList.map((item, index) => {
    return {
      key: parseInt(item.staffId) * index,
      text: item.fullName,
      value: parseInt(item.staffId),
    };
  });
  const masterOptions = masterList.map((item, index) => {
    return {
      key: parseInt(item.staffId) * index,
      text: item.fullName,
      value: parseInt(item.staffId),
    };
  });
  const masterOptionsApp = masterListApp.map((item, index) => {
    return {
      key: parseInt(item.staffId) * index,
      text: item.fullName,
      value: parseInt(item.staffId),
    };
  });
  const operatorOptionsApp = operatorListApp.map((item, index) => {
    return {
      key: parseInt(item.staffId) * index,
      text: item.fullName,
      value: parseInt(item.staffId),
    };
  });

  useEffect(() => {
    props.clearMatnrPriceSparePart();
    props.clearMatnrPriceCartridge();
    props.clearMatnrPriceServicePackage();
    props.clearServicePackageDetails();

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

    if (master) {
      setServices([]);
      setSparePartList([]);
      setCartridgeList([]);
      setServicePackageInitial([]);

      props.fetchMatnrPriceSparePart({ ...paramMatnrSparePart }, 1);
      props.fetchMatnrPriceCartridge({ ...paramMatnrCartridge }, 1);
      setEditStatus(false);
    }
    setCheckStatus(false);
  }, [service.masterId]);

  useEffect(() => {
    setCheckStatus(false);
  }, [service.operatorId]);

  //УСЛУГИ============================================================================================================================
  //==================================================================================================================================

  const [services, setServices] = useState([]);
  useEffect(() => {
    setCheckStatus(false);
  }, [services]);

  const serviceOptions = serviceTypeId
    .filter(
      item =>
        item.id == '2' ||
        item.id == '5' ||
        item.id == '6' ||
        item.id == '7' ||
        item.id == '8',
    )
    .map(item => {
      return {
        key: parseInt(item.id),
        text: item.name,
        value: parseInt(item.id),
      };
    });

  // Добавить услуги
  const addServices = e => {
    let length = service.positions.length;

    setServices([
      ...services,
      {
        currencyId: null,
        currencyName: null,
        fno: null,
        id: parseInt(`222${length}`),
        matnrId: null,
        matnrName: null,
        matnrPrice: null,
        operationId: null,
        operationName: null,
        quantity: null,
        serviceId: null,
        servicePackageId: null,
        servicePackageName: null,
        serviceTypeId: null,
        serviceTypeName: null,
        sum: null,
        warranty: false,
        ss: 22,
        pId: parseInt(`222${service.positions.length}`),
      },
    ]);
  };

  const onChangeSumm = (id, value) => {
    setServices(
      services.map(item =>
        item.serviceTypeId == id
          ? {
              ...item,
              sum: parseInt(value),
            }
          : item,
      ),
    );
  };

  //Select services
  const selectServices = (id, value) => {
    let servicesData = services.filter(item => item.ss == 22);
    let servicesFilter = servicesData.filter(
      item => item.serviceTypeId == value.value,
    );

    if (servicesFilter.length > 0) {
      alert(
        'Вы не можете добавить несколько одноименных услуг в эту сервис карту',
      );
    } else {
      setServices(
        services.map(item =>
          item.id == id
            ? {
                ...item,
                serviceTypeId: parseInt(value.value),
              }
            : item,
        ),
      );
      let posParam = {
        currencyId: null,
        currencyName: '',
        fno: null,
        id: null,
        matnrId: null,
        matnrName: '',
        matnrPrice: null,
        operationId: null,
        operationName: '',
        quantity: null,
        serviceId: null,
        servicePackageId: null,
        servicePackageName: '',
        serviceTypeId: parseInt(value.value),
        serviceTypeName: '',
        sum: null,
        warranty: false,
      };

      props.fetchPositionSumm(
        service.branchId,
        service.bukrs,
        service.tovarId,
        posParam,
      );
    }
  };

  useEffect(() => {
    if (Object.keys(positionSumm).length > 0) {
      setServices(
        services.map(item =>
          item.serviceTypeId == positionSumm.serviceTypeId
            ? {
                ...item,
                currencyId: positionSumm.currencyId,
                currencyName: positionSumm.currencyName,
                sum: positionSumm.sum,
              }
            : item,
        ),
      );
    }
  }, [positionSumm]);

  //Удалить услуг
  const handleRemoveService = value => {
    let servicesFilter = services.filter(item => item.id !== value.id);
    setServices([...servicesFilter]);
  };

  //ПРОДАЖА ЗАПЧАСТЕЙ=================================================================================================================
  //==================================================================================================================================
  const [sparePartInitial, setSparePartInitial] = useState([]);

  const [sparePartList, setSparePartList] = useState([]);

  const [modalSparePart, setModalSparePart] = useState(false);

  const onChangeSparePart = (value, fildName, original, id) => {
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
          if (val < 0) {
            setSparePartInitial(
              sparePartInitial.map(item =>
                item.id === original.id
                  ? {
                      ...item,
                      quantity: 0,
                      sum: 0 * item.matnrPrice,
                    }
                  : item,
              ),
            );
          } else {
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
          }
        } else {
          alert(`У Вас в подотчете ${original.menge}`);
        }
        break;

      case 'warrantySparePart':
        if (value.warranty == false) {
          let param = {
            contractId: service.contractId,
            matnrId: value.matnrId,
            serviceDate: service.serviceDate,
            serviceTypeId: value.serviceTypeId,
          };
          props.fetchCheckWarranty({ ...param }, funcWarranty, value);
        } else {
          setSparePartList(
            sparePartList.map(el =>
              el.id === value.id
                ? {
                    ...el,
                    warranty: false,
                  }
                : el,
            ),
          );
        }

        break;

      default:
        break;
    }
  };

  useEffect(() => {
    matnrPriceSparePart1.map((item, index) => {
      setSparePartList(prev => [
        ...prev,
        {
          currencyId: item.currencyId,
          currencyName: item.currencyName,
          fno: null,
          id: parseInt(
            `${item.matnrId * 63 + index + Math.floor(Math.random() * 10000)}`,
          ),
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
        },
      ]);
    });
  }, [matnrPriceSparePart1]);

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
    setCheckStatus(false);
  }, [sparePartList]);

  //ПРОДАЖА КАРТРИДЖЕЙ================================================================================================================
  //==================================================================================================================================
  const [cartridgeInitial, setCartridgeInitial] = useState([]);
  const [cartridgeList, setCartridgeList] = useState([]);
  const [modalCartridge, setModalCartridge] = useState(false);

  const onChangeCartridge = (value, fieldName, original, id) => {
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
        setCartridgeList(
          cartridgeList.map(item =>
            item.id === original
              ? {
                  ...item,
                  fno: parseInt(value.value, 10),
                }
              : item,
          ),
        );
        break;
      //Удалить картридж
      case 'deleteCartridge':
        let deleteFilter = cartridgeInitial.filter(
          item => item.id !== original,
        );
        setCartridgeList([...deleteFilter]);

        setCartridgeList(
          cartridgeList.map(item =>
            item.id === original
              ? {
                  ...item,
                  checked: false,
                  fno: parseInt(item.tempFno),
                }
              : item,
          ),
        );
        break;

      case 'duplicateCartridge':
        console.log('duplicateCartridge', value);
        setCartridgeList([
          ...cartridgeList,
          {
            currencyId: value.currencyId,
            currencyName: value.currencyName,
            fno: value.fno,
            tempFno: value.fno,
            id: parseInt(
              `${value.matnrId * 63 + Math.floor(Math.random() * 10000)}99`,
            ),
            matnrId: value.matnrId,
            matnrCode: value.matnrCode,
            matnrName: value.matnrName,
            matnrPrice: value.matnrPrice,
            operationId: null,
            operationName: null,
            menge: value.menge,
            quantity: 1,
            serviceId: null,
            servicePackageId: null,
            servicePackageName: null,
            serviceTypeId: 1,
            serviceTypeName: value.serviceTypeName,
            sum: value.sum,
            warranty: false,
            checked: true,
          },
        ]);
        break;

      //Количество картриджей
      case 'quantityCartridge':
        let val = value.target.value;
        if (val <= original.menge) {
          if (val < 0) {
            setCartridgeList(
              cartridgeList.map(item =>
                item.id === original.id
                  ? {
                      ...item,
                      quantity: 0,
                      sum: 0 * item.matnrPrice,
                    }
                  : item,
              ),
            );
          } else {
            setCartridgeList(
              cartridgeList.map(item =>
                item.id === original.id
                  ? {
                      ...item,
                      quantity: val,
                      sum: val * item.matnrPrice,
                    }
                  : item,
              ),
            );
          }
        } else {
          alert(`У Вас в подотчете ${original.menge}`);
        }
        break;

      case 'warrantyCartridge':
        if (value.warranty == false) {
          let param = {
            contractId: service.contractId,
            matnrId: value.matnrId,
            serviceDate: service.serviceDate,
            serviceTypeId: value.serviceTypeId,
          };
          props.fetchCheckWarranty({ ...param }, funcWarranty, value);
        } else {
          setCartridgeList(
            cartridgeList.map(el =>
              el.id === value.id
                ? {
                    ...el,
                    warranty: false,
                  }
                : el,
            ),
          );
        }

        break;

      default:
        alert('Нет таких значений');
    }
  };

  useEffect(() => {
    matnrPriceCartridge1.map((item, index) => {
      setCartridgeList(prev => [
        ...prev,
        {
          currencyId: item.currencyId,
          currencyName: item.currencyName,
          fno: item.fno,
          tempFno: item.fno,
          id: parseInt(
            `${item.matnrId * 63 + index + Math.floor(Math.random() * 10000)}`,
          ),
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
          serviceTypeId: 1,
          serviceTypeName: null,
          sum: null,
          warranty: false,
          checked: false,
        },
      ]);
    });
  }, [matnrPriceCartridge1]);

  useEffect(() => {
    let filterCartridge = cartridgeList.filter(item => item.checked === true);
    setCartridgeInitial([...filterCartridge]);
    setCheckStatus(false);
  }, [cartridgeList]);

  //СЕРВИС ПАКЕТ======================================================================================================================
  //==================================================================================================================================

  const [servicePackageInitial, setServicePackageInitial] = useState([]);
  const [servicePackageList, setServicePackageList] = useState([]);
  const [modalServicePackage, setModalServicePackage] = useState(false);

  const onChangeServicePackage = (value, fieldName, original) => {
    switch (fieldName) {
      case 'checkedServicePackage':
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
        let deleteFilterSP = servicePackageInitial.filter(
          item => item.id !== value.id,
        );
        setServicePackageInitial([...deleteFilterSP]);
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
        break;

      case 'dimmerClose':
        break;
      default:
        alert('Нет таких значении!');
        break;
    }
  };

  useEffect(() => {
    matnrServicePackage1.map((item, index) => {
      setServicePackageList(prev => [
        ...prev,
        {
          index: null,
          currencyId: item.currencyId,
          currencyName: item.waers,
          fno: null,
          id: item.id,
          matnrId: item.matnrId,
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
  }, [matnrServicePackage1]);

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
    let filterServicePackage = servicePackageList.filter(
      item => item.checked === true,
    );
    setServicePackageInitial([...filterServicePackage]);
    setCheckStatus(false);
  }, [servicePackageList]);

  useEffect(() => {
    let servicesF = services.map(item => {
      return {
        currencyId: item.currencyId,
        currencyName: item.currencyName,
        fno: item.fno,
        id: null,
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
      };
    });

    let sparePart = sparePartInitial
      .filter(item => item.checked === true)
      .map(item => {
        return {
          currencyId: item.currencyId,
          currencyName: item.currencyName,
          fno: item.fno,
          id: null,
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
        };
      });

    let cartridge = cartridgeInitial
      .filter(item => item.checked === true)
      .map(item => {
        return {
          currencyId: item.currencyId,
          currencyName: item.currencyName,
          fno: item.fno,
          id: null,
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
        };
      });

    let servicePackage = [];

    servicePackageInitial
      .filter(item => item.checked === true)
      .map(elem =>
        elem.details.map(item => {
          return servicePackage.push({
            currencyId: item.currencyId,
            currencyName: item.currencyName,
            fno: item.fno,
            id: null,
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
          });
        }),
      );

    setService({
      ...service,
      positions: [...servicesF, ...sparePart, ...cartridge, ...servicePackage],
    });
  }, [, services, sparePartInitial, cartridgeInitial, servicePackageInitial]);

  const handleCheck = () => {
    if (service.masterId) {
      props.checkSmcsWithoutReques(service, successCheck, 1);
    } else {
      alert('Выберите мастера');
    }
  };

  const [modalConfirm, setModalConfirm] = useState(false);
  const handleSave = () => {
    setModalConfirm(false);
    if (paymentChecked == false) {
      props.saveSmcsWithoutReques(service, data => {
        window.location = `smes?serviceNumber=${data.data.id}`;
      });
    } else {
      if (hkontS) {
        props.saveSmcsPayment(service, hkontS, data => {
          window.location = `smes?serviceNumber=${data.data.id}`;
        });
      } else {
        alert('Выберите кассу');
      }
    }
  };

  useEffect(() => {
    if (checkSmcs1.contractId === service.contractId) {
      setService({
        ...service,
        sumTotal: checkSmcs1.sumTotal,
        discount: checkSmcs1.discount,
        sumForPay: checkSmcs1.sumForPay,
        paid: checkSmcs1.paid,
        masterPremium: checkSmcs1.masterPremium,
        operatorPremium: checkSmcs1.operatorPremium,
      });

      setCheckStatus(true);
    }
  }, [checkSmcs1]);

  const onChangeMasterApp = (app, value) => {
    console.log('onChangeMasterApp', app);
    let param = {
      adate: app.applicationDate,
      address: app.addressName,
      appStatus: app.applicationStatusId,
      appStatusName: app.applicationStatusName,
      appType: app.applicationTypeId,
      appTypeName: app.applicationTypeName,
      applicantName: app.applicantName,
      branchId: app.branchId,
      branchName: app.branchName,
      bukrs: app.bukrsId,
      bukrsName: app.bukrsName,
      contractDate: null,
      contractNumber: app.contractNumber,
      createdBy: app.contractNumber,
      customerId: app.customerId,
      f1MtLeft: app.f1MtLeft,
      f2MtLeft: app.f2MtLeft,
      f3MtLeft: app.f3MtLeft,
      f4MtLeft: app.f4MtLeft,
      f5MtLeft: app.f5MtLeft,
      fitterName: app.fitterFIO,
      fullPhone: app.fullPhone,
      id: app.id,
      inPhoneNum: app.inPhoneNum,
      info: app.info,
      installmentDate: app.installmentDate,
      masterId: value,
      masterName: app.masterFIO,
      matnr: app.matnrId,
      matnrName: app.matnrName,
      operatorId: app.operatorId,
      operatorName: app.operatorFIO,
      rescheduledDate: app.rescheduledDate,
      serviceDate: app.serviceDate,
      serviceId: app.serviceId,
      serviceTotalSum: null,
      tovarCategory: app.tovarCategoryId,
      tovarSn: app.tovarSn,
      updatedBy: app.updatedBy,
      updatedDate: app.updatedDate,
      urgencyLevel: app.urgencyLevel,
      warranty: null,
      warrantyEndDate: null,
      warrantyEndedMonths: null,
    };
    props.postApplicationsMaster({ ...param }, () =>
      setContractApplications(
        contractApplications.map(item =>
          item.id === app.id
            ? {
                ...item,
                masterId: value,
              }
            : item,
        ),
      ),
    );
  };

  const clearApplicationsMaster = app => {
    console.log('onChangeMasterApp', app);
    let param = {
      adate: app.applicationDate,
      address: app.addressName,
      appStatus: app.applicationStatusId,
      appStatusName: app.applicationStatusName,
      appType: app.applicationTypeId,
      appTypeName: app.applicationTypeName,
      applicantName: app.applicantName,
      branchId: app.branchId,
      branchName: app.branchName,
      bukrs: app.bukrsId,
      bukrsName: app.bukrsName,
      contractDate: null,
      contractNumber: app.contractNumber,
      createdBy: app.contractNumber,
      customerId: app.customerId,
      f1MtLeft: app.f1MtLeft,
      f2MtLeft: app.f2MtLeft,
      f3MtLeft: app.f3MtLeft,
      f4MtLeft: app.f4MtLeft,
      f5MtLeft: app.f5MtLeft,
      fitterName: app.fitterFIO,
      fullPhone: app.fullPhone,
      id: app.id,
      inPhoneNum: app.inPhoneNum,
      info: app.info,
      installmentDate: app.installmentDate,
      masterId: null,
      masterName: null,
      matnr: app.matnrId,
      matnrName: app.matnrName,
      operatorId: app.operatorId,
      operatorName: app.operatorFIO,
      rescheduledDate: app.rescheduledDate,
      serviceDate: app.serviceDate,
      serviceId: app.serviceId,
      serviceTotalSum: null,
      tovarCategory: app.tovarCategoryId,
      tovarSn: app.tovarSn,
      updatedBy: app.updatedBy,
      updatedDate: app.updatedDate,
      urgencyLevel: app.urgencyLevel,
      warranty: null,
      warrantyEndDate: null,
      warrantyEndedMonths: null,
    };
    props.postApplicationsMaster({ ...param }, () =>
      setContractApplications(
        contractApplications.map(item =>
          item.id === app.id
            ? {
                ...item,
                masterId: null,
              }
            : item,
        ),
      ),
    );
  };

  const onChangeOperatorApp = (app, value) => {
    let param = {
      applicationId: app.id,
      operatorId: value,
    };
    props.postApplicationsOperator({ ...param }, () =>
      setContractApplications(
        contractApplications.map(item =>
          item.id === app.id
            ? {
                ...item,
                operatorId: value,
              }
            : item,
        ),
      ),
    );
  };

  const clearApplicationsOperator = app => {
    console.log('clearApplicationsOperator', app);
    let param = {
      applicationId: app.id,
      operatorId: '',
    };
    props.postApplicationsOperator({ ...param }, () =>
      setContractApplications(
        contractApplications.map(item =>
          item.id === app.id
            ? {
                ...item,
                operatorId: '',
              }
            : item,
        ),
      ),
    );
  };

  const cancelApplicationsModal = () => {
    setModalApplications(false);
    setSparePartInitial([]);
    setSparePartList([]);
    setCartridgeInitial([]);
    setCartridgeList([]);
    setServicePackageInitial([]);
    setServicePackageList([]);
    setServices([]);
    setService({ ...contract.service });
    let param = {
      branchId: contract.service.branchId,
      bukrs: contract.service.bukrs,
      categoryId: contract.service.categoryId,
    };

    if (contract.service.branchId && contract.service.bukrs) {
      props.fetchOperatorList({
        ...param,
      });

      props.fetchMasterList({
        ...param,
      });
    }

    if (
      contract.service.branchId &&
      contract.service.bukrs &&
      contract.service.tovarId
    ) {
      let param = {
        branchId: contract.service.branchId,
        bukrs: contract.service.bukrs,
        productId: contract.service.tovarId,
      };
      props.fetchMatnrPriceServicePackage({ ...param }, 1);
    }

    if (
      contract.service.branchId &&
      contract.service.bukrs &&
      contract.service.currencyName
    ) {
      let param = {
        brnch: contract.service.branchId,
        bukrs: contract.service.bukrs,
        waers: contract.service.currencyName,
      };
      props.fetchPaymentOptions({ ...param }, 1);
    }
  };

  return (
    <Form>
      <Confirm
        header="Подтверждения"
        content="Вы действительно хотите сохранить?"
        open={modalConfirm}
        onCancel={() => setModalConfirm(false)}
        onConfirm={handleSave}
        confirmButton="Сохранить"
        cancelButton="Отмена"
      />
      <ModalApplications
        open={modalApplications}
        closeModal={cancelApplicationsModal}
        applications={contractApplications}
        onClose={() => setModalApplications(false)}
        masterOptions={masterOptionsApp}
        operatorOptions={operatorOptionsApp}
        onChangeMasterApp={onChangeMasterApp}
        clearApplicationsMaster={clearApplicationsMaster}
        onChangeOperatorApp={onChangeOperatorApp}
        clearApplicationsOperator={clearApplicationsOperator}
      />
      <Grid>
        <Grid.Row>
          {/*BASIC INFO*/}
          <Grid.Column width={5}>
            <BasicInfoWithoutRequest
              data={service}
              operatorOptions={operatorOptions}
              masterOptions={masterOptions}
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
              currency={service.currencyName}
              onChangeSumm={onChangeSumm}
            />

            {/*Продажа запчастей */}
            <SaleOfSparePart
              data={sparePartInitial}
              onChangeSparePart={onChangeSparePart}
              editStatus={editStatus}
              currency={service.currencyName}
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
              currency={service.currencyName}
            />

            <ModalAddCartridge
              data={cartridgeList}
              modalOpen={modalCartridge}
              onChangeCartridge={onChangeCartridge}
            />

            {/*Сервис пакет*/}
            <ServicePackage
              data={servicePackageInitial}
              onChangeServicePackage={onChangeServicePackage}
              editStatus={editStatus}
              currency={service.currencyName}
            />
            <ModalAddServicePacket
              data={servicePackageList}
              modalStatus={modalServicePackage}
              onChangeServicePackage={onChangeServicePackage}
            />

            {/*Таблица*/}
            <TableReportWithoutRequest
              data={service}
              currency={service.currencyName}
            />

            <Table celled>
              <Table.Body>
                <Table.Row>
                  <Table.Cell width={4}>
                    <Checkbox
                      checked={paymentChecked}
                      label="Оплатить"
                      onChange={() => setPaymentChecked(!paymentChecked)}
                    />
                  </Table.Cell>
                  {paymentChecked == true ? (
                    <Table.Cell width={2}>
                      <Form.Field required>
                        <label>Касса:</label>
                      </Form.Field>
                    </Table.Cell>
                  ) : (
                    ''
                  )}
                  {paymentChecked == true ? (
                    <Table.Cell width={5}>
                      <Dropdown
                        placeholder="Выберите кассу для оплаты"
                        selection
                        fluid
                        options={paymentOptions1}
                        value={parseInt(hkontS) ? parseInt(hkontS) : ''}
                        onChange={(e, value) =>
                          setHkontS(value.value.toString())
                        }
                      />
                    </Table.Cell>
                  ) : (
                    ''
                  )}
                </Table.Row>
              </Table.Body>
            </Table>

            {/*Проверить*/}
            <Button disabled={checkStatus} color="green" onClick={handleCheck}>
              <Icon name="check" size="large" />
              Проверить
            </Button>

            {/*Сохранить*/}
            <Button
              disabled={!checkStatus}
              type="submit"
              primary
              onClick={() => setModalConfirm(true)}
            >
              <Icon name="save" size="large" />
              Сохранить
            </Button>
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
    contract: state.smcsReducer.contract,
    category: state.f4.category,
    customersById: state.f4.customersById,
    tovar: state.smcsReducer.tovar,
    serviceTypeId: state.smcsReducer.serviceTypeId,
    matnrPriceSparePart1: state.smcsReducer.matnrPriceSparePart1,
    matnrPriceCartridge1: state.smcsReducer.matnrPriceCartridge1,
    matnrServicePackage1: state.smcsReducer.matnrServicePackage1,
    servicePacketDetails: state.smcsReducer.servicePacketDetails,
    positionSumm: state.smcsReducer.smcsFetchPositionSumm,
    checkSmcs1: state.smcsReducer.checkSmcs1,
    saveSmcs: state.smcsReducer.saveSmcs,
    operatorList: state.smcsReducer.operatorList,
    masterList: state.smcsReducer.masterList,
    masterListApp: state.smcsReducer.masterListApp,
    operatorListApp: state.smcsReducer.operatorListApp,
    checkWarranty: state.smcsReducer.checkWarranty,
    paymentOptions1: state.smcsReducer.paymentOptions1,
  };
}

export default connect(mapStateToProps, {
  fetchServiceSmcs,
  f4FetchConTypeList,
  f4FetchCountryList,

  f4fetchCategory,
  f4FetchCustomersById,
  fetchTovarId,
  fetchServiceTypeId,
  fetchMatnrPriceSparePart,
  clearMatnrPriceSparePart,
  fetchMatnrPriceCartridge,
  clearMatnrPriceCartridge,
  fetchMatnrPriceServicePackage,
  clearMatnrPriceServicePackage,
  fetchServicePackageDetails,
  clearServicePackageDetails,
  fetchSmcsServicePacket,
  fetchPositionSumm,
  checkSmcsWithoutReques,
  saveSmcsWithoutReques,
  saveSmcsPayment,
  fetchOperatorList,
  fetchMasterList,
  fetchCheckWarranty,
  fetchPaymentOptions,
  fetchSmcsByContractNumber,
  postApplicationsMaster,
  postApplicationsOperator,
})(injectIntl(TabSmcsWithoutRequest));
