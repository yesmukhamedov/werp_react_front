import React, { useState } from 'react';
import {
    Container,
    Segment,
    Icon,
    Form,
    Input,
    Button,
} from 'semantic-ui-react';
import 'react-table/react-table.css';
import DropdownClearable from '../../../utils/DropdownClearable';
import { excelDownload, errorTableText } from '../../../utils/helpers';
import OutputErrors from '../../../general/error/outputErrors';
import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';
import { fetchResultList } from './faglb03Action';
import Table from './Table';
import LedgerAccount from './Modal';
import { Message } from 'semantic-ui-react';

const Faglb03 = props => {
    const {
        intl: { messages },
        companyOptions = [],
        resultList,
    } = props;

    const [modalDetalOpen, setModalDetalOpen] = useState(false);

    const year = new Date();
    const [param, setParam] = useState({
        bukrs: '',
        generalLedgerAccount: '',
        year: year.getFullYear(),
    });

    const onInputChange = (value, fieldName) => {
        switch (fieldName) {
            case 'bukrs':
                setParam({ ...param, bukrs: value });
                break;
            case 'generalLedgerAccount':
                setParam({ ...param, generalLedgerAccount: value });
                break;
            case 'year':
                setParam({ ...param, year: value });
                break;

            default:
                alert('НЕТ ТАКОЕ ЗНАЧЕНИЕ');
        }
    };

    const accountList = {};

    const exportExcelResult = () => {
        alert('nm');
    };
    const [error, setError] = useState([]);

    const table = () => {
        const errors = [];
        if (!param.bukrs) {
            errors.push(errorTableText(5));
        }
        if (!param.generalLedgerAccount) {
            errors.push(errorTableText(12));
        }
        if (!param.year) {
            errors.push(errorTableText(22));
        }
        if (errors.length === 0) {
            console.log('param: ', param);
            //props.fetchResultList(param);
        }
        setError(errors);
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
                <h3>{messages['transNameFaglb03']}</h3>
            </Segment>
            <Form>
                <Form.Group>
                    <Form.Field className="marginRight  width25Rem">
                        <DropdownClearable
                            fluid
                            placeholder={messages['bukrs']}
                            value={
                                companyOptions.length === 1 && !param.bukrs
                                    ? setParam({
                                          ...param,
                                          bukrs: companyOptions[0].value,
                                      })
                                    : param.bukrs
                            }
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
                        <Input
                            type="number"
                            placeholder={messages['gjahr']}
                            value={param.year}
                            onChange={(e, { value }) =>
                                onInputChange(value, 'year')
                            }
                        />
                    </Form.Field>
                    <Form.Field className="marginRight  width25Rem">
                        <div className="ui action input">
                            <Input
                                type="number"
                                placeholder={messages['belnr']}
                                value={param.generalLedgerAccount}
                                onChange={(e, { value }) =>
                                    onInputChange(value, 'generalLedgerAccount')
                                }
                            />
                            <Button
                                className="ui teal right labeled icon button"
                                onClick={setModalDetalOpen}
                            >
                                <Icon name="folder outline" />
                            </Button>
                        </div>
                    </Form.Field>
                    <Form.Group>
                        <Form.Button
                            color="blue"
                            className="alignTopBottom"
                            icon
                            onClick={() => table()}
                        >
                            <Icon name="search" />
                            {messages['search']}
                        </Form.Button>
                        <Form.Button
                            floated="right"
                            color="green"
                            className="alignTopBottom"
                            icon
                            disabled={resultList.length === 0 ? true : false}
                            onClick={() => exportExcelResult()}
                        >
                            <Icon name="download" />
                            {messages['export_to_excel']}
                        </Form.Button>
                    </Form.Group>
                </Form.Group>
            </Form>
            <OutputErrors errors={error} />
            <LedgerAccount
                general={accountList ? accountList : []}
                messages={messages}
                modalDetalOpen={modalDetalOpen}
                setModalDetalOpen={setModalDetalOpen}
            />
            <Table
                data={resultList ? resultList : []}
                messages={props.intl.messages}
            />
        </Container>
    );
};

function mapStateToProps(state) {
    console.log('state=> ', state);
    return {
        companyOptions: state.userInfo.companyOptions,
        resultList: state.frep3Reducer.frep3ResultList,
    };
}

export default connect(mapStateToProps)(injectIntl(Faglb03));
