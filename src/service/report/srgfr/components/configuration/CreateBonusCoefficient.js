import React, { useState } from 'react';
import { injectIntl } from 'react-intl';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { Modal, Button, Form, Input } from 'semantic-ui-react';
import {
    momentToStringYYYYMMDDHHMMSS,
    stringYYYYMMDDHHMMSSToMoment,
} from '../../../../../utils/helpers';

const CreateBonusCoefficient = props => {
    const {
        intl: { messages },
        type,
        locale,
        save,
    } = props;

    const [open, setOpen] = useState(false);
    const [errors, setErrors] = useState({
        bonusAmount: false,
        dateOpen: false,
        fromPercent: false,
        toPercent: false,
    });
    const [params, setParams] = useState({
        bonusAmount: null,
        dateOpen: null,
        fromPercent: null,
        toPercent: null,
        type: type,
    });

    const onClose = () => {
        // First off clean params
        setParams({
            bonusAmount: null,
            dateOpen: null,
            fromPercent: null,
            toPercent: null,
            type: type,
        });

        // And Then close the modal window
        setOpen(false);
    };

    const validation = () => {
        const { bonusAmount, dateOpen, fromPercent, toPercent } = params;
        let success = true;

        setErrors({
            bonusAmount: bonusAmount === null,
            dateOpen: dateOpen === null,
            fromPercent: fromPercent === null,
            toPercent: toPercent === null,
        });

        if (
            bonusAmount === null ||
            dateOpen === null ||
            fromPercent === null ||
            toPercent === null
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
                    <Form.Field error={errors.bonusAmount} required>
                        <label>{messages['bonus']}</label>
                        <Input
                            onChange={e =>
                                setParams({
                                    ...params,
                                    bonusAmount: parseFloat(e.target.value),
                                })
                            }
                            value={params.bonusAmount}
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

                    <Form.Field error={errors.fromPercent} required>
                        <label>{messages['Task.DateFrom']}</label>
                        <Input
                            onChange={e =>
                                setParams({
                                    ...params,
                                    fromPercent: parseFloat(e.target.value),
                                })
                            }
                            value={params.fromPercent}
                            type="number"
                            required
                        />
                    </Form.Field>

                    <Form.Field error={errors.toPercent} required>
                        <label>{messages['Task.DateTo']}</label>
                        <Input
                            onChange={e =>
                                setParams({
                                    ...params,
                                    toPercent: parseFloat(e.target.value),
                                })
                            }
                            value={params.toPercent}
                            type="number"
                            required
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

export default injectIntl(CreateBonusCoefficient);
