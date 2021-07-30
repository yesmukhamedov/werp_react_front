import React, { useState } from 'react';
import { injectIntl } from 'react-intl';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import {
    momentToStringYYYYMMDDHHMMSS,
    stringYYYYMMDDHHMMSSToMoment,
} from '../../../../../utils/helpers';
import { Button, Form, Input, Modal } from 'semantic-ui-react';
import DropdownClearable from '../../../../../utils/DropdownClearable';

const CreateExchangeRateCoefficient = props => {
    const {
        intl: { messages },
        type,
        locale,
        save,
        currencies,
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
        // First off clean params
        setParams({
            amount: null,
            dateOpen: null,
            fromCurrency: null,
            toCurrency: null,
            type: type,
        });

        // And Then close the modal window
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
            onOpen={() => setOpen(true)}
            open={open}
            trigger={<Button primary>{messages['create']}</Button>}
        >
            <Modal.Header>{messages['create']}</Modal.Header>

            <Modal.Content>
                <Form>
                    <Form.Field error={errors.amount} required>
                        <label>{messages['amount']}</label>
                        <Input
                            onChange={e =>
                                setParams({
                                    ...params,
                                    amount: parseFloat(e.target.value),
                                })
                            }
                            value={params.amount}
                            type="number"
                            required
                        />
                    </Form.Field>

                    <Form.Field error={errors.dateOpen} required>
                        <label>{messages['Crm.DemoDateTime']}</label>
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

export default injectIntl(CreateExchangeRateCoefficient);
