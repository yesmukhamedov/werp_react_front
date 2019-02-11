import React, { Component } from 'react';
import { Tab, Table, Button, Icon } from 'semantic-ui-react';
import { connect } from 'react-redux';

import { RepSearch894 } from './search/RepSearchPanels';
import { countedYearMonthsMap, REP_DEMO_ID } from '../crmRepUtil';
import { fetchItems, fetchChildItems } from '../actions/crmReportAction';
import { MONTH_OPTIONS } from '../../../../utils/constants';

class CrmRepDemoPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      bukrs: null,
      activeIndex: 0,
      bukrsItems: [],
      branchItems: [],
      groupItems: [],
      loadings: {},
      headers: [
        'Все компании',
        'Филиалы компании',
        'Группы филиала',
        'Группа ',
      ],
    };
  }

  handleChange = (e, v) => {
    //console.log(v.value)
  };

  renderGroupItems = () => {
    return this.renderItems(this.state.groupItems);
  };

  renderBukrsItems = () => {
    return this.renderItems(this.state.bukrsItems);
  };

  renderMainItems = () => {
    return this.renderItems(this.props.items);
  };

  renderBranchItems() {
    return this.renderItems(this.state.branchItems);
  }

  renderItems = items => {
    const { loadings, activeIndex, headers } = this.state;

    const yearMonthsMap = countedYearMonthsMap();

    const renderMonthDataForSale = monthData => {
      monthData = monthData || {};
      return yearMonthsMap.map(m => {
        const md = monthData[m.y + '_' + m.m];

        return [
          <Table.Cell
            key={m}
            width={1}
            className={md ? md.demoAvgLevelClass : ''}
          >
            {md ? `${md.demoCount}` + '/' + `${md.staffCount}` : ''}
          </Table.Cell>,
          <Table.Cell
            key={`${m}avg`}
            width={1}
            className={md ? md.demoAvgLevelClass : ''}
          >
            {md ? md.demoAvg : ''}
          </Table.Cell>,
          <Table.Cell key={`${m}d`} className={md ? md.demoAvgLevelClass : ''}>
            {md ? `${md.demoLevel}-уровень` : 'Нет данных'}
          </Table.Cell>,
        ];
      });
    };

    const colSpan = 3;
    return (
      <div>
        <h3>{headers[activeIndex] || ''}</h3>
        <Table celled striped>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Филиал</Table.HeaderCell>
              {yearMonthsMap.map(m => (
                <Table.HeaderCell colSpan={colSpan} key={m.m}>
                  {MONTH_OPTIONS[m.m - 1] ? MONTH_OPTIONS[m.m - 1].text : ''}
                </Table.HeaderCell>
              ))}
              <Table.HeaderCell />
            </Table.Row>
          </Table.Header>

          <Table.Body>
            {items.map(item => (
              <Table.Row key={item.contextId}>
                <Table.Cell>{item.contextName}</Table.Cell>
                {renderMonthDataForSale(item.monthData)}
                <Table.Cell>
                  {item.context === 'manager' ? (
                    ''
                  ) : (
                    <Button
                      loading={loadings[item.contextId]}
                      icon
                      onClick={() => this.loadChildItems(item)}
                    >
                      <Icon type="material-community" name={'caret right'} />
                    </Button>
                  )}
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
        <hr />
        {this.renderDescription()}
      </div>
    );
  };

  renderDescription = () => {
    return (
      <div className="ui info message" style={{ width: '300px' }}>
        <span>1-й уровень: 25 и больше </span>
        <br />
        <span>2-й уровень: 24 - 20 </span>
        <br />
        <span>3-й уровень: 19 и меньше </span>
      </div>
    );
  };

  loadChildItems = item => {
    const { context, contextId, contextName } = item;
    let loadings = Object.assign({}, this.state.loadings);
    let branchItems = [...this.state.branchItems];
    let bukrsItems = [...this.state.bukrsItems];
    let groupItems = [...this.state.groupItems];

    let headers = [...this.state.headers];
    loadings[contextId] = true;
    this.setState({
      loadings: loadings,
    });

    let params = {
      context: context,
      contextId: contextId,
      bukrs: item.bukrs,
      branchId: item.branchId,
    };

    let activeIndex = 0;
    if (context === 'bukrs') {
      activeIndex = 1;
      headers[activeIndex] = 'Филиалы: ' + contextName;
    } else if (context === 'branch') {
      activeIndex = 2;
      headers[activeIndex] = 'Группы филиала: ' + contextName;
    } else if (context === 'group') {
      activeIndex = 3;
      headers[activeIndex] = headers[2] + ' / Дилеры группы: ' + contextName;
    }

    this.props.fetchChildItems(REP_DEMO_ID, params).then(({ data }) => {
      if (context === 'bukrs') {
        bukrsItems = data;
      } else if (context === 'branch') {
        branchItems = data;
      } else if (context === 'group') {
        groupItems = data;
      }
      this.setState({
        ...this.state,
        bukrsItems: bukrsItems,
        branchItems: branchItems,
        groupItems: groupItems,
        loadings: {},
        activeIndex: activeIndex,
        headers: headers,
      });
    });
  };

  handleTabChange = (e, { activeIndex }) =>
    this.setState({ ...this.state, activeIndex: activeIndex });

  fetchMainItems = () => {
    this.props.fetchItems(REP_DEMO_ID, {});
    this.setState({
      ...this.state,
      branchItems: [],
      groupItems: [],
    });
  };

  render() {
    const panes = [
      {
        menuItem: 'Все компании',
        render: () => (
          <Tab.Pane attached={false}>{this.renderMainItems()}</Tab.Pane>
        ),
      },
      {
        menuItem: 'Филалы компании',
        render: () => (
          <Tab.Pane attached={false}>{this.renderBukrsItems()}</Tab.Pane>
        ),
      },
      {
        menuItem: 'Группы филиала',
        render: () => (
          <Tab.Pane attached={false}>{this.renderBranchItems()}</Tab.Pane>
        ),
      },
      {
        menuItem: 'Дилеры группы',
        render: () => (
          <Tab.Pane attached={false}>{this.renderGroupItems()}</Tab.Pane>
        ),
      },
    ];

    const { activeIndex, bukrs } = this.state;

    return (
      <div>
        <RepSearch894
          companyOptions={this.props.companyOptions}
          handleChange={(e, v) => this.setState({ bukrs: v.value })}
          fetchItems={this.fetchMainItems}
        />
        <Tab
          onTabChange={this.handleTabChange}
          activeIndex={activeIndex}
          menu={{ pointing: true }}
          panes={panes}
        />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    meta: state.crmReportReducer.meta,
    companyOptions: state.userInfo.companyOptions,
    items: state.crmReportReducer.items,
  };
}

export default connect(
  mapStateToProps,
  {
    fetchItems,
    fetchChildItems,
  },
)(CrmRepDemoPage);
