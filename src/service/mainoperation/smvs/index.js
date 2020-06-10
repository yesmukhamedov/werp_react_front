import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';
import { Segment, Grid, Form, Button, Icon, Divider } from 'semantic-ui-react';
import BasicInfo from './components/BasicInfo';
import SettingService from './components/SettingService';
import ReportService from './components/ReportService';
import ModalAddSparePart from './modals/ModalAddSparePart';
import ModalAddCartridge from './modals/ModalAddCartridge';
import ModalAddServicePacket from './modals/ModalAddServicePacket';
import { f4FetchServicType } from '../../../reference/f4/f4_action';
import { fetchSmvsList } from './smvsAction';
import './../../service.css';

const Smes = props => {
  const { smvsList, editStat, serviceType = [] } = props;

  console.log('serviceType', serviceType);

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

  console.log('dataSmvs', dataSmvs);
  const url = window.location.search;

  const urlNumberService = url.slice(url.indexOf('=') + 1);

  const [serviceNumber, setServiceNumber] = useState(urlNumberService);
  const [editStatus, setEditStatus] = useState(
    editStat === undefined ? false : editStat,
  );
  const disabledEdit = !editStatus;
  const [checkStatus, setCheckStatus] = useState(false);

  useEffect(() => {
    if (serviceNumber !== '') {
      console.log('serviceNumber', serviceNumber);
      props.fetchSmvsList(serviceNumber);
    }

    props.f4FetchServicType();
  }, []);

  const serviceTypeOptions = serviceType.map(item => {
    return {
      key: item.id,
      text: item.name,
      value: item.id,
    };
  });

  useEffect(() => {
    if (Object.keys(smvsList).length > 0) {
      setDataSmvs({
        ...smvsList,
        positions: [
          ...smvsList.positions.map((item, index) => {
            return {
              ...item,
              idd: parseInt(item.id + `${index + 1}`),
            };
          }),
        ],
      });
    }
  }, [smvsList]);

  const onChangeBasicInfo = (value, fieldName) => {
    switch (fieldName) {
      //Поиск по номеру сервиса
      case 'searchByServiceNumber':
        setDataSmvs({ ...emptyDataSmvs });
        props.fetchSmvsList(serviceNumber);
        break;
      case 'changeServiceNumber':
        console.log('onChangeServiceNumber', value);
        setServiceNumber(value);
        break;
      case '':
        break;
      case '':
        break;
      case '':
        break;
      default:
        alert('Нет таких значении');
    }
  };

  const onChangeSettingService = (value, fieldName) => {
    switch (fieldName) {
      //Услуги: Изменить тип сервиса
      case 'changeServiceType':
        setDataSmvs({
          ...dataSmvs,
          positions: dataSmvs.positions.map(item =>
            item.id === value.original.id
              ? {
                  ...item,
                  serviceTypeId: parseInt(value.value.value),
                }
              : item,
          ),
        });

        break;
      case '':
        break;
      case '':
        break;
      default:
        alert('Нет таких значении');
    }
  };

  return (
    <Form>
      <ModalAddSparePart />
      <ModalAddCartridge />
      <ModalAddServicePacket />
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
        <Button
          icon
          labelPosition="left"
          color="green"
          disabled={editStatus === false ? false : true}
          onClick={() => {
            setEditStatus(!editStatus);
            if (editStatus === true) {
              setCheckStatus(true);
            } else {
              setCheckStatus(false);
            }
          }}
        >
          <Icon name="pencil" />
          Редактировать
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
              editStatus={editStatus}
            />
          </Grid.Column>

          {/*SETTING*/}
          <Grid.Column width={11}>
            <SettingService
              serviceTypeOptions={serviceTypeOptions}
              onChangeSettingService={onChangeSettingService}
              positions={dataSmvs.positions}
              disabledEdit={disabledEdit}
            />
            <ReportService data={dataSmvs} />
            <Button
              color="green"
              disabled={editStatus === true ? false : true}
              onClick={() => {
                setCheckStatus(true);
                setEditStatus(false);
              }}
            >
              Проверить
            </Button>
            <Button color="blue" disabled={checkStatus === true ? false : true}>
              Сохранить
            </Button>
            <Divider />
          </Grid.Column>
        </Grid.Row>
      </Grid>
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
    serviceType: state.f4.serviceType,
  };
}

export default connect(mapStateToProps, {
  fetchSmvsList,
  f4FetchServicType,
})(injectIntl(Smes));
