import React, { useState, useEffect } from 'react';
import {
    Button,
    Header,
    Icon,
    Modal,
    Input,
    Form,
    Table,
} from 'semantic-ui-react';
import { connect } from 'react-redux';
import DatePicker from 'react-datepicker';
import './index.css';
import { Dropdown } from 'semantic-ui-react';
import { f4FetchCountryList } from '../../../reference/f4/f4_action';
import 'react-datepicker/dist/react-datepicker.css';
import { injectIntl } from 'react-intl';
import {
    fetchSmsetpp,
    fetchSmsetppPut,
    fetchSmsetppHistory,
    fetchSmsetppGetProductList,
} from '../../serviceAction';
import {
    stringYYYYMMDDToMoment,
    handleFocus,
    moneyFormat,
    momentToStringYYYYMMDD,
} from '../../../utils/helpers';

require('moment/locale/ru');
require('moment/locale/tr');

const EditModal = props => {
    const language = localStorage.getItem('language');
    const {
        premium = [],
        countryList = [],
        companyOptions = [],
        intl: { messages },
        fetchSmsetppPut,
        fetchSmsetpp,
        param,
        serviceTypeOptions,
        smsetppProductList = [],
        onChangeEditModal,
        modalOpenEdit,
        informations = {},
        onhandleCancel,
        onChangeEditModal1,
        statusServiceTypeEdit,
    } = props;

    useEffect(() => {
        if (informations.bukrs !== undefined) {
            props.fetchSmsetppGetProductList({ bukrs: informations.bukrs });
        }
    }, [informations.bukrs]);

    const [test, setTest] = useState(false);

    //Страна
    const countryOptions = countryList.map(item => {
        return {
            key: item.countryId,
            text: item.country,
            value: item.countryId,
        };
    });

    //
    const premiumPriceTypeId = premium.map(item => {
        return {
            key: parseInt(item.id, 10),
            text: item.name,
            value: parseInt(item.id, 10),
        };
    });

    const onhandleSave = () => {
        setTest(true);
        const { bukrs, countryId, dateStart } = informations;

        if (bukrs !== '' && countryId !== 0 && dateStart !== '') {
            setTest(false);

            onChangeEditModal1(false, 'saveEdit');
            //setModalOpen(false);
            fetchSmsetppPut({ ...informations }, () => {
                fetchSmsetpp(param);
                props.fetchSmsetppHistory(param);
            });
        }
    };

    const productOpt = smsetppProductList.map(item => {
        return {
            key: item.matnr,
            text: item.text45,
            value: item.matnr,
        };
    });

    const productOptions = [
        { key: 66666, text: 'Все', value: 0 },
        ...productOpt,
    ];

    return (
        <Modal open={modalOpenEdit}>
            <Header content={messages['toEdit']} id="modalHeader" />
            <Modal.Content>
                <Form>
                    <Table celled>
                        <Table.Body>
                            <Table.Row>
                                {/*Общая сумма*/}
                                <Table.Cell>
                                    <Form.Select
                                        required
                                        fluid
                                        label={messages['bukrs']}
                                        placeholder={messages['bukrs']}
                                        options={companyOptions}
                                        value={informations.bukrs}
                                        onChange={(e, { value }) =>
                                            onChangeEditModal1(value, 'bukrs')
                                        }
                                        error={
                                            test === true &&
                                            informations.bukrs === ''
                                                ? true
                                                : false
                                        }
                                    />
                                </Table.Cell>

                                <Table.Cell>
                                    {/* <Form.Input
                    label={messages['totalAmount']}
                    placeholder="Number..."
                    //readOnly
                    //onFocus={handleFocus}
                    value={moneyFormat(informations.total)}
                    onChange={e => onChangeEditModal(e.target.value, 'total')}
                    error={test === true ? true : false}
                    required
                  /> */}

                                    <Form.Field>
                                        <label>{messages['totalAmount']}</label>
                                        <Input
                                            label={{
                                                basic: true,
                                                content:
                                                    informations.waers === null
                                                        ? ''
                                                        : informations.waers,
                                            }}
                                            labelPosition="right"
                                            placeholder="Number..."
                                            onFocus={handleFocus}
                                            onChange={e =>
                                                onChangeEditModal(
                                                    e.target.value,
                                                    'total',
                                                )
                                            }
                                            value={moneyFormat(
                                                informations.total,
                                            )}
                                            error={test === true ? true : false}
                                            required
                                        />
                                    </Form.Field>
                                </Table.Cell>
                            </Table.Row>

                            <Table.Row>
                                <Table.Cell>
                                    <Form.Select
                                        fluid
                                        selection
                                        options={countryOptions}
                                        value={informations.countryId}
                                        label={messages['country']}
                                        placeholder={messages['country']}
                                        onChange={(e, { value }) =>
                                            onChangeEditModal1(
                                                value,
                                                'countryId',
                                            )
                                        }
                                        error={test === true ? true : false}
                                        required
                                    />
                                </Table.Cell>

                                <Table.Cell>
                                    <Form.Field>
                                        <label>{`${messages['master']} (${messages['inTotal']})`}</label>
                                        <Input
                                            label={{
                                                basic: true,
                                                content:
                                                    informations.waers === null
                                                        ? ''
                                                        : informations.waers,
                                            }}
                                            labelPosition="right"
                                            placeholder="Number..."
                                            value={moneyFormat(
                                                informations.master,
                                            )}
                                            onFocus={handleFocus}
                                            onChange={e =>
                                                onChangeEditModal(
                                                    e.target.value,
                                                    'master',
                                                )
                                            }
                                        />
                                    </Form.Field>
                                </Table.Cell>
                            </Table.Row>
                            <Table.Row>
                                <Table.Cell>
                                    <label>{messages['TBL_H__PRODUCT']}</label>
                                    <Dropdown
                                        fluid
                                        selection
                                        value={
                                            informations.productId === null
                                                ? 0
                                                : informations.productId
                                        }
                                        options={productOptions}
                                        onChange={(e, { value }) =>
                                            onChangeEditModal1(
                                                value,
                                                'productId',
                                            )
                                        }
                                    />
                                </Table.Cell>

                                <Table.Cell>
                                    <Form.Field>
                                        <label>{`${messages['Operator']} (${messages['inTotal']})`}</label>
                                        <Input
                                            label={{
                                                basic: true,
                                                content:
                                                    informations.waers === null
                                                        ? ''
                                                        : informations.waers,
                                            }}
                                            labelPosition="right"
                                            placeholder="Number..."
                                            value={moneyFormat(
                                                informations.operator,
                                            )}
                                            onFocus={handleFocus}
                                            onChange={e =>
                                                onChangeEditModal(
                                                    e.target.value,
                                                    'operator',
                                                )
                                            }
                                        />
                                    </Form.Field>
                                </Table.Cell>
                            </Table.Row>
                            <Table.Row>
                                <Table.Cell>
                                    <Form.Field>
                                        <label>
                                            {messages['typeOfService']}
                                        </label>

                                        <Dropdown
                                            fluid
                                            selection
                                            value={informations.serviceTypeId}
                                            options={serviceTypeOptions}
                                            onChange={(e, { value }) =>
                                                onChangeEditModal1(
                                                    value,
                                                    'serviceTypeIdEdit',
                                                )
                                            }
                                        />
                                    </Form.Field>
                                </Table.Cell>

                                <Table.Cell>
                                    <Form.Field>
                                        <label>{`${messages['discount']} (${messages['inTotal']})`}</label>
                                        <Input
                                            label={{
                                                basic: true,
                                                content:
                                                    informations.waers === null
                                                        ? ''
                                                        : informations.waers,
                                            }}
                                            labelPosition="right"
                                            placeholder="Number..."
                                            value={moneyFormat(
                                                informations.discount,
                                            )}
                                            onFocus={handleFocus}
                                            onChange={e =>
                                                onChangeEditModal(
                                                    e.target.value,
                                                    'discount',
                                                )
                                            }
                                        />
                                    </Form.Field>
                                </Table.Cell>
                            </Table.Row>
                            <Table.Row>
                                <Table.Cell>
                                    <Form.Field
                                        disabled={statusServiceTypeEdit}
                                        control={Input}
                                        label={`FC(${messages['Table.Amount']})`}
                                        placeholder="Number..."
                                        value={moneyFormat(informations.fc)}
                                        onFocus={handleFocus}
                                        onChange={(e, value) =>
                                            onChangeEditModal1(
                                                e.target.value,
                                                'fc',
                                            )
                                        }
                                    />
                                </Table.Cell>

                                <Table.Cell>
                                    <Form.Field>
                                        <label>{`${messages['office']}(${messages['inTotal']})`}</label>
                                        <Input
                                            label={{
                                                basic: true,
                                                content:
                                                    informations.waers === null
                                                        ? ''
                                                        : informations.waers,
                                            }}
                                            labelPosition="right"
                                            placeholder="Number..."
                                            value={informations.office}
                                            onFocus={handleFocus}
                                            onChange={e =>
                                                onChangeEditModal(
                                                    e.target.value,
                                                    'office',
                                                )
                                            }
                                        />
                                    </Form.Field>
                                </Table.Cell>
                            </Table.Row>
                            <Table.Row>
                                <Table.Cell>
                                    <Form.Field
                                        disabled={statusServiceTypeEdit}
                                        control={Input}
                                        label={`MC(${messages['Table.Amount']})`}
                                        placeholder="Number..."
                                        value={moneyFormat(informations.mc)}
                                        onFocus={handleFocus}
                                        onChange={(e, value) =>
                                            onChangeEditModal1(
                                                e.target.value,
                                                'mc',
                                            )
                                        }
                                    />
                                </Table.Cell>

                                <Table.Cell>
                                    <Form.Field required>
                                        <label>
                                            {messages['Task.StartDate']}
                                        </label>
                                        <Input>
                                            <DatePicker
                                                placeholderText="Дата начало"
                                                isClearable
                                                className="date-auto-width"
                                                autoComplete="off"
                                                locale={language}
                                                dropdownMode="select" //timezone="UTC"
                                                selected={
                                                    informations.dateStart
                                                        ? stringYYYYMMDDToMoment(
                                                              informations.dateStart,
                                                          )
                                                        : ''
                                                }
                                                value={
                                                    informations.dateStart
                                                        ? stringYYYYMMDDToMoment(
                                                              informations.dateStart,
                                                          )
                                                        : ''
                                                }
                                                onChange={date =>
                                                    onChangeEditModal1(
                                                        momentToStringYYYYMMDD(
                                                            date,
                                                        ),
                                                        'dateStart',
                                                    )
                                                }
                                                dateFormat="DD.MM.YYYY"
                                            />
                                        </Input>
                                    </Form.Field>
                                </Table.Cell>
                            </Table.Row>
                            <Table.Row>
                                <Table.Cell>
                                    <Form.Field>
                                        <label>
                                            {messages['typeOfAmount']}
                                        </label>
                                        <Form.Select
                                            placeholder={
                                                messages['typeOfAmount']
                                            }
                                            selection
                                            value={informations.typeOfSum}
                                            onChange={(e, { value }) =>
                                                onChangeEditModal1(
                                                    value,
                                                    'typeOfSum',
                                                )
                                            }
                                            options={premiumPriceTypeId}
                                        />
                                    </Form.Field>
                                </Table.Cell>
                                <Table.Cell></Table.Cell>
                            </Table.Row>
                        </Table.Body>
                    </Table>
                </Form>
            </Modal.Content>
            <Modal.Actions>
                <Button inverted color="red" onClick={onhandleCancel}>
                    <Icon name="remove" /> {messages['cancel']}
                </Button>
                <Button inverted color="blue" onClick={onhandleSave}>
                    <Icon name="checkmark" /> {messages['save']}
                </Button>
            </Modal.Actions>
        </Modal>
    );
};

const mapStateToProps = state => {
    return {
        premium: state.serviceReducer.dynamicObject.premiumPriceTypeId,
        data: state.serviceReducer.dynamicObject,
        countryList: state.f4.countryList,
        companyOptions: state.userInfo.companyOptions,
        serviceType: state.serviceReducer.dynamicObject.type,
        smsetppProductList:
            state.serviceReducer.dynamicObject.smsetppProductList,
    };
};

export default connect(mapStateToProps, {
    f4FetchCountryList,
    fetchSmsetppPut,
    fetchSmsetpp,
    fetchSmsetppHistory,
    fetchSmsetppGetProductList,
})(injectIntl(EditModal));
