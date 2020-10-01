import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';
import TabSmcsWithoutContract from './tabs/TabSmcsWithoutContract';
import TabSmcsWithRequest from './tabs/TabSmcsWithRequest';
import TabSmcsWithoutRequest from './tabs/TabSmcsWithoutRequest';
import { Container, Tab, Segment } from 'semantic-ui-react';
import './style.css';

const Smcs = props => {
  const { location } = props;
  const [applicationNumber, setApplicationNumber] = useState();
  const [tovarSn, setTovarSn] = useState('');
  const [withoutRequestProps, setWithoutRequestProps] = useState({});
  const [activeTab, setActiveTab] = useState(0);
  useEffect(() => {
    if (
      location.search === '' ||
      location.search === null ||
      location.search === undefined
    ) {
      if (location.state) {
        if (Object.keys(location.state).length == 1) {
          setActiveTab(0);
          setTovarSn(location.state.tovarSn);
        }
        if (Object.keys(location.state).length == 6) {
          setActiveTab(1);
          setWithoutRequestProps(location.state);
        }
        if (Object.keys(location.state).length == 0) {
          setActiveTab(0);
        }
      }
    } else {
      setActiveTab(2);
      let searchString = '?applicationNumber=';
      let appNumberStr = location.search.replace(searchString, '');
      let appNumber = parseInt(appNumberStr);
      setApplicationNumber(appNumber);
    }
    // if (Object.keys(location.state).length == 1) {
    //   setActiveTab(0);
    //   setTovarSn(location.state.tovarSn);
    // }
    // if (Object.keys(location.state).length == 4) {
    //   setActiveTab(1);
    //   setWithoutRequestProps(location.state);
    // }
  }, [location]);

  //Вкладки
  const panes = [
    {
      menuItem: {
        key: '1',
        content: 'Без заявки',
      },
      pane: (
        <Tab.Pane key={1}>
          <TabSmcsWithoutRequest tovarSnProps={tovarSn} />
        </Tab.Pane>
      ),
    },
    {
      menuItem: {
        key: '2',
        content: 'Без договора',
      },
      pane: (
        <Tab.Pane key={2}>
          <TabSmcsWithoutContract withoutRequestProps={withoutRequestProps} />
        </Tab.Pane>
      ),
    },
    {
      menuItem: {
        key: '3',
        content: 'С  заявкой',
      },
      pane: (
        <Tab.Pane key={3}>
          <TabSmcsWithRequest applicationNumber={applicationNumber} />
        </Tab.Pane>
      ),
    },
  ];

  // const changeActiveIndex = (e, value) => {
  //   setActiveTab(value);
  // };

  return (
    <Container
      fluid
      style={{
        marginTop: '2em',
        marginBottom: '2em',
        paddingLeft: '2em',
        paddingRight: '2em',
      }}
    >
      <Segment as="h2">Создание сервиса</Segment>

      <Tab
        activeIndex={activeTab}
        menu={{ attached: true, tabular: false, pointing: true }}
        panes={panes}
        renderActiveOnly={false}
        onTabChange={(e, { activeIndex }) => setActiveTab(activeIndex)}
      />
    </Container>
  );
};

const mapStateToProps = state => {
  return {};
};

export default connect(mapStateToProps, {})(injectIntl(Smcs));
