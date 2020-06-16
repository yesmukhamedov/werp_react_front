import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';
import { Container, Form, Divider } from 'semantic-ui-react';
import 'react-table/react-table.css';
import OutputErrors from '../../../../general/error/outputErrors';
import { errorTableText } from '../../../../utils/helpers';
import { fetchRescheduledApplication } from '../smopspAction';
import { fetchServiceListManager } from '../../../report/serviceReportAction';
import ReactTableServerSideWrapper from '../../../../utils/ReactTableServerSideWrapper';
import moment from 'moment';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import {
  momentToStringYYYYMMDD,
  stringYYYYMMDDToMoment,
} from '../../../../utils/helpers';
import ModalColumns from '../../../../utils/ModalColumns';
import { LinkToSmcuspor } from '../../../../utils/outlink';

const TransferApplication = props => {
  const {
    intl: { messages },
    language,
    fetchRescheduledApplication,
    rescheduledApp = [],
    branchOptions = [],
    countryOptions,
    companyOptions = [],
  } = props;

  const emptyParam = {
    countryId: '',
    bukrs: '',
    branchId: '',
    contractStatusId: '',
    dateOpenAt: '',
  };

  const [param, setParam] = useState({ ...emptyParam });
  const [turnOnReactFetch, setTurnOnReactFetch] = useState(false);
  const [error, setError] = useState([]);

  const [serviceBranchOptions, setServiceBranchOptions] = useState([]);

  useEffect(() => {
    if (param.bukrs) {
      setServiceBranchOptions(branchOptions[param.bukrs]);
    }
    if (param.bukrs !== '' && param.countryId !== '' && branchOptions) {
      let brnchOpt = branchOptions[param.bukrs].filter(
        item => item.countryid === param.countryId,
      );
      setServiceBranchOptions(brnchOpt);
    }
  }, [branchOptions, param.countryId, param.bukrs]);

  const initialColumns = [
    {
      Header: 'ID',
      accessor: 'id',
      checked: true,
      filterable: false,
    },
    {
      Header: 'CN',
      accessor: 'contractNumber',
      checked: true,
    },
    {
      Header: messages['brnch'],
      accessor: 'branchId',
      checked: true,
    },
    {
      Header: messages['factory_number'],
      accessor: 'tovarSn',
      checked: true,
    },
    {
      Header: messages['Crm.DateOfSale'],
      accessor: 'contractDate',
      checked: true,
      filterable: false,
    },

    {
      Header: messages['transfer_date'],
      accessor: 'rescheduledDate',
      checked: true,
      filterable: false,
    },
    {
      Header: messages['Application_Date'],
      accessor: 'applicationDate',
      checked: true,
      filterable: false,
    },
    {
      Header: messages['fio'],
      accessor: 'customerFIO',
      checked: true,
      with: 200,
    },
    {
      Header: messages['customer_key'],
      accessor: 'customerIinBin',
      checked: true,
      with: 150,
    },
    {
      Header: messages['address'],
      accessor: 'address',
      checked: true,
    },
    {
      Header: messages['Dealer.Fullname'],
      accessor: 'dealerFIO',
      checked: true,
      with: 200,
      filterable: false,
    },
    {
      Header: 'F1',
      accessor: 'f1',
      checked: true,
      filterable: false,
    },
    {
      Header: messages['guarantee'],
      accessor: 'warrantyId',
      checked: true,
      filterable: false,
    },

    {
      Header: messages['category'],
      accessor: 'crmCategoryId',
      checked: true,
      filterable: false,
    },

    {
      Header: messages['application_status'],
      accessor: 'applicationStatusId',
      checked: true,
      filterable: false,
    },
    {
      Header: messages['fin_status'],
      accessor: 'contractStatusId',
      checked: true,
      filterable: false,
    },
    {
      Header: messages['request_number'],
      accessor: 'applicationNumber',
      checked: true,
      filterable: false,
    },
    {
      Header: messages['Table.View'],
      accessor: '16',
      filterable: false,
      Cell: original => (
        <div style={{ textAlign: 'center' }}>
          <LinkToSmcuspor
            contractNumber={original.row.contractNumber}
            text={messages['Table.View']}
          />
        </div>
      ),
      checked: true,
      width: 60,
      fixed: 'right',
    },
  ];

  const handleClickApply = () => {
    validate();
    if (param.bukrs !== '') {
      const page = 0;
      const size = 20;
      fetchRescheduledApplication({ ...param, page, size });
      setTurnOnReactFetch(true);
    }
  };

  const validate = () => {
    const errors = [];
    if (param.bukrs === '') {
      errors.push(errorTableText(5));
    }
    setError(() => errors);
  };

  const [columns, setColumns] = useState([...initialColumns]);
  const finishColumns = data => {
    setColumns([...data]);
  };

  const onInputChange = (o, fieldName) => {
    setParam(prev => {
      const prevParam = { ...prev };
      switch (fieldName) {
        case 'countryId':
          prevParam.countryId = o.value;
          break;

        case 'bukrs':
          prevParam.bukrs = o.value;
          break;

        case 'branchId':
          prevParam.branchId = o.value;
          break;

        case 'dateOpenAt':
          prevParam.dateOpenAt = o.value;
          break;
        default:
          prevParam[fieldName] = o.value;
      }
      return prevParam;
    });
  };

  return (
    <Container fluid className="containerMargin">
      <Form>
        <Form.Group widths="equal">
          <Form.Select
            fluid
            label={messages['country']}
            placeholder={messages['country']}
            options={countryOptions}
            onChange={(e, o) => onInputChange(o, 'countryId')}
            className="alignBottom"
          />

          <Form.Select
            required
            fluid
            label={messages['bukrs']}
            placeholder={messages['bukrs']}
            options={companyOptions}
            onChange={(e, o) => onInputChange(o, 'bukrs')}
            className="alignBottom"
          />

          <Form.Select
            fluid
            label={messages['brnch']}
            placeholder={messages['brnch']}
            options={serviceBranchOptions}
            onChange={(e, o) => onInputChange(o, 'branchId')}
            className="alignBottom"
          />
        </Form.Group>

        <Form.Group className="spaceBetween">
          <div className="flexDirectionRow">
            <Form.Field className="marginRight">
              <label>{messages['date']}</label>
              <DatePicker
                className="date-auto-width"
                autoComplete="off"
                locale={language}
                dropdownMode="select" //timezone="UTC"
                placeholderText={messages['date']}
                selected={
                  param.dateOpenAt === ''
                    ? ''
                    : stringYYYYMMDDToMoment(param.dateOpenAt)
                }
                onChange={date =>
                  setParam({
                    ...param,
                    dateOpenAt: momentToStringYYYYMMDD(date),
                  })
                }
                maxDate={moment(new Date())}
                dateFormat="DD.MM.YYYY"
              />
            </Form.Field>
            <Form.Button
              onClick={handleClickApply}
              color="blue"
              className="alignBottom"
            >
              {messages['apply']}
            </Form.Button>
          </div>

          <Form.Field className="alignBottom">
            <ModalColumns
              columns={initialColumns}
              finishColumns={finishColumns}
            />
          </Form.Field>
        </Form.Group>
        <OutputErrors errors={error} />
      </Form>
      <Divider />
      <ReactTableServerSideWrapper
        data={rescheduledApp ? rescheduledApp.data : []}
        columns={columns}
        filterable={true}
        defaultPageSize={20}
        showPagination={true}
        requestData={params => {
          props.fetchRescheduledApplication({ ...params, ...param });
        }}
        pages={rescheduledApp ? rescheduledApp.totalPages : ''}
        turnOnReactFetch={turnOnReactFetch}
      />
    </Container>
  );
};

function mapStateToProps(state) {
  return {
    language: state.locales.lang,
    rescheduledApp: state.smopspReducer.rescheduledApp,
  };
}

export default connect(mapStateToProps, {
  fetchServiceListManager,
  fetchRescheduledApplication,
})(injectIntl(TransferApplication));
