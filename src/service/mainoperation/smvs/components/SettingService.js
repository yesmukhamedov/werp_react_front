import React from 'react';
import { Segment, Divider } from 'semantic-ui-react';

const SettingService = props => {
  return (
    <div>
      {/*Услуга */}
      <Segment>
        <h3>Услуга</h3>
        <Divider />
      </Segment>

      {/*Продажа запчастей */}
      <Segment>
        <h3>Продажа запчастей</h3>
        <Divider />
      </Segment>

      {/*Продажа картриджи  */}
      <Segment>
        <h3>Продажа картриджи</h3>
        <Divider />
      </Segment>

      {/*Сервис пакет  */}
      <Segment>
        <h3>Сервис пакет</h3>
        <Divider />
      </Segment>
    </div>
  );
};

export default SettingService;
