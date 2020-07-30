import React, { useState, useEffect } from 'react';
import {
  Segment,
  Dropdown,
  Button,
  Icon,
  Divider,
  Form,
  Container,
} from 'semantic-ui-react';
import ReactTableWrapperFixedColumns from '../../../utils/ReactTableWrapperFixedColumns';
import './index.css';
import { connect } from 'react-redux';
import 'react-table/react-table.css';
import AddPrice from './AddPrice';
import { injectIntl } from 'react-intl';
import {
  f4FetchCountryList,
  f4FetchConTypeList,
  f4FetchServicType,
} from '../../../reference/f4/f4_action';
import EditModal from './editPrice';
import {
  fetchSmsetpp,
  fetchSmsetppPremiumPriceType,
  fetchSmsetppType,
  clearDynObjService,
  fetchSmsetppHistory,
  fetchSmsetppGetProductList,
} from '../../serviceAction';
import OutputErrors from '../../../general/error/outputErrors';
import { errorTableText, moneyInputHanler } from '../../../utils/helpers';
import { doGet } from '../../../utils/apiActions';
import TextAlignCenter from '../../../utils/TextAlignCenter';

const Smsetpp = props => {
  const {
    data,
    intl: { messages },
    countryList = [],
    companyOptions = [],
    f4FetchCountryList,
    fetchSmsetpp,
    fetchSmsetppHistory,
    fetchSmsetppPremiumPriceType,
    serviceType = [],
    fetchSmsetppType,
    //clearDynObjService,
    smsetppHistory = [],
    //smsetppServiceType = [],
    productList = [],
    //premium,
  } = props;

  const [error, setError] = useState([]);
  const [activeDropdown, setActiveDropdown] = useState(false);
  // const [typeOfService, setTypeOfService] = useState([]);
  const [secondActive, setSecondActive] = useState(false);
  const [serviceOptionPriceList, setServiceOptionPriceList] = useState([]);
  const [countryOptions, setCountryOptions] = useState([]);
  const [modalOpenEdit, setModalOpenEdit] = useState(false);

  const [informations, setInformations] = useState({});

  const [dataEdit, setDataEdit] = useState({});

  useEffect(() => {
    if (Object.keys(dataEdit).length > 0) {
      setInformations({ ...dataEdit });
    }
  }, [dataEdit]);

  const [search, setSearch] = useState({
    bukrs: 0,
    countryId: 0,
    serviceTypeId: null,
    fc: null,
    mc: null,
  });

  const serviceTypeOptions = serviceType.map(item => {
    return {
      key: parseInt(item.id),
      text: item.name,
      value: parseInt(item.id),
    };
  });

  useEffect(() => {
    // clearDynObjService();
    f4FetchCountryList();
    //fetchSmsetpp();
    fetchSmsetppPremiumPriceType();
    fetchSmsetppType();
    props.f4FetchServicType();
    props.f4FetchConTypeList();
  }, []);

  useEffect(() => {
    let country = countryList.map(item => {
      return {
        key: item.countryId,
        text: item.country,
        value: item.countryId,
        currencyid: item.currencyId,
        currency: item.currency,
      };
    });
    setCountryOptions(country);
  }, [countryList]);

  const fcOptions = [
    { key: 0, text: '0', value: 0 },
    { key: 1, text: '1', value: 1 },
    { key: 2, text: '2', value: 2 },
    { key: 3, text: '3', value: 3 },
    { key: 4, text: '4', value: 4 },
  ];
  const mcOptions = [
    { key: 0, text: '0', value: 0 },
    { key: 1, text: '1', value: 1 },
  ];

  const [statusServiceType, setStatusServiceType] = useState(true);

  useEffect(() => {
    if (search.serviceTypeId === 1) {
      setStatusServiceType(false);
    } else {
      setStatusServiceType(true);
    }
  }, [search]);

  useEffect(() => {
    if (data.service !== undefined) {
      setServiceOptionPriceList(data.service);
    }
  }, [data]);

  // useEffect(() => {
  //   let service = serviceType.map(item => {
  //     return { key: item.id, text: item.name, value: item.id };
  //   });
  //   //setTypeOfService(service);
  // }, [serviceType]);

  const onChange = (text, value) => {
    if (text === 'companyOptions') {
      setSearch({ ...search, bukrs: value });
      setActiveDropdown(true);
    }
    if (text === 'countries') {
      setSearch({ ...search, countryId: value });
      setSecondActive(true);
    }
    if (text === 'serviceType') {
      setSearch({ ...search, serviceTypeId: value });
      setSecondActive(true);
    }
    if (text === 'fc') {
      setSearch({ ...search, fc: value });
      setSecondActive(true);
    }
    if (text === 'mc') {
      setSearch({ ...search, mc: value });
      setSecondActive(true);
    }
  };

  const onClickButton = () => {
    const errors = [];
    if (!activeDropdown) {
      errors.push(errorTableText(5));
    }
    if (!secondActive) {
      errors.push(errorTableText(147));
    }
    if (errors.length === 0) {
      fetchSmsetpp(search);
      fetchSmsetppHistory(search);
    }
    setError(errors);
  };

  // const getProduct = param => {
  //   let bukrs = param;
  //   props.fetchSmsetppGetProductList(bukrs);
  // };

  const getProductOptions = (productList, bukrs, countryId) => {
    if (!productList || !bukrs || !countryId) {
      return [];
    }
    let productArray = [],
      j = 0,
      i = 0;

    if (countryId !== 9) {
      for (i = 0; i < productList.length; i++) {
        if (productList[i].bukrs === bukrs && productList[i].countryId !== 9) {
          productArray[j] = productList[i];
          j++;
        }
      }
    } else {
      for (i = 0; i < productList.length; i++) {
        if (productList[i].bukrs === bukrs) {
          productArray[j] = productList[i];
          j++;
        }
      }
    }

    let out = productArray.map(c => {
      return {
        key: c.contract_type_id,
        text: c.name,
        value: c.matnr,
      };
    });
    return out;
  };

  let historyColumns = [
    {
      Header: () => <TextAlignCenter text="id" />,
      accessor: 'id',
      Cell: row => <TextAlignCenter text={row.value} />,
      width: 70,
    },
    {
      Header: () => <TextAlignCenter text="Автор" />,
      accessor: 'fullname',
      Cell: row => <TextAlignCenter text={row.value} />,
    },
    {
      Header: () => <TextAlignCenter text="Тип операции" />,
      accessor: 'revType',
      Cell: row => <TextAlignCenter text={row.value} />,
    },
    {
      Header: () => <TextAlignCenter text="Дата операции" />,
      accessor: 'revsttmp',
      Cell: row => <TextAlignCenter text={row.value} />,
    },
    {
      Header: () => <TextAlignCenter text={messages['bukrs']} />,
      accessor: 'bukrs',
      Cell: row => <TextAlignCenter text={row.value} />,
    },
    {
      Header: () => <TextAlignCenter text="Продукт" />,
      accessor: 'productId',
      Cell: row => <TextAlignCenter text={row.value} />,
    },
    {
      Header: () => <TextAlignCenter text={messages['Task.StartDate']} />,
      accessor: 'dateStart',
      Cell: row => <TextAlignCenter text={row.value} />,
    },
    {
      Header: () => <TextAlignCenter text="FC" />,
      accessor: 'fc',
      Cell: row => <TextAlignCenter text={row.value} />,
      width: 50,
    },
    {
      Header: () => <TextAlignCenter text="MC" />,
      accessor: 'mc',
      Cell: row => <TextAlignCenter text={row.value} />,
      width: 50,
    },
    {
      Header: () => <TextAlignCenter text={messages['office']} />,
      accessor: 'office',
      Cell: row => <TextAlignCenter text={row.value} />,
    },
    {
      Header: () => <TextAlignCenter text={messages['master']} />,
      accessor: 'master',
      Cell: row => <TextAlignCenter text={row.value} />,
    },
    {
      Header: () => <TextAlignCenter text={messages['Operator']} />,
      accessor: 'operator',
      Cell: row => <TextAlignCenter text={row.value} />,
    },
    {
      Header: () => <TextAlignCenter text={messages['discount']} />,
      accessor: 'discount',
      Cell: row => <TextAlignCenter text={row.value} />,
    },
    {
      Header: () => <TextAlignCenter text={messages['totalAmount']} />,
      accessor: 'total',
      Cell: row => <TextAlignCenter text={row.value} />,
    },
    {
      Header: () => <TextAlignCenter text={messages['country']} />,
      accessor: 'countryId',
      Cell: row => <TextAlignCenter text={row.value} />,
    },
    {
      Header: () => <TextAlignCenter text={messages['waers']} />,
      accessor: 'waersId',
      Cell: row => <TextAlignCenter text={row.value} />,
      width: 70,
    },
    {
      Header: () => <TextAlignCenter text={messages['typeOfService']} />,
      accessor: 'serviceTypeId',
      Cell: row => <TextAlignCenter text={row.value} />,
    },
    {
      Header: () => <TextAlignCenter text={messages['typeOfAmount']} />,
      accessor: 'premiumPriceTypeId',
      Cell: row => <TextAlignCenter text={row.value} />,
    },
  ];

  const onClickEdit = value => {
    setModalOpenEdit(true);
    doGet(`smsetpp/${value}`).then(({ data }) => {
      setDataEdit(data.data);
    });
  };

  const onChangeEditModal1 = (value, fieldName) => {
    switch (fieldName) {
      //Компания
      case 'bukrs':
        setInformations({ ...informations, bukrs: value });
        break;

      //Страна
      case 'countryId':
        console.log('countryId', value);
        setInformations({ ...informations, countryId: value });
        break;

      //Продукт
      case 'productId':
        console.log('productId', value);
        if (value === 0) {
          setInformations({ ...informations, productId: null });
        } else {
          setInformations({ ...informations, productId: value });
        }

        break;

      //Вид сервиса
      case 'serviceTypeIdEdit':
        console.log('serviceTypeIdEdit', value);
        setInformations({ ...informations, serviceTypeId: value });
        break;

      //Вид суммы
      case 'typeOfSum':
        console.log('typeOfSum', value);
        setInformations({ ...informations, typeOfSum: value });
        break;

      //Дата начало
      case 'dateStart':
        console.log('date', value);
        setInformations({ ...informations, dateStart: value });
        break;

      //FC
      case 'fc':
        console.log('fc', value);
        setInformations({ ...informations, fc: parseInt(value) });
        break;

      //MC
      case 'mc':
        console.log('mc', value);
        setInformations({ ...informations, mc: parseInt(value) });
        break;

      case 'saveEdit':
        setModalOpenEdit(false);
    }
  };

  const onChangeEditModal = (value, fieldName) => {
    let money = moneyInputHanler(value, 2);
    let setValue = parseFloat(money);
    switch (fieldName) {
      //Общая сумма
      case 'total':
        console.log('setValue total', setValue);
        setInformations({
          ...informations,
          total: setValue,
          office: parseFloat(
            setValue -
              (informations.master +
                informations.operator +
                informations.discount),
          ),
        });

        break;

      //Мастер сумма
      case 'master':
        setInformations({
          ...informations,
          master: setValue,
          // office:
          //   informations.total -
          //   (parseInt(newVal) + informations.operator + informations.discount),

          office: parseFloat(
            informations.total -
              (setValue + informations.operator + informations.discount),
          ),
        });

        break;

      //Оператор сумма
      case 'operator':
        setInformations({
          ...informations,
          operator: setValue,
          office: parseFloat(
            informations.total -
              (setValue + informations.master + informations.discount),
          ),
        });

        break;

      //Скидка сумма
      case 'discount':
        setInformations({
          ...informations,
          discount: setValue,
          // office:
          //   informations.total -
          //   (informations.master + informations.operator + parseInt(newVal)),
          office: parseFloat(
            informations.total -
              (setValue + informations.master + informations.operator),
          ),
        });

        break;
    }
  };

  const onhandleCancel = () => {
    setModalOpenEdit(false);
    //setTest(false);
    setInformations({});
  };
  const [statusServiceTypeEdit, setStatusServiceTypeEdit] = useState(false);

  useEffect(() => {
    if (informations.serviceTypeId === 1) {
      setStatusServiceTypeEdit(false);
    } else {
      setStatusServiceTypeEdit(true);
      setInformations({
        ...informations,
        fc: 0,
        mc: 0,
      });
    }
  }, [informations.serviceTypeId]);

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
      <Segment className="flex-container">
        <h2>{messages['setting_prices_and_premium_services']}</h2>
      </Segment>

      <Form>
        <div className="justifySpaceBetween">
          <Form.Group className="alignBottom">
            <Form.Field required>
              <label>{messages['bukrs']}</label>
              <Dropdown
                clearable="true"
                selection
                options={companyOptions}
                placeholder={messages['bukrs']}
                onChange={(e, { value }) => onChange('companyOptions', value)}
              />
            </Form.Field>

            <Form.Field required>
              <label>{messages['country']}</label>
              <Dropdown
                clearable="true"
                selection
                options={activeDropdown ? countryOptions : []}
                placeholder={messages['country']}
                onChange={(e, { value }) => onChange('countries', value)}
              />
            </Form.Field>

            <Form.Field>
              <label>Вид сервиса</label>
              <Dropdown
                clearable="true"
                selection
                options={serviceTypeOptions}
                placeholder="Вид сервиса"
                onChange={(e, { value }) => onChange('serviceType', value)}
              />
            </Form.Field>

            <Form.Field>
              <label>FC</label>
              <Dropdown
                disabled={statusServiceType}
                clearable="true"
                selection
                options={fcOptions}
                placeholder="FC"
                onChange={(e, { value }) => onChange('fc', value)}
              />
            </Form.Field>

            <Form.Field>
              <label>MC</label>
              <Dropdown
                disabled={statusServiceType}
                clearable="true"
                selection
                options={mcOptions}
                placeholder="MC"
                onChange={(e, { value }) => onChange('mc', value)}
              />
            </Form.Field>
            <Form.Button onClick={onClickButton} color="blue">
              <Icon name="search"></Icon>
              {messages['search']}
            </Form.Button>
          </Form.Group>
          <Form.Group className="alignBottom">
            <AddPrice
              param={
                search.bukrs !== 0 && search.countryId !== 0 ? search : null
              }
              serviceTypeOptions={serviceTypeOptions}
              search={search}
              productList={productList}
              getProductOptions={getProductOptions}
            />
          </Form.Group>
        </div>
        <OutputErrors errors={error} />

        <ReactTableWrapperFixedColumns
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
              Header: () => <div style={{ textAlign: 'center' }}>Продукт</div>,
              accessor: 'productId',
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
              accessor: 'waers',
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
                <div style={{ textAlign: 'center' }}>{row.value}</div>
              ),
            },
            {
              Header: () => (
                <div style={{ textAlign: 'center' }}>{messages['toEdit']}</div>
              ),
              filterable: false,
              fixed: 'right',
              Cell: ({ row }) => (
                <div style={{ textAlign: 'center' }}>
                  <Button
                    color="blue"
                    inverted
                    icon="edit"
                    onClick={() => onClickEdit(row.id)}
                  />
                </div>
              ),
            },
          ]}
          defaultPageSize={10}
          showPagination={true}
          pageSizeOptions={[10, 20, 30, 40]}
        />
        <Divider />
        <Segment>
          <h1>История редактирования</h1>
        </Segment>
        <ReactTableWrapperFixedColumns
          data={smsetppHistory}
          columns={historyColumns}
          pageSize={smsetppHistory.length < 10 ? smsetppHistory.length : 10}
          showPagination={true}
          pageSizeOptions={[10, 20, 30, 40]}
        />
        <EditModal
          param={search.bukrs !== 0 && search.countryId !== 0 ? search : null}
          informations={informations}
          serviceTypeOptions={serviceTypeOptions}
          productList={productList}
          getProductOptions={getProductOptions}
          getProduct
          modalOpenEdit={modalOpenEdit}
          onChangeEditModal={onChangeEditModal}
          onhandleCancel={onhandleCancel}
          onChangeEditModal1={onChangeEditModal1}
          statusServiceTypeEdit={statusServiceTypeEdit}
        />
      </Form>
    </Container>
  );
};

const mapStateToProps = state => {
  return {
    premium: state.serviceReducer.dynamicObject.premiumPriceTypeId,
    data: state.serviceReducer.dynamicObject,
    countryList: state.f4.countryList,
    companyOptions: state.userInfo.companyOptions,
    serviceType: state.f4.serviceType,
    smsetppHistory: state.serviceReducer.dynamicObject.smsetppHistory,
    smsetppServiceType: state.serviceReducer.dynamicObject.smsetppServiceType,
    productList: state.f4.contractTypeList,
  };
};

export default connect(mapStateToProps, {
  f4FetchCountryList,
  fetchSmsetpp,
  fetchSmsetppPremiumPriceType,
  fetchSmsetppType,
  clearDynObjService,
  fetchSmsetppHistory,
  f4FetchConTypeList,
  fetchSmsetppGetProductList,
  f4FetchServicType,
})(injectIntl(Smsetpp));
