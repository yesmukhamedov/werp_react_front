import React, { useState } from 'react';
import { injectIntl } from 'react-intl';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import {
    momentToStringYYYYMMDDHHMMSS,
    moneyFormat,
    moneyInputHanler,
    stringYYYYMMDDHHMMSSToMoment,
} from '../../../../../../utils/helpers';
import { Button, Form, Input, Modal, Icon } from 'semantic-ui-react';
import DropdownClearable from '../../../../../../utils/DropdownClearable';

const ExchangeRateCoefficientModal = props => {
    const {
        intl: { messages },
        type,
        locale,
        save,
        currencies,
        create,
        modify,
    } = props;

    const [open, setOpen] = useState(false);
    const [errors, setErrors] = useState({
        amount: false,
        dateOpen: false,
        fromCurrency: false,
        toCurrency: false,
    });
    const [params, setParams] = useState({
        amount: null,
        dateOpen: null,
        fromCurrency: null,
        toCurrency: null,
        type: type,
    });

    const onClose = () => {
        setParams({
            amount: null,
            dateOpen: null,
            fromCurrency: null,
            toCurrency: null,
            type: type,
        });

        setOpen(false);
    };

    const validation = () => {
        const { amount, dateOpen, fromCurrency, toCurrency } = params;
        let success = true;

        setErrors({
            amount: amount === null,
            dateOpen: dateOpen === null,
            fromCurrency: fromCurrency === null,
            toCurrency: toCurrency === null,
        });

        if (
            amount === null ||
            dateOpen === null ||
            fromCurrency === null ||
            toCurrency === null
        ) {
            success = false;
        }

        return success;
    };

    return (
        <Modal
            onClose={() => onClose()}
            onOpen={() => {
                setOpen(true);
                if (modify) {
                    setParams({ ...props.modify, type: type });
                }
            }}
            open={open}
            trigger={
                create ? (
                    <Button secondary>{messages['create']}</Button>
                ) : (
                    <Button secondary icon>
                        <Icon name="edit" />
                    </Button>
                )
            }
        >
            <Modal.Header>
                {create ? messages['create'] : messages['BTN__EDIT']}
            </Modal.Header>

            <Modal.Content>
                <Form>
                    <Form.Field error={errors.amount} required>
                        <label>{messages['amount']}</label>
                        <Input
                            onChange={e =>
                                setParams({
                                    ...params,
                                    amount: parseFloat(
                                        moneyInputHanler(e.target.value, 2),
                                    ),
                                })
                            }
                            value={moneyFormat(params.amount)}
                        />
                    </Form.Field>

                    <Form.Field error={errors.dateOpen} required>
                        <label>{messages['Task.StartDate']}</label>
                        <DatePicker
                            locale={locale}
                            autoComplete="off"
                            showMonthDropdown
                            showYearDropdown
                            showTimeSelect
                            dropdownMode="select"
                            dateFormat="YYYY-MM-DD HH:mm"
                            selected={
                                params.dateOpen
                                    ? stringYYYYMMDDHHMMSSToMoment(
                                          params.dateOpen,
                                      )
                                    : null
                            }
                            onChange={date =>
                                setParams({
                                    ...params,
                                    dateOpen: momentToStringYYYYMMDDHHMMSS(
                                        date,
                                    ),
                                })
                            }
                        />
                    </Form.Field>

                    <Form.Field error={errors.fromCurrency} required>
                        <label>{messages['Task.DateFrom']}</label>
                        <DropdownClearable
                            selection
                            options={currencies}
                            value={params.fromCurrency}
                            onChange={(e, { value }) =>
                                setParams({ ...params, fromCurrency: value })
                            }
                            handleClear={() =>
                                setParams({ ...params, fromCurrency: null })
                            }
                        />
                    </Form.Field>

                    <Form.Field error={errors.toCurrency} required>
                        <label>{messages['Task.DateTo']}</label>
                        <DropdownClearable
                            selection
                            options={currencies}
                            value={params.toCurrency}
                            onChange={(e, { value }) =>
                                setParams({ ...params, toCurrency: value })
                            }
                            handleClear={() =>
                                setParams({ ...params, toCurrency: null })
                            }
                        />
                    </Form.Field>
                </Form>
            </Modal.Content>

            <Modal.Actions>
                <Button color="black" onClick={() => onClose()}>
                    {messages['cancel']}
                </Button>
                <Button
                    content={messages['save']}
                    labelPosition="right"
                    icon="checkmark"
                    onClick={() => {
                        if (validation()) {
                            save(params);
                            onClose();
                        }
                    }}
                    positive
                />
            </Modal.Actions>
        </Modal>
    );
};

export default injectIntl(ExchangeRateCoefficientModal);
