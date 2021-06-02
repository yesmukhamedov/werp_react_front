import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Segment, Tab, Container } from 'semantic-ui-react';
import TabSubjectAppeal from './components/TabSubjectAppeal';
import TabSourceRequests from './components/TabSourceRequests';
import TabSourceVacancies from './components/TabSourceVacancies';
import TabCategoryHits from './components/TabCategoryHits';
import TabReasonsContact from './components/TabReasonsContact';
import TabPresets from './components/TabPresets';
import TabVacancies from './components/TabVacancies';
import { injectIntl } from 'react-intl';
import './crmreference.css';

const CrmReference = props => {
  const {} = props;

  const panes = [
    {
      menuItem: 'Тема обращения',
      render: () => (
        <Tab.Pane>
          <TabSubjectAppeal />
        </Tab.Pane>
      ),
    },
    {
      menuItem: 'Источник обращений',
      render: () => (
        <Tab.Pane>
          <TabSourceRequests />
        </Tab.Pane>
      ),
    },
    {
      menuItem: 'Источник вакансий',
      render: () => (
        <Tab.Pane>
          <TabSourceVacancies />
        </Tab.Pane>
      ),
    },
    {
      menuItem: 'Категория обращений',
      render: () => (
        <Tab.Pane>
          <TabCategoryHits />
        </Tab.Pane>
      ),
    },
    {
      menuItem: 'Причины обращения',
      render: () => (
        <Tab.Pane>
          <TabReasonsContact />
        </Tab.Pane>
      ),
    },
    {
      menuItem: 'Подарки',
      render: () => (
        <Tab.Pane>
          <TabPresets />
        </Tab.Pane>
      ),
    },
    {
      menuItem: 'Вакансии',
      render: () => (
        <Tab.Pane>
          <TabVacancies />
        </Tab.Pane>
      ),
    },
  ];
  const [activeTab, setActiveTab] = useState(0);
  useEffect(() => {
    if (activeTab === 0) {
      console.log('activeTab', activeTab);
    } else if (activeTab === 1) {
      console.log('activeTab', activeTab);
    } else if (activeTab === 2) {
      console.log('activeTab', activeTab);
    } else if (activeTab === 3) {
      console.log('activeTab', activeTab);
    } else if (activeTab === 4) {
      console.log('activeTab', activeTab);
    } else if (activeTab === 5) {
      console.log('activeTab', activeTab);
    } else if (activeTab === 6) {
      console.log('activeTab', activeTab);
    }
  }, [activeTab]);

  return (
    <Container
      fluid
      style={{
        paddingLeft: '1em',
        paddingRight: '1em',
      }}
    >
      <Segment size="mini">
        <h3>CRM 2021 Справочники</h3>
      </Segment>
      <Tab
        menu={{ fluid: true, vertical: true }}
        menuposition="right"
        panes={panes}
        onTabChange={(event, { activeIndex }) => {
          setActiveTab(activeIndex);
        }}
      />
    </Container>
  );
};

function mapStateToProps(state) {
  return {
    language: state.locales.lang,
  };
}

export default connect(mapStateToProps, {})(injectIntl(CrmReference));
