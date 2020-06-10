import React from 'react';
import Services from './Services';
import SaleOfSparePart from './SaleOfSparePart';
import SaleCartridge from './SaleCartridge';
import ServicePackage from './ServicePackage';
import { Segment, Divider } from 'semantic-ui-react';

const SettingService = props => {
  const {
    positions = [],
    onChangeSettingService,
    servicesOptions = [],
    disabledEdit,
    serviceTypeOptions = [],
  } = props;

  const servicesPos = positions.filter(
    item => item.serviceTypeId === 2 || item.operationName === 'Услуга',
  );

  const sparePartPos = positions.filter(
    item => item.serviceTypeId === 3 || item.operationName === 'Продажа',
  );
  const cartridgePos = positions.filter(
    item => item.serviceTypeId === 1 || item.operationName === 'Продажа',
  );

  return (
    <div>
      {/*Услуга */}
      <Services
        data={servicesPos}
        servicesOptions={servicesOptions}
        disabledEdit={disabledEdit}
        onChangeSettingService={onChangeSettingService}
        serviceTypeOptions={serviceTypeOptions}
      />

      {/*Продажа запчастей */}
      <SaleOfSparePart
        data={sparePartPos}
        disabledEdit={disabledEdit}
        onChangeSettingService={onChangeSettingService}
      />

      {/*Продажа картриджи  */}
      <SaleCartridge
        data={cartridgePos}
        disabledEdit={disabledEdit}
        onChangeSettingService={onChangeSettingService}
      />

      {/*Сервис пакет  */}
      <ServicePackage
        disabledEdit={disabledEdit}
        onChangeSettingService={onChangeSettingService}
      />
    </div>
  );
};

export default SettingService;
