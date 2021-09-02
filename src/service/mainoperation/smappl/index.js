import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import {
    fetchSmapplList,
    clearSmapplList,
    //
    postApplicationsOperator,
    chageMaster,
    //
    fetchMasterListSmappl,
    clearMasterListSmappl,
    //
    fetchOperatorListSmappl,
    clearOperatorListSmappl,
    //
    smapplFetchCategory,
    smapplFetchAppStatus,
    smapplFetchAppType,
} from './smapplAction';
import { injectIntl } from 'react-intl';
import {
    Icon,
    Container,
    Segment,
    Form,
    Dropdown,
    Popup,
    Button,
    Modal,
    Header,
    Label,
} from 'semantic-ui-react';
import 'react-table/react-table.css';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import {
    stringYYYYMMDDToMoment,
    momentToStringYYYYMMDD,
} from '../../../utils/helpers';
import '../../service.css';
import {
    LinkToSmcsEmpty,
    LinkToSmecam,
    LinkToSmvs,
} from '../../../utils/outlink';
import ReactTableServerSideWrapperFilteredState from '../../../utils/ReactTableServerSideWrapperFilteredState';

import DropdownClearable from '../../../utils/DropdownClearable';
import OutputErrors from '../../../general/error/outputErrors';
import { errorTableText } from '../../../utils/helpers';
import TotalCountsTable from '../../../utils/TotalCountsTable';
import moment from 'moment';
require('moment/locale/ru');

const Smappl = props => {
    const {
        intl: { messages },
        language = '',
        branchOptionsService,
        companyOptions = [],
        smapplList = {},
        category = [],
        smapplAppStatus = [],
        smapplAppType = [],
        operatorListSmappl = [],
        masterListSmappl = [],
    } = props;

    const emptyParam = {
        bukrs: null,
        branchId: null,
        categoryId: null,
        serviceTypeId: null,
        appStatusIds: '1,2,3,4',
        masterId: null,
        operatorId: null,
        dateOpenAt: momentToStringYYYYMMDD(moment(new Date())),
        dateOpenTo: '',
    };
    const [param, setParam] = useState({ ...emptyParam });
    const [error, setError] = useState([]);

    const [tempMaster, setTempMaster] = useState({});
    const [modalMaster, setModalMaster] = useState(false);

    const [turnOnReactFetch, setTurnOnReactFetch] = useState(false);

    const initialServerSideParams = {
        page: 0,
        size: 20,
        orderBy: 'id',
        direction: 'DESC',
    };

    const [serverSideParams, setServerSideParams] = useState({
        ...initialServerSideParams,
    });

    const [filtered, setFiltered] = useState([]);

    useEffect(() => {
        if (param.bukrs) {
            let params = {
                bukrs: param.bukrs,
                branchId: param.branchId,
                categoryId: param.categoryId,
            };
            props.fetchMasterListSmappl({
                ...params,
            });
            props.fetchOperatorListSmappl({ ...params });
        }
    }, [param.bukrs, param.branchId, param.categoryId]);

    const tovarCategoryOptions = category.map(item => {
        return {
            key: item.id,
            text: item.name,
            value: item.id,
        };
    });

    const serviceAppStatusOptions = smapplAppStatus.map(item => {
        return {
            key: item.id,
            text: item.name,
            value: item.id,
        };
    });

    const serviceTypeOptions = smapplAppType.map(item => {
        return {
            key: item.id,
            text: item.name,
            value: item.id,
        };
    });

    const masterListOptions = masterListSmappl.map(item => {
        return {
            key: parseInt(
                `${Math.floor(Math.random() * 10000)}${item.staffId}`,
            ),
            text: item.fullName,
            value: item.staffId,
        };
    });
    const operatorListOptions = operatorListSmappl.map(item => {
        return {
            key: parseInt(`${Math.floor(Math.random() * 10)}${item.staffId}`),
            text: item.fullName,
            value: item.staffId,
        };
    });

    useEffect(() => {
        props.smapplFetchCategory();
        props.smapplFetchAppStatus();
        props.smapplFetchAppType();
    }, []);

    const onChange = (value, fieldName) => {
        setParam(prev => {
            const varSmappl = { ...prev };
            switch (fieldName) {
                case 'bukrs':
                    varSmappl.bukrs = value;
                    varSmappl.branchId = null;
                    varSmappl.masterId = null;
                    varSmappl.operatorId = null;
                    break;
                case 'branchId':
                    varSmappl.branchId = value;
                    varSmappl.masterId = null;
                    varSmappl.operatorId = null;
                    break;
                case 'categoryId':
                    varSmappl.categoryId = value;
                    varSmappl.masterId = null;
                    varSmappl.operatorId = null;
                    break;
                case 'serviceTypeId':
                    varSmappl.serviceTypeId =
                        value.length > 0 ? value.join() : null;
                    break;
                case 'appStatusIds':
                    varSmappl.appStatusIds =
                        value.length > 0 ? value.join() : '';
                    break;
                case 'masterId':
                    varSmappl.masterId = value;
                    break;
                case 'operatorId':
                    varSmappl.operatorId = value;
                    break;
                case 'changeModalMasterId':
                    setTempMaster({ ...tempMaster, masterId: value });
                    break;
                case 'saveChangeMaster':
                    props.chageMaster(
                        { ...tempMaster },
                        () => {
                            setModalMaster(false);
                            props.clearSmapplList();
                            setFiltered([]);
                            setTurnOnReactFetch(false);
                            props.fetchSmapplList(
                                { ...param, ...initialServerSideParams },
                                () => setTurnOnReactFetch(true),
                            );
                            setServerSideParams({
                                ...initialServerSideParams,
                            });
                        },
                        () => {
                            setModalMaster(false);
                            setTempMaster({});
                        },
                    );
                    break;
                default:
                    varSmappl[fieldName] = value;
            }
            return varSmappl;
        });
    };

    const allColumns = [
        {
            Header: `№ ${messages['Applications']}`,
            accessor: 'applicationNumber',
            show: true,
            filterable: false,

            Cell: ({ row }) => (
                <div style={{ textAlign: 'center' }}>
                    {row._original.urgencyLevel === true ? (
                        <Popup
                            content="Срочный"
                            size="tiny"
                            trigger={
                                <Label color="red" horizontal>
                                    <LinkToSmecam
                                        id={row._original.applicationNumber}
                                    />
                                </Label>
                            }
                        />
                    ) : (
                        <LinkToSmecam id={row._original.applicationNumber} />
                    )}
                </div>
            ),
            fixed: 'left',
        },
        {
            Header: messages['L__BRANCH'],
            accessor: 'branchName',
            show: true,
            Cell: row => (
                <div className="text-wrap" style={{ textAlign: 'center' }}>
                    {row.value}
                </div>
            ),
        },
        {
            Header: `CN `,
            accessor: 'contractNumber',
            show: true,
            Cell: row => (
                <div className="text-wrap" style={{ textAlign: 'center' }}>
                    {row.value}
                </div>
            ),
        },

        {
            Header: messages['productSerialNumber'],
            accessor: 'tovarSn',
            show: true,
            Cell: row => (
                <div className="text-wrap" style={{ textAlign: 'center' }}>
                    {row.value}
                </div>
            ),
        },
        {
            Header: messages['TBL_H__PRODUCT'],
            accessor: 'contractTypeName',
            show: true,
            filterable: false,
            Cell: row => (
                <div className="text-wrap" style={{ textAlign: 'center' }}>
                    {row.value}
                </div>
            ),
        },
        {
            Header: messages['Application_Date'],
            accessor: 'adate',
            show: true,
            Cell: row => (
                <div className="text-wrap" style={{ textAlign: 'center' }}>
                    {moment(row.value).format('DD-MM-YYYY')}
                </div>
            ),
        },
        {
            Header: messages['Form.Reco.RecoName'],
            accessor: 'customerFIO',
            show: true,
            Cell: row => (
                <div className="text-wrap" style={{ textAlign: 'center' }}>
                    {row.value}
                </div>
            ),
        },
        {
            Header: messages['Table.Address'],
            accessor: 'fullAddress',
            show: true,
            Cell: row => (
                <div className="text-wrap" style={{ textAlign: 'center' }}>
                    {row.value}
                </div>
            ),
        },
        {
            Header: messages['Phone'],
            accessor: 'fullPhone',
            show: true,
            filterable: false,
            Cell: row => (
                <div className="text-wrap" style={{ textAlign: 'center' }}>
                    {row.value}
                </div>
            ),
        },
        {
            Header: messages['Masters'],
            accessor: 'masterFIO',
            show: true,
            filterable: false,
            Cell: ({ row }) => (
                <div>
                    <div style={{ textAlign: 'center' }}>
                        {row._original.masterFIO}
                    </div>
                    <Popup
                        content={messages['BTN__EDIT']}
                        size="tiny"
                        trigger={
                            <div style={{ textAlign: 'center' }}>
                                <Button
                                    size="mini"
                                    circular
                                    color="green"
                                    icon="pencil"
                                    onClick={() => {
                                        setTempMaster({
                                            applicationId:
                                                row._original.applicationNumber,
                                            masterId: row._original.masterId,
                                        });
                                        setModalMaster(true);
                                    }}
                                />
                            </div>
                        }
                    />
                </div>
            ),
        },
        {
            Header: messages['L__ORDER_STATUS'],
            accessor: 'applicationStatusName',
            show: true,
            filterable: false,
            Cell: row => (
                <div className="text-wrap" style={{ textAlign: 'center' }}>
                    {row.value}
                </div>
            ),
        },
        {
            Header: messages['Operator'],
            accessor: 'operatorFIO',
            show: true,
            Cell: row => (
                <div className="text-wrap" style={{ textAlign: 'center' }}>
                    {row.value}
                </div>
            ),
            filterable: false,
        },
        {
            Header: messages['type_of_application'],
            accessor: 'applicationTypeName',
            show: true,
            filterable: false,
            Cell: row => (
                <div className="text-wrap" style={{ textAlign: 'center' }}>
                    {row.value}
                </div>
            ),
        },

        {
            Header: `${messages['service']} №`,

            accessor: 'serviceNumber',
            Footer: original => {
                let total = 0;
                original.data.map((item, index) => {
                    if (
                        item._original.serviceTotalSum != null ||
                        item._original.serviceTotalSum != undefined
                    ) {
                        total = total + item._original.serviceTotalSum;
                    }
                });
                return <div style={{ textAlign: 'center' }}>Итого:{total}</div>;
            },
            show: true,
            filterable: false,
            Cell: row => (
                <div className="text-wrap" style={{ textAlign: 'center' }}>
                    <LinkToSmvs serviceNumber={row.value} />
                </div>
            ),
        },

        {
            Header: messages['Table.View'],
            accessor: 'clientStory',
            checked: true,
            filterable: false,
            Cell: original => {
                const url = `../mainoperation/smcuspor?contractNumber=${original.row.contractNumber}`;
                return original.row.contractNumber == null ||
                    original.row.contractNumber == undefined ? (
                    ''
                ) : (
                    <Popup
                        content="История клиента"
                        size="tiny"
                        trigger={
                            <div style={{ textAlign: 'center' }}>
                                <Link to={url} target="_blank">
                                    <Icon name="address card" color="black" />
                                </Link>
                            </div>
                        }
                    />
                );
            },
            width: 60,
            fixed: 'right',
        },
    ];

    //Поиск
    const handleClickApply = () => {
        if (param.bukrs && param.branchId) {
            props.clearSmapplList();
            setFiltered([]);
            setTurnOnReactFetch(false);
            props.fetchSmapplList(
                { ...param, ...initialServerSideParams },
                () => setTurnOnReactFetch(true),
            );
            setServerSideParams({
                ...initialServerSideParams,
            });
            setError([]);
        } else {
            const errors = [];
            if (param.bukrs) {
            } else {
                errors.push(errorTableText(5));
            }
            if (param.branchId) {
            } else {
                errors.push(errorTableText(7));
            }

            setError(() => errors);
        }
    };

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
            <Segment>
                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                    }}
                >
                    <h3>{messages['service_requests']}</h3>
                    <LinkToSmcsEmpty />
                </div>
            </Segment>

            <Modal
                closeIcon
                open={modalMaster}
                onClose={() => setModalMaster(false)}
            >
                <Header content={messages['toEdit']} />
                <Modal.Content>
                    <DropdownClearable
                        selection
                        options={masterListOptions}
                        value={tempMaster.masterId ? tempMaster.masterId : ''}
                        placeholder="Мастер"
                        onChange={(e, { value }) =>
                            onChange(value, 'changeModalMasterId')
                        }
                        handleClear={() =>
                            setTempMaster({ ...tempMaster, masterId: null })
                        }
                    />
                </Modal.Content>
                <Modal.Actions>
                    <Button color="red" onClick={() => setModalMaster(false)}>
                        <Icon name="remove" /> {messages['Button.No']}
                    </Button>
                    <Button
                        color="green"
                        onClick={() => onChange(0, 'saveChangeMaster')}
                    >
                        <Icon name="checkmark" /> {messages['Form.Save']}
                    </Button>
                </Modal.Actions>
            </Modal>
            <Form>
                <Form.Group widths="equal">
                    <Form.Field required>
                        <label>{messages['bukrs']}</label>
                        <DropdownClearable
                            selection
                            options={companyOptions ? companyOptions : []}
                            value={param.bukrs}
                            placeholder={messages['bukrs']}
                            onChange={(e, { value }) =>
                                onChange(value, 'bukrs')
                            }
                            handleClear={() =>
                                setParam({
                                    ...param,
                                    bukrs: null,
                                    branchId: null,
                                })
                            }
                        />
                    </Form.Field>

                    <Form.Field required>
                        <label>{messages['Task.Branch']}</label>
                        <DropdownClearable
                            selection
                            options={
                                param.bukrs
                                    ? branchOptionsService[param.bukrs]
                                    : []
                            }
                            value={param.branchId}
                            placeholder={messages['Task.Branch']}
                            onChange={(e, { value }) =>
                                onChange(value, 'branchId')
                            }
                            handleClear={() =>
                                setParam({ ...param, branchId: null })
                            }
                        />
                    </Form.Field>
                    <Form.Field>
                        <label>{messages['product_category']}</label>
                        <DropdownClearable
                            selection
                            options={tovarCategoryOptions}
                            value={param.categoryId}
                            placeholder={messages['product_category']}
                            onChange={(e, { value }) =>
                                onChange(value, 'categoryId')
                            }
                            handleClear={() =>
                                setParam({ ...param, categoryId: null })
                            }
                        />
                    </Form.Field>

                    <Form.Field>
                        <label>{messages['L__ORDER_STATUS']}</label>
                        <Dropdown
                            placeholder={messages['L__ORDER_STATUS']}
                            clearable="true"
                            selection
                            fluid
                            multiple
                            defaultValue={param.appStatusIds
                                .split(',')
                                .map(Number)}
                            options={serviceAppStatusOptions}
                            onChange={(e, { value }) =>
                                onChange(value, 'appStatusIds')
                            }
                        />
                    </Form.Field>
                    <Form.Field>
                        <label>{messages['type_of_application']}</label>
                        <Dropdown
                            placeholder={messages['type_of_application']}
                            clearable="true"
                            selection
                            fluid
                            multiple
                            options={serviceTypeOptions}
                            onChange={(e, { value }) =>
                                onChange(value, 'serviceTypeId')
                            }
                        />
                    </Form.Field>
                </Form.Group>

                <Form.Group>
                    <Form.Field>
                        <label>{messages['Form.DateFrom']}</label>
                        <DatePicker
                            className="date-auto-width"
                            autoComplete="off"
                            locale={language}
                            selected={stringYYYYMMDDToMoment(param.dateOpenAt)}
                            onChange={event =>
                                setParam({
                                    ...param,
                                    dateOpenAt: momentToStringYYYYMMDD(event),
                                })
                            }
                            dateFormat="DD.MM.YYYY"
                            placeholderText={messages['Form.DateFrom']}
                            isClearable
                        />
                    </Form.Field>
                    <Form.Field>
                        <label>{messages['Form.DateTo']}</label>
                        <DatePicker
                            className="date-auto-width"
                            autoComplete="off"
                            selected={stringYYYYMMDDToMoment(param.dateOpenTo)}
                            onChange={event =>
                                setParam({
                                    ...param,
                                    dateOpenTo: momentToStringYYYYMMDD(event),
                                })
                            }
                            locale={language}
                            dateFormat="DD.MM.YYYY"
                            placeholderText={messages['Form.DateTo']}
                            isClearable
                        />
                    </Form.Field>
                    <Form.Field className="marginRight width25Rem">
                        <label>{messages['master']}</label>
                        <DropdownClearable
                            selection
                            value={param.masterId ? param.masterId : ''}
                            options={masterListOptions}
                            placeholder={messages['master']}
                            onChange={(e, { value }) =>
                                onChange(value, 'masterId')
                            }
                            handleClear={() =>
                                setParam({ ...param, masterId: null })
                            }
                        />
                    </Form.Field>
                    <Form.Field className="marginRight width25Rem">
                        <label>{messages['Operator']}</label>
                        <DropdownClearable
                            selection
                            options={operatorListOptions}
                            value={param.operatorId ? param.operatorId : ''}
                            placeholder={messages['Operator']}
                            onChange={(e, { value }) =>
                                onChange(value, 'operatorId')
                            }
                            handleClear={() =>
                                setParam({ ...param, operatorId: null })
                            }
                        />
                    </Form.Field>

                    <Form.Button
                        // control={Button}
                        color="blue"
                        // style={{ marginTop: 24 }}
                        onClick={handleClickApply}
                        className="alignBottom"
                    >
                        {messages['search']}
                    </Form.Button>
                </Form.Group>
            </Form>
            <OutputErrors errors={error} />

            <TotalCountsTable
                text={messages['overallAmount']}
                count={smapplList ? smapplList.totalElements : 0}
            />

            <ReactTableServerSideWrapperFilteredState
                data={smapplList ? smapplList.data : []}
                columns={allColumns}
                filterable={true}
                showPagination={true}
                pageSize={serverSideParams.size}
                requestData={params => {
                    setServerSideParams({ ...params });
                    props.fetchSmapplList({ ...param, ...params }, () =>
                        setTurnOnReactFetch(true),
                    );
                }}
                pages={smapplList ? smapplList.totalPages : ''}
                turnOnReactFetch={turnOnReactFetch}
                page={serverSideParams.page}
                filtered={filtered}
                onFilteredChange={filter => {
                    setFiltered(filter);
                }}
            />
        </Container>
    );
};

function mapStateToProps(state) {
    return {
        language: state.locales.lang,
        companyOptions: state.userInfo.companyOptions,
        branchOptionsService: state.userInfo.branchOptionsService,
        //
        smapplAppStatus: state.smapplReducer.smapplAppStatus,
        smapplAppType: state.smapplReducer.smapplAppType,
        smapplList: state.smapplReducer.smapplList,
        category: state.smapplReducer.smapplCategory,
        masterListSmappl: state.smapplReducer.masterListSmappl,
        operatorListSmappl: state.smapplReducer.operatorListSmappl,
    };
}

export default connect(mapStateToProps, {
    smapplFetchCategory,
    smapplFetchAppStatus,
    smapplFetchAppType,
    fetchSmapplList,
    clearSmapplList,
    postApplicationsOperator,
    chageMaster,
    fetchMasterListSmappl,
    clearMasterListSmappl,
    fetchOperatorListSmappl,
    clearOperatorListSmappl,
})(injectIntl(Smappl));
