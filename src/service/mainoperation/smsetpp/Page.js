import React, { useState, useEffect, Fragment } from 'react';
import { Segment, Dropdown, Button, Icon } from 'semantic-ui-react';
import ReactTableWrapper from '../../../utils/ReactTableWrapper';
import './index.css';
import { connect } from 'react-redux';
import 'react-table/react-table.css';
import AddPrice from './AddPrice';
import { injectIntl } from 'react-intl';
import format from 'string-format';
import { f4FetchCountryList } from '../../../reference/f4/f4_action';
import EditModal from './editPrice';
import {
  fetchSmsetpp,
  fetchSmsetppSearch,
  fetchSmsetppPremiumPriceType,
} from './../../serviceAction';
import OutputErrors from '../../../general/error/outputErrors';

const Page = props => {
  const {
    data,
    premium,
    intl: { messages },
    countryList = [],
    companyOptions = [],
    f4FetchCountryList,
    fetchSmsetpp,
    fetchSmsetppSearch,
    fetchSmsetppPremiumPriceType,
  } = props;
  const [error, setError] = useState([]);
  const errorTable = JSON.parse(localStorage.getItem('errorTableString'));
  const [modalProps, setModalProps] = useState();
  const language = localStorage.getItem('language');
  const [activeDropdown, setActiveDropdown] = useState(false);
  const [typeOfService, setTypeOfService] = useState([]);
  const [secondActive, setSecondActive] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [allDropdownActive, setAllDropdownActive] = useState(false);
  const [serviceOptionPriceList, setServiceOptionPriceList] = useState([]);
  const [premiumPriceTypeId, setPremiumPriceTypeId] = useState([]);
  const [editWaers, setEditWaers] = useState('');
  const [editDocs, setEditDocs] = useState({
    id: 0,
    bukrs: '',
    dateStart: '',
    fc: 0,
    mc: 0,
    office: 0,
    master: 0,
    operator: 0,
    discount: 0,
    total: 0,
    countryId: 0,
    waersId: 0,
    serviceTypeId: 0,
    premiumPriceTypeId: 0,
  });
  const [countryOptions, setCountryOptions] = useState([]);
  const [search, setSearch] = useState({
    bukrs: 0,
    countryId: 0,
  });
  let queryString = 'bukrs=={0.bukrs};countryId=={0.countryId}';

  let query = {
    search: format(queryString, search),
  };

  useEffect(() => {
    fetchSmsetpp();
    f4FetchCountryList();
    fetchSmsetppPremiumPriceType();
  }, []);

  useEffect(() => {
    let country = countryList.map(item => {
      return {
        key: item.countryId,
        text: item.country,
        value: item.countryId,
        currency: item.currencyId,
        currencyy: item.currency,
      };
    });
    setCountryOptions(country);
  }, [countryList]);

  useEffect(() => {
    setServiceOptionPriceList(data.service);
  }, [data]);

  useEffect(() => {
    setPremiumPriceTypeId(premium);
  }, [premium]);

  useEffect(() => {
    let service = data.type.map(item => {
      return { key: item.id, text: item.name, value: item.id };
    });
    setTypeOfService(service);
  }, [data.type]);

  const onChange = (text, value) => {
    if (text === 'companyOptions') {
      setSearch({ ...search, bukrs: parseInt(value) });
      setActiveDropdown(true);
    }
    if (text === 'countries') {
      setSearch({ ...search, countryId: parseInt(value) });
      setSecondActive(true);
    }
  };

  const onClickButton = () => {
    save();
    if (error.length === 0) {
      fetchSmsetppSearch(query);
    } else {
      setSearch({ bukrs: 0, countryId: 0 });
    }
  };

  const validate = () => {
    const errors = [];
    if (!activeDropdown) {
      errors.push(errorTable[`5${language}`]);
    }
    if (!secondActive) {
      errors.push(errorTable[`147${language}`]);
    }
    return errors;
  };

  const save = () => {
    let errors = [];
    errors = validate();
    setError(() => errors);
  };

  const onModalOpen = documents => {
    let pr = null;
    let serviceTypeDoc = null;
    const bukr = companyOptions.find(({ text }) => text === documents.bukrs);
    const countr = countryOptions.find(
      ({ text }) => text === documents.countryId,
    );
    const serviceType = typeOfService.find(
      ({ text }) => text === documents.serviceTypeId,
    );
    if (serviceType !== undefined) {
      serviceTypeDoc = parseFloat(serviceType.value);
    } else {
      serviceTypeDoc = null;
    }

    if (
      documents.premiumPriceTypeId === 'Percentage' ||
      documents.premiumPriceTypeId === 'Процент' ||
      documents.premiumPriceTypeId === 'Yüzdesi'
    ) {
      pr = pr + 1;
    } else if (
      documents.premiumPriceTypeId === 'Kartuş satışı' ||
      documents.premiumPriceTypeId === 'Number' ||
      documents.premiumPriceTypeId === 'Число'
    ) {
      pr = pr + 2;
    } else {
      pr = null;
    }
    setModalOpen(true);
    return (
      setEditWaers(countr.currencyy),
      setEditDocs({
        id: documents.id,
        dateStart: documents.dateStart,
        fc: parseFloat(documents.fc),
        mc: parseFloat(documents.mc),
        office: parseFloat(documents.office),
        master: parseFloat(documents.master),
        operator: parseFloat(documents.operator),
        discount: parseFloat(documents.discount),
        total: parseFloat(documents.total),
        bukrs: bukr.value,
        countryId: parseFloat(countr.value),
        serviceTypeId: serviceTypeDoc,
        waersId: countr.currency,
        premiumPriceTypeId: pr,
      })
    );
  };

  return (
    <Segment>
      <EditModal
        documents={editDocs}
        open={modalOpen}
        waers={editWaers}
        cancel={() => setModalOpen(false)}
      />
      <div className="setting">
        <div className="flex-container">
          <h1>{messages['setting_prices_and_premium_services']}</h1>
        </div>

        <Dropdown
          clearable="true"
          selection
          options={companyOptions}
          placeholder={messages['bukrs']}
          onClick={() => setAllDropdownActive(true)}
          onChange={(e, { value }) => onChange('companyOptions', value)}
        />

        <Dropdown
          clearable="true"
          selection
          options={activeDropdown ? countryOptions : []}
          placeholder={messages['country']}
          id="secondDropdown"
          onClick={() => setAllDropdownActive(true)}
          onChange={(e, { value }) => onChange('countries', value)}
        />
        <AddPrice />
        <button
          className="ui blue inverted button"
          onClick={onClickButton}
          style={{ marginLeft: 30 }}
        >
          <i aria-hidden="true" className="search icon"></i>{' '}
          {messages['search']}
        </button>
        <OutputErrors errors={error} />
        <br></br>
        <br></br>
        <ReactTableWrapper
          data={serviceOptionPriceList}
          columns={[
            {
              Header: () => <div style={{ textAlign: 'center' }}>id</div>,
              accessor: 'id',
              Cell: row => (
                <div style={{ textAlign: 'center' }}>{row.value}</div>
              ),
            },
            {
              Header: () => (
                <div style={{ textAlign: 'center' }}>{messages['bukrs']}</div>
              ),
              accessor: 'bukrs',
              Cell: row => (
                <div style={{ textAlign: 'center' }}>{row.value}</div>
              ),
            },
            {
              Header: () => (
                <div style={{ textAlign: 'center' }}>
                  {messages['Task.StartDate']}
                </div>
              ),
              accessor: 'dateStart',
              Cell: row => (
                <div style={{ textAlign: 'center' }}>{row.value}</div>
              ),
            },
            {
              Header: () => <div style={{ textAlign: 'center' }}>FC</div>,
              accessor: 'fc',
              Cell: row => (
                <div style={{ textAlign: 'center' }}>{row.value}</div>
              ),
            },
            {
              Header: () => <div style={{ textAlign: 'center' }}>MC</div>,
              accessor: 'mc',
              Cell: row => (
                <div style={{ textAlign: 'center' }}>{row.value}</div>
              ),
            },
            {
              Header: () => (
                <div style={{ textAlign: 'center' }}>{messages['office']}</div>
              ),
              accessor: 'office',
              Cell: row => (
                <div style={{ textAlign: 'center' }}>{row.value}</div>
              ),
            },
            {
              Header: () => (
                <div style={{ textAlign: 'center' }}>{messages['master']}</div>
              ),
              accessor: 'master',
              Cell: row => (
                <div style={{ textAlign: 'center' }}>{row.value}</div>
              ),
            },
            {
              Header: () => (
                <div style={{ textAlign: 'center' }}>
                  {messages['Operator']}
                </div>
              ),
              accessor: 'operator',
              Cell: row => (
                <div style={{ textAlign: 'center' }}>{row.value}</div>
              ),
            },
            {
              Header: () => (
                <div style={{ textAlign: 'center' }}>
                  {messages['discount']}
                </div>
              ),
              accessor: 'discount',
              Cell: row => (
                <div style={{ textAlign: 'center' }}>{row.value}</div>
              ),
            },
            {
              Header: () => (
                <div style={{ textAlign: 'center' }}>
                  {messages['totalAmount']}
                </div>
              ),
              accessor: 'total',
              Cell: row => (
                <div style={{ textAlign: 'center' }}>{row.value}</div>
              ),
            },
            {
              Header: () => (
                <div style={{ textAlign: 'center' }}>{messages['country']}</div>
              ),
              accessor: 'countryId',
              Cell: row => (
                <div style={{ textAlign: 'center' }}>{row.value}</div>
              ),
            },
            {
              Header: () => (
                <div style={{ textAlign: 'center' }}>{messages['waers']}</div>
              ),
              accessor: 'waersId',
              Cell: row => (
                <div style={{ textAlign: 'center' }}>{row.value}</div>
              ),
            },
            {
              Header: () => (
                <div style={{ textAlign: 'center' }}>
                  {messages['typeOfService']}
                </div>
              ),
              accessor: 'serviceTypeId',
              Cell: row => (
                <div style={{ textAlign: 'center' }}>{row.value}</div>
              ),
            },
            {
              Header: () => (
                <div style={{ textAlign: 'center' }}>
                  {messages['typeOfAmount']}
                </div>
              ),
              accessor: 'premiumPriceTypeId',
              Cell: row => (
                <div style={{ textAlign: 'center' }}>
                  {row.value === 'Percentage' ||
                  row.value === 'Процент' ||
                  row.value === 'Yüzdesi'
                    ? premiumPriceTypeId[0].name
                    : null}
                  {row.value === 'Kartuş satışı' ||
                  row.value === 'Number' ||
                  row.value === 'Число'
                    ? premiumPriceTypeId[1].name
                    : null}
                </div>
              ),
            },
            {
              Header: () => (
                <div style={{ textAlign: 'center' }}>{messages['toEdit']}</div>
              ),
              Cell: row => (
                <div style={{ textAlign: 'center' }}>
                  <Button
                    icon
                    inverted
                    color="blue"
                    onClick={() => onModalOpen(row.row)}
                  >
                    <Icon name="edit"></Icon>
                  </Button>
                </div>
              ),
            },
          ]}
          defaultPageSize={15}
          pages={2}
          previousText={messages['Table.Previous']}
          nextText={messages['Table.Next']}
          showPagination={true}
          className="-striped -highlight"
          pageSizeOptions={[20, 30, 40]}
          loadingText={messages['Table.Next']}
          noDataText={messages['Table.NoData']}
          rowsText={messages['Table.Rows']}
          pageText={messages['Table.Page']}
          ofText={messages['Table.Of']}
        />
      </div>
    </Segment>
  );
};

const mapStateToProps = state => {
  return {
    premium: state.serviceReducer.data.premiumPriceTypeId,
    data: state.serviceReducer.data,
    countryList: state.f4.countryList,
    companyOptions: state.userInfo.companyOptions,
    informations: state.serviceReducer.data,
  };
};

export default connect(mapStateToProps, {
  f4FetchCountryList,
  fetchSmsetpp,
  fetchSmsetppSearch,
  fetchSmsetppPremiumPriceType,
})(injectIntl(Page));
