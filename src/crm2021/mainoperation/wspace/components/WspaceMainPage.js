import React, { Component } from 'react';
import _ from 'lodash';
import 'react-table/react-table.css';
import { Container, Divider, Icon } from 'semantic-ui-react';
import { connect } from 'react-redux';
import {
    MENU_DASHBOARD,
    MENU_ALL_RECOS,
    MENU_ITEMS,
    MENU_BY_RECO,
    MENU_BY_DATE,
    MENU_MOVED,
    MENU_CURRENT_DEMO,
    MENU_CURRENT_VISIT,
} from '../wspaceUtil';
import '../css/main-page.css';
import { fetchGroupDealers } from '../../demo/actions/demoAction';
import {
    toggleRecoListModal,
    setCurrentRecommender,
    fetchRecosByReco,
    fetchRecosByDate,
    fetchDemoRecos,
    archiveReco,
    fetchMovedRecos,
    fetchTodayCalls,
    fetchTodayDemos,
    fetchCurrentDemos,
    fetchCurrentVisits,
    fetchVisitRecos,
    handleFilter,
    fetchKpi,
    wspClearState,
} from '../actions/wspaceAction';
import { blankForCreate, modalToggle } from '../../visit/actions/visitAction';
import {
    fetchCallResults,
    fetchPhoneMeta,
} from '../../reco/actions/recoAction';
import { fetchReasons, fetchDemoResults } from '../../demo/actions/demoAction';
import WspaceHeader from './WspaceHeader';
import WspaceMenu from './WspaceMenu';
import WspaceRecoList from './WspaceRecoList';
import WspaceDashboard from './WspaceDashboard';
import WspaceRecoListModal from './WspaceRecoListModal';
import WspacePhoneModal from './WspacePhoneModal';
import WspaceDemoTable from './WspaceDemoTable';
import WspaceVisitTable from './WspaceVisitTable';
import WspaceRecoFilter from './WspaceRecoFilter';
import WspaceVisitTableHeader from './WspaceVisitTableHeader';
import { Link } from 'react-router-dom';
import { injectIntl } from 'react-intl';

import moment from 'moment';

class WspaceMainPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentStaff: {},
            currentMenu: MENU_DASHBOARD,
            dividerTitle: '#',
        };

        this.onSelectStaff = this.onSelectStaff.bind(this);
    }

    componentWillMount() {
        this.props.fetchGroupDealers();
        this.props.fetchTodayCalls();
        this.props.fetchTodayDemos();
        this.props.fetchCallResults();
        this.props.fetchReasons();
        this.props.fetchKpi(moment().year(), moment().month() + 1);
        this.props.fetchDemoResults();
    }

    onSelectStaff(staff) {
        this.props.fetchRecosByReco(staff.key);
        this.props.fetchRecosByDate(staff.key);
        this.props.fetchCurrentDemos(staff.key);
        this.props.fetchCurrentVisits(staff.key);
        //this.props.fetchMovedRecos(staff.key)
        this.setState({
            ...this.state,
            currentStaff: staff,
        });
    }

    onSelectMenu = menu => {
        const { messages } = this.props.intl;
        let menuItem = _.find(MENU_ITEMS, { name: menu });
        let dividerTitle = menuItem
            ? messages[menuItem.pageLabel]
            : messages['Crm.Wspace.TodayActions'];
        this.setState({
            ...this.state,
            currentMenu: menu,
            dividerTitle: dividerTitle,
        });
    };

    recoCardMenuHandle = (itemName, recoId) => {
        if (itemName === 'to_archive') {
            if (window.confirm('Действительно хотите закрыть рекомендацию?')) {
                this.props.archiveReco(recoId);
            }
        } else if (itemName === 'view') {
            let win = window.open('/crm2021/reco/view/' + recoId, '_blank');
            win.focus();
        }
    };

    doFilterData = (filters, items) => {
        if (!filters) {
            return items;
        }

        let out = items;

        if (filters.clientName) {
            out = _.filter(items, function(o) {
                return _.startsWith(
                    _.toLower(o.clientName),
                    _.toLower(filters.clientName),
                );
            });
        }

        if (filters.docDate) {
            if (this.state.currentMenu === MENU_BY_RECO) {
                out = _.filter(items, function(o) {
                    return _.startsWith(o.dateTime, filters.docDate);
                });
            } else if (this.state.currentMenu === MENU_BY_DATE) {
                out = _.filter(items, function(o) {
                    return _.startsWith(o.callDateTime, filters.docDate);
                });
            }
        }

        if (filters.phoneNumber) {
            if (this.state.currentMenu === MENU_BY_RECO) {
            } else if (this.state.currentMenu === MENU_BY_DATE) {
                out = _.filter(items, function(o) {
                    if (!o.phones) {
                        return false;
                    }

                    let b = false;
                    for (let k in o.phones) {
                        if (
                            _.startsWith(
                                o.phones[k].phoneNumber,
                                filters.phoneNumber,
                            )
                        ) {
                            b = true;
                            break;
                        }
                    }

                    return b;
                });
            }
        }

        if (filters.category) {
            if (
                this.state.currentMenu === MENU_BY_RECO ||
                this.state.currentMenu == MENU_BY_DATE
            ) {
                out = _.filter(items, function(o) {
                    return o.category === filters.category;
                });
            }
        }

        if (filters.resultId != undefined && filters.resultId != null) {
            if (this.state.currentMenu === MENU_BY_RECO) {
                out = _.filter(items, function(o) {
                    return o.result === filters.resultId;
                });
            }
        }
        return out;
    };

    prepareForCreateVisit = () => {
        this.props.blankForCreate(0, this.state.currentStaff.key);
        this.props.modalToggle(true);
    };

    renderContent = () => {
        const { messages } = this.props.intl;
        let menuItems = this.props.staffRecoData[this.state.currentMenu] || [];
        let filters = this.props.filters[this.state.currentMenu] || {};
        menuItems = this.doFilterData(filters, menuItems);
        console.log(
            'menuitems: ',
            menuItems,
            'current menu: ',
            this.state.currentMenu,
        );
        switch (this.state.currentMenu) {
            case MENU_ALL_RECOS:
            case MENU_BY_RECO:
            case MENU_BY_DATE:
            case MENU_MOVED:
                return (
                    <div>
                        <div style={{ display: 'block', height: '20px' }}>
                            <Link
                                target={'blank'}
                                className={
                                    'ui icon button primary right floated'
                                }
                                to={`/crm2021/reco/create`}
                            >
                                <Icon name="plus" />{' '}
                                {messages['Crm.Wspace.CreateFromArchive']}
                            </Link>
                        </div>
                        <WspaceRecoFilter
                            demoResults={this.props.demoResults}
                            locale={this.props.intl.locale}
                            messages={messages}
                            handleFilter={this.props.handleFilter}
                            menu={this.state.currentMenu}
                            filters={filters}
                        />
                        <WspaceRecoList
                            messages={messages}
                            recoCardMenuHandle={this.recoCardMenuHandle}
                            openRecoListModal={this.openRecoListModal}
                            menu={this.state.currentMenu}
                            items={menuItems}
                        />
                    </div>
                );

            case MENU_CURRENT_DEMO:
                return (
                    <WspaceDemoTable messages={messages} items={menuItems} />
                );

            case MENU_CURRENT_VISIT:
                return (
                    <div>
                        <WspaceVisitTableHeader
                            messages={messages}
                            prepareForCreate={this.prepareForCreateVisit}
                        />
                        <WspaceVisitTable
                            messages={messages}
                            openRecoListModal={this.openRecoListModal}
                            items={menuItems}
                        />
                    </div>
                );
            default:
                return <WspaceDashboard />;
        }
    };

    openRecoListModal = (recommender, context) => {
        if ('visit' === context) {
            this.props.setCurrentRecommender(recommender);
            this.props.fetchVisitRecos(recommender.id);
        } else {
            this.props.setCurrentRecommender(recommender);
            this.props.fetchDemoRecos(recommender.id);
        }

        this.props.toggleRecoListModal(true);
    };

    closeRecoListModal = () => {
        this.props.toggleRecoListModal(false);
    };

    componentDidMount() {
        this.props.fetchPhoneMeta();
    }

    componentWillUnmount() {
        this.props.wspClearState();
    }

    render() {
        const { currentStaff } = this.state;
        let menuItems = [];
        for (let k in MENU_ITEMS) {
            let temp = MENU_ITEMS[k];
            if (
                this.props.staffRecoData &&
                this.props.staffRecoData[temp.name]
            ) {
                temp['count'] = _.size(this.props.staffRecoData[temp.name]);
            } else {
                temp['count'] = 0;
            }

            menuItems.push(temp);
        }
        const { messages } = this.props.intl;

        return (
            <Container fluid className={'main-container'}>
                <WspaceHeader
                    dealers={this.props.dealers}
                    currentId={currentStaff.value}
                    onSelect={this.onSelectStaff}
                />
                <Divider horizontal>
                    {currentStaff && currentStaff.text ? currentStaff.text : ''}
                </Divider>
                <WspaceMenu
                    messages={messages}
                    loaders={this.props.loaders}
                    activeItem={this.state.currentMenu}
                    items={menuItems}
                    handleItemClick={this.onSelectMenu}
                />
                <Divider horizontal>{this.state.dividerTitle}</Divider>
                {this.renderContent()}
                <WspaceRecoListModal
                    messages={messages}
                    recoCardMenuHandle={this.recoCardMenuHandle}
                    loaders={this.props.loaders}
                    items={this.props.currentRecommenderRecos}
                    recommender={this.props.currentRecommender}
                    closeRecoListModal={this.closeRecoListModal}
                    opened={this.props.recoListModalOpened}
                />

                <WspacePhoneModal />
            </Container>
        );
    }
}

function mapStateToProps(state) {
    return {
        dealers: state.crmDemo2021.dealers,
        demoResults: state.crmDemo2021.demoResults,
        recoListModalOpened: state.crmWspaceReducer2021.recoListModalOpened,
        currentRecommender: state.crmWspaceReducer2021.currentRecommender,
        staffRecoData: state.crmWspaceReducer2021.staffRecoData,
        currentRecommenderRecos:
            state.crmWspaceReducer2021.currentRecommenderRecos,
        loaders: state.crmWspaceReducer2021.loaders,
        filters: state.crmWspaceReducer2021.filters,
    };
}

export default connect(mapStateToProps, {
    fetchGroupDealers,
    toggleRecoListModal,
    setCurrentRecommender,
    fetchRecosByReco,
    fetchRecosByDate,
    fetchDemoRecos,
    archiveReco,
    fetchMovedRecos,
    fetchTodayCalls,
    fetchTodayDemos,
    fetchCallResults,
    fetchReasons,
    fetchCurrentDemos,
    fetchCurrentVisits,
    fetchVisitRecos,
    handleFilter,
    fetchKpi,
    blankForCreate,
    modalToggle,
    wspClearState,
    fetchPhoneMeta,
    fetchDemoResults,
})(injectIntl(WspaceMainPage));
