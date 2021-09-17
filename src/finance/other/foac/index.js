import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';
import { Segment, Container } from 'semantic-ui-react';
import {
    fetchCollectMonies,
    fetchCollectorList,
    postApproveCollectMoney,
    postRejectCollectMoney,
    clearCollectorList,
} from './foacAction';

import Table from './components/Table';
import './style.css';
import ConfirmModal from '../../../utils/ConfirmModal';
import FilterFoac from './components/FilterFoac';
import {
    f4FetchCountryList,
    f4FetchBankPartnerOptions,
} from '../../../reference/f4/f4_action';

const Foac = props => {
    const {
        intl: { messages },
        collectMoniesList = [],
        language,
        countryList = [],
        companyOptions = [],
        branchOptionsMarketing = [],
        collectorList = [],
        bankPartnerOptions = [],
    } = props;

    useEffect(() => {
        props.f4FetchCountryList();
        props.f4FetchBankPartnerOptions();
    }, []);

    const countryOptions = countryList.map(item => {
        return {
            key: item.countryId,
            text: item.country,
            value: item.countryId,
        };
    });
    const finAgentOptions = collectorList.map(item => {
        return {
            key: item.collectorId,
            text: item.collectorFIO,
            value: item.collectorId,
        };
    });

    const statusOptions = [
        {
            key: 2,
            text: 'Отправленный финансовый менеджер',
            value: 2,
        },
        {
            key: 3,
            text: 'Финансовый менеджер утвержден',
            value: 3,
        },
        {
            key: 4,
            text: 'Финансовый менеджер отклонил',
            value: 4,
        },
    ];

    const [confirmModal, setConfirmModal] = useState(false);
    const [tempModalData, setTempModalData] = useState({});
    const initialFilterData = {
        countryId: '',
        bukrs: '',
        branchId: '',
        collectorId: '',
        bankId: '',
        statusId: '',
        paymentMethodId: '',
        dateAt: '',
        dateTo: '',
    };
    const [filterData, setFilterData] = useState(initialFilterData);
    // Получить список фин. агентов
    useEffect(() => {
        if (filterData.bukrs && filterData.branchId) {
            props.fetchCollectorList({
                bukrs: filterData.bukrs,
                branchId: filterData.branchId,
            });
        } else {
            props.clearCollectorList();
        }
    }, [filterData.bukrs, filterData.branchId]);

    const onChangeFilter = (fieldName, value) => {
        switch (fieldName) {
            case 'countryId':
                setFilterData({ ...filterData, countryId: value });
                break;
            case 'bukrs':
                setFilterData({
                    ...filterData,
                    bukrs: value,
                    branchId: '',
                    collectorId: '',
                });
                break;
            case 'branchId':
                setFilterData({
                    ...filterData,
                    branchId: value,
                    collectorId: '',
                });
                break;
            case 'collectorId':
                setFilterData({ ...filterData, collectorId: value });
                break;
            case 'bankId':
                setFilterData({ ...filterData, bankId: value });
                break;
            case 'paymentMethodId':
                setFilterData({ ...filterData, paymentMethodId: value });
                break;
            case 'statusId':
                setFilterData({ ...filterData, statusId: value });
                break;
            case 'dateAt':
                setFilterData({ ...filterData, dateAt: value });
                break;
            case 'dateTo':
                setFilterData({ ...filterData, dateTo: value });
                break;
        }
    };

    const yesButtonModal = () => {
        props.postRejectCollectMoney(tempModalData.id, () => {
            props.fetchCollectMonies(filterData);
            setConfirmModal(false);
        });
    };
    const noButtonModal = () => {
        setConfirmModal(false);
    };

    // Принять взнос
    const approveCollectMoney = id => {
        props.postApproveCollectMoney(id, () => {
            props.fetchCollectMonies(filterData);
            setConfirmModal(false);
        });
    };

    // Отмена взноса
    const rejectCollectMoney = data => {
        setTempModalData(data);
        setConfirmModal(true);
    };

    const handleSearchFilter = () => {
        if (filterData.bukrs) props.fetchCollectMonies({ ...filterData });
    };

    return (
        <Container
            fluid
            style={{
                marginTop: '1em',
                marginBottom: '1em',
                paddingLeft: '1em',
                paddingRight: '1em',
            }}
        >
            <ConfirmModal
                data={tempModalData}
                text="Вы действительно хотите отменить взнос?"
                open={confirmModal}
                onClose={() => setConfirmModal(false)}
                yesButton={yesButtonModal}
                noButton={noButtonModal}
            />
            <Segment className="space-between">
                <h3>Утверждение взноса</h3>
            </Segment>
            <FilterFoac
                messages={messages}
                language={language}
                filterData={filterData}
                onChangeFilter={onChangeFilter}
                handleSearchFilter={handleSearchFilter}
                countryOptions={countryOptions}
                companyOptions={companyOptions}
                branchOptions={branchOptionsMarketing}
                finAgentOptions={finAgentOptions}
                bankOptions={bankPartnerOptions}
                statusOptions={statusOptions}
            />
            <Table
                messages={messages}
                data={collectMoniesList}
                approve={approveCollectMoney}
                reject={rejectCollectMoney}
            />
        </Container>
    );
};

function mapStateToProps(state) {
    return {
        // userInfo
        countryList: state.f4.countryList,
        bankPartnerOptions: state.f4.bankPartnerOptions,
        companyOptions: state.userInfo.companyOptions,
        branchOptionsMarketing: state.userInfo.branchOptionsMarketing,
        collectMoniesList: state.foacReducer.collectMoniesList,
        collectorList: state.foacReducer.collectorList,
    };
}

export default connect(mapStateToProps, {
    f4FetchCountryList,
    fetchCollectMonies,
    postApproveCollectMoney,
    postRejectCollectMoney,
    fetchCollectorList,
    clearCollectorList,
    f4FetchBankPartnerOptions,
})(injectIntl(Foac));
