import React from 'react';
import { Menu, Container, Tab } from 'semantic-ui-react';
import TabDealers from './TabDealers';
import TabFinAgent from './TabFinAgent';
import TabMasterHarvestingSystem from './TabMasterHarvestingSystem';
import TabMasterWaterClean from './TabMasterWaterClean';

const ReportSlc = props => {
  const {
    filterMapPoints = {},
    data = [],
    handleClickPlacemark,
    tempAddress,
  } = props;

  const panes = [
    {
      menuItem: <Menu.Item key={1}>Результат</Menu.Item>,
      pane: (
        <Tab.Pane key={1}>
          <TabDealers
            handleClickPlacemark={handleClickPlacemark}
            data={data}
            tempAddress={tempAddress}
          />
        </Tab.Pane>
      ),
    },
    {
      menuItem: <Menu.Item key={2}>Финансовые агенты</Menu.Item>,
      pane: (
        <Tab.Pane key={2}>
          <TabFinAgent data={data} />
        </Tab.Pane>
      ),
    },
    {
      menuItem: <Menu.Item key={3}>Мастер по уборочной системы</Menu.Item>,
      pane: (
        <Tab.Pane key={3}>
          <TabMasterHarvestingSystem data={data} />
        </Tab.Pane>
      ),
    },
    {
      menuItem: <Menu.Item key={4}>Мастер система очистки воды</Menu.Item>,
      pane: (
        <Tab.Pane key={4}>
          <TabMasterWaterClean data={data} />
        </Tab.Pane>
      ),
    },
  ];

  //const filterDealer = filterMapPoints.filter(item => item.position == 'Дилер');
  return (
    <Container fluid style={{ padding: '30px', height: '100%' }}>
      <Tab
        menu={{ attached: true, tabular: false, pointing: true }}
        panes={panes}
        renderActiveOnly={false}
      />
    </Container>
  );
};

export default ReportSlc;
