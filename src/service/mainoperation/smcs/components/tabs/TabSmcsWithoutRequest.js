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
  Modal,
  Header,
  Checkbox,
} from 'semantic-ui-react';

import {
  fetchServiceSmcs,
  fetchTovarId,
  fetchServiceTypeId,
  fetchSmcsMatnrPriceList,
  fetchSmcsServicePacket,
  fetchPositionSumm,
  checkSmcsWithoutReques,
} from '../../smcsAction';

import {
  f4FetchConTypeList,
  f4FetchBranches,
  f4FetchCountryList,
  f4FetchCompanyOptions,
  f4fetchCategory,
  f4FetchCustomersById,
} from '../../../../../reference/f4/f4_action';

import MatnrF4Modal from '../../../../../reference/f4/matnr/matnrF4Modal';
import CustomerF4Modal from '../../../../../reference/f4/Customer/customerF4';

import StaffF4Modal from '../../../../../reference/f4/staff/staffF4Modal';

import ModalAddServicePacket from '../modals/ModalAddServicePacket';
import ModalAddSparePart from '../modals/ModalAddSparePart';
import ModalAddCartridge from '../modals/ModalAddCartridge';

import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

import format from 'string-format';

//Создание сервиса без заявки
const TabSmcsWithoutRequest = props => {
  const {
    contract,
    language,
    countryList = [],
    companyOptions = [],
    branchOptions = [],
    contractTypeList = [],
    branches,
    category,
    customersById,
    tovar,
    serviceTypeId = [],
    matnrList,
    servicePacketProps = [],
    positionSumm,
    checkSmcs,
  } = props;

  const emptyService = {
    bukrs: '',
    branchId: 0,
    customerId: 0,
    customerName: '',
    tovarSn: '',
    categoryId: 0,
    tovarId: 0,
    contractNumber: 0,
    address: '',
    contractDate: '',
    masterId: 0,
    operatorId: 0,
    dateOpen: '',
    warrantyPeriodInMonth: 0,
    warrantyPeriodInDate: '',
    currency: '',
    countryId: 0,
    servicePositions: [],
    sumForPay: 0,
    sumTotal: 0,
    discount: 0,
    paid: 0,
    operatorPremium: 0,
    masterPremium: 0,
  };

  //Основной объект сервиса
  const [service, setService] = useState({ ...emptyService });
  useEffect(() => {
    console.log('SERVICE', service);
  }, [service]);

  //Услуги
  const [serviceInstallation, setServiceInstallation] = useState([]);
  const filterServiceInstallation = service.servicePositions.filter(
    item => item.serviceTypeId === 2,
  );
  //Запчасти
  const [sparePart, setSparePart] = useState([]);

  const filterSparePart = service.servicePositions.filter(
    item => item.serviceTypeId === 3,
  );

  //Картриджи
  const [cartridge, setCartridge] = useState([]);
  const filterCartridge = service.servicePositions.filter(
    item => item.serviceTypeId === 1,
  );

  //Сервис пакет
  const [servicePacket, setServicePacket] = useState([]);
  const filterServicePacket = service.servicePositions.filter(
    item => item.serviceTypeId === 4,
  );

  //Номер товара
  const [tovarSn, setTovarSn] = useState('4134-031589');
  //
  const [customeData, setCustomerData] = useState('');
  //
  const [modalOpen, setModalOpen] = useState({
    matnrF4ModalOpen: false,
    staffF4ModalOpen: false,
    staffF4ModalOpenOperator: false,
  });
  //
  const [staffF4ModalPosition, setStaffF4ModalPosition] = useState('');
  //
  const [serBranches, setSerBranches] = useState({});
  //
  const [editStatus, SetEditStatus] = useState(true);
  //
  const [tovarData, setTovarData] = useState({
    matnr: 0,
    text45: '',
  });
  //
  const [master, setMaster] = useState({
    masterId: 0,
    masterFio: '',
  });

  const [operator, setOperator] = useState({
    operatorId: 0,
    operatorFio: '',
  });

  useEffect(() => {
    props.f4FetchConTypeList();
    props.f4FetchBranches();
    props.f4FetchCountryList();
    props.f4FetchCompanyOptions();
    props.f4fetchCategory();
    props.fetchServiceTypeId();
  }, []);

  useEffect(() => {
    if (Object.keys(customersById).length !== 0) {
      setCustomerData(customersById.fullName);
    }
  }, [customersById]);

  const serviceBA = [5, 6, 9];

  useEffect(() => {
    if (Object.keys(contract).length !== 0) {
      setService({
        bukrs: contract.bukrs,
        branchId: contract.branchId,
        customerId: contract.customerId,
        tovarSn: contract.tovarSn,
        categoryId: contract.categoryId,
        tovarId: contract.tovarId,
        contractNumber: contract.contractNumber,
        address: contract.address,
        contractDate: contract.contractDate,
        masterId: contract.masterId,
        operatorId: contract.operatorId,
        dateOpen: contract.dateOpen,
        warrantyPeriodInMonth: contract.warrantyPeriodInMonth,
        warrantyPeriodInDate: contract.warrantyPeriodDate,
        currency: contract.currencyId,
        countryId: contract.countryId,
        servicePositions: [],
      });
      let tovarId = contract.tovarId;
      let customerId = contract.customerId;

      props.fetchTovarId({ tovarId });

      props.f4FetchCustomersById({ customerId });

      let servicePacketParam = {
        branchId: contract.branchId,
        bukrs: contract.bukrs,
        tovarSn: contract.tovarSn,
      };

      props.fetchSmcsServicePacket(servicePacketParam);
    }
  }, [contract]);

  useEffect(() => {
    if (tovar) {
      setTovarData({ matnr: tovar.matnr, text45: tovar.text45 });
    }
  }, [tovar]);

  useEffect(() => {
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
  const handleSearchTovarSerial = e => {
    e.preventDefault();
    props.fetchServiceSmcs({ tovarSn });
  };

  //Получить Филиал через ID
  const getCompanyName = (companyOptions, service) => {
    let companyName = '';
    for (let i = 0; i < companyOptions.length; i++) {
      if (companyOptions[i].key === service.bukrs) {
        companyName = companyOptions[i].text;
      }
    }
    return companyName;
  };

  //Получить Филиал через ID
  const getBranchName = (branches, service) => {
    let branchName = '';
    for (let i = 0; i < branches.length; i++) {
      if (branches[i].branch_id === service.branchId) {
        branchName = branches[i].text45;
      }
    }
    return branchName;
  };

  //Получить Категорию
  const getCategoryName = (category, service) => {
    let categoryName = '';
    for (let i = 0; i < category.length; i++) {
      if (category[i].id === service.categoryId) {
        categoryName = category[i].name;
      }
    }
    return categoryName;
  };

  //get service branch from the same city
  let serBranchInSameCity = {};

  const branchesForEach = branches.forEach(item => {
    serBranchInSameCity = item;
  });

  const branchesFilter = branches.filter(item =>
    serviceBA.includes(item.business_area_id),
  );

  const onBasicInfoInputChange = value => {
    setMaster(prev => {
      return { masterId: value.staffId, masterFio: value.fio };
    });

    setService(prev => {
      return { ...prev, masterId: value.staffId };
    });
    SetEditStatus(false);
  };

  const onBasicInfoInputChangeOperator = value => {
    setOperator(prev => {
      return { operatorId: value.staffId, operatorFio: value.fio };
    });

    setService(prev => {
      return { ...prev, operatorId: value.staffId };
    });
    SetEditStatus(false);
  };

  useEffect(() => {
    let matnrParam = {
      branchId: service.branchId,
      bukrs: service.bukrs,
      countryId: service.countryId,
      dateOpen: service.dateOpen,
      masterId: service.masterId,
      tovarId: service.tovarId,
    };

    if (matnrParam.masterId != 0) {
      props.fetchSmcsMatnrPriceList(matnrParam);
    }
  }, [master]);

  const removeMasterData = () => {
    setMaster({ masterId: 0, masterFio: '' });
    setService(prev => {
      return { ...prev, masterId: 0 };
    });
  };

  const [modalOpenSparePart, setModalOpenSparePart] = useState();
  const [modalOpenCartridge, setModalOpenCartridge] = useState();
  const [modalOpenServicePacket, setModalOpenServicePacket] = useState();

  const serviceOptions = serviceTypeId.map(item => {
    return {
      key: item.id,
      text: item.nameRu,
      value: item.id,
    };
  });

  const selectServiceOption = value => {
    setParamServiceInstallation(value.serviceTypeId);
    let paramPostSumm = { serviceTypeId: value.serviceTypeId };
    props.fetchPositionSumm(paramPostSumm);
  };

  const [paramServiceInstallation, setParamServiceInstallation] = useState();

  // Добавить услуги
  const handleAddService = e => {
    let lengtn = serviceInstallation.length;
    setServiceInstallation(prev => [
      ...prev,
      {
        currencyId: null,
        fno: null,
        id: lengtn + 1,
        matnr: null,
        matnrPrice: null,
        operationId: null,
        quantity: null,
        serviceId: null,
        servicePackageId: null,
        serviceTypeId: 2,
        sum: 0,
        warranty: false,
      },
    ]);
  };
  //Удалить услуг
  const handleRemoveService = value => {
    let servFilter = serviceInstallation.filter(item => item.id !== value.id);
    setServiceInstallation([...servFilter]);
  };
  //------------------------END УСЛУГИ-------------------------------

  //-----------------------------------ЗАПЧАСТИ-----------------------------------------------

  //Список запчастей
  const [sparePartList, setSparePartList] = useState([]);

  //Формировать список запчастей
  useEffect(() => {
    if (matnrList) {
      matnrList.map(item => {
        setSparePartList(prev => [
          ...prev,
          {
            index: null,
            currencyId: item.currencyId,
            currencyName: item.currencyName,
            fno: null,
            id: null,
            matnr: item.matnr,
            matnrName: item.matnrName,
            matnrCode: item.matnrCode,
            matnrPrice: item.price,
            menge: item.menge,
            qinit: item.qinit,
            qminus: item.qminus,
            operationId: null,
            quantity: null,
            serviceId: null,
            servicePackageId: null,
            serviceTypeId: 3,
            sum: null,
            warranty: false,
            checked: false,
          },
        ]);

        setCartridgeList(prev => [
          ...prev,
          {
            index: null,
            currencyId: item.currencyId,
            currencyName: item.currencyName,
            fno: null,
            id: null,
            matnr: item.matnr,
            matnrName: item.matnrName,
            matnrCode: item.matnrCode,
            matnrPrice: item.price,
            menge: item.menge,
            qinit: item.qinit,
            qminus: item.qminus,
            operationId: null,
            quantity: null,
            serviceId: null,
            servicePackageId: null,
            serviceTypeId: null,
            sum: null,
            warranty: false,
            checked: false,
          },
        ]);
      });
    }
  }, [matnrList]);

  //Выбрать запчасть
  const checkedSparePart = value => {
    if (value.checked == true) {
      setSparePartList(
        sparePartList.map(item =>
          item.matnr === value.matnr
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
          item.matnr === value.matnr
            ? {
                ...item,
                checked: true,
                quantity: 1,
                sum: item.matnrPrice,
              }
            : item,
        ),
      );
    }
  };

  //Гарантия запчастей
  const changeWarrantySparePart = value => {
    if (value.warranty == false) {
      setSparePartList(
        sparePartList.map(item =>
          item.matnr === value.matnr
            ? { ...item, warranty: true, sum: null }
            : item,
        ),
      );
    } else {
      setSparePartList(
        sparePartList.map(item =>
          item.matnr === value.matnr
            ? { ...item, warranty: false, sum: item.quantity * item.matnrPrice }
            : item,
        ),
      );
    }
  };

  //Удалить запчасть
  const removeSparePartItem = value => {
    let spareFilter = sparePart.filter(item => item.matnr !== value.matnr);
    setSparePart([...spareFilter]);

    setSparePartList(
      sparePartList.map(item =>
        item.matnr === value.matnr ? { ...item, checked: false } : item,
      ),
    );
  };

  useEffect(() => {
    const filterSparePart = sparePartList.filter(item => item.checked === true);
    setSparePart([...filterSparePart]);
  }, [sparePartList]);

  //Количество запчастей
  const changeSparePartCount = (e, value) => {
    if (e.target.value <= value.menge) {
      if (value.warranty === true) {
        setSparePartList(
          sparePartList.map(item =>
            item.matnr == value.matnr
              ? {
                  ...item,
                  sum: null,
                  quantity: e.target.value,
                }
              : item,
          ),
        );
      } else {
        setSparePartList(
          sparePartList.map(item =>
            item.matnr == value.matnr
              ? {
                  ...item,
                  sum: e.target.value * item.matnrPrice,
                  quantity: e.target.value,
                }
              : item,
          ),
        );
      }
    } else {
      alert(`У Вас в подотчете ${value.menge}`);
    }
  };

  //Закрыть модальное окно
  const handleApplySparePart = () => {
    setModalOpenSparePart(false);
  };

  //--------------------END ЗАПЧАСТИ---------------------------------------------

  //-----------------------------------КАРТРИДЖ----------------------------------
  //Список картриджей
  const [cartridgeList, setCartridgeList] = useState([]);

  //Выбрать картридж
  const checkedCartridge = value => {
    if (value.checked == true) {
      setCartridgeList(
        cartridgeList.map(item =>
          item.matnr === value.matnr
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
          item.matnr === value.matnr
            ? {
                ...item,
                checked: true,
                quantity: 1,
                sum: item.matnrPrice,
              }
            : item,
        ),
      );
    }
  };

  useEffect(() => {
    const filterCartridge = cartridgeList.filter(item => item.checked === true);
    setCartridge([...filterCartridge]);
  }, [cartridgeList]);

  //Закрыть модальное окно
  const handleApplyCartridge = () => {
    setModalOpenCartridge(false);
  };

  //Гарантия картриджей
  const changeWarrantyCartridge = value => {
    if (value.warranty == false) {
      setCartridgeList(
        cartridgeList.map(item =>
          item.matnr === value.matnr
            ? { ...item, warranty: true, sum: 0 }
            : item,
        ),
      );
    } else {
      setCartridgeList(
        cartridgeList.map(item =>
          item.matnr === value.matnr
            ? { ...item, warranty: false, sum: item.quantity * item.matnrPrice }
            : item,
        ),
      );
    }
  };

  //Количество картриджей
  const changeCartridgeCount = (e, value) => {
    if (e.target.value <= value.menge) {
      if (value.warranty === true) {
        setCartridgeList(
          cartridgeList.map(item =>
            item.matnr == value.matnr
              ? {
                  ...item,
                  sum: 0,
                  quantity: e.target.value,
                }
              : item,
          ),
        );
      } else {
        setCartridgeList(
          cartridgeList.map(item =>
            item.matnr == value.matnr
              ? {
                  ...item,
                  sum: e.target.value * item.matnrPrice,
                  quantity: e.target.value,
                }
              : item,
          ),
        );
      }
    } else {
      alert(`У Вас в подотчете ${value.menge}`);
    }
  };

  //Удалить картридж
  const removeCartridgeItem = value => {
    let cartridgeFilter = cartridge.filter(item => item.matnr !== value.matnr);
    setCartridge([...cartridgeFilter]);

    setCartridgeList(
      cartridgeList.map(item =>
        item.matnr === value.matnr ? { ...item, checked: false } : item,
      ),
    );
  };

  //-----------------------------------END КАРТРИДЖ----------------------------------

  //-----------------------------------СЕРВИС ПАКЕТ--------------------------------------

  const [servicePacketList, setServicePacketList] = useState([]);
  useEffect(() => {
    servicePacketProps.map(item =>
      setServicePacketList(prev => [
        ...prev,
        {
          index: null,
          currencyId: item.currencyId,
          currencyName: item.waers,
          fno: 0,
          id: 0,
          matnr: 0,
          matnrPrice: 0,
          menge: item.menge,
          qinit: item.qinit,
          qminus: item.qminus,
          operationId: 0,
          quantity: 0,
          serviceId: 0,
          servicePackageId: item.id,
          serviceTypeId: 4,
          sum: item.summ,
          name: item.name,
          price: item.price,
          checked: false,
        },
      ]),
    );
  }, [servicePacketProps]);

  useEffect(() => {
    let filterServicePacket = servicePacketList.filter(
      item => item.checked === true,
    );
    setServicePacket([...filterServicePacket]);
  }, [servicePacketList]);

  //Закрыть модальное окно
  const handleApplyServicePacket = () => {
    setModalOpenServicePacket(false);
  };
  //Выбрать сервис пакет
  const checkedServicePacket = value => {
    if (value.checked == true) {
      setServicePacketList(
        servicePacketList.map(item =>
          item.servicePackageId === value.servicePackageId
            ? {
                ...item,
                checked: false,
                // quantity: item.quantity,
                // sum: item.sum,
              }
            : item,
        ),
      );
    } else {
      setServicePacketList(
        servicePacketList.map(item =>
          item.servicePackageId === value.servicePackageId
            ? {
                ...item,
                checked: true,
                // quantity: 1,
                // sum: item.matnrPrice,
              }
            : item,
        ),
      );
    }
  };

  //Удалить сервис пакет
  const removeServicePacket = value => {
    let servicePacketFilter = servicePacket.filter(
      item => item.servicePackageId !== value.servicePackageId,
    );
    setServicePacket([...servicePacketFilter]);

    setServicePacketList(
      servicePacketList.map(item =>
        item.servicePackageId === value.servicePackageId
          ? { ...item, checked: false }
          : item,
      ),
    );
  };

  //-----------------------------------END СЕРВИС ПАКЕТ--------------------------------------

  const handleCheck = () => {
    alert('HANDLE CHECK');
    props.checkSmcsWithoutReques(service);
  };

  useEffect(() => {
    const serviceInstallationMap = serviceInstallation.map(item => ({
      currencyId: item.currencyId,
      fno: item.fno,
      id: item.id,
      matnr: item.matnr,
      matnrPrice: item.matnrPrice,
      operationId: item.operationId,
      quantity: item.quantity,
      serviceId: item.serviceId,
      servicePackageId: item.servicePackageId,
      serviceTypeId: item.serviceTypeId,
      sum: item.sum,
      warranty: item.warranty,
    }));

    const sparePartMap = sparePart.map(item => ({
      currencyId: item.currencyId,
      fno: item.fno,
      id: item.id,
      matnr: item.matnr,
      matnrPrice: item.matnrPrice,
      operationId: item.operationId,
      quantity: item.quantity,
      serviceId: item.serviceId,
      servicePackageId: item.servicePackageId,
      serviceTypeId: item.serviceTypeId,
      sum: item.sum,
      warranty: item.warranty,
    }));

    const cartridgeMap = cartridge.map(item => ({
      currencyId: item.currencyId,
      fno: item.fno,
      id: item.id,
      matnr: item.matnr,
      matnrPrice: item.matnrPrice,
      operationId: item.operationId,
      quantity: item.quantity,
      serviceId: item.serviceId,
      servicePackageId: item.servicePackageId,
      serviceTypeId: item.serviceTypeId,
      sum: item.sum,
      warranty: item.warranty,
    }));

    const servicePacketMap = servicePacket.map(item => ({
      currencyId: item.currencyId,
      fno: null,
      id: null,
      matnr: null,
      matnrPrice: null,
      operationId: null,
      quantity: null,
      serviceId: null,
      servicePackageId: item.servicePackageId,
      serviceTypeId: item.serviceTypeId,
      sum: item.sum,
      warranty: item.warranty,
    }));
    setService({
      ...service,
      servicePositions: [
        ...sparePartMap,
        ...serviceInstallationMap,
        ...cartridgeMap,
        ...servicePacketMap,
      ],
    });
  }, [sparePart, servicePacket, cartridge, serviceInstallation]);

  useEffect(() => {
    if (positionSumm) {
      setServiceInstallation(
        serviceInstallation.map(item =>
          item.serviceTypeId === positionSumm.serviceTypeId
            ? { ...item, sum: positionSumm.sum }
            : item,
        ),
      );
    }
  }, [positionSumm]);

  const [status, setStatus] = useState({
    checkButton: false,
    editButton: true,
    saveButton: true,
  });

  useEffect(() => {
    if (checkSmcs) {
      setService({
        ...service,
        sumForPay: checkSmcs.sumForPay,
        sumTotal: checkSmcs.sumTotal,
        discount: checkSmcs.discount,
        paid: checkSmcs.paid,
        operatorPremium: checkSmcs.operatorPremium,
        masterPremium: checkSmcs.masterPremium,
      });

      setStatus({
        editButton: false,
        checkButton: true,
        saveButton: false,
      });
    }
  }, [checkSmcs]);

  const handleSaveSmcs = () => {
    console.log('SAVE');
  };

  console.log('CHECK', checkSmcs);
  return (
    <Form>
      <StaffF4Modal
        open={modalOpen.staffF4ModalOpen}
        closeModal={bool => setModalOpen({ staffF4ModalOpen: bool })}
        onStaffSelect={item =>
          onBasicInfoInputChange(item, staffF4ModalPosition)
        }
        trans="mmcc"
        brnch={service.branchId}
        branchOptions={serBranches}
        bukrs={service.bukrs}
        companyOptions={companyOptions}
        bukrsDisabledParent
      />

      <StaffF4Modal
        open={modalOpen.staffF4ModalOpenOperator}
        closeModal={bool => setModalOpen({ staffF4ModalOpenOperator: bool })}
        onStaffSelect={item =>
          onBasicInfoInputChangeOperator(item, staffF4ModalPosition)
        }
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
            <Table collapsing className="borderLess">
              <Table.Body>
                <Table.Row>
                  <Table.Cell>Компания</Table.Cell>
                  <Table.Cell>
                    <Input
                      type="text"
                      fluid
                      readOnly
                      value={getCompanyName(companyOptions, service)}
                    />
                  </Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell>Филиал</Table.Cell>
                  <Table.Cell>
                    <Input
                      fluid
                      readOnly
                      value={getBranchName(branches, service)}
                    />
                  </Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell>Клиент</Table.Cell>
                  <Table.Cell>
                    <Input fluid readOnly value={customeData} />
                  </Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell width={4}>Заводской номер</Table.Cell>
                  <Table.Cell width={12}>
                    <Input
                      fluid
                      type="text"
                      value={tovarSn}
                      placeholder="Введите заводской номер"
                      onChange={e => setTovarSn(e.target.value)}
                      action={
                        <Button
                          icon="search"
                          content="Поиск"
                          primary
                          onClick={handleSearchTovarSerial}
                        />
                      }
                    />
                  </Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell>Категория</Table.Cell>
                  <Table.Cell>
                    <Input
                      fluid
                      readOnly
                      value={getCategoryName(category, service)}
                    />
                  </Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell>Продукт</Table.Cell>
                  <Table.Cell>
                    <Input fluid readOnly value={tovarData.text45} />
                  </Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell>CN</Table.Cell>
                  <Table.Cell>
                    <Input fluid readOnly value={service.contractNumber} />
                  </Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell>Адрес</Table.Cell>
                  <Table.Cell>
                    <Input fluid readOnly value={service.address} />
                  </Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell>Дата покупки</Table.Cell>
                  <Table.Cell>
                    <Input fluid readOnly value={service.contractDate} />
                  </Table.Cell>
                </Table.Row>

                <Table.Row>
                  <Table.Cell>Мастер</Table.Cell>
                  <Table.Cell>
                    <Input readOnly value={master.masterFio} />
                    <Icon
                      name="clone"
                      size="large"
                      className="clickableIcon"
                      onClick={() => {
                        setModalOpen({ staffF4ModalOpen: true });
                        // setStaffF4ModalPosition('dealer');
                      }}
                    />
                    <Icon
                      name="remove"
                      size="large"
                      className="clickableIcon"
                      color="red"
                      onClick={removeMasterData}
                    />
                  </Table.Cell>
                </Table.Row>

                <Table.Row>
                  <Table.Cell>Оператор</Table.Cell>
                  <Table.Cell>
                    <Input readOnly value={operator.operatorFio} />
                    <Icon
                      name="clone"
                      size="large"
                      className="clickableIcon"
                      onClick={() => {
                        setModalOpen({ staffF4ModalOpenOperator: true });
                        setStaffF4ModalPosition('operator');
                      }}
                    />
                    <Icon
                      name="remove"
                      size="large"
                      className="clickableIcon"
                      color="red"
                    />
                  </Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell>Дата сервиса</Table.Cell>
                  <Table.Cell>
                    <Input fluid readOnly value={service.dateOpen} />
                  </Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell>Срок гарантии</Table.Cell>
                  <Table.Cell className="tableRow">
                    <Input readOnly value={service.warrantyPeriodInDate} />
                    <Input readOnly value={service.warrantyPeriodInMonth} />
                  </Table.Cell>
                </Table.Row>
              </Table.Body>
            </Table>
          </Grid.Column>

          {/*RIGHT*/}
          <Grid.Column readOnly width={11}>
            <Segment>
              {/*Услуга */}
              <Segment>
                <h3>Услуга</h3>
                <Divider />

                <Table>
                  <Table.Body>
                    {serviceInstallation.map((item, index) => (
                      <Table.Row key={index}>
                        <Table.Cell width={1}>
                          <Input readOnly value={index + 1} />
                        </Table.Cell>

                        <Table.Cell width={7}>
                          <Dropdown
                            fluid
                            selection
                            options={serviceOptions}
                            onChange={() => selectServiceOption(item)}
                          />
                        </Table.Cell>
                        <Table.Cell width={3}>
                          <Input
                            readOnly
                            value={item.sum}
                            placeholder="Сумма"
                          />
                        </Table.Cell>
                        <Table.Cell width={2}>
                          <Input readOnly placeholder="Сумма" value="KZT" />
                        </Table.Cell>
                        <Table.Cell width={3}>
                          <Button
                            color="red"
                            onClick={() => handleRemoveService(item)}
                          >
                            Удалить
                          </Button>
                        </Table.Cell>
                      </Table.Row>
                    ))}
                  </Table.Body>
                </Table>
                {serviceInstallation.length < 1 ? (
                  <Button
                    onClick={handleAddService}
                    icon
                    labelPosition="left"
                    color="green"
                    size="small"
                    disabled={editStatus}
                  >
                    <Icon name="plus" size="small" /> Добавить услугу
                  </Button>
                ) : (
                  ''
                )}
              </Segment>

              {/*Продажа запчастей */}
              <Segment>
                <h3>Продажа запчастей</h3>
                <Divider />
                <Table>
                  <Table.Header>
                    <Table.Row>
                      <Table.HeaderCell>№</Table.HeaderCell>
                      <Table.HeaderCell>Наименование</Table.HeaderCell>
                      <Table.HeaderCell>Количество</Table.HeaderCell>
                      <Table.HeaderCell>Сумма</Table.HeaderCell>
                      <Table.HeaderCell>Валюта</Table.HeaderCell>
                      <Table.HeaderCell>Гарантия</Table.HeaderCell>
                      <Table.HeaderCell></Table.HeaderCell>
                    </Table.Row>
                  </Table.Header>
                  <Table.Body>
                    {sparePart.map((item, index) => (
                      <Table.Row key={index}>
                        <Table.Cell width={1}>
                          <Input value={index + 1} readOnly />
                        </Table.Cell>
                        <Table.Cell width={5}>
                          <Input readOnly fluid value={item.matnrName} />
                        </Table.Cell>
                        <Table.Cell width={2}>
                          <Input
                            value={item.quantity}
                            type="number"
                            label={{ content: 'шт' }}
                            labelPosition="right"
                            fluid
                            onChange={e => changeSparePartCount(e, item)}
                          />
                        </Table.Cell>
                        <Table.Cell width={2}>
                          <Input
                            value={item.sum}
                            readOnly
                            placeholder="Сумма"
                          />
                        </Table.Cell>
                        <Table.Cell width={2}>
                          <Input
                            value={item.currencyName}
                            readOnly
                            placeholder="Валюта"
                          />
                        </Table.Cell>
                        <Table.Cell width={2}>
                          <Checkbox
                            checked={item.warranty}
                            label="Гарантия"
                            onChange={() => changeWarrantySparePart(item)}
                          />
                        </Table.Cell>
                        <Table.Cell width={3}>
                          <Button
                            color="red"
                            onClick={() => removeSparePartItem(item)}
                          >
                            Удалить
                          </Button>
                        </Table.Cell>
                      </Table.Row>
                    ))}
                  </Table.Body>
                </Table>

                <ModalAddSparePart
                  data={sparePartList}
                  modalOpen={modalOpenSparePart}
                  handleApplySparePart={handleApplySparePart}
                  checkedSparePart={checkedSparePart}
                />

                <Button
                  disabled={editStatus}
                  icon
                  labelPosition="left"
                  color="green"
                  size="small"
                  onClick={() => setModalOpenSparePart(true)}
                >
                  <Icon name="plus" size="small" />
                  Добавить запчасти
                </Button>
              </Segment>

              {/*Продажа картриджи  */}
              <Segment>
                <h3>Продажа картриджи</h3>
                <Divider />
                <Table>
                  <Table.Header>
                    <Table.Row>
                      <Table.HeaderCell>№</Table.HeaderCell>
                      <Table.HeaderCell>Наименование</Table.HeaderCell>
                      <Table.HeaderCell>F№</Table.HeaderCell>
                      <Table.HeaderCell>Количество</Table.HeaderCell>
                      <Table.HeaderCell>Сумма</Table.HeaderCell>
                      <Table.HeaderCell>Валюта</Table.HeaderCell>
                      <Table.HeaderCell>Гарантия</Table.HeaderCell>
                      <Table.HeaderCell></Table.HeaderCell>
                    </Table.Row>
                  </Table.Header>
                  <Table.Body>
                    {cartridge.map((item, index) => (
                      <Table.Row key={index}>
                        <Table.Cell width={1}>
                          <Input value={index + 1} readOnly />
                        </Table.Cell>
                        <Table.Cell width={5}>
                          <Input readOnly fluid value={item.matnrName} />
                        </Table.Cell>

                        <Table.Cell width={1}>
                          <Input
                            readOnly
                            fluid
                            label={{ content: 'F№' }}
                            labelPosition="left"
                          />
                        </Table.Cell>
                        <Table.Cell width={2}>
                          <Input
                            value={item.quantity}
                            type="number"
                            label={{ content: 'шт' }}
                            labelPosition="right"
                            fluid
                            onChange={e => changeCartridgeCount(e, item)}
                          />
                        </Table.Cell>
                        <Table.Cell width={2}>
                          <Input
                            value={item.sum}
                            readOnly
                            placeholder="Сумма"
                          />
                        </Table.Cell>
                        <Table.Cell width={2}>
                          <Input
                            value={item.currencyName}
                            readOnly
                            placeholder="Валюта"
                          />
                        </Table.Cell>
                        <Table.Cell width={2}>
                          <Checkbox
                            checked={item.warranty}
                            label="Гарантия"
                            onChange={() => changeWarrantyCartridge(item)}
                          />
                        </Table.Cell>
                        <Table.Cell width={3}>
                          <Button
                            color="red"
                            onClick={() => removeCartridgeItem(item)}
                          >
                            Удалить
                          </Button>
                        </Table.Cell>
                      </Table.Row>
                    ))}
                  </Table.Body>
                </Table>

                <ModalAddCartridge
                  data={cartridgeList}
                  modalOpen={modalOpenCartridge}
                  handleApplyCartridge={handleApplyCartridge}
                  checkedCartridge={checkedCartridge}
                />
                <Button
                  disabled={editStatus}
                  icon
                  labelPosition="left"
                  color="green"
                  size="small"
                  onClick={() => setModalOpenCartridge(true)}
                >
                  <Icon name="plus" size="small" />
                  Добавить картриджи
                </Button>
              </Segment>

              {/*Сервис пакет  */}
              <Segment>
                <h3>Сервис пакет</h3>
                <Divider />
                <Table>
                  <Table.Header>
                    <Table.Row>
                      <Table.HeaderCell>№</Table.HeaderCell>
                      <Table.HeaderCell>Наименование</Table.HeaderCell>
                      <Table.HeaderCell>Сумма</Table.HeaderCell>
                      <Table.HeaderCell>Валюта</Table.HeaderCell>
                      <Table.HeaderCell></Table.HeaderCell>
                    </Table.Row>
                  </Table.Header>
                  <Table.Body>
                    {servicePacket.map((item, index) => (
                      <Table.Row key={index}>
                        <Table.Cell width={1}>
                          <Input value={index + 1} readOnly />
                        </Table.Cell>
                        <Table.Cell width={5}>
                          <Input value={item.name} readOnly fluid />
                        </Table.Cell>
                        <Table.Cell width={3}>
                          <Input
                            value={item.price}
                            readOnly
                            placeholder="Сумма"
                          />
                        </Table.Cell>
                        <Table.Cell width={3}>
                          <Input
                            value={item.currencyName}
                            readOnly
                            placeholder="Валюта"
                          />
                        </Table.Cell>
                        <Table.Cell width={3}>
                          <Button
                            onClick={() => removeServicePacket(item)}
                            color="red"
                          >
                            Удалить
                          </Button>
                        </Table.Cell>
                      </Table.Row>
                    ))}
                  </Table.Body>
                </Table>
                <ModalAddServicePacket
                  data={servicePacketList}
                  modalOpen={modalOpenServicePacket}
                  handleApplyServicePacket={handleApplyServicePacket}
                  checkedServicePacket={checkedServicePacket}
                />
                <Button
                  disabled={editStatus}
                  icon
                  labelPosition="left"
                  color="green"
                  size="small"
                  onClick={() => setModalOpenServicePacket(true)}
                >
                  <Icon name="plus" size="small" />
                  Добавить сервис пакет
                </Button>
              </Segment>

              {/*Отчеты  */}
              <Table celled>
                <Table.Body>
                  <Table.Row>
                    <Table.Cell>Общая Сумма</Table.Cell>
                    <Table.Cell>{service.sumTotal}</Table.Cell>
                  </Table.Row>
                  <Table.Row>
                    <Table.Cell>Скидка</Table.Cell>
                    <Table.Cell>{service.discount}</Table.Cell>
                  </Table.Row>
                  <Table.Row>
                    <Table.Cell>Сумма к оплате</Table.Cell>
                    <Table.Cell>{service.sumForPay}</Table.Cell>
                  </Table.Row>
                  <Table.Row>
                    <Table.Cell>Оплачено</Table.Cell>
                    <Table.Cell>{service.paid}</Table.Cell>
                  </Table.Row>
                  <Table.Row>
                    <Table.Cell>Премия мастера</Table.Cell>
                    <Table.Cell>{service.masterPremium}</Table.Cell>
                  </Table.Row>
                  <Table.Row>
                    <Table.Cell width={6}>Премия оператора</Table.Cell>
                    <Table.Cell width={10}>
                      {service.operatorPremium}
                    </Table.Cell>
                  </Table.Row>
                </Table.Body>
              </Table>

              <Button color="green" disabled={status.editButton}>
                <Icon name="edit" size="large" />
                Редактировать
              </Button>
              <Button
                color="green"
                disabled={status.checkButton}
                onClick={handleCheck}
              >
                <Icon name="check" size="large" />
                Проверить
              </Button>
              <Button
                type="submit"
                primary
                disabled={status.saveButton}
                onClick={handleSaveSmcs}
              >
                <Icon name="save" size="large" />
                Сохранить
              </Button>
            </Segment>
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
    matnrList: state.smcsReducer.smcsMatnrPriceList,
    servicePacketProps: state.smcsReducer.smcsServicePacket,
    positionSumm: state.smcsReducer.smcsFetchPositionSumm,
    checkSmcs: state.smcsReducer.checkSmcs,
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
  fetchSmcsMatnrPriceList,
  fetchSmcsServicePacket,
  fetchPositionSumm,
  checkSmcsWithoutReques,
})(injectIntl(TabSmcsWithoutRequest));
