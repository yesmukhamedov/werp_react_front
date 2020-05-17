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

//Создание сервиса без заявки
const TabSmcsWithoutRequest = props => {
  const {
    contract,
    companyOptions = [],
    branchOptions = [],
    contractTypeList = [],
    branches,
    category,
    customersById,
    tovar,
    serviceTypeId = [],
    matnrPriceSparePart,
    matnrPriceCartridge,
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

  const [editStatus, SetEditStatus] = useState(true);

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
  const handleSearchTovarSerial = () => {
    let tovarSn = service.tovarSn;
    props.fetchServiceSmcs({ tovarSn });
    props.fetchServiceTypeId();
  };

  const onBasicInfoInputChange = value => {
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
    }
  }, [contract]);

  const operatorOptions = operatorList.map(item => {
    return {
      key: item.staffId,
      text: item.fullName,
      value: item.staffId,
    };
  });

  const changeOperator = (e, value) => {
    setService({ ...service, operatorId: value.value });
  };

  useEffect(() => {
    props.f4FetchBranches();
  }, []);

  //УСЛУГИ========================================================================================
  //==============================================================================================

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
        warranty: false,
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
    let servFilter = service.positions.filter(item => item.id !== value.id);
    setServices([...servFilter]);
  };

  //ПРОДАЖА ЗАПЧАСТЕЙ========================================================================================
  //=========================================================================================================

  const [saleOfSparePart, setSaleOfSparePart] = useState([]);
  const [modalSparePart, setModalSparePart] = useState(false);

  const sparePartList = service.positions
    .filter(item => item.serviceTypeId === 3)
    .filter(item => item.checked === true);

  const addSparePartBtn = () => {
    setModalSparePart(true);
  };

  useEffect(() => {
    const paramMatnrSparePart = {
      branchId: service.branchId,
      bukrs: service.bukrs,
      masterId: service.masterId,
      serviceTypeId: 3,
      tovarId: service.tovarId,
    };

    if (service.masterId !== null || service.masterId !== undefined) {
      console.log('MASTER', service.masterId);
      // props.fetchMatnrPriceSparePart({ ...paramMatnrSparePart });
    }
  }, [service.masterId]);

  useEffect(() => {
    if (matnrPriceSparePart) {
      matnrPriceSparePart.map(item => {
        setSaleOfSparePart(prev => [
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
            price: item.price,
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
      });
    }
  }, [matnrPriceSparePart]);

  //Выбрать запчасть
  const checkedSparePart = value => {
    if (value.checked == true) {
      setSaleOfSparePart(
        saleOfSparePart.map(item =>
          item.matnrCode === value.matnrCode
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
      setSaleOfSparePart(
        saleOfSparePart.map(item =>
          item.matnrCode === value.matnrCode
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

  const handleApplySparePart = () => {
    setService({ ...service, positions: [...services, ...sparePartList] });
    setModalSparePart(false);
  };

  //ПРОДАЖА КАРТРИДЖЕЙ========================================================================================
  //=========================================================================================================

  const cartridgeList = service.positions.filter(
    item => item.serviceTypeId === 1,
  );

  //СЕРВИС ПАКЕТ========================================================================================
  const servicePackageList = service.positions.filter(
    item => item.serviceTypeId === 4,
  );

  useEffect(() => {
    setService({ ...service, positions: [...services, ...saleOfSparePart] });
  }, [services, saleOfSparePart]);

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

      <Grid>
        <Grid.Row>
          {/*BASIC INFO*/}
          <Grid.Column width={5}>
            <Table collapsing className="borderLess">
              <Table.Body>
                <Table.Row>
                  <Table.Cell>Номер заявки</Table.Cell>
                  <Table.Cell>
                    <Input
                      type="text"
                      fluid
                      readOnly
                      value={
                        service.applicationNumber === null
                          ? ''
                          : service.applicationNumber
                      }
                    />
                  </Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell>Компания</Table.Cell>
                  <Table.Cell>
                    <Input
                      type="text"
                      fluid
                      readOnly
                      value={service.bukrsName}
                    />
                  </Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell>Филиал</Table.Cell>
                  <Table.Cell>
                    <Input fluid readOnly value={service.branchName} />
                  </Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell>Клиент</Table.Cell>
                  <Table.Cell>
                    <Input fluid readOnly value={service.customerFullName} />
                  </Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell width={4}>Заводской номер</Table.Cell>
                  <Table.Cell width={12}>
                    <Input
                      fluid
                      type="text"
                      value={service.tovarSn}
                      placeholder="Введите заводской номер"
                      onChange={e =>
                        setService({ ...service, tovarSn: e.target.value })
                      }
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
                    <Input fluid readOnly value={service.categoryName} />
                  </Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell>Продукт</Table.Cell>
                  <Table.Cell>
                    <Input fluid readOnly value={service.tovarName} />
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
                    <Input
                      readOnly
                      value={
                        service.masterFullName === null
                          ? ''
                          : service.masterFullName
                      }
                    />
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
                      onClick={() =>
                        setService({
                          ...service,
                          masterFullName: '',
                          masterId: 0,
                        })
                      }
                    />
                  </Table.Cell>
                </Table.Row>

                <Table.Row>
                  <Table.Cell>Оператор</Table.Cell>
                  <Table.Cell>
                    <Dropdown
                      selection
                      options={operatorOptions}
                      value={service.operatorId}
                      onChange={(e, value) => changeOperator(e, value)}
                    />
                  </Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell>Дата сервиса</Table.Cell>
                  <Table.Cell>
                    <Input fluid readOnly value={service.serviceDate} />
                  </Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell>Срок гарантии</Table.Cell>
                  <Table.Cell className="tableRow">
                    <Input readOnly value={service.warrantyPeriodDate} />
                    <Input
                      readOnly
                      value={
                        service.warrantyPeriodInMonth === 0
                          ? ''
                          : service.warrantyPeriodInMonth
                      }
                    />
                  </Table.Cell>
                </Table.Row>
              </Table.Body>
            </Table>
          </Grid.Column>

          {/*RIGHT*/}
          <Grid.Column readOnly width={11}>
            {/*Услуга */}

            <h5>Услуга</h5>
            <Divider />
            <Services
              data={services}
              addServices={addServices}
              servicesOptions={serviceOptions}
              handleRemoveService={handleRemoveService}
              selectServices={selectServices}
              waers={service.currencyName}
            />

            <SaleOfSparePart
              data={sparePartList}
              addSparePartBtn={addSparePartBtn}
            />
            <ModalAddSparePart
              data={saleOfSparePart}
              modalOpen={modalSparePart}
              checkedSparePart={checkedSparePart}
              handleApplySparePart={handleApplySparePart}
            />
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
  fetchSmcsServicePacket,
  fetchPositionSumm,
  checkSmcsWithoutReques,
  saveSmcsWithoutReques,
  fetchOperatorList,
})(injectIntl(TabSmcsWithoutRequest));
