import React, { useState, useEffect } from 'react';
import { Container, Segment, Icon, Form, Dropdown } from 'semantic-ui-react';
import {
    stringYYYYMMDDToMoment,
    momentToStringYYYYMMDD,
} from '../../../utils/helpers';
import 'react-table/react-table.css';
import DatePicker from 'react-datepicker';
import DropdownClearable from '../../../utils/DropdownClearable';
import OutputErrors from '../../../general/error/outputErrors';
import { fetchDynamicFAGM, clearDynObj } from '../../fa_action';
import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';
import { Divider } from 'semantic-ui-react';
import { fetchFrep3List } from './frep3Actions';
import Table from './Table';
import TableColumns from './TableColumns';

const Frep3 = props => {
    const {
        intl: { messages },
        language,
        countryList = [],
        companyOptions = [],
        branchOptionsService,
        frep3TotalList = [],
        frep3DetailList = [],
    } = props;
    const [defaultPane, setDefaultPane] = useState(0);

    const [param, setParam] = useState({});

    const onInputChange = (value, fieldName) => {
        switch (fieldName) {
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
    console.log('findParam: ', param);

    const totalTable = () => {
        if (param.bukrs) {
            props.fetchFrep3List({ ...param }, () => {});
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
                    <Form.Group>
                        <Form.Field className="marginRight">
                            <DatePicker
                                dateFormat="MMMM YYYY"
                                showMonthYearPicker
                                placeholderText={messages['Form.DateFrom']}
                                autoComplete="off"
                                selected={
                                    param.dateAt === null
                                        ? ''
                                        : stringYYYYMMDDToMoment(param.dateAt)
                                }
                                dropdownMode="select"
                                locale={props.language}
                                onChange={date =>
                                    setParam({
                                        ...param,
                                        dateAt: momentToStringYYYYMMDD(date),
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
                                    param.dateWith === null
                                        ? ''
                                        : stringYYYYMMDDToMoment(param.dateWith)
                                }
                                dropdownMode="select"
                                locale={props.language}
                                onChange={date =>
                                    setParam({
                                        ...param,
                                        dateTo: momentToStringYYYYMMDD(date),
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
                            onClick={() => totalTable()}
                        >
                            <Icon name="search" size="large" />
                            {messages['search']}
                        </Form.Button>
                    </Form.Group>
                </Form.Group>
            </Form>
            {/* <OutputErrors />
            <Divider /> */}
            <Table
                data={false} //{stateSmsetplpList ? stateSmsetplpList : []}
                messages={props.intl.messages}
            />
        </Container>
    );
};
function mapStateToProps(state) {
    return {
        companyOptions: state.userInfo.companyOptions,
        language: state.userInfo.language,
        branchOptionsService: state.userInfo.branchOptionsService,
        //frep3List: state.frep3Reducer.frep3List,
    };
}

export default connect(mapStateToProps, {
    fetchDynamicFAGM,
    fetchFrep3List,
})(injectIntl(Frep3));
