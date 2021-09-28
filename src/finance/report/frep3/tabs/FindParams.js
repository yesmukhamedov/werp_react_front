import React, { useState, useEffect } from 'react';
// import { useState, useEffect } from 'react';
import {
    Container,
    Segment,
    Form,
    Dropdown,
    Table,
    Grid,
    Button,
    Icon,
    Menu,
    Header,
} from 'semantic-ui-react';
import DatePicker from 'react-datepicker';
import { fetchDynamicFAGM, clearDynObj } from '../../../fa_action';
import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';
import DropdownClearable from '../../../../utils/DropdownClearable';

const FindParams = props => {
    const {
        intl: { messages },
        language,
        countryList = [],
        companyOptions = [],
        branchOptionsService,
        smsetplpList = [],
        updateSmsetplpData = {},
    } = props;
    // const [searchParams, SetSearchParams] = useState({})
    const [param, setParam] = useState({});
    /*
    const onInputChange =(value, stateFieldName)=> {
        if (stateFieldName === 'bukrs') {
            SetSearchParams({
               ...searchParams, bukrs: value
            });
        }
    }
*/
    const onInputChange = (value, fieldName) => {
        if (fieldName === 'bukrs') {
            setParam({
                ...param,
                bukrs: value,
            });
        }
        // switch (fieldName) {
        //     case 'countryId':
        //         setParam({ ...param, countryId: value });
        //         break;
        //     case 'bukrs':
        //         setParam({ ...param, bukrs: value, branchId: '' });
        //         break;
        //     case 'branchId':
        //         setParam({
        //             ...param,
        //             branchId: value.length > 0 ? value.join() : '',
        //         });
        //         break;

        //     default:
        //         alert('НЕТ ТАКОЕ ЗНАЧЕНИЕ');
        // }
    };

    console.log(branchOptionsService);
    return (
        <Container fluid>
            <Grid>
                <Grid.Row>
                    <Grid.Column mobile={16} tablet={16} computer={4}>
                        <Table compact>
                            <Table.Body>
                                <Table.Row>
                                    <Table.Cell collapsing>
                                        <Icon name="folder" />
                                        Companies
                                    </Table.Cell>
                                    <Table.Cell colSpan="2">
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
                                                setParam({
                                                    ...param,
                                                    bukrs: '',
                                                })
                                            }
                                        />
                                    </Table.Cell>
                                </Table.Row>
                                <Table.Row>
                                    <Table.Cell>
                                        <Icon name="browser" />
                                        Filials
                                    </Table.Cell>
                                    <Table.Cell colSpan="2">
                                        <Dropdown
                                            selection
                                            fluid
                                            placeholder="Все"
                                            options={
                                                param.bukrs == '' ||
                                                param.bukrs == null
                                                    ? []
                                                    : branchOptionsService[
                                                          param.bukrs
                                                      ]
                                            }
                                            onChange={(e, { value }) =>
                                                onInputChange(value, 'branchId')
                                            }
                                            className="alignBottom"
                                            multiple
                                            // value={
                                            //     param.branchId
                                            //         ? param.branchId.split(',').map(Number)
                                            //         : []
                                            // }
                                        />
                                    </Table.Cell>
                                </Table.Row>
                                <Table.Row>
                                    <Table.Cell>
                                        <span>
                                            <Icon name="calendar" />
                                            document's data
                                        </span>
                                    </Table.Cell>
                                    <Table.Cell>
                                        {' '}
                                        at
                                        <DatePicker
                                            dateFormat="MMMM YYYY"
                                            showMonthYearPicker
                                            placeholderText="Месяц"
                                            autoComplete="off"
                                            // selected={
                                            //     param.dateAt === null
                                            //         ? ''
                                            //         : stringYYYYMMDDToMoment(param.dateAt)
                                            // }
                                            dropdownMode="select" //timezone="UTC"
                                            // locale={language}
                                            // onChange={date =>
                                            //     setParam({
                                            //         ...param,
                                            //         dateAt: momentToStringYYYYMMDD(date),
                                            //     })
                                            // }
                                        />
                                    </Table.Cell>
                                    <Table.Cell>
                                        with
                                        <DatePicker
                                            dateFormat="MMMM YYYY"
                                            showMonthYearPicker
                                            placeholderText="Месяц"
                                            autoComplete="off"
                                            // selected={
                                            //     param.dateAt === null
                                            //         ? ''
                                            //         : stringYYYYMMDDToMoment(param.dateAt)
                                            // }
                                            dropdownMode="select" //timezone="UTC"
                                            // locale={language}
                                            // onChange={date =>
                                            //     setParam({
                                            //         ...param,
                                            //         dateAt: momentToStringYYYYMMDD(date),
                                            //     })
                                            // }
                                        />
                                    </Table.Cell>
                                </Table.Row>
                                <Table.Row>
                                    <Table.Cell />
                                    <Table.Cell colSpan="2">
                                        <Button
                                            icon
                                            labelPosition="left"
                                            primary
                                            size="small"
                                            // onClick={() => this.searchFrep4()}
                                        >
                                            <Icon name="search" size="large" />
                                            Search
                                        </Button>
                                    </Table.Cell>
                                </Table.Row>
                            </Table.Body>
                        </Table>
                    </Grid.Column>
                </Grid.Row>
            </Grid>
            {/* <Form>
    <Table>
        <Form.Group widths="equal">
            <Table.Body>
                <Table.Row>
                    <Table.Cell collapsing>
                        Company
                    </Table.Cell>
                    <Table.Cell collapsing>
                        <Form.Field>
                            <DropdownClearable
                                fluid
                                placeholder="Все"
                                options={companyOptions}
                                onChange={(e, { value }) =>
                                    onInputChange(value, 'bukrs')
                                }
                            />
                        </Form.Field>
                    </Table.Cell>
                </Table.Row>
                <Table.Row>
                    <Table.Cell collapsing>
                        Filials
                    </Table.Cell>
                    <Table.Cell collapsing>
                        <Form.Field>
                        <Dropdown
                            selection
                            fluid
                            placeholder="Все"
                            options={
                                searchParams.bukrs == '' || searchParams.bukrs == null
                                    ? []
                                    : branchOptionsService[searchParams.bukrs]
                                }
                            className="alignBottom"
                            multiple
                        />
                        </Form.Field>
                    </Table.Cell>
                </Table.Row>
                <Table.Row>
                    <Table.Cell collapsing>
                        Document's data
                    </Table.Cell>
                    <Table.Cell collapsing>
                        at
                        <Form.Field>
                        <DatePicker
                            dateFormat="MMMM YYYY"
                            showMonthYearPicker
                            placeholderText="Месяц"
                            autoComplete="off"
                            dropdownMode="select"
                        />
                        </Form.Field>
                    </Table.Cell>
                    <Table.Cell collapsing>
                        with
                        <Form.Field>
                            <DatePicker
                                dateFormat="MMMM YYYY"
                                showMonthYearPicker
                                placeholderText="Месяц"
                                autoComplete="off"
                                dropdownMode="select"
                            />
                        </Form.Field>
                    </Table.Cell>
                </Table.Row>
            </Table.Body>
        </Form.Group>
    </Table>       
</Form> */}
        </Container>
    );
};

function mapStateToProps(state) {
    console.log('ertyuio', state.userInfo);
    return {
        companyOptions: state.userInfo.companyOptions,
        branchOptionsService: state.userInfo.branchOptionsService,
    };
}

export default connect(mapStateToProps, {
    fetchDynamicFAGM,
})(injectIntl(FindParams));
