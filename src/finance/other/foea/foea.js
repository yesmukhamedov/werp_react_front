//finance other
//foea
import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';

import { Container, Header, Grid, Segment, Menu } from 'semantic-ui-react';

import FoeaSearch from './foeaSearch';
import FoeaOutput from './foeaOutput';
import {
  clearAnyObject,
  fetchFoeaOutputTableAction,
  fetchFoeaDetailTableAction,
  processSelectedItemsAction,
  changeFoeaSearchParamsAction,
  CLEAR_FOEA_OUTPUTTABLE,
  CLEAR_FOEA,
} from '../../fa_action';

import OutputErrors from '../../../general/error/outputErrors';

import moment from 'moment';

const Foea = props => {
  const tcode = 'FOEA';

  const {
    companyOptions = [],
    branchOptions = [],
    intl: { messages },
    language,
    clearAnyObject,
    fetchFoeaOutputTableAction,
    fetchFoeaDetailTableAction,
    processSelectedItemsAction,
    outputTable,
    detailTable,
    searchParams,
    changeFoeaSearchParamsAction,
  } = props;

  const [activeIndex, setActiveIndex] = useState(0);
  const [errors, setErrors] = useState([]);
  const [fetchingOutputTable, setFetchingOutputTable] = useState(false);
  const [fetchingDetailTable, setFetchingDetailTable] = useState(false);
  const [processingSelectedItems, setProcessingSelectedItems] = useState(false);
  const [statuses, setStatuses] = useState([]);
  const [types, setTypes] = useState([]);

  //componentDidMount
  useEffect(() => {
    let tempStatuses = [
      { key: 0, value: 0, text: messages['created'], isSelected: true },
      { key: 1, value: 1, text: messages['approved'] },
      { key: 2, value: 2, text: messages['rejected'] },
    ];

    let tempTypes = [
      {
        key: 'AE',
        value: 'AE',
        text: messages['blartTypeAE'],
        isSelected: true,
      },
      {
        key: 'KP',
        value: 'KP',
        text: messages['blartTypeKP'],
        isSelected: true,
      },
      {
        key: 'OR',
        value: 'OR',
        text: messages['blartTypeOR'],
        isSelected: true,
      },
      {
        key: 'DP',
        value: 'DP',
        text: messages['blartTypeDP'],
        isSelected: true,
      },
      {
        key: 'G2',
        value: 'G2',
        text: messages['blartTypeG2'],
        isSelected: true,
      },
      {
        key: 'IF',
        value: 'IF',
        text: messages['blartTypeIF'],
        isSelected: true,
      },
      {
        key: 'ZK',
        value: 'ZK',
        text: messages['blartTypeZK'],
        isSelected: true,
      },
      {
        key: 'ZD',
        value: 'ZD',
        text: messages['blartTypeZD'],
        isSelected: true,
      },
    ];

    let date = new Date(),
      year = date.getFullYear(),
      month = date.getMonth();
    let firstDay = new Date(year, month, 1);
    let lastDay = new Date(year, month + 1, 0);

    let searchParams = {
      bukrs: '',
      bldatFrom: moment(firstDay).format('YYYY-MM-DD'),
      bldatTo: moment(lastDay).format('YYYY-MM-DD'),
      selectedBranches: [],
      selectedStatuses: tempStatuses
        .filter(fel => fel.isSelected)
        .map(mal => mal),
      selectedTypes: tempTypes.filter(fel => fel.isSelected).map(mal => mal),
    };

    setTypes(tempTypes);
    setStatuses(tempStatuses);
    changeFoeaSearchParamsAction(searchParams);
    //unmount
    return () => {
      clearAnyObject(CLEAR_FOEA);
    };
  }, []);

  const fetchOutputTable = () => {
    // console.log(params, 'params');
    // let branchIds = searchParams.selectedBranches
    //   .map(element => element.value)
    //   .join();

    // let statuses = searchParams.selectedStatuses
    //   .map(element => element.value)
    //   .join();
    // let types = searchParams.selectedTypes.map(element => element.value).join();
    let newParams = {
      bukrs: searchParams.bukrs,
      bldatFrom: searchParams.bldatFrom,

      bldatTo: searchParams.bldatTo,
      selectedBranches: searchParams.selectedBranches,
      selectedStatuses: searchParams.selectedStatuses,
      selectedTypes: searchParams.selectedTypes,
    };

    let errors = [];
    errors = validate(newParams);
    if (errors === null || errors === undefined || errors.length === 0) {
      // console.log(newParams, 'newParams');
      fetchFoeaOutputTableAction(
        newParams,
        () => setFetchingOutputTable(true),
        () => {
          setActiveIndex(1);
          setFetchingOutputTable(false);
        },
        () => setFetchingOutputTable(false),
      );
    }
    setErrors(errors);
  };

  const validate = newParams => {
    // getter
    // console.log(localStorage.getItem('language'),'error');
    const {
      bukrs,
      bldatFrom,
      bldatTo,
      selectedStatuses,
      selectedTypes,
    } = newParams;

    const errorTable = JSON.parse(localStorage.getItem('errorTableString'));
    const errors = [];
    if (bukrs === null || bukrs === undefined || !bukrs) {
      errors.push(errorTable[`5${language}`]);
    }
    if (bldatFrom === null || bldatFrom === undefined || !bldatFrom) {
      errors.push(errorTable[`13${language}`]);
    }
    if (bldatTo === null || bldatTo === undefined || !bldatTo) {
      errors.push(errorTable[`14${language}`]);
    }
    if (
      selectedTypes === null ||
      selectedTypes === undefined ||
      selectedTypes.length === 0
    ) {
      errors.push(errorTable[`27${language}`]);
    }
    if (
      selectedStatuses === null ||
      selectedStatuses === undefined ||
      selectedStatuses.length === 0
    ) {
      errors.push(errorTable[`28${language}`]);
    }

    return errors;
  };

  const fetchDetailTable = params => {
    // console.log(params, 'params');
    fetchFoeaDetailTableAction(
      params,
      () => setFetchingDetailTable(true),
      () => {
        setFetchingDetailTable(false);
      },
      () => setFetchingDetailTable(false),
    );
  };

  const processSelectedItems = params => {
    // console.log(params, 'params');
    processSelectedItemsAction(
      null,
      { ...searchParams, ...params },
      () => setProcessingSelectedItems(true),
      () => {
        clearAnyObject(CLEAR_FOEA_OUTPUTTABLE);
        setProcessingSelectedItems(false);
        fetchOutputTable();
      },
      () => setProcessingSelectedItems(false),
    );
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
      <Header as="h2" block>
        {messages['transNameFoea']}
      </Header>

      <Menu pointing stackable>
        <Menu.Item
          name={messages['searchParameters']}
          active={activeIndex === 0}
          onClick={() => {
            setActiveIndex(0);
          }}
          icon="search"
        />
        <Menu.Item
          name={messages['result']}
          active={activeIndex === 1}
          onClick={() => {
            setActiveIndex(1);
          }}
          icon="bar chart"
        />
      </Menu>

      <Segment className={activeIndex === 0 ? 'show' : 'hide'}>
        <OutputErrors errors={errors} />
        {/* {this.renderSearchTab()} */}
        <Grid>
          <Grid.Row>
            <Grid.Column mobile={16} tablet={16} computer={4}>
              <FoeaSearch
                messages={messages}
                companyOptions={companyOptions}
                branchOptions={branchOptions}
                language={language}
                fetchOutputTable={fetchOutputTable}
                fetchingOutputTable={fetchingOutputTable}
                statuses={statuses}
                types={types}
                searchParams={searchParams}
                changeFoeaSearchParamsAction={changeFoeaSearchParamsAction}
              />
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Segment>
      <Segment className={activeIndex === 1 ? 'show' : 'hide'}>
        <FoeaOutput
          messages={messages}
          outputTable={outputTable}
          detailTable={detailTable}
          fetchDetailTable={fetchDetailTable}
          fetchingDetailTable={fetchingDetailTable}
          language={language}
          types={types || []}
          statuses={statuses || []}
          processSelectedItems={processSelectedItems}
          selectedStatuses={searchParams.selectedStatuses}
          processingSelectedItems={processingSelectedItems}
        />
        {/* {outputTable && outputTable.length > 0 && (
        <Menu stackable size="small">
          <Menu.Item>
            <img
              alt=""
              className="clickableItem"
              src="/assets/img/xlsx_export_icon.png"
              onClick={exportExcel}
            />
          </Menu.Item>
        </Menu>
      )}
      <ReactTableWrapper
        data={outputTable}
        columns={t1columns}
        pageSize={outputTable.length > 0 ? outputTable.length : 5}
      /> */}
      </Segment>
    </Container>
  );
};

function mapStateToProps(state) {
  // console.log(state, 'state');

  return {
    language: state.locales.lang,
    companyOptions: state.userInfo.companyOptions,
    branchOptions: state.userInfo.branchOptionsAll,
    outputTable: state.fa.foea.outputTable,
    detailTable: state.fa.foea.detailTable,
    searchParams: state.fa.foea.searchParams,
    // totalSumma: state.fa.dynamicObject.totalSumma,
    // totalRemain: state.fa.dynamicObject.totalRemain,
  };
}

export default connect(mapStateToProps, {
  // modifyLoader,
  // //cleared by dynamic clear function
  clearAnyObject,
  fetchFoeaOutputTableAction,
  fetchFoeaDetailTableAction,
  processSelectedItemsAction,
  changeFoeaSearchParamsAction,
})(injectIntl(Foea));
