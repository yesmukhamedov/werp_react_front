import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import {
    Segment,
    Grid,
    Form,
    Table,
    Icon,
    Input,
    Button,
    TextArea,
    Label,
    Checkbox,
    Dropdown,
    Modal,
    Header,
} from 'semantic-ui-react';
import {
    fetchSmeciContractInfo,
    postSmecimContractInfo,
    putResold,
    //fetchBranchList,
} from '../../serviceAction';
import moment from 'moment';

import {
    f4FetchCrmCategory,
    f4FetchPhysStatus,
    f4FetchBranches,
} from '../../../reference/f4/f4_action';

import AddressF4Modal from '../../../reference/f4/address/addressF4WithCreationPage';

import { injectIntl } from 'react-intl';
import './smecim.css';
import '../../service.css';

function Smecim(props) {
    const url = window.location.search;
    const contractNumber = url.slice(url.indexOf('=') + 1);
    const emptyContract = {
        manual: 0,
        f1Mt: '',
        f2Mt: '',
        f3Mt: '',
        f4Mt: '',
        f5Mt: '',
        serviceBranchId: '',
        serviceAddressId: '',
        serviceAddressName: '',
        contactPersonName: '',
        countryId: '',
        servCrmCategory: '',
        info: '',
        info2: '',
        lastStateId: '',
    };

    const [contract, setContract] = useState({ ...emptyContract });

    const [addressF4ModalOpen, setAddressF4ModalOpen] = useState(false);

    const {
        contractInfo = [],
        branchOptions = [],
        intl: { messages },
        crmCategory = [],
        //branchList = [],
        physStatus = [],
        branches = [],
        resoldData = {},
    } = props;

    const {
        countryName,
        countryId,
        bukrsName,
        bukrsId,
        branchName,
        branchId,
        serviceBranchName,
        serviceBranchId,
        tovarSn,
        customerFIO,
        contactPersonName,
        serviceAddressName,
        fullPhone,
        serviceCrmCategoryName,
        serviceCrmCategoryId,
        contractDate,
        manual,
        installmentDate,
        dealerFIO,
        dealerId,
        fitterFIO,
        fitterId,
        warrantyEndDate,
        warranty,
        warrantyEndedMonths,
        f1Mt,
        f2Mt,
        f3Mt,
        f4Mt,
        f5Mt,
        f1MtLeft,
        f2MtLeft,
        f3MtLeft,
        f4MtLeft,
        f5MtLeft,
        customerId,
        serviceAddressId,
        info,
        lastStateId,
    } = contractInfo;

    useEffect(() => {
        if (contractNumber) {
            props.fetchSmeciContractInfo({ contractNumber });
            props.f4FetchCrmCategory();
            props.f4FetchPhysStatus();
            props.f4FetchBranches();
        }
    }, [contractNumber]);

    useEffect(() => {
        if (!addressF4ModalOpen) {
            props.fetchSmeciContractInfo({ contractNumber });
        }
    }, [!addressF4ModalOpen]);

    useEffect(() => {
        if (Object.entries(branchOptions).length !== 0 && bukrsId) {
            let branch = {};
            branchOptions[bukrsId]
                .filter(item => item.key === branchId)
                .forEach(item => {
                    branch = item;
                });

            setContract({
                ...contract,
                manual: manual,
                f1Mt: f1Mt,
                f2Mt: f2Mt,
                f3Mt: f3Mt,
                f4Mt: f4Mt,
                f5Mt: f5Mt,
                serviceBranchId: serviceBranchId,
                serviceAddressId: serviceAddressId,
                serviceAddressName: serviceAddressName,
                contactPersonName: contactPersonName,
                countryId: branch.countryid,
                servCrmCategory: serviceCrmCategoryId,
                info: info,
                lastStateId: lastStateId,
            });
        }
    }, [branchId, branchOptions]);

    const onInputChange = (e, fieldName) => {
        setContract(prev => {
            const newContract = { ...prev };
            switch (fieldName) {
                case 'manual':
                    newContract.manual = Number.parseInt(e.value, 10);
                    break;
                case 'f1Mt':
                    newContract.f1Mt = e.value;
                    break;
                case 'f2Mt':
                    newContract.f2Mt = e.value;
                    break;
                case 'f3Mt':
                    newContract.f3Mt = e.value;
                    break;
                case 'f4Mt':
                    newContract.f4Mt = e.value;
                    break;
                case 'f5Mt':
                    newContract.f5Mt = e.value;
                    break;
                case 'serviceAddressId':
                    newContract.serviceAddressId = e.addr_id;
                    newContract.serviceAddressName = e.address;
                    break;
                case 'serviceBranchId':
                    newContract.serviceBranchId = e.value;
                    break;
                case 'contactPersonName':
                    newContract.contactPersonName = e.value;
                    break;
                case 'servCrmCategory':
                    newContract.servCrmCategory = e.value;
                    break;
                case 'info':
                    newContract.info = e.value;
                    break;
                case 'info2':
                    newContract.info2 = e.value;
                    break;
                case 'lastStateId':
                    newContract.lastStateId = e.value;
                    break;
                default:
                    newContract.fieldName = e.value;
            }
            return newContract;
        });
    };

    const handleSubmit = () => {
        const {
            serviceAddressName,
            serviceAddressId,
            contactPersonName,
            serviceBranchId,
            f1Mt,
            f2Mt,
            f3Mt,
            f4Mt,
            f5Mt,
            info,
            info2,
            manual,
            servCrmCategory,
            contractStatusId,
            lastStateId,
        } = contract;
        props.postSmecimContractInfo(
            {
                serviceAddressName,
                serviceAddressId,
                branchId,
                branchName,
                bukrsId,
                bukrsName,
                contactPersonName,
                contractStatusId,
                contractDate,
                contractNumber,
                countryName,
                countryId,
                customerId,
                customerFIO,
                dealerFIO,
                dealerId,
                f1Mt: Number.parseInt(f1Mt, 10),
                f2Mt: Number.parseInt(f2Mt, 10),
                f3Mt: Number.parseInt(f3Mt, 10),
                f4Mt: Number.parseInt(f4Mt, 10),
                f5Mt: Number.parseInt(f5Mt, 10),
                f1MtLeft,
                f2MtLeft,
                f3MtLeft,
                f4MtLeft,
                f5MtLeft,
                fitterFIO,
                fitterId,
                fullPhone,
                info,
                info2,
                installmentDate,
                manual,
                serviceBranchId,
                serviceBranchName,
                serviceCrmCategoryId: servCrmCategory,
                serviceCrmCategoryName,
                tovarSn,
                warranty,
                warrantyEndDate,
                warrantyEndedMonths,
                lastStateId,
            },
            () => {
                props.history.push(`smcuspor?contractNumber=${contractNumber}`);
            },
        );
        clearContract();
    };

    const clearContract = () => {
        setContract({
            manual: 0,
            f1Mt: '',
            f2Mt: '',
            f3Mt: '',
            f4Mt: '',
            f5Mt: '',
            serviceBranchId: '',
            serviceAddressId: '',
            serviceAddressName: '',
            contactPersonName: '',
            countryId: '',
            servCrmCategory: '',
            info: '',
            info2: '',
            lastStateId: '',
        });
    };

    const [resold, setResold] = useState({
        modal: false,
        statusDisabled: true,
    });

    useEffect(() => {
        if (contractInfo) {
            if (contractInfo.contractStatusId == 17) {
                setResold({ ...resold, statusDisabled: true });
            } else {
                setResold({ ...resold, statusDisabled: false });
            }
        }
    }, [contractInfo]);

    const btnResold = () => {
        setResold({ ...resold, modal: true });
    };

    return (
        <div>
            <AddressF4Modal
                open={addressF4ModalOpen}
                customerId={customerId}
                onCloseAddressF4={bool => setAddressF4ModalOpen(bool)}
                onAddressSelect={item =>
                    onInputChange(item, 'serviceAddressId')
                }
                countryId={contract.countryId}
            />
            <Modal
                closeIcon
                open={resold.modal}
                onClose={() => setResold({ ...resold, modal: false })}
            >
                <Header content='Вы действительно хотите изменить статус на "ПЕРЕПРОДАН"?' />

                <Modal.Actions>
                    <Button
                        color="red"
                        onClick={() => setResold({ ...resold, modal: false })}
                    >
                        <Icon name="remove" /> Нет
                    </Button>
                    <Button
                        color="green"
                        onClick={() => {
                            setResold({ ...resold, modal: false });
                            props.putResold(contractNumber, () =>
                                props.fetchSmeciContractInfo({
                                    contractNumber,
                                }),
                            );
                        }}
                    >
                        <Icon name="checkmark" /> Да
                    </Button>
                </Modal.Actions>
            </Modal>

            <Modal></Modal>
            <Grid centered>
                <Grid.Row>
                    <Grid.Column mobile={16} tablet={16} computer={7}>
                        <h1>{messages['editing']}</h1>
                        <Segment>
                            <Form>
                                <div className="flexJustifySpaceBeetween">
                                    <h3>{messages['L__CLIENT_INFO']} </h3>*{' '}
                                    <Button
                                        disabled={resold.statusDisabled}
                                        color="teal"
                                        onClick={btnResold}
                                    >
                                        Перепродан
                                    </Button>
                                </div>
                                <Table compact striped>
                                    <Table.Body>
                                        <Table.Row>
                                            <Table.Cell width="4">
                                                {messages['country']}
                                            </Table.Cell>
                                            <Table.Cell>
                                                <Input
                                                    size="small"
                                                    fluid
                                                    value={
                                                        countryName
                                                            ? countryName
                                                            : ''
                                                    }
                                                    disabled
                                                />
                                            </Table.Cell>
                                            <Table.Cell></Table.Cell>
                                        </Table.Row>
                                        <Table.Row>
                                            <Table.Cell>
                                                {messages['bukrs']}
                                            </Table.Cell>
                                            <Table.Cell>
                                                <Input
                                                    size="small"
                                                    fluid
                                                    value={
                                                        bukrsName
                                                            ? bukrsName
                                                            : ''
                                                    }
                                                    disabled
                                                />
                                            </Table.Cell>
                                            <Table.Cell></Table.Cell>
                                        </Table.Row>
                                        <Table.Row>
                                            <Table.Cell>
                                                {messages['brnch']}
                                            </Table.Cell>
                                            <Table.Cell>
                                                <Input
                                                    size="small"
                                                    fluid
                                                    value={
                                                        branchName
                                                            ? branchName
                                                            : ''
                                                    }
                                                    disabled
                                                />
                                            </Table.Cell>
                                            <Table.Cell></Table.Cell>
                                        </Table.Row>
                                        <Table.Row>
                                            <Table.Cell>
                                                <Form.Field>
                                                    <label>
                                                        {
                                                            messages[
                                                                'service_branch'
                                                            ]
                                                        }
                                                    </label>
                                                </Form.Field>
                                            </Table.Cell>
                                            <Table.Cell>
                                                <Dropdown
                                                    placeholder={
                                                        messages[
                                                            'service_branch'
                                                        ]
                                                    }
                                                    fluid
                                                    selection
                                                    options={getBranchList(
                                                        branches,
                                                    )}
                                                    value={
                                                        contract.serviceBranchId
                                                    }
                                                    onChange={(e, o) =>
                                                        onInputChange(
                                                            o,
                                                            'serviceBranchId',
                                                        )
                                                    }
                                                />
                                            </Table.Cell>
                                            <Table.Cell></Table.Cell>
                                        </Table.Row>
                                        <Table.Row>
                                            <Table.Cell>
                                                <Form.Field>
                                                    <label>
                                                        {
                                                            messages[
                                                                'phys_status'
                                                            ]
                                                        }
                                                    </label>
                                                </Form.Field>
                                            </Table.Cell>
                                            <Table.Cell>
                                                <Dropdown
                                                    placeholder={
                                                        messages['phys_status']
                                                    }
                                                    fluid
                                                    selection
                                                    options={getPhysStatus(
                                                        physStatus,
                                                    )}
                                                    value={contract.lastStateId}
                                                    disabled={
                                                        lastStateId === 4
                                                            ? true
                                                            : false
                                                    }
                                                    onChange={(e, o) =>
                                                        onInputChange(
                                                            o,
                                                            'lastStateId',
                                                        )
                                                    }
                                                />
                                            </Table.Cell>
                                            <Table.Cell></Table.Cell>
                                        </Table.Row>
                                        <Table.Row>
                                            <Table.Cell>CN</Table.Cell>
                                            <Table.Cell>
                                                <Input
                                                    size="small"
                                                    fluid
                                                    value={
                                                        contractNumber
                                                            ? contractNumber
                                                            : ''
                                                    }
                                                    disabled
                                                />
                                            </Table.Cell>
                                            <Table.Cell></Table.Cell>
                                        </Table.Row>
                                        <Table.Row>
                                            <Table.Cell>
                                                {messages['factory_number']}
                                            </Table.Cell>
                                            <Table.Cell>
                                                <Input
                                                    size="small"
                                                    fluid
                                                    value={
                                                        tovarSn ? tovarSn : ''
                                                    }
                                                    disabled
                                                />
                                            </Table.Cell>
                                            <Table.Cell></Table.Cell>
                                        </Table.Row>
                                        <Table.Row>
                                            <Table.Cell>
                                                {messages['fio']}
                                            </Table.Cell>
                                            <Table.Cell>
                                                <Input
                                                    size="small"
                                                    fluid
                                                    value={
                                                        customerFIO
                                                            ? customerFIO
                                                            : ''
                                                    }
                                                    disabled
                                                />
                                            </Table.Cell>
                                            <Table.Cell></Table.Cell>
                                        </Table.Row>
                                        <Table.Row>
                                            <Table.Cell>
                                                <Form.Field>
                                                    <label>
                                                        {
                                                            messages[
                                                                'contactDetails'
                                                            ]
                                                        }
                                                    </label>
                                                </Form.Field>
                                            </Table.Cell>
                                            <Table.Cell>
                                                <Input
                                                    size="small"
                                                    fluid
                                                    value={
                                                        contract.contactPersonName
                                                            ? contract.contactPersonName
                                                            : ''
                                                    }
                                                    onChange={(e, o) =>
                                                        onInputChange(
                                                            o,
                                                            'contactPersonName',
                                                        )
                                                    }
                                                />
                                            </Table.Cell>
                                            <Table.Cell></Table.Cell>
                                        </Table.Row>
                                        <Table.Row>
                                            <Table.Cell>
                                                <Form.Field>
                                                    <label>
                                                        {
                                                            messages[
                                                                'addressService'
                                                            ]
                                                        }
                                                    </label>
                                                </Form.Field>
                                            </Table.Cell>
                                            <Table.Cell>
                                                <Input
                                                    size="small"
                                                    fluid
                                                    value={
                                                        contract.serviceAddressName
                                                            ? contract.serviceAddressName
                                                            : ''
                                                    }
                                                />
                                            </Table.Cell>
                                            <Table.Cell collapsing>
                                                <Button
                                                    icon
                                                    basic
                                                    color="blue"
                                                    onClick={() =>
                                                        setAddressF4ModalOpen(
                                                            true,
                                                        )
                                                    }
                                                >
                                                    <Icon name="clone" />
                                                </Button>
                                            </Table.Cell>
                                        </Table.Row>
                                        <Table.Row>
                                            <Table.Cell>
                                                {messages['contacts']}
                                            </Table.Cell>
                                            <Table.Cell>
                                                <Input
                                                    size="small"
                                                    fluid
                                                    value={
                                                        fullPhone
                                                            ? fullPhone
                                                            : ''
                                                    }
                                                    disabled
                                                />
                                            </Table.Cell>
                                            <Table.Cell></Table.Cell>
                                        </Table.Row>
                                        <Table.Row>
                                            <Table.Cell>
                                                <Label
                                                    ribbon
                                                    color={labelColor(
                                                        contract.servCrmCategory,
                                                    )}
                                                >
                                                    {messages['category']}
                                                </Label>
                                            </Table.Cell>
                                            <Table.Cell>
                                                <Dropdown
                                                    placeholder={
                                                        messages['category']
                                                    }
                                                    fluid
                                                    selection
                                                    options={getCrmCategory(
                                                        crmCategory,
                                                    )}
                                                    value={
                                                        contract.servCrmCategory
                                                    }
                                                    onChange={(e, o) =>
                                                        onInputChange(
                                                            o,
                                                            'servCrmCategory',
                                                        )
                                                    }
                                                />
                                            </Table.Cell>
                                            <Table.Cell></Table.Cell>
                                        </Table.Row>
                                        <Table.Row>
                                            <Table.Cell>
                                                {messages['buying_date']}
                                            </Table.Cell>
                                            <Table.Cell>
                                                <Input
                                                    size="small"
                                                    fluid
                                                    value={
                                                        contractDate
                                                            ? moment(
                                                                  contractDate,
                                                              ).format(
                                                                  'DD-MM-YYYY',
                                                              )
                                                            : ''
                                                    }
                                                    disabled
                                                />
                                            </Table.Cell>
                                            <Table.Cell></Table.Cell>
                                        </Table.Row>
                                        <Table.Row>
                                            <Table.Cell>
                                                {messages['installation_date']}
                                            </Table.Cell>
                                            <Table.Cell>
                                                <Input
                                                    size="small"
                                                    fluid
                                                    value={
                                                        installmentDate
                                                            ? moment(
                                                                  installmentDate,
                                                              ).format(
                                                                  'DD-MM-YYYY',
                                                              )
                                                            : ''
                                                    }
                                                    disabled
                                                />
                                            </Table.Cell>
                                            <Table.Cell></Table.Cell>
                                        </Table.Row>
                                        <Table.Row>
                                            <Table.Cell>
                                                {messages['dealer']}
                                            </Table.Cell>
                                            <Table.Cell>
                                                <Input
                                                    size="small"
                                                    fluid
                                                    value={
                                                        dealerFIO
                                                            ? dealerFIO
                                                            : ''
                                                    }
                                                    disabled
                                                />
                                            </Table.Cell>
                                            <Table.Cell></Table.Cell>
                                        </Table.Row>
                                        <Table.Row>
                                            <Table.Cell>
                                                {messages['goodsInstaller']}
                                            </Table.Cell>
                                            <Table.Cell>
                                                <Input
                                                    size="small"
                                                    fluid
                                                    value={
                                                        fitterFIO
                                                            ? fitterFIO
                                                            : ''
                                                    }
                                                    disabled
                                                />
                                            </Table.Cell>
                                            <Table.Cell></Table.Cell>
                                        </Table.Row>
                                        <Table.Row>
                                            <Table.Cell>
                                                {messages['guarantee_period']}
                                            </Table.Cell>
                                            <Table.Cell>
                                                <Table>
                                                    <Table.Body>
                                                        <Table.Row>
                                                            <Table.Cell>
                                                                <Input
                                                                    size="small"
                                                                    fluid
                                                                    value={
                                                                        warrantyEndDate
                                                                            ? moment(
                                                                                  warrantyEndDate,
                                                                              ).format(
                                                                                  'DD-MM-YYYY',
                                                                              )
                                                                            : ''
                                                                    }
                                                                    disabled
                                                                />
                                                            </Table.Cell>
                                                            <Table.Cell>
                                                                <Input
                                                                    size="small"
                                                                    fluid
                                                                    value={`${
                                                                        warrantyEndedMonths
                                                                            ? warrantyEndedMonths
                                                                            : ''
                                                                    } / ${
                                                                        warranty
                                                                            ? warranty
                                                                            : ''
                                                                    }`}
                                                                    disabled
                                                                />
                                                            </Table.Cell>
                                                        </Table.Row>
                                                    </Table.Body>
                                                </Table>
                                            </Table.Cell>
                                            <Table.Cell></Table.Cell>
                                        </Table.Row>
                                        <Table.Row>
                                            <Table.Cell>
                                                <Form.Field>
                                                    <label>
                                                        {
                                                            messages[
                                                                'replacement_period'
                                                            ]
                                                        }
                                                    </label>
                                                </Form.Field>
                                            </Table.Cell>
                                            <Table.Cell>
                                                <Table>
                                                    <Table.Body>
                                                        <Table.Row>
                                                            <Table.Cell>
                                                                <Checkbox
                                                                    radio
                                                                    label={
                                                                        messages[
                                                                            'automate'
                                                                        ]
                                                                    }
                                                                    name="changeTerm"
                                                                    value="0"
                                                                    checked={
                                                                        contract.manual ===
                                                                        0
                                                                    }
                                                                    onChange={(
                                                                        e,
                                                                        o,
                                                                    ) =>
                                                                        onInputChange(
                                                                            o,
                                                                            'manual',
                                                                        )
                                                                    }
                                                                />
                                                            </Table.Cell>
                                                            <Table.Cell>
                                                                <Checkbox
                                                                    radio
                                                                    label={
                                                                        messages[
                                                                            'manual'
                                                                        ]
                                                                    }
                                                                    name="changeTerm"
                                                                    value="1"
                                                                    checked={
                                                                        contract.manual ===
                                                                        1
                                                                    }
                                                                    onChange={(
                                                                        e,
                                                                        o,
                                                                    ) =>
                                                                        onInputChange(
                                                                            o,
                                                                            'manual',
                                                                        )
                                                                    }
                                                                />
                                                            </Table.Cell>
                                                        </Table.Row>
                                                    </Table.Body>
                                                </Table>
                                            </Table.Cell>
                                            <Table.Cell></Table.Cell>
                                        </Table.Row>
                                        {contract.manual === 1 ? (
                                            <Table.Row>
                                                <Table.Cell>
                                                    {messages['filter_term']}
                                                </Table.Cell>
                                                <Table.Cell>
                                                    <Input
                                                        size="mini"
                                                        label="F1"
                                                        className="input__filter_terms"
                                                        value={contract.f1Mt}
                                                        onChange={(e, o) =>
                                                            onInputChange(
                                                                o,
                                                                'f1Mt',
                                                            )
                                                        }
                                                    />
                                                    <Input
                                                        size="mini"
                                                        label="F2"
                                                        className="input__filter_terms"
                                                        value={contract.f2Mt}
                                                        onChange={(e, o) =>
                                                            onInputChange(
                                                                o,
                                                                'f2Mt',
                                                            )
                                                        }
                                                    />
                                                    <Input
                                                        size="mini"
                                                        label="F3"
                                                        className="input__filter_terms"
                                                        value={contract.f3Mt}
                                                        onChange={(e, o) =>
                                                            onInputChange(
                                                                o,
                                                                'f3Mt',
                                                            )
                                                        }
                                                    />
                                                    <Input
                                                        size="mini"
                                                        label="F4"
                                                        className="input__filter_terms"
                                                        value={contract.f4Mt}
                                                        onChange={(e, o) =>
                                                            onInputChange(
                                                                o,
                                                                'f4Mt',
                                                            )
                                                        }
                                                    />
                                                    <Input
                                                        size="mini"
                                                        label="F5"
                                                        className="input__filter_terms"
                                                        value={contract.f5Mt}
                                                        onChange={(e, o) =>
                                                            onInputChange(
                                                                o,
                                                                'f5Mt',
                                                            )
                                                        }
                                                    />
                                                </Table.Cell>
                                                <Table.Cell></Table.Cell>
                                            </Table.Row>
                                        ) : (
                                            <Table.Row></Table.Row>
                                        )}
                                        <Table.Row>
                                            <Table.Cell>
                                                <Form.Field>
                                                    <label>
                                                        {
                                                            messages[
                                                                'description'
                                                            ]
                                                        }
                                                    </label>
                                                </Form.Field>
                                            </Table.Cell>
                                            <Table.Cell>
                                                <Form.Field>
                                                    <TextArea
                                                        placeholder={
                                                            messages[
                                                                'description'
                                                            ]
                                                        }
                                                        onChange={(e, o) =>
                                                            onInputChange(
                                                                o,
                                                                'info',
                                                            )
                                                        }
                                                        value={
                                                            contract.info
                                                                ? contract.info
                                                                : ''
                                                        }
                                                    />
                                                </Form.Field>
                                            </Table.Cell>
                                            <Table.Cell></Table.Cell>
                                        </Table.Row>
                                        <Table.Row>
                                            <Table.Cell>
                                                <Form.Field>
                                                    <label>
                                                        {
                                                            messages[
                                                                'description'
                                                            ]
                                                        }{' '}
                                                        1
                                                    </label>
                                                </Form.Field>
                                            </Table.Cell>
                                            <Table.Cell>
                                                <Form.Field>
                                                    <TextArea
                                                        placeholder={
                                                            messages[
                                                                'description'
                                                            ]
                                                        }
                                                        onChange={(e, o) =>
                                                            onInputChange(
                                                                o,
                                                                'info2',
                                                            )
                                                        }
                                                    />
                                                </Form.Field>
                                            </Table.Cell>
                                            <Table.Cell></Table.Cell>
                                        </Table.Row>
                                    </Table.Body>
                                </Table>
                                <Table>
                                    <Table.Body>
                                        <Table.Row>
                                            <Table.Cell width={4}>
                                                <h3>
                                                    {
                                                        messages[
                                                            'filter_replacement_period'
                                                        ]
                                                    }
                                                </h3>
                                            </Table.Cell>
                                            <Table.Cell>
                                                <Input
                                                    size="mini"
                                                    label="F1"
                                                    className="input__filter_terms"
                                                    value={
                                                        f1MtLeft
                                                            ? f1MtLeft
                                                            : '0'
                                                    }
                                                    disabled
                                                />
                                                <Input
                                                    size="mini"
                                                    label="F2"
                                                    className="input__filter_terms"
                                                    value={
                                                        f2MtLeft
                                                            ? f2MtLeft
                                                            : '0'
                                                    }
                                                    disabled
                                                />
                                                <Input
                                                    size="mini"
                                                    label="F3"
                                                    className="input__filter_terms"
                                                    value={
                                                        f3MtLeft
                                                            ? f3MtLeft
                                                            : '0'
                                                    }
                                                    disabled
                                                />
                                                <Input
                                                    size="mini"
                                                    label="F4"
                                                    className="input__filter_terms"
                                                    value={
                                                        f4MtLeft
                                                            ? f4MtLeft
                                                            : '0'
                                                    }
                                                    disabled
                                                />
                                                <Input
                                                    size="mini"
                                                    label="F5"
                                                    className="input__filter_terms"
                                                    value={
                                                        f5MtLeft
                                                            ? f5MtLeft
                                                            : '0'
                                                    }
                                                    disabled
                                                />
                                            </Table.Cell>
                                        </Table.Row>
                                    </Table.Body>
                                </Table>
                                <Form.Field>
                                    <Button
                                        color="blue"
                                        fluid
                                        onClick={() => handleSubmit()}
                                    >
                                        {messages['save']}
                                    </Button>
                                </Form.Field>
                                <Form.Field>
                                    <Button
                                        color="red"
                                        fluid
                                        onClick={() => window.history.back()}
                                    >
                                        {messages['cancel']}
                                    </Button>
                                </Form.Field>
                            </Form>
                        </Segment>
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        </div>
    );
}

const getCrmCategory = crmCategory => {
    const crmCat = crmCategory;
    if (!crmCat) {
        return [];
    }
    let out = crmCategory.map(item => {
        return {
            key: item.id,
            text: item.name,
            value: item.id,
        };
    });
    return out;
};

const getBranchList = branches => {
    const list = branches;
    if (!list) {
        return [];
    }
    let out = branches
        .filter(
            item =>
                item.business_area_id == 5 ||
                item.business_area_id == 6 ||
                item.business_area_id == 9,
        )
        .map(item => {
            return {
                key: item.branch_id,
                text: item.text45,
                value: item.branch_id,
            };
        });

    return out;
};

const getPhysStatus = value => {
    const physStatus = value;
    if (!physStatus) {
        return [];
    }
    let out = value
        .filter(item => item.id !== 3 && item.id !== 1)
        .map(c => {
            return {
                key: c.id,
                text: c.name,
                value: parseInt(c.id, 10),
            };
        });
    return out;
};

const labelColor = crmCategoryId => {
    if (crmCategoryId === 1) {
        return 'green';
    } else if (crmCategoryId === 2) {
        return 'yellow';
    } else if (crmCategoryId === 3) {
        return 'red';
    } else if (crmCategoryId === 4) {
        return 'black';
    }
};

function mapStateToProps(state) {
    return {
        branchOptions: state.userInfo.branchOptionsMarketing,
        contractInfo: state.serviceReducer.smeciContractInfo,
        resoldData: state.serviceReducer.resoldData,
        crmCategory: state.f4.crmCategory,
        physStatus: state.f4.physStatus,
        branches: state.f4.branches,
    };
}

export default connect(mapStateToProps, {
    fetchSmeciContractInfo,
    postSmecimContractInfo,
    f4FetchCrmCategory,
    f4FetchPhysStatus,
    f4FetchBranches,
    putResold,
})(injectIntl(Smecim));
