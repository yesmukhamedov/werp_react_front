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

import {
  f4FetchCompanyOptions,
  f4fetchCategory,
} from '../../../../reference/f4/f4_action';

import { fetchSmcrldList, postSmcrldFormplan } from '../smdisAction';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import ModalColumns from './../../../../utils/ModalColumns';
import ReactTableServerSideWrapper from '../../../../utils/ReactTableServerSideWrapper';
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
    smcrldListData,
    smcrldListSum,
    footerData,
  } = props;

  console.log('smcrldListData', smcrldListData, 'smcrldListSum', smcrldListSum);

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
          Header: 'Id',
          accessor: 'id',
        },
        {
          Header: 'Страна',
          accessor: 'countryName',
        },
        {
          Header: 'Компания',
          accessor: 'bukrsName',
        },
        {
          Header: 'Филиал',
          accessor: 'branchName',
          Footer: 'Итого:',
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
          // Footer: <span>{footerData.currentF1}</span>,
          accessor: 'currentF1',
          width: 70,
        },
        {
          Header: 'F1+M1',
          // Footer: <span>{footerData.currentF1M1}</span>,
          accessor: 'currentF1M1',
          width: 70,
        },
        {
          Header: 'F2',
          // Footer: <span>{footerData.currentF2}</span>,
          accessor: 'currentF2',
          width: 70,
        },
        {
          Header: 'F2+M1',
          // Footer: <span>{footerData.currentF2M1}</span>,
          accessor: 'currentF2M1',
          width: 70,
        },
        {
          Header: 'F3',
          // Footer: <span>{footerData.currentF3}</span>,
          accessor: 'currentF3',
          width: 70,
        },
        {
          Header: 'F3+M1',
          // Footer: <span>{footerData.currentF3M1}</span>,
          accessor: 'currentF3M1',
          width: 70,
        },
        {
          Header: 'F4',
          // Footer: <span>{footerData.currentF4}</span>,
          accessor: 'currentF4',
          width: 70,
        },
        {
          Header: 'F4+M1',
          // Footer: <span>{footerData.currentF4M1}</span>,
          accessor: 'currentF4M1',
          width: 70,
        },
        {
          Header: 'M1',
          //Footer: <span>{footerData.currentM1}</span>,
          accessor: 'currentM1',
          width: 70,
        },
        {
          Header: 'Итог',
          //Footer: <span>{footerData.currentSum}</span>,
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
          //Footer: <span>{footerData.overDueF1}</span>,
          accessor: 'overDueF1',
          width: 70,
        },
        {
          Header: 'F1+M1',
          //Footer: <span>{footerData.overDueF1M1}</span>,
          accessor: 'overDueF1M1',
          width: 70,
        },
        {
          Header: 'F2',
          // Footer: <span>{footerData.overDueF2}</span>,
          accessor: 'overDueF2',
          width: 70,
        },
        {
          Header: 'F2+M1',
          //Footer: <span>{footerData.overDueF2M1}</span>,
          accessor: 'overDueF2M1',
          width: 70,
        },
        {
          Header: 'F3',
          //Footer: <span>{footerData.overDueF3}</span>,
          accessor: 'overDueF3',
          width: 70,
        },
        {
          Header: 'F3+M1',
          // Footer: <span>{footerData.overDueF3M1}</span>,
          accessor: 'overDueF3M1',
          width: 70,
        },
        {
          Header: 'F4',
          //Footer: <span>{footerData.overDueF4}</span>,
          accessor: 'overDueF4',
          width: 70,
        },
        {
          Header: 'F4+M1',
          // Footer: <span>{footerData.overDueF4M1}</span>,
          accessor: 'overDueF4M1',
          width: 70,
        },
        {
          Header: 'M1',
          // Footer: <span>{footerData.overDueM1}</span>,
          accessor: 'overDueM1',
          width: 70,
        },
        {
          Header: 'Итог',
          // Footer: <span>{footerData.overDueSum}</span>,
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
          //Footer: <span>{footerData.totalSum}</span>,
          accessor: 'totalSum',
        },
      ],
    },
    {
      Header: 'Просмотр',
      checked: true,
      accessor: '5',
      Cell: original => (
        <div style={{ textAlign: 'center' }}>
          <Icon
            color="teal"
            link
            name="search"
            onClick={() => clickViewService(original.row._original)}
          />
        </div>
      ),
    },
  ];

  useEffect(() => {
    props.f4FetchCompanyOptions();
    props.f4fetchCategory();
  }, []);

  //Применить
  const handleClickApply = () => {
    props.fetchSmcrldList({ ...param });
  };

  const formPlanClick = () => {
    props.postSmcrldFormplan({ ...param });
  };

  const [columns, setColumns] = useState([...initialColumns]);

  const finishColumns = data => {
    setColumns([...data]);
  };

  return (
    <Container fluid>
      <Form>
        <Form.Group widths="equal">
          <Form.Select
            fluid
            label="Компания"
            value={param.bukrs}
            placeholder="Компания"
            options={companyOptions}
            onChange={(e, o) => props.onInputChange(o, 'bukrs')}
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
              <label>Дата</label>
              <DatePicker
                className="date-auto-width"
                autoComplete="off"
                locale={language}
                dropdownMode="select" //timezone="UTC"
                selected={stringYYYYMMDDToMoment(param.dateAt)}
                onChange={date => props.onInputChange(date, 'date')}
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
      <ReactTableServerSideWrapper
        filterable={true}
        data={smcrldListData}
        columns={columns}
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
