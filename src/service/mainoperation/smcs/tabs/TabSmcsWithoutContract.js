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
  Dropdown,
  Table,
} from 'semantic-ui-react';

import {
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
  saveSmcsPayment,
  fetchOperatorList,
  fetchMasterList,
  fetchCheckWarranty,
  fetchPaymentOptions,
  clearMatnrPriceSparePart,
  clearMatnrPriceCartridge,
  clearMatnrPriceServicePackage,
  clearServicePackageDetails,
} from '../smcsAction';

import {
  f4FetchConTypeList,
  f4FetchCountryList,
  f4FetchCompanyOptions,
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
import ServicePackage from './components/ServicePackage';
import TableReportWithoutRequest from './components/TableReportWithoutRequest';
import BasicInfoWithoutContract from './components/BasicInfoWithoutContract';
import { emptyService } from '../components/directory';
import { LinkToSmvs } from '../../../../utils/outlink';
import '../style.css';

//Создание сервиса без заявки
const TabSmcsWithoutContract = props => {
  const {
    companyOptions = [],
    serviceTypeId = [],
    matnrPriceSparePart2 = [],
    matnrPriceCartridge2 = [],
    matnrServicePackage2 = [],
    servicePacketDetails = [],
    positionSumm = {},
    checkSmcs2 = {},
    //saveSmcs,
    operatorList = [],
    category,
    tovar = [],
    masterList = [],
    branchOptionsService,
    withoutRequestProps = {},
    paymentOptions = [],
  } = props;

  console.log('matnrServicePackage2', matnrServicePackage2);

  //Основной объект сервиса
  const [service, setService] = useState({ ...emptyService });
  const [paymentChecked, setPaymentChecked] = useState(false);
  const [hkontS, setHkontS] = useState('');

  const [checkStatus, setCheckStatus] = useState(false);

  useEffect(() => {
    setCheckStatus(false);
  }, [
    service.bukrs,
    service.branchId,
    service.categoryId,
    service.tovarId,
    service.masterId,
    service.operatorId,
  ]);

  const successCheck = () => {
    setCheckStatus(true);
  };

  // const toSmvs = data => {
  //   setCheckStatus(false);
  //   return <LinkToSmvs serviceNumber={data.data.id} />;
  // };

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
      case 'selectCompany':
        setService({ ...service, bukrs: value.value });
        break;
      case 'clearBukrs':
        setService({ ...service, bukrs: '', bukrsName: '' });
        break;
      case 'selectBranch':
        setService({ ...service, branchId: value.value });
        break;
      case 'clearBranch':
        setService({ ...service, branchId: '' });
        break;
      case 'selectCategory':
        setService({ ...service, categoryId: value.value });
        break;
      case 'clearCategory':
        setService({ ...service, categoryId: '' });
        break;
      case 'selectTovar':
        setService({ ...service, tovarId: value.value });
        break;
      case 'clearTovar':
        setService({ ...service, tovarId: '' });
        break;
      case 'selectMaster':
        setService({ ...service, masterId: value.value });
        break;
      case 'clearMaster':
        setService({
          ...service,
          masterFullName: '',
          masterId: 0,
        });
      case 'selectOperator':
        setService({ ...service, operatorId: value.value });
        break;
      case 'clearOperator':
        setService({ ...service, operatorFullName: '', operatorId: 0 });
        break;
      case 'infoChange':
        console.log('VALUE', value.value);
        setService({ ...service, info: value.value });
        break;
      case 'changeServiceDate':
        setService({ ...service, serviceDate: value });
        break;

      default:
        alert('Нет таких значений');
    }
  };

  const tovarOptions = tovar.map(item => {
    return {
      key: item.matnr,
      text: item.text45,
      value: item.matnr,
    };
  });

  useEffect(() => {
    props.fetchServiceTypeId();
    props.f4fetchCategory();
  }, []);

  const categoryOptions = category.map(item => {
    return {
      key: item.id,
      text: item.name,
      value: item.id,
    };
  });

  const [modalOpen, setModalOpen] = useState({
    matnrF4ModalOpen: false,
    staffF4ModalOpen: false,
  });

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

  useEffect(() => {
    if (service.bukrs && service.branchId) {
      let param = {
        bukrs: service.bukrs,
        branchId: service.branchId,
        categoryId: service.categoryId,
      };
      props.fetchMasterList({ ...param });
      props.fetchOperatorList({ ...param });
    }

    if (service.branchId && service.bukrs) {
      let param = {
        brnch: service.branchId,
        bukrs: service.bukrs,
      };

      props.fetchPaymentOptions({ ...param });
    }
  }, [service.bukrs, service.branchId, service.categoryId]);

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
      props.fetchMatnrPriceSparePart({ ...paramMatnrSparePart }, 2);
      props.fetchMatnrPriceCartridge({ ...paramMatnrCartridge }, 2);
      setEditStatus(false);
    }
    setCheckStatus(false);
  }, [service.masterId]);

  useEffect(() => {
    if (service.bukrs && service.categoryId) {
      let param = {
        bukrs: service.bukrs,
        categoryId: service.categoryId,
      };
      props.fetchTovarId({ ...param });
    }
  }, [service.bukrs, service.categoryId]);

  useEffect(() => {
    if (service.bukrs && service.branchId && service.tovarId) {
      let param = {
        bukrs: service.bukrs,
        branchId: service.branchId,
        productId: service.tovarId,
      };
      props.fetchMatnrPriceServicePackage({ ...param }, 2);
    }
  }, [service.bukrs, service.branchId, service.tovarId]);

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
      },
    ]);
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
    matnrPriceSparePart2.map((item, index) => {
      setSparePartList(prev => [
        ...prev,
        {
          currencyId: item.currencyId,
          currencyName: item.currencyName,
          fno: item.fno,
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
  }, [matnrPriceSparePart2]);

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

  //ПРОДАЖА КАРТРИДЖЕЙ==================================================================================
  const [cartridgeInitial, setCartridgeInitial] = useState([]);
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
        setCartridgeList(
          cartridgeList.map(item =>
            item.id === original
              ? {
                  ...item,
                  fno: parseInt(value.value),
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
                  fno: item.tempFno,
                }
              : item,
          ),
        );
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

      default:
        alert('Нет таких значений');
    }
  };

  useEffect(() => {
    matnrPriceCartridge2.map((item, index) => {
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
  }, [matnrPriceCartridge2]);

  useEffect(() => {
    let filterCartridge = cartridgeList.filter(item => item.checked === true);
    setCartridgeInitial([...filterCartridge]);
    setCheckStatus(false);
  }, [cartridgeList]);

  //СЕРВИС ПАКЕТ========================================================================================

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
      case 'checkWarranty':
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    matnrServicePackage2.map((item, index) => {
      setServicePackageList(prev => [
        ...prev,
        {
          index: null,
          currencyId: item.currencyId,
          currencyName: item.waers,
          fno: item.fno,
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
  }, [matnrServicePackage2]);

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

  useEffect(() => {
    if (Object.keys(withoutRequestProps).length > 0) {
      setService({
        ...service,
        bukrs: withoutRequestProps.bukrs,
        branchId: withoutRequestProps.branchId,
        categoryId: withoutRequestProps.categoryId,
        tovarId: withoutRequestProps.tovarId,
      });
    }
  }, [withoutRequestProps]);

  useEffect(() => {
    if (checkSmcs2.contractId === service.contractId) {
      setService({
        ...service,
        currencyId: checkSmcs2.currencyId,
        currencyName: checkSmcs2.currencyName,
        sumTotal: checkSmcs2.sumTotal,
        discount: checkSmcs2.discount,
        sumForPay: checkSmcs2.sumForPay,
        paid: checkSmcs2.paid,
        masterPremium: checkSmcs2.masterPremium,
        operatorPremium: checkSmcs2.operatorPremium,
      });
    }
    if (Object.keys(checkSmcs2).length > 0) {
      setCheckStatus(true);
    }
  }, [checkSmcs2]);

  const handleCheck = () => {
    if (service.masterId) {
      props.checkSmcsWithoutReques(service, successCheck, 2);
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
      <Grid>
        <Grid.Row>
          {/*BASIC INFO*/}
          <Grid.Column width={5}>
            <BasicInfoWithoutContract
              data={service}
              operatorOptions={operatorOptions}
              onBasicInfoInputChange={onBasicInfoInputChange}
              companyOptions={companyOptions}
              branchOptions={branchOptionsService[service.bukrs]}
              categoryOptions={categoryOptions}
              tovarOptions={tovarOptions}
              masterOptions={masterOptions}
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
              onChangeSumm={onChangeSumm}
              waers={service.currencyName}
              editStatus={editStatus}
              currency={service.currencyName}
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
              data={servicePackageInitial}
              onChangeServicePackage={onChangeServicePackage}
              editStatus={editStatus}
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
                        options={paymentOptions}
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
    companyOptions: state.userInfo.companyOptions,
    branchOptionsService: state.userInfo.branchOptionsService,
    category: state.f4.category,
    customersById: state.f4.customersById,
    tovar: state.smcsReducer.tovar,
    serviceTypeId: state.smcsReducer.serviceTypeId,
    matnrPriceSparePart2: state.smcsReducer.matnrPriceSparePart2,
    matnrPriceCartridge2: state.smcsReducer.matnrPriceCartridge2,
    matnrServicePackage2: state.smcsReducer.matnrServicePackage2,
    servicePacketDetails: state.smcsReducer.servicePacketDetails,
    positionSumm: state.smcsReducer.smcsFetchPositionSumm,
    checkSmcs2: state.smcsReducer.checkSmcs2,
    saveSmcs: state.smcsReducer.saveSmcs,
    operatorList: state.smcsReducer.operatorList,
    masterList: state.smcsReducer.masterList,
    paymentOptions: state.smcsReducer.paymentOptions,
  };
}

export default connect(mapStateToProps, {
  f4FetchConTypeList,
  f4FetchCountryList,
  f4FetchCompanyOptions,
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
  fetchOperatorList,
  fetchMasterList,
  fetchCheckWarranty,
  saveSmcsPayment,
  fetchPaymentOptions,
})(injectIntl(TabSmcsWithoutContract));
