import React from 'react';
import { Button, Form, Image, Modal } from 'semantic-ui-react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import {
    stringYYYYMMDDToMoment,
    momentToStringYYYYMMDD,
} from '../../../../utils/helpers';

export const MODAL_TYPE_CREATE = 'MODAL_TYPE_CREATE';
export const MODAL_TYPE_EDIT = 'MODAL_TYPE_EDIT';

export default function(props) {
    const {
        language,
        release,
        open,
        setOpen,
        messages,
        save,
        cancel,
        onChange,
        errors,
        modalType = MODAL_TYPE_CREATE,
        loading,
    } = props;

    return (
        <Modal
            onClose={() => setOpen(false)}
            onOpen={() => setOpen(true)}
            open={open}
        >
            <Modal.Header>
                {modalType === MODAL_TYPE_CREATE
                    ? messages['creating_release']
                    : messages['editing_release']}
            </Modal.Header>
            <Modal.Content>
                <Form>
                    <Form.Input
                        error={errors.releaseVersion}
                        value={release.releaseVersion}
                        name="releaseVersion"
                        label={messages['version']}
                        onChange={onChange}
                        required
                    />
                    <Form.Field required error={errors.releaseDate}>
                        <label>{messages['L__CREATE_DATE']}</label>
                        <DatePicker
                            locale={language}
                            readOnly
                            selected={
                                release.releaseDate
                                    ? stringYYYYMMDDToMoment(
                                          release.releaseDate,
                                      )
                                    : null
                            }
                            onChange={date =>
                                onChange(null, {
                                    name: 'releaseDate',
                                    value: momentToStringYYYYMMDD(date),
                                })
                            }
                            dateFormat="YYYY-MM-DD"
                        />
                    </Form.Field>
                    <Form.TextArea
                        value={release.releaseContent}
                        required
                        label={messages['L__DESCRIPTION']}
                        name="releaseContent"
                        onChange={onChange}
                        error={errors.releaseContent}
                    />
                </Form>
            </Modal.Content>
            <Modal.Actions>
                <Button
                    content={messages['toClose']}
                    onClick={cancel}
                    color="black"
                />
                <Button
                    color="black"
                    loading={loading}
                    onClick={save}
                    content={messages['save']}
                />
            </Modal.Actions>
        </Modal>
    );
}
