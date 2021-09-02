import React, { Component } from 'react';
import {
    Modal,
    Form,
    Input,
    TextArea,
    Button,
    Dimmer,
    Loader,
} from 'semantic-ui-react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import moment from 'moment';
import {
    fetchGroupDealers,
    fetchDemoResults,
    fetchReasons,
    fetchDemo,
    updateDemo,
    toggleDemoUpdateModal,
} from '../actions/demoAction';
import { connect } from 'react-redux';
import {
    DEMO_RESULT_CANCELLED,
    DEMO_RESULT_DONE,
    DEMO_RESULT_MOVED,
    getReasonsByResultId,
    getLocationOptionsByLanguage,
    DEMO_RESULT_SOLD,
    demoResultOptions,
} from '../../../crmUtil';
import { injectIntl } from 'react-intl';
import {
    momentToStringYYYYMMDD,
    momentToStringYYYYMMDDHHMM,
    stringToMoment,
    stringYYYYMMDDHHMMToMoment,
    stringYYYYMMDDToMoment,
} from '../../../../utils/helpers';
import { modifyLoader } from '../../../../general/loader/loader_action';

require('moment/locale/ru');

class DemoUpdateModal extends Component {
    constructor(props) {
        super(props);

        this.state = {
            localDemo: {},
            errors: {
                dealerId: false,
                result: false,
                reasonId: false,
                dateTime: false,
                clientName: false,
                address: false,
                location: false,
                recallDate: false,
            },
        };

        this.close = this.close.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.validateForm = this.validateForm.bind(this);
        this.renderUpdateForm = this.renderUpdateForm.bind(this);
        this.saveDemo = this.saveDemo.bind(this);
        this.renderCallDateRow = this.renderCallDateRow.bind(this);
    }

    componentWillMount() {
        this.props.fetchGroupDealers();
        this.props.fetchDemoResults();
        this.props.fetchReasons();
    }

    renderReasonRow(messages) {
        let result = this.state.localDemo.result;
        // if (resultId) {
        //   resultId = parseInt(resultId, 10);
        // }
        if (
            result === DEMO_RESULT_CANCELLED ||
            result === DEMO_RESULT_DONE ||
            result === DEMO_RESULT_MOVED
        ) {
            return (
                <Form.Select
                    error={this.state.errors.reasonId}
                    name="reasonId"
                    value={this.state.localDemo.reasonId}
                    required
                    fluid
                    selection
                    label={messages['Crm.Reason']}
                    options={getReasonsByResultId(result, this.props.reasons)}
                    onChange={(e, v) => this.handleChange('reasonId', v)}
                />
            );
        }

        return <Form.Field />;
    }

    renderSaleDateRow() {
        const result = this.state.localDemo.result;
        const { messages, locale } = this.props.intl;
        if (result === DEMO_RESULT_SOLD) {
            return (
                <Form.Field error={this.state.errors.saleDate} required>
                    <label>{messages['Crm.DateOfSale']}</label>
                    <DatePicker
                        autoComplete="off"
                        locale={locale}
                        label=""
                        placeholderText={messages['Crm.DateOfSale']}
                        showMonthDropdown
                        showYearDropdown
                        dropdownMode="select"
                        selected={stringYYYYMMDDToMoment(
                            this.state.localDemo.saleDate,
                        )}
                        onChange={v =>
                            this.handleChange(
                                'saleDate',
                                momentToStringYYYYMMDD(v),
                            )
                        }
                    />
                </Form.Field>
            );
        }

        return null;
    }

    renderCallDateRow() {
        const result = this.state.localDemo.result;
        const { messages, locale } = this.props.intl;
        if (result === DEMO_RESULT_MOVED || result === DEMO_RESULT_CANCELLED) {
            return (
                <Form.Field error={this.state.errors.recallDate} required>
                    <label>{messages['Crm.RecallDateTime']}</label>
                    <DatePicker
                        autoComplete="off"
                        locale={locale}
                        label=""
                        placeholderText={messages['Crm.RecallDateTime']}
                        showMonthDropdown
                        showYearDropdown
                        showTimeSelect
                        dropdownMode="select"
                        dateFormat="DD.MM.YYYY HH:mm"
                        selected={
                            this.state.localDemo.recallDate
                                ? stringYYYYMMDDHHMMToMoment(
                                      this.state.localDemo.recallDate,
                                  )
                                : null
                        }
                        onChange={v =>
                            this.handleChange(
                                'recallDate',
                                momentToStringYYYYMMDDHHMM(v),
                            )
                        }
                    />
                </Form.Field>
            );
        }

        return null;
    }

    renderUpdateForm(messages) {
        const { localDemo } = this.state;
        const { locale } = this.props.intl;
        return (
            <Form>
                <Form.Group widths="equal">
                    <Form.Field
                        error={this.state.errors.clientName}
                        onChange={(e, o) => this.handleChange('clientName', o)}
                        value={localDemo.clientName}
                        control={Input}
                        required
                        label={messages.fioClient}
                        placeholder={messages.fioClient}
                    />
                    <Form.Field error={this.state.errors.dateTime} required>
                        <label>{messages['Crm.DemoDateTime']}</label>
                        <DatePicker
                            autoComplete="off"
                            locale={locale}
                            label=""
                            placeholderText={messages['Crm.DemoDateTime']}
                            showMonthDropdown
                            showYearDropdown
                            showTimeSelect
                            dropdownMode="select"
                            dateFormat="DD.MM.YYYY HH:mm"
                            selected={stringYYYYMMDDHHMMToMoment(
                                localDemo.dateTime,
                            )}
                            onChange={v =>
                                this.handleChange(
                                    'dateTime',
                                    momentToStringYYYYMMDDHHMM(v),
                                )
                            }
                        />
                    </Form.Field>
                </Form.Group>
                <Form.Group widths="equal">
                    <Form.Select
                        error={this.state.errors.result}
                        value={localDemo.result}
                        required
                        fluid
                        selection
                        label={messages['Table.Result']}
                        options={demoResultOptions(this.props.demoResults)}
                        onChange={(e, v) => this.handleChange('result', v)}
                    />
                    {this.renderReasonRow(messages)}
                    {this.renderSaleDateRow()}
                </Form.Group>

                <Form.Group widths="equal">
                    {this.renderCallDateRow()}
                    <Form.Field />
                </Form.Group>
                <Form.Group widths="equal">
                    <Form.Field
                        error={this.state.errors.address}
                        required
                        control={TextArea}
                        onChange={(e, o) => this.handleChange('address', o)}
                        label={messages['Table.Address']}
                        placeholder={messages['Table.Address']}
                        value={localDemo.address}
                    />
                    <Form.Select
                        error={this.state.errors.location}
                        value={localDemo.location}
                        required
                        fluid
                        selection
                        label={messages['Crm.Location']}
                        options={getLocationOptionsByLanguage(locale)}
                        onChange={(e, v) => this.handleChange('location', v)}
                    />
                </Form.Group>
                <Form.Group widths="equal">
                    <Form.Select
                        error={this.state.errors.dealerId}
                        value={localDemo.dealerId}
                        required
                        fluid
                        selection
                        label={messages.dealer}
                        options={this.props.dealers}
                        onChange={(e, v) => this.handleChange('dealerId', v)}
                    />

                    <Form.Field
                        control={TextArea}
                        onChange={(e, o) => this.handleChange('note', o)}
                        label={messages['Table.Note']}
                        placeholder={messages['Table.Note']}
                        value={localDemo.note || ''}
                    />
                </Form.Group>
            </Form>
        );
    }

    getOptionTextValue(o) {
        if (o.options) {
            for (const k in o.options) {
                if (o.options[k].key === o.value) {
                    return o.options[k].text;
                }
            }
        }

        return '';
    }

    handleChange(fieldName, o) {
        const localDemo = Object.assign({}, this.state.localDemo);
        console.log('o', o);
        switch (fieldName) {
            case 'dateTime':
            case 'saleDate':
            case 'recallDate':
                if (o) {
                    localDemo[fieldName] = o;
                } else {
                    localDemo[fieldName] = null;
                }
                break;

            case 'reasonId':
                localDemo[fieldName] = o.value;
                localDemo.reasonName = this.getOptionTextValue(o);
                break;

            case 'result':
                localDemo[fieldName] = o.value;
                localDemo.resultName = this.getOptionTextValue(o);
                localDemo.reasonName = '';
                localDemo.reasonId = null;
                break;

            case 'dealerId':
                localDemo[fieldName] = o.value;
                localDemo.dealerName = this.getOptionTextValue(o);
                break;

            case 'location':
            case 'clientName':
            case 'address':
            case 'note':
                localDemo[fieldName] = o.value;
                break;

            default: {
            }
        }

        this.setState({
            ...this.state,
            localDemo,
        });
    }

    validateForm() {
        const { localDemo, errors } = this.state;
        for (const k in errors) {
            if (errors.hasOwnProperty(k)) {
                errors[k] = false;
            }
        }
        const result = localDemo.result;
        const reasonId = parseInt(localDemo.reasonId, 10);

        if (result === DEMO_RESULT_MOVED || result === DEMO_RESULT_CANCELLED) {
            if (!reasonId || reasonId === 0) {
                errors.reasonId = true;
            }
            if (!localDemo.recallDate || localDemo.recallDate.length === 0) {
                errors.recallDate = true;
            }
        } else if (result === DEMO_RESULT_SOLD) {
            if (!localDemo.saleDate || localDemo.saleDate.length === 0) {
                errors.saleDate = true;
            }
        }

        if (result === DEMO_RESULT_DONE) {
            if (!reasonId || reasonId === 0) {
                errors.reasonId = true;
            }
        }

        if (!localDemo.clientName || localDemo.clientName.length === 0) {
            errors.clientName = true;
        }

        if (!localDemo.dateTime || localDemo.dateTime.length === 0) {
            errors.dateTime = true;
        }

        if (!localDemo.address || localDemo.address.length === 0) {
            errors.address = true;
        }

        this.setState({
            ...this.state,
            errors,
        });
    }

    componentWillReceiveProps(props) {
        if (props.demo !== this.state.localDemo) {
            const localDemo = Object.assign({}, this.props.demo);
            this.setState({
                ...this.state,
                localDemo,
            });
        }
    }

    saveDemo() {
        this.validateForm();
        let isValid = true;
        for (const k in this.state.errors) {
            if (this.state.errors[k]) {
                isValid = false;
            }
        }

        if (!isValid) {
            return;
        }

        this.props.updateDemo(
            {
                address: this.state.localDemo.address,
                appointedBy: this.state.localDemo.appointedBy,
                callDate: this.state.localDemo.callDate,
                clientName: this.state.localDemo.clientName,
                context: this.state.localDemo.context,
                contextId: this.state.localDemo.contextId,
                dateTime: this.state.localDemo.dateTime,
                dealerId: this.state.localDemo.dealerId,
                id: this.state.localDemo.id,
                location: this.state.localDemo.location,
                note: this.state.localDemo.note,
                parentId: null,
                reasonId: this.state.localDemo.reasonId,
                recallDate: this.state.localDemo.recallDate,
                recoId: this.state.localDemo.recoId,
                result: this.state.localDemo.result,
                saleDate: this.state.localDemo.saleDate,
                visitId: null,
            },
            () => this.props.fetchDemo(this.props.id),
        );
    }

    close() {
        this.props.toggleDemoUpdateModal(false);
    }

    render() {
        const { openDemoUpdateModal, demo } = this.props;
        const { messages } = this.props.intl;
        demo.recos = [];
        return (
            <Modal size="small" open={openDemoUpdateModal}>
                <Dimmer active={this.props.activeLoader}>
                    <Loader />
                </Dimmer>
                <Modal.Header>{messages['Crm.DemoEdition']}</Modal.Header>
                <Modal.Content>{this.renderUpdateForm(messages)}</Modal.Content>
                <Modal.Actions>
                    <Button
                        negative
                        onClick={() => this.props.toggleDemoUpdateModal(false)}
                    >
                        {messages.cancel}
                    </Button>
                    <Button
                        positive
                        icon="checkmark"
                        onClick={this.saveDemo}
                        loading={this.props.activeLoader}
                        disabled={this.props.activeLoader}
                        labelPosition="right"
                        content={messages.save}
                    />
                </Modal.Actions>
            </Modal>
        );
    }
}

function mapStateToProps(state) {
    return {
        dealers: state.crmDemo2021.dealers,
        loader: state.loader,
        demoResults: state.crmDemo2021.demoResults,
        reasons: state.crmDemo2021.reasons,
        demo: state.crmDemo2021.demo,
        openDemoUpdateModal: state.crmDemo2021.openDemoUpdateModal,
        activeLoader: state.loader.active,
    };
}

export default connect(mapStateToProps, {
    fetchGroupDealers,
    fetchDemoResults,
    fetchReasons,
    modifyLoader,
    updateDemo,
    fetchDemo,
    toggleDemoUpdateModal,
    getLocationOptionsByLanguage,
})(injectIntl(DemoUpdateModal));
