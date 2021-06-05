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
import {
  createSubjectAppeal,
  fetchSubjectAppeal,
  updateSubjectAppeal,
} from './crmreferenceAction';

const CrmReference = props => {
  const { subjectAppealList = [] } = props;
  const [activeTab, setActiveTab] = useState(0);
  const initialCrudData = {
    headerText: '',
    data: [],
  };
  const [crudData, setCrudData] = useState(initialCrudData);

  const panes = [
    {
      menuItem: 'Тема обращения',
      render: () => (
        <Tab.Pane>
          <TabSubjectAppeal
            data={subjectAppealList}
            crudData={crudData}
            get={props.fetchSubjectAppeal}
            create={props.createSubjectAppeal}
            update={props.updateSubjectAppeal}
          />
        </Tab.Pane>
      ),
    },
    {
      menuItem: 'Источник обращений',
      render: () => (
        <Tab.Pane>
          <TabSourceRequests crudData={crudData} />
        </Tab.Pane>
      ),
    },
    {
      menuItem: 'Источник вакансий',
      render: () => (
        <Tab.Pane>
          <TabSourceVacancies crudData={crudData} />
        </Tab.Pane>
      ),
    },
    {
      menuItem: 'Категория обращений',
      render: () => (
        <Tab.Pane>
          <TabCategoryHits crudData={crudData} />
        </Tab.Pane>
      ),
    },
    {
      menuItem: 'Причины обращения',
      render: () => (
        <Tab.Pane>
          <TabReasonsContact crudData={crudData} />
        </Tab.Pane>
      ),
    },
    {
      menuItem: 'Подарки',
      render: () => (
        <Tab.Pane>
          <TabPresets crudData={crudData} />
        </Tab.Pane>
      ),
    },
    {
      menuItem: 'Вакансии',
      render: () => (
        <Tab.Pane>
          <TabVacancies crudData={crudData} />
        </Tab.Pane>
      ),
    },
  ];

  useEffect(() => {
    if (activeTab === 0) {
      props.fetchSubjectAppeal();
      setCrudData({ ...crudData, headerText: 'Тема обращения' });
    } else if (activeTab === 1) {
      console.log('activeTab', activeTab);
      setCrudData({ ...crudData, headerText: 'Источник обращений' });
    } else if (activeTab === 2) {
      console.log('activeTab', activeTab);
      setCrudData({ ...crudData, headerText: 'Источник вакансий' });
    } else if (activeTab === 3) {
      console.log('activeTab', activeTab);
      setCrudData({ ...crudData, headerText: 'Категория обращений' });
    } else if (activeTab === 4) {
      console.log('activeTab', activeTab);
      setCrudData({ ...crudData, headerText: 'Причины обращения' });
    } else if (activeTab === 5) {
      console.log('activeTab', activeTab);
      setCrudData({ ...crudData, headerText: 'Подарки' });
    } else if (activeTab === 6) {
      console.log('activeTab', activeTab);
      setCrudData({ ...crudData, headerText: 'Вакансии' });
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
    subjectAppealList: state.crmreferenceReducer.subjectAppealList,
  };
}

export default connect(mapStateToProps, {
  fetchSubjectAppeal,
  createSubjectAppeal,
  updateSubjectAppeal,
})(injectIntl(CrmReference));
