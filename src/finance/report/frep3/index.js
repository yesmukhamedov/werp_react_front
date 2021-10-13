import React, { useState } from 'react';
import { Container, Segment, Icon, Form, Dropdown } from 'semantic-ui-react';
import {
    momentToStringDDMMYYYY,
    stringToMomentDDMMYYYY,
    excelDownload,
    errorTableText,
} from '../../../utils/helpers';
import 'react-table/react-table.css';
import DatePicker from 'react-datepicker';
import DropdownClearable from '../../../utils/DropdownClearable';
import OutputErrors from '../../../general/error/outputErrors';
import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';
import { fetchResultList, fetchDetailList } from './frep3Actions';
import Table from './Table';
import Detail from './Modal';

const Frep3 = props => {
    const {
        intl: { messages },
        companyOptions = [],
        branchOptionsAll,
        resultList,
        detailList,
        searchParam,
    } = props;

    const [modalDetalOpen, setModalDetalOpen] = useState(false);
    const [param, setParam] = useState({
        bukrs: '',
        branchIdList: '',
        bldatTo: '',
        bldatFrom: '',
    });

    const onInputChange = (value, fieldName) => {
        switch (fieldName) {
            case 'bukrs':
                setParam({ ...param, bukrs: value, branchIdList: '' });
                break;
            case 'branchId':
                setParam({
                    ...param,
                    branchIdList: value.length > 0 ? value.join() : '',
                });
                break;

            default:
                alert('НЕТ ТАКОЕ ЗНАЧЕНИЕ');
        }
    };

    const getBranchesList = () => {
        if (!param.bukrs) return [];

        if (!branchOptionsAll[param.bukrs]) return [];

        return branchOptionsAll[param.bukrs].map(branch => {
            return { key: branch.key, text: branch.text, value: branch.value };
        });
    };

    const exportExcelDetail = () => {
        let excelHeaders = [];
        excelHeaders.push(messages['belnr']);
        excelHeaders.push(messages['customer']);
        excelHeaders.push(messages['amount'] + ' в валюте');
        excelHeaders.push(messages['amount'] + ' USD');

        excelDownload(
            'finance/report/frep3/downloadExcel/detail',
            'frep3_Detail_Result.xls',
            'outputTable',
            detailList,
            excelHeaders,
        );
    };
    const exportExcelResult = () => {
        let excelHeaders = [];
        excelHeaders.push(messages['branches']);
        excelHeaders.push(messages['Название расхода']);
        excelHeaders.push(messages['hkont']);
        excelHeaders.push(messages['waers']);
        excelHeaders.push(messages['amount'] + ' USD');
        excelHeaders.push(messages['amount'] + ' в валюте');
        excelDownload(
            'finance/report/frep3/downloadExcel',
            'frep3_Result.xls',
            'outputTable',
            resultList,
            excelHeaders,
        );
    };
    const [error, setError] = useState([]);

    const totalTable = () => {
        const errors = [];
        if (!param.bukrs) {
            errors.push(errorTableText(5));
        }
        if (param.branchIdList == [] || !param.branchIdList) {
            errors.push(errorTableText(7));
        }
        if (!param.bldatFrom) {
            errors.push(errorTableText(13));
        }
        if (!param.bldatTo) {
            errors.push(errorTableText(14));
        }
        if (errors.length === 0) {
            props.fetchResultList(param);
        }
        setError(errors);
    };

    const detailTable = detailParam => {
        props.fetchDetailList(detailParam, () => setModalDetalOpen(true));
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
                <h3>{messages['transNameFrep3']}</h3>
            </Segment>
            <Form>
                <Form.Group>
                    <Form.Field className="marginRight  width25Rem">
                        <DropdownClearable
                            fluid
                            placeholder={messages['bukrs']}
                            value={
                                companyOptions.length === 1 && !param.bukrs
                                    ? setParam({
                                          ...param,
                                          bukrs: companyOptions[0].value,
                                          branchIdList: '',
                                      })
                                    : param.bukrs
                            }
                            options={companyOptions}
                            onChange={(e, { value }) =>
                                onInputChange(value, 'bukrs')
                            }
                            width={320}
                            className="alignBottom"
                            handleClear={() =>
                                setParam({
                                    ...param,
                                    bukrs: '',
                                })
                            }
                        />
                    </Form.Field>
                    <Form.Field className="marginRight  width25Rem">
                        <Dropdown
                            selection
                            fluid
                            placeholder={messages['branches']}
                            options={getBranchesList()}
                            onChange={(e, { value }) =>
                                onInputChange(value, 'branchId')
                            }
                            className="alignBottom"
                            multiple
                            value={
                                param.branchIdList
                                    ? param.branchIdList.split(',').map(Number)
                                    : []
                            }
                        />
                    </Form.Field>
                    <Form.Group>
                        <Form.Field className="marginRight">
                            <DatePicker
                                dateFormat="MMMM YYYY"
                                showMonthYearPicker
                                placeholderText={messages['Form.DateFrom']}
                                autoComplete="off"
                                selected={
                                    param.bldatFrom == null ||
                                    param.bldatFrom === ''
                                        ? ''
                                        : stringToMomentDDMMYYYY(
                                              param.bldatFrom,
                                          )
                                }
                                dropdownMode="select"
                                onChange={date =>
                                    setParam({
                                        ...param,
                                        bldatFrom: momentToStringDDMMYYYY(date),
                                    })
                                }
                                dateFormat="DD.MM.YYYY"
                            />
                        </Form.Field>
                        <Form.Field className="marginRight">
                            <DatePicker
                                dateFormat="MMMM YYYY"
                                showMonthYearPicker
                                placeholderText={messages['Form.DateTo']}
                                autoComplete="off"
                                selected={
                                    !param.bldatTo
                                        ? ''
                                        : stringToMomentDDMMYYYY(param.bldatTo)
                                }
                                dropdownMode="select"
                                onChange={date =>
                                    setParam({
                                        ...param,
                                        bldatTo: momentToStringDDMMYYYY(date),
                                    })
                                }
                                dateFormat="DD.MM.YYYY"
                            />
                        </Form.Field>
                        <Form.Button
                            color="blue"
                            className="alignTopBottom"
                            icon
                            onClick={() => totalTable()}
                        >
                            <Icon name="search" />
                            {messages['search']}
                        </Form.Button>
                        <Form.Button
                            floated="right"
                            color="green"
                            className="alignTopBottom"
                            icon
                            disabled={resultList.length === 0 ? true : false}
                            onClick={() => exportExcelResult()}
                        >
                            <Icon name="download" />
                            {messages['export_to_excel']}
                        </Form.Button>
                    </Form.Group>
                </Form.Group>
            </Form>
            <OutputErrors errors={error} />
            <Detail
                detail={detailList ? detailList : []}
                messages={messages}
                modalDetalOpen={modalDetalOpen}
                setModalDetalOpen={setModalDetalOpen}
                exportExcelDetail={exportExcelDetail}
            />
            <Table
                data={resultList ? resultList : []}
                messages={props.intl.messages}
                detailTable={detailTable}
                findParam={searchParam}
            />
        </Container>
    );
};

function mapStateToProps(state) {
    return {
        companyOptions: state.userInfo.companyOptions,
        branchOptionsAll: state.userInfo.branchOptionsAll,
        resultList: state.frep3Reducer.frep3ResultList,
        detailList: state.frep3Reducer.frep3DetailList,
        searchParam: state.frep3Reducer.searchParam,
    };
}

export default connect(mapStateToProps, {
    fetchResultList,
    fetchDetailList,
})(injectIntl(Frep3));
