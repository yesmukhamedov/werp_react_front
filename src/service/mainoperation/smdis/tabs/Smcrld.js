import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';
import {
  Container,
  Segment,
  Button,
  Popup,
  Icon,
  Form,
  Divider,
} from 'semantic-ui-react';
import moment from 'moment';

import {
  f4FetchCompanyOptions,
  f4fetchCategory,
} from '../../../../reference/f4/f4_action';
import OutputErrors from '../../../../general/error/outputErrors';
import { fetchSmcrldList, postSmcrldFormplan } from '../smdisAction';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import ModalColumns from './../../../../utils/ModalColumns';
import ReactTableWrapper from '../../../../utils/ReactTableWrapper';
import {
  momentToStringYYYYMMDD,
  stringYYYYMMDDToMoment,
} from '../../../../utils/helpers';

const Smcrld = props => {
  const {
    intl: { messages },
    language,
    category,
    companyOptions = [],
    clickViewService,
    param,
    smcrldListData = [],
    smcrldListSum,
  } = props;

  const [sum, setSum] = useState({});

  useEffect(() => {
    setSum({ ...smcrldListSum });
  }, [smcrldListSum]);

  //Get category options
  const categoryOptions = category.map(item => {
    return {
      key: item.id,
      text: item.name,
      value: item.id,
    };
  });

  const initialColumns = [
    {
      columns: [
        {
          Header: 'Филиал',
          accessor: 'branchName',
          checked: true,
          Footer: <strong>{'Итого:'}</strong>,
        },
      ],
      fixed: 'left',
    },
    {
      columns: [
        {
          Header: 'Страна',
          accessor: 'countryName',
          checked: true,
        },
        {
          Header: 'Компания',
          accessor: 'bukrsName',
          checked: true,
        },
      ],
      checked: true,
      accessor: '1',
    },
    {
      // Текущий group
      Header: 'Текущий',
      headerStyle: { background: 'teal', color: '#fff' },
      // Текущий columns
      columns: [
        {
          Header: 'F1',
          accessor: 'currentF1',
          // width: 70,
          checked: true,
          Footer: (
            <span>
              <strong>{smcrldListSum.currentF1}</strong>
            </span>
          ),
        },
        {
          Header: 'F1+M1',
          checked: true,
          Footer: (
            <span>
              <strong>{smcrldListSum.currentF1M1}</strong>
            </span>
          ),
          accessor: 'currentF1M1',
          width: 70,
        },
        {
          Header: 'F2',
          checked: true,
          Footer: (
            <span>
              <strong>{smcrldListSum.currentF2}</strong>
            </span>
          ),
          accessor: 'currentF2',
          width: 70,
        },
        {
          Header: 'F2+M1',
          checked: true,
          Footer: (
            <span>
              <strong>{smcrldListSum.currentF2M1}</strong>
            </span>
          ),
          accessor: 'currentF2M1',
          width: 70,
        },
        {
          Header: 'F3',
          checked: true,
          Footer: (
            <span>
              <strong>{smcrldListSum.currentF3}</strong>
            </span>
          ),
          accessor: 'currentF3',
          width: 70,
        },
        {
          Header: 'F3+M1',
          checked: true,
          Footer: (
            <span>
              <strong>{smcrldListSum.currentF3M1}</strong>
            </span>
          ),
          accessor: 'currentF3M1',
          width: 70,
        },
        {
          Header: 'F4',
          checked: true,
          Footer: (
            <span>
              <strong>{smcrldListSum.currentF4}</strong>
            </span>
          ),
          accessor: 'currentF4',
          width: 70,
        },
        {
          Header: 'F4+M1',
          checked: true,
          Footer: (
            <span>
              <strong>{smcrldListSum.currentF4M1}</strong>
            </span>
          ),
          accessor: 'currentF4M1',
          width: 70,
        },
        {
          Header: 'M1',
          checked: true,
          Footer: (
            <span>
              <strong>{smcrldListSum.currentM1}</strong>
            </span>
          ),
          accessor: 'currentM1',
          width: 70,
        },
        {
          Header: 'Итог',
          checked: true,
          Footer: (
            <span>
              <strong>{smcrldListSum.currentSum}</strong>
            </span>
          ),
          accessor: 'currentSum',
        },
      ],
      checked: true,
      accessor: '3',
    },
    {
      // Просроченный group
      Header: 'Просроченный',
      headerStyle: {
        background: 'red',
        color: '#fff',
        height: '2rem',
      },
      // Просроченный columns
      columns: [
        {
          Header: 'F1',
          checked: true,
          Footer: (
            <span>
              <strong>{smcrldListSum.overDueF1}</strong>
            </span>
          ),
          accessor: 'overDueF1',
          width: 70,
        },
        {
          Header: 'F1+M1',
          checked: true,
          Footer: (
            <span>
              <strong>{smcrldListSum.overDueF1M1}</strong>
            </span>
          ),
          accessor: 'overDueF1M1',
          checked: true,
          width: 70,
        },
        {
          Header: 'F2',
          Footer: (
            <span>
              <strong>{smcrldListSum.overDueF2}</strong>
            </span>
          ),
          accessor: 'overDueF2',
          checked: true,
          width: 70,
        },
        {
          Header: 'F2+M1',
          checked: true,
          Footer: (
            <span>
              <strong>{smcrldListSum.overDueF2M1}</strong>
            </span>
          ),
          accessor: 'overDueF2M1',
          width: 70,
        },
        {
          Header: 'F3',
          checked: true,
          Footer: (
            <span>
              <strong>{smcrldListSum.overDueF3}</strong>
            </span>
          ),
          accessor: 'overDueF3',
          width: 70,
        },
        {
          Header: 'F3+M1',
          checked: true,
          Footer: (
            <span>
              <strong>{smcrldListSum.overDueF3M1}</strong>
            </span>
          ),
          accessor: 'overDueF3M1',
          width: 70,
        },
        {
          Header: 'F4',
          checked: true,
          Footer: (
            <span>
              <strong>{smcrldListSum.overDueF4}</strong>
            </span>
          ),
          accessor: 'overDueF4',
          width: 70,
        },
        {
          Header: 'F4+M1',
          checked: true,
          Footer: (
            <span>
              <strong>{smcrldListSum.overDueF4M1}</strong>
            </span>
          ),
          accessor: 'overDueF4M1',
          width: 70,
        },
        {
          Header: 'M1',
          checked: true,
          Footer: (
            <span>
              <strong>{smcrldListSum.overDueM1}</strong>
            </span>
          ),
          accessor: 'overDueM1',
          width: 70,
        },
        {
          Header: 'Итог',
          checked: true,
          Footer: (
            <span>
              <strong>{smcrldListSum.overDueSum}</strong>
            </span>
          ),
          accessor: 'overDueSum',
          width: 70,
        },
      ],
      checked: true,
    },
    {
      // Общий
      Header: 'Общий',
      checked: true,
      accessor: '4',

      // Second group columns
      columns: [
        {
          Header: 'Итог',
          checked: true,
          Footer: (
            <span>
              <strong>{smcrldListSum.totalSum}</strong>
            </span>
          ),
          accessor: 'totalSum',
        },
      ],
    },
    {
      Header: 'Просмотр',
      checked: true,
      accessor: '5',
      columns: [
        {
          Cell: original => (
            <div style={{ textAlign: 'center' }}>
              <Icon
                color="teal"
                link
                name="search"
                onClick={() => {
                  clickViewService(original.row._original);
                }}
              />
            </div>
          ),
          width: 50,
        },
      ],
      fixed: 'right',
    },
  ];

  useEffect(() => {
    props.f4FetchCompanyOptions();
    props.f4fetchCategory();
  }, []);

  //Применить
  const handleClickApply = () => {
    props.validate();
    const { bukrsId, categoryId, dateAt } = param;
    if (bukrsId !== '' && categoryId !== '' && dateAt !== null) {
      props.fetchSmcrldList({ ...param });
    }
  };

  const formPlanClick = () => {
    props.postSmcrldFormplan({ ...param });
  };
  const [columns, setColumns] = useState([...initialColumns]);

  const finishColumns = data => {
    setColumns([...data]);
  };

  let col = [];
  initialColumns.map(item => {
    if (item.columns != undefined || item.columns != null) {
      item.columns.map(item => {
        col.push(item);
      });
    }
  });

  return (
    <Container fluid>
      <Form>
        <Form.Group widths="equal">
          <Form.Select
            fluid
            label="Компания"
            value={param.bukrsId}
            placeholder="Компания"
            options={companyOptions}
            onChange={(e, o) => props.onInputChange(o, 'bukrsId')}
            className="alignBottom"
          />

          <Form.Select
            fluid
            label="Категория товара"
            placeholder="Категория товара"
            value={param.categoryId}
            options={categoryOptions}
            onChange={(e, o) => props.onInputChange(o, 'categoryId')}
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
                placeholderText={messages['date']}
                dropdownMode="select" //timezone="UTC"
                selected={
                  param.dateAt === null
                    ? ''
                    : stringYYYYMMDDToMoment(param.dateAt)
                }
                onChange={date => props.onInputChange(date, 'date')}
                dateFormat="DD.MM.YYYY"
                showMonthYearPicker
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
            <ModalColumns columns={col} finishColumns={finishColumns} />
          </Form.Field>
        </Form.Group>
        <OutputErrors errors={props.error} />
      </Form>
      <Divider />
      <ReactTableWrapper
        data={smcrldListData}
        columns={initialColumns}
        pageSize={smcrldListData.length ? smcrldListData.length : 20}
      />
      <Segment textAlign="right">
        <Popup
          size="mini"
          content="Сформировать план"
          trigger={
            <Button onClick={formPlanClick} color="teal">
              Формировать
            </Button>
          }
        />
        {/* <Popup
          size="mini"
          content="Применить оканчательные условия"
          trigger={<Button color="blue">Применить</Button>}
        /> */}
      </Segment>
    </Container>
  );
};

function mapStateToProps(state) {
  return {
    language: state.locales.lang,
    companyOptions: state.userInfo.companyOptions,
    category: state.f4.category,
    staff: state.f4.staffList,
    smcrldListData: state.smdisReducer.smcrldListData,
    smcrldListSum: state.smdisReducer.smcrldListSum,
    formPlanList: state.smdisReducer.formPlanList,
  };
}

export default connect(mapStateToProps, {
  f4FetchCompanyOptions,
  f4fetchCategory,
  fetchSmcrldList,
  postSmcrldFormplan,
})(injectIntl(Smcrld));
