import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';
import {
  Grid,
  Dropdown,
  Container,
  Segment,
  Form,
  Button,
  Icon,
  Divider,
} from 'semantic-ui-react';
import {
  f4FetchCountryList,
  f4FetchBranches,
} from '../../../reference/f4/f4_action';
import { fetchSrkpiso } from './srkpisoAction';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import moment from 'moment';
import ReactTableServerSideWrapper from '../../../utils/ReactTableServerSideWrapper';
require('moment/locale/ru');
require('moment/locale/tr');

const Srkpiso = props => {
  const {
    intl: { messages },
    language,
    fetchSrkpiso,
    f4FetchCountryList,
    f4FetchBranches,
    branches,
    countryList,
    companyOptions,
  } = props;

  console.log('branches', branches, 'countryList', countryList);
  let columns = [
    {
      Header: 'ID',
      accessor: '1',
    },

    {
      Header: 'Филиал',
      accessor: '2',
    },

    {
      Header: 'Оператор',
      accessor: '3',
    },

    {
      Header: 'Текущий план',
      accessor: '4',
    },

    {
      Header: 'Текущий перенос',
      accessor: '5',
    },

    {
      Header: 'Текущий отмена',
      accessor: '6',
    },

    {
      Header: 'Текущий выполнен',
      accessor: '7',
    },

    {
      Header: 'Просроченный план',
      accessor: '8',
    },

    {
      Header: 'Просроченный перенос',
      accessor: '9',
    },

    {
      Header: 'Просроченный отмена',
      accessor: '10',
    },

    {
      Header: 'Просроченный выполнен',
      accessor: '11',
    },

    {
      Header: 'KPI по %',
      accessor: '12',
    },
  ];

  const emptyParam = {
    countryId: '',
    bukrs: '',
    branchId: '',
    product: '',
    date: '',
  };
  const [param, setParam] = useState({ ...emptyParam });

  const [date, setDate] = useState(moment(new Date()));

  useEffect(() => {
    f4FetchCountryList();
    f4FetchBranches();
  }, []);

  const countryOptions = countryList.map(item => {
    return {
      key: parseInt(item.countryId, 10),
      text: `${item.country}`,
      value: parseInt(item.countryId, 10),
    };
  });
  const onInputChange = (o, fieldName) => {
    setParam(prev => {
      const prevParam = { ...prev };
      switch (fieldName) {
        case 'countryId':
          prevParam.country = o.value;
          break;
        case 'bukrs':
          prevParam.bukrs = o.value;
          break;
        case 'branchId':
          prevParam.branchId = o.value;
          break;

        case 'date':
          prevParam.date = o.value;
          break;
        default:
          prevParam[fieldName] = o.value;
      }
      return prevParam;
    });
  };

  const handleSubmit = () => {
    props.fetchSrkpiso({ ...param });
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
      <Segment>KPI Сервис операторов</Segment>
      <Form onSubmit={handleSubmit}>
        <Grid columns={6}>
          <Grid.Column>
            <label>{messages['country']}</label>
            <Dropdown
              fluid
              search
              selection
              onChange={(e, o) => onInputChange(o, 'countryId')}
              placeholder={messages['country']}
              options={countryOptions}
            />
          </Grid.Column>

          <Grid.Column>
            <label>{messages['bukrs']} </label>
            <Dropdown
              fluid
              search
              selection
              onChange={(e, o) => onInputChange(o, 'bukrs')}
              placeholder={messages['bukrs']}
              options={companyOptions}
            />
          </Grid.Column>

          <Grid.Column>
            <label>{messages['brnch']}</label>
            <Dropdown
              fluid
              search
              selection
              onChange={(e, o) => onInputChange(o, 'branchId')}
              placeholder={messages['brnch']}
            />
          </Grid.Column>

          <Grid.Column>
            <label>Продукт</label>
            <Dropdown
              fluid
              search
              selection
              onChange={(e, o) => onInputChange(o, 'branchId')}
              placeholder={messages['brnch']}
            />
          </Grid.Column>
          <Grid.Column>
            <label>{messages['Form.Date']}</label>
            <DatePicker
              autoComplete="off"
              locale={language}
              dropdownMode="select" //timezone="UTC"
              dateFormat="DD/MM/YYYY"
              maxDate={new Date()}
              selected={date}
              onChange={date => setDate(date)}
            />
          </Grid.Column>

          <Grid.Column verticalAlign="bottom">
            <Button color="teal" onSubmit={handleSubmit}>
              <Icon name="search" />
              {messages['search']}
            </Button>
          </Grid.Column>
        </Grid>
        <Divider />

        <ReactTableServerSideWrapper columns={columns} />
      </Form>
    </Container>
  );
};

function mapStateToProps(state) {
  return {
    language: state.locales.lang,
    countryList: state.f4.countryList,
    branches: state.f4.branches,
    companyOptions: state.userInfo.companyOptions,
  };
}

export default connect(mapStateToProps, {
  f4FetchCountryList,
  f4FetchBranches,
  fetchSrkpiso,
})(injectIntl(Srkpiso));
