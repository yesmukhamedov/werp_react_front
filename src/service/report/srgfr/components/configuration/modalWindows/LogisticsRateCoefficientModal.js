import React, { useState } from 'react';
import { injectIntl } from 'react-intl';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { Modal, Button, Form, Input, Icon } from 'semantic-ui-react';
import {
    momentToStringYYYYMMDDHHMMSS,
    moneyFormat,
    moneyInputHanler,
    stringYYYYMMDDHHMMSSToMoment,
} from '../../../../../../utils/helpers';

const CreateLogisticsRateCoefficient = props => {
    const {
        intl: { messages },
        type,
        locale,
        save,
        create,
        modify,
    } = props;

    const [open, setOpen] = useState(false);
    const [errors, setErrors] = useState({
        dateOpen: null,
        percentAmount: null,
    });
    const [params, setParams] = useState({
        dateOpen: null,
        percentAmount: null,
        type: type,
    });

    const onClose = () => {
        setParams({
            dateOpen: null,
            percentAmount: null,
            type: type,
        });

        setOpen(false);
    };

    const validation = () => {
        const { percentAmount, dateOpen } = params;
        let success = true;

        setErrors({
            percentAmount: percentAmount === null,
            dateOpen: dateOpen === null,
        });

        if (percentAmount === null || dateOpen === null) {
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
                    <Form.Field error={errors.percentAmount} required>
                        <label>{messages['logistics_rate']}</label>
                        <Input
                            onChange={e =>
                                setParams({
                                    ...params,
                                    percentAmount: parseFloat(
                                        moneyInputHanler(e.target.value, 2),
                                    ),
                                })
                            }
                            value={moneyFormat(params.percentAmount)}
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

export default injectIntl(CreateLogisticsRateCoefficient);
