import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import {
    fetchSmsetplpById,
    fetchSmsetplpList,
    clearSmsetplpList,
    postSmsetplpForm,
    updateSmsetplp,
} from './smsetplpAction';
import { injectIntl } from 'react-intl';
import { Container, Segment, Form, Dropdown } from 'semantic-ui-react';
import 'react-table/react-table.css';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import {
    stringYYYYMMDDToMoment,
    momentToStringYYYYMMDD,
    moneyFormat,
} from '../../../utils/helpers';
import '../../service.css';

import { f4FetchCountryList } from '../../../reference/f4/f4_action';

import DropdownClearable from '../../../utils/DropdownClearable';
import OutputErrors from '../../../general/error/outputErrors';

import Table from './Table';
import EditModalSmsetplp from './EditModalSmsetplp';
import { Divider } from 'semantic-ui-react';
require('moment/locale/ru');

const Smsetplp = props => {
    const {
        intl: { messages },
        language,
        countryList = [],
        companyOptions = [],
        branchOptionsService,
        smsetplpList = [],
        updateSmsetplpData = {},
    } = props;

    const initialState = {
        countryId: '',
        bukrs: '',
        branchId: '',
        dateAt: '',
    };

    const [param, setParam] = useState({
        ...initialState,
    });

    const [modalData, setModalData] = useState({});

    const [stateSmsetplpList, setStateSmsetplpList] = useState([]);

    const [editModal, setEditModal] = useState(false);

    useEffect(() => {
        if (smsetplpList.length !== 0) {
            setStateSmsetplpList(
                smsetplpList.map(item => {
                    return {
                        ...item,
                        editStatus: true,
                    };
                }),
            );
        }
    }, [smsetplpList]);

    const [formStatus, setFormStatus] = useState(true);

    useEffect(() => {
        props.f4FetchCountryList();
    }, []);

    useEffect(() => {
        if (smsetplpList) {
            if (smsetplpList.length > 0) {
                setFormStatus(true);
            } else {
                setFormStatus(false);
            }
        }
    }, [smsetplpList]);

    const countryOptions = countryList.map(item => {
        return {
            key: item.countryId,
            text: item.country,
            value: item.countryId,
        };
    });

    const onInputChange = (value, fieldName) => {
        switch (fieldName) {
            case 'countryId':
                setParam({ ...param, countryId: value });
                break;
            case 'bukrs':
                setParam({ ...param, bukrs: value, branchId: '' });
                break;
            case 'branchId':
                setParam({
                    ...param,
                    branchId: value.length > 0 ? value.join() : '',
                });
                break;

            default:
                alert('НЕТ ТАКОЕ ЗНАЧЕНИЕ');
        }
    };

    const onChangeTable = (fieldName, original) => {
        switch (fieldName) {
            case 'editRowTable':
                console.log('editRowTable', original);
                setModalData(original);
                setEditModal(true);
                break;

            case '':
                break;
            default:
                alert('НЕТ ТАКОЕ ЗНАЧЕНИЕ');
        }
    };

    const onChangeEditModal = (fieldName, value) => {
        switch (fieldName) {
            case 'onCloseModal':
                console.log('onCloseModal');
                setEditModal(false);
                break;
            case 'onSaveModal':
                console.log('onSaveModal', modalData);
                props.updateSmsetplp(
                    {
                        ...modalData,
                    },
                    () =>
                        setStateSmsetplpList(
                            stateSmsetplpList.map(item =>
                                item.id == modalData.id ? modalData : item,
                            ),
                        ),
                );
                setEditModal(false);
                break;
            case 'changeFilterCurrentPlanSum':
                setModalData({
                    ...modalData,
                    filterCurrentPlanSum: parseInt(value),
                });
                break;
            case 'changeFilterOverDuePlanSum':
                setModalData({
                    ...modalData,
                    filterOverDuePlanSum: parseInt(value),
                });
                break;
            case 'changeFilterServicePacketPlanSum':
                setModalData({
                    ...modalData,
                    filterServicePacketPlanSum: parseInt(value),
                });
                break;
            case 'changeFilterPartsPlanSum':
                setModalData({
                    ...modalData,
                    filterPartsPlanSum: parseInt(value),
                });
                break;
            case 'changeFilterVCServicePacketPlanSum':
                setModalData({
                    ...modalData,
                    filterVCServicePacketPlanSum: parseInt(value),
                });
                break;
            case 'changeFilterVCPartsPlanSum':
                setModalData({
                    ...modalData,
                    filterVCPartsPlanSum: parseInt(value),
                });
                break;
            default:
                alert('НЕТ ТАКОЕ ЗНАЧЕНИЕ');
        }
    };

    //Применить
    const handleClickApply = () => {
        if (param.bukrs) {
            props.fetchSmsetplpList({ ...param }, () => {
                props.clearSmsetplpList();
                setStateSmsetplpList([]);
            });
        } else {
            alert('ВЫБЕРИТЕ КОМПАНИЮ');
        }
    };

    //Формировать
    const handleClickForm = () => {
        if (param.dateAt) {
            props.postSmsetplpForm(param.dateAt);
        } else {
            alert('ВЫБЕРИТЕ ДАТУ ФОРМИРОВАНИЯ');
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
                <h3>Настройка планов и процентов</h3>
            </Segment>

            <EditModalSmsetplp
                data={modalData}
                open={editModal}
                onChangeEditModal={onChangeEditModal}
            />

            <Form>
                <Form.Group widths="equal">
                    <Form.Field>
                        <label>Страна</label>
                        <DropdownClearable
                            fluid
                            placeholder="Все"
                            value={param.countryId}
                            options={countryOptions}
                            onChange={(e, { value }) =>
                                onInputChange(value, 'countryId')
                            }
                            className="alignBottom"
                            handleClear={() =>
                                setParam({ ...param, countryId: '' })
                            }
                        />
                    </Form.Field>

                    <Form.Field required>
                        <label>Компания</label>
                        <DropdownClearable
                            fluid
                            placeholder="Все"
                            value={param.bukrs}
                            options={companyOptions}
                            onChange={(e, { value }) =>
                                onInputChange(value, 'bukrs')
                            }
                            className="alignBottom"
                            handleClear={() =>
                                setParam({ ...param, bukrs: '' })
                            }
                        />
                    </Form.Field>
                    <Form.Field>
                        <label>Филиал</label>
                        <Dropdown
                            selection
                            fluid
                            placeholder="Все"
                            options={
                                param.bukrs == '' || param.bukrs == null
                                    ? []
                                    : branchOptionsService[param.bukrs]
                            }
                            onChange={(e, { value }) =>
                                onInputChange(value, 'branchId')
                            }
                            className="alignBottom"
                            multiple
                            value={
                                param.branchId
                                    ? param.branchId.split(',').map(Number)
                                    : []
                            }
                        />
                    </Form.Field>

                    <Form.Field className="marginRight" required>
                        <label>Дата</label>

                        <DatePicker
                            dateFormat="MMMM YYYY"
                            showMonthYearPicker
                            placeholderText="Месяц"
                            autoComplete="off"
                            selected={
                                param.dateAt === null
                                    ? ''
                                    : stringYYYYMMDDToMoment(param.dateAt)
                            }
                            dropdownMode="select" //timezone="UTC"
                            locale={language}
                            onChange={date =>
                                setParam({
                                    ...param,
                                    dateAt: momentToStringYYYYMMDD(date),
                                })
                            }
                        />
                    </Form.Field>
                    <Form.Button
                        onClick={handleClickApply}
                        color="blue"
                        className="alignBottom"
                    >
                        Применить
                    </Form.Button>
                    <Form.Button
                        disabled={formStatus}
                        onClick={handleClickForm}
                        color="green"
                        className="alignBottom"
                    >
                        Сформировать
                    </Form.Button>
                </Form.Group>
            </Form>
            <OutputErrors
            //errors={error}
            />
            <Divider />
            <Table
                data={stateSmsetplpList ? stateSmsetplpList : []}
                messages={props.intl.messages}
                onChangeTable={onChangeTable}
                // editStatus={editStatus}
            />
        </Container>
    );
};

function mapStateToProps(state) {
    return {
        countryList: state.f4.countryList,
        language: state.locales.lang,
        companyOptions: state.userInfo.companyOptions,
        branchOptionsService: state.userInfo.branchOptionsService,
        smsetplpList: state.smsetplpReducer.smsetplpList,
        updateSmsetplpData: state.smsetplpReducer.updateSmsetplpData,
    };
}

export default connect(mapStateToProps, {
    fetchSmsetplpById,
    fetchSmsetplpList,
    clearSmsetplpList,
    postSmsetplpForm,
    updateSmsetplp,
    f4FetchCountryList,
})(injectIntl(Smsetplp));
