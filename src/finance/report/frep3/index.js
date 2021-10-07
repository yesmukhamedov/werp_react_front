import React, { useState, useEffect } from 'react';
import { Container, Segment, Icon, Form, Dropdown } from 'semantic-ui-react';
import {
    momentToStringDDMMYYYY,
    stringToMomentDDMMYYYY,
} from '../../../utils/helpers';
import 'react-table/react-table.css';
import DatePicker from 'react-datepicker';
import DropdownClearable from '../../../utils/DropdownClearable';
import { excelDownload } from '../../../utils/helpers';
import OutputErrors from '../../../general/error/outputErrors';
import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';
import { fetchResultList } from './frep3Actions';
import Table from './Table';

const Frep3 = props => {
    const {
        intl: { messages },
        language,
        companyOptions = [],
        branchOptionsAll,
        resultList,
        detailList,
    } = props;
    const [defaultPane, setDefaultPane] = useState(0);
    const [detailParam, setDetailParam] = useState({});
    const [param, setParam] = useState({});

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

    //Excel export need chage columns
    const exportExcel = () => {
        let excelHeaders = [];
        excelHeaders.push(messages['branches']);
        excelHeaders.push(messages['hkont']);
        excelHeaders.push(messages['waers']);
        excelHeaders.push(messages['amount'] + 'USD');
        excelHeaders.push(messages['operator_award']);

        excelDownload(
            'finance/report/frep3/downloadExcel',
            'frep3_Result.xls',
            'outputTable',
            resultList,
            excelHeaders,
        );
    };

    const totalTable = () => {
        //setDetailParam({data: "jhjhj"})
        if (param.bukrs) {
            props.fetchResultList(param);
        } else {
            alert(messages['Form.CompanyError']);
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
                <h3>{messages['transNameFrep3']}</h3>
            </Segment>

            <Form>
                <Form.Group>
                    <Form.Field className="marginRight  width25Rem">
                        <DropdownClearable
                            fluid
                            placeholder={messages['bukrs']}
                            value={param.bukrs}
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
                            options={
                                param.bukrs == '' || param.bukrs == null
                                    ? []
                                    : branchOptionsAll[param.bukrs]
                            }
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
                                    param.bldatFrom == null
                                        ? ''
                                        : stringToMomentDDMMYYYY(
                                              param.bldatFrom,
                                          )
                                }
                                dropdownMode="select"
                                locale={props.language}
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
                                    param.bldatTo == null
                                        ? ''
                                        : stringToMomentDDMMYYYY(param.bldatTo)
                                }
                                dropdownMode="select"
                                locale={props.language}
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
                            // onClick={handleClickApply}
                            color="blue"
                            className="alignTopBottom"
                            icon
                            onClick={() => {
                                totalTable();
                                console.log('jhjhjhjhjhjhjhj', detailParam);
                            }}
                        >
                            <Icon name="search" size="large" />
                            {messages['search']}
                        </Form.Button>
                        <Form.Button
                            floated="right"
                            color="green"
                            className="alignTopBottom"
                            icon
                            disabled={resultList.length == 0 ? true : false}
                            onClick={() => exportExcel()}
                        >
                            <Icon name="download" size="large" />
                            {messages['export_to_excel']}
                        </Form.Button>
                    </Form.Group>
                </Form.Group>
            </Form>
            <OutputErrors />
            {/* <Divider /> */}
            <Table
                data={resultList ? resultList : []}
                messages={props.intl.messages}
                findParam={param}
            />
        </Container>
    );
};

function mapStateToProps(state) {
    return {
        companyOptions: state.userInfo.companyOptions,
        language: state.userInfo.language,
        branchOptionsAll: state.userInfo.branchOptionsAll,
        resultList: state.frep3Reducer.frep3ResultList,
    };
}
export default connect(mapStateToProps, {
    fetchResultList,
})(injectIntl(Frep3));
