import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';
import { Container, Segment, Form, Icon, Divider } from 'semantic-ui-react';
import {
  f4FetchCountryList,
  f4FetchBranches,
} from '../../../reference/f4/f4_action';
import { fetchSrkpisod } from './srkpisodAction';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import ReactTableServerSideWrapper from '../../../utils/ReactTableServerSideWrapper';
import {
  stringYYYYMMDDToMoment,
  momentToStringYYYYMMDD,
} from '../../../utils/helpers';
import ModalColumns from './../../../utils/ModalColumns';
import '../../service.css';
import { LinkToSmcuspor } from '../../../utils/outlink';

const Srkpiso = props => {
  const {
    intl: { messages },
    language,
    f4FetchCountryList,
    f4FetchBranches,
    branches,
    countryList,
    companyOptions,
  } = props;

  const emptyParam = {
    countryId: '',
    bukrs: '',
    branchId: '',
    product: '',
    dateStart: '',
    dateEnd: '',
  };
  const [param, setParam] = useState({ ...emptyParam });

  const initialColumns = [
    {
      Header: 'ID',
      accessor: 'id',
      checked: true,
    },
    {
      Header: 'CN',
      accessor: 'cn',
      checked: true,
    },
    {
      Header: 'Филиал',
      accessor: 'recommenderId',
      checked: true,
    },
    {
      Header: 'Заводской номер',
      accessor: '4455',
      checked: true,
    },
    {
      Header: 'Дата',
      accessor: '45',
      checked: true,
    },
    {
      Header: 'ФИО клиента',
      accessor: '46',
      checked: true,
    },
    {
      Header: 'Адрес',
      accessor: '47',
      checked: true,
    },
    {
      Header: 'Телефон',
      accessor: '48',
      checked: true,
    },
    {
      Header: 'ФИО мастера',
      accessor: '49',
      checked: true,
    },
    {
      Header: 'F1',
      accessor: '5045',
      checked: true,
    },
    {
      Header: 'F2',
      accessor: '5078',
      checked: true,
    },
    {
      Header: 'F3',
      accessor: '5120',
      checked: true,
    },
    {
      Header: 'F4',
      accessor: '5690',
      checked: true,
    },
    {
      Header: 'F5',
      accessor: '57840',
      checked: true,
    },
    {
      Header: 'Категория',
      accessor: '505',
      checked: true,
    },
    {
      Header: 'Заявка',
      accessor: '5088',
      checked: true,
    },
    {
      Header: 'Просмотр',
      accessor: '5885',
      checked: true,
      Cell: original => (
        <div style={{ textAlign: 'center' }}>
          <LinkToSmcuspor
            contractNumber={original.row.contractNumber}
            text="Просмотр"
          />
        </div>
      ),
    },
  ];

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

  const handleClickApply = () => {
    props.fetchSrkpiso({ ...param });
  };

  const [columns, setColumns] = useState([...initialColumns]);

  const finishColumns = data => {
    setColumns([...data]);
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
        <h3>
          KPI Сервис операторов - Детализация(Текущий план/Текущий
          перенос/Текущий отмена/Текущий выполненный)
        </h3>
      </Segment>
      <Form>
        <Form.Group widths="equal">
          <Form.Select
            fluid
            label="Страна"
            placeholder="Страна"
            options={countryOptions}
            onChange={(e, o) => onInputChange(o, 'country')}
            className="alignBottom"
          />

          <Form.Select
            fluid
            label="Компания"
            placeholder="Компания"
            options={companyOptions}
            onChange={(e, o) => onInputChange(o, 'bukrs')}
            className="alignBottom"
          />

          <Form.Select
            fluid
            label="Филиал"
            placeholder="Филиал"
            onChange={(e, o) => onInputChange(o, 'branchId')}
            className="alignBottom"
          />

          <Form.Select
            fluid
            label="Продукт"
            placeholder="Продукт"
            onChange={(e, o) => onInputChange(o, 'categoryId')}
            className="alignBottom"
          />
        </Form.Group>

        <Form.Group className="spaceBetween">
          <div className="flexDirectionRow">
            <Form.Field className="marginRight">
              <label>Дата с</label>
              <DatePicker
                className="date-auto-width"
                autoComplete="off"
                locale={language}
                dropdownMode="select" //timezone="UTC"
                selected={stringYYYYMMDDToMoment(param.dateStart)}
                onChange={date =>
                  setParam({
                    ...param,
                    dateStart: momentToStringYYYYMMDD(date),
                  })
                }
                maxDate={new Date()}
                dateFormat="DD.MM.YYYY"
              />
            </Form.Field>
            <Form.Field className="marginRight">
              <label>Дата по</label>
              <DatePicker
                className="date-auto-width"
                autoComplete="off"
                locale={language}
                dropdownMode="select" //timezone="UTC"
                selected={stringYYYYMMDDToMoment(param.dateEnd)}
                onChange={date =>
                  setParam({
                    ...param,
                    dateEnd: momentToStringYYYYMMDD(date),
                  })
                }
                maxDate={new Date()}
                dateFormat="DD.MM.YYYY"
              />
            </Form.Field>

            <Form.Button
              onClick={handleClickApply}
              color="blue"
              className="alignBottom"
            >
              <Icon name="search" />
              Применить
            </Form.Button>
          </div>

          <Form.Field className="alignBottom">
            <ModalColumns
              columns={initialColumns}
              finishColumns={finishColumns}
            />
          </Form.Field>
        </Form.Group>
      </Form>
      <Divider />
      <ReactTableServerSideWrapper columns={columns} />
    </Container>
  );
};

function mapStateToProps(state) {
  return {
    language: state.locales.lang,
    countryList: state.f4.countryList,
    branches: state.f4.branches,
    companyOptions: state.userInfo.companyOptions,
    srkpisodData: state.srkpisodReduce.srkpisodData,
  };
}

export default connect(mapStateToProps, {
  f4FetchCountryList,
  f4FetchBranches,
  fetchSrkpisod,
})(injectIntl(Srkpiso));
