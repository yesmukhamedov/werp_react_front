import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';
import {
  Modal,
  Icon,
  Checkbox,
  Table,
  Dropdown,
  Grid,
  List,
  Divider,
  Segment,
} from 'semantic-ui-react';
import ReactTableWrapper from '../../../utils/ReactTableWrapper';
import {
  f4FetchCountryList,
  f4ClearAnyObject,
} from '../../../reference/f4/f4_action';

import matchSorter, { rankings } from 'match-sorter';

const BranchF4Advanced = props => {
  const {
    intl: { messages },
    selection = 'single',
    isOpen = false,
    countries = [],
  } = props;

  const categoryOptions = [
    { key: 0, text: messages['all'], value: 0 },
    { key: 1, text: messages['vacuumCleaningSystem'], value: 1 },
    { key: 2, text: messages['waterPurifierSystem'], value: 2 },
  ];
  // console.log('called');

  const [categoryS, setCategoryS] = useState(0);
  const [countryIdS, setCountryIdS] = useState(0);
  const [branches, setBranches] = useState([]);
  const [countryOptions, setCountryOptions] = useState([]);
  const [isSelectedAll, setIsSelectedAll] = useState(false);

  //componentWillRecieveProps
  useEffect(() => {
    let arr = props.branches.map(item => {
      return { ...item, isSelected: false };
    });

    setBranches(arr);
    setCategoryS(0);
    setCountryIdS(0);
    setIsSelectedAll(false);
    // console.log(arr);
  }, [props.branches]);

  //componentDidMount
  useEffect(() => {
    if (!countries || countries.length === 0) props.f4FetchCountryList();
    // //unmount
    // return () => {
    //   props.f4ClearAnyObject('F4_CLEAR_COUNTRY_LIST');
    // };
  }, []);

  //componentWillRecieveProps
  useEffect(() => {
    //getting all countries and assigning to state
    let waCountryList = countries
      .sort((a, b) => (a.country > b.country ? 1 : -1))
      .map(item => {
        return {
          key: item.countryId,
          value: item.countryId,
          text: item.country,
        };
      });
    setCountryOptions([
      { key: 0, value: 0, text: messages['all'] },
      ...waCountryList,
    ]);
    // console.log(countries);
  }, [countries]);

  const onSelectAll = () => {
    let isSelected = !isSelectedAll;
    setIsSelectedAll(isSelected);
    setBranches(prev => {
      let arr = prev.map(mitem => {
        let temp = { ...mitem };
        if (
          (categoryS === 0 || temp.tovarcategory === categoryS) &&
          (countryIdS === 0 || temp.countryId === countryIdS)
        ) {
          temp.isSelected = isSelected;
        }
        return temp;
      });

      return arr;
    });
  };

  const onInputChange = (value, stateFieldName) => {
    let numVal = Number(value);
    let waCategoryS = categoryS;
    let waCountryIdS = countryIdS;

    if (stateFieldName === 'categoryS') {
      waCategoryS = numVal;
      setCategoryS(numVal);
    } else if (stateFieldName === 'countryIdS') {
      waCountryIdS = numVal;
      setCountryIdS(numVal);
    }

    // if all branches selected, make  IsSelectedAll true
    let notSelectedArr = [];
    let filteredArr = [];

    filteredArr = branches
      .filter(fitem => waCategoryS === 0 || fitem.tovarcategory === waCategoryS)
      .filter(fitem => waCountryIdS === 0 || fitem.countryId === waCountryIdS);

    if (filteredArr.length > 0) {
      notSelectedArr = filteredArr.filter(fitem => fitem.isSelected === false);
      setIsSelectedAll(notSelectedArr.length === 0 ? true : false);
    }
    /////////////////////////////////////////////////////////
  };

  const onRowClick = (row, idx, colId) => {
    // console.log(row, idx, colId);
    if (!['isSelected', 'text'].includes(colId)) {
      return '';
    }
    let isSelected = !row.isSelected;

    if (selection === 'multiple') {
      setBranches(prev => {
        let arr = prev.map(mitem => {
          let temp = { ...mitem };
          if (row.key === mitem.key) {
            temp.isSelected = isSelected;
          }
          return temp;
        });

        // if all branches selected, make  IsSelectedAll true
        let notSelectedArr = [];
        let filteredArr = [];

        filteredArr = arr
          .filter(fitem => categoryS === 0 || fitem.tovarcategory === categoryS)
          .filter(fitem => countryIdS === 0 || fitem.countryId === countryIdS);

        if (filteredArr.length > 0) {
          notSelectedArr = filteredArr.filter(
            fitem => fitem.isSelected === false,
          );
          setIsSelectedAll(notSelectedArr.length === 0 ? true : false);
        }
        /////////////////////////////////////////////////////////

        return arr;
      });
    }

    if (selection === 'single') {
      setBranches(prev => {
        let arr = prev.map(mitem => {
          let temp = { ...mitem };
          if (row.key === mitem.key) {
            temp.isSelected = isSelected;
          } else {
            temp.isSelected = false;
          }
          return temp;
        });

        // if all branches selected, make  IsSelectedAll true
        let notSelectedArr = [];
        let filteredArr = [];

        filteredArr = arr
          .filter(fitem => categoryS === 0 || fitem.tovarcategory === categoryS)
          .filter(fitem => countryIdS === 0 || fitem.countryId === countryIdS);

        if (filteredArr.length > 0) {
          notSelectedArr = filteredArr.filter(
            fitem => fitem.isSelected === false,
          );
          setIsSelectedAll(notSelectedArr.length === 0 ? true : false);
        }
        /////////////////////////////////////////////////////////

        return arr;
      });
    }
  };

  const onClose = () => {
    let selBranches = [];

    selBranches = branches.filter(fitem => fitem.isSelected === true);
    props.onClose(selBranches);
  };

  let t1columns = [];
  let t1r1c1 = {},
    t1r1c2 = {};
  t1r1c1 = {
    Header: ({ value }) => <b></b>,
    width: 40,
    accessor: 'isSelected',
    Cell: ({ value }) => <Checkbox checked={value} />,
    filterable: true,
    className: 'clickableItem',
    Filter: ({ filter, onChange }) => {
      return (
        <Checkbox
          checked={isSelectedAll}
          onChange={onSelectAll}
          disabled={selection === 'single'}
        />
      );
    },
  };
  t1r1c2 = {
    Header: ({ value }) => <b>{messages['brnch']}</b>,
    // width: 120,
    minResizeWidth: 120,
    accessor: 'text',
    filterMethod: (filter, rows) =>
      matchSorter(rows, filter.value, {
        keys: [{ threshold: rankings.CONTAINS, key: 'text' }],
      }),
    filterAll: true,
    className: 'clickableItem',
  };

  let t2columns = [];

  let t2r1c1 = {},
    t2r1c2 = {};
  t2r1c1 = {
    Header: ({ value }) => <b></b>,
    width: 40,
    accessor: 'isSelected',
    Cell: ({ value }) => <Icon link name="close" />,
    filterable: false,
    className: 'clickableItem',
  };
  t2r1c2 = {
    Header: ({ value }) => <b>{messages['selectedBranches']}</b>,
    // width: 120,
    minResizeWidth: 120,
    accessor: 'text',
    className: 'clickableItem',
  };

  t1columns.push(t1r1c1);
  t1columns.push(t1r1c2);

  t2columns.push(t2r1c1);
  t2columns.push(t2r1c2);

  let filBranches = branches
    .filter(fitem => categoryS === 0 || fitem.tovarcategory === categoryS)
    .filter(fitem => countryIdS === 0 || fitem.countryId === countryIdS)
    .map(mitem => {
      return { ...mitem };
    });

  let selBranches = branches
    .filter(fitem => fitem.isSelected === true)
    .map(mitem => {
      return { ...mitem };
    });

  return (
    <div>
      <Modal open={isOpen} onClose={onClose} closeIcon size={'tiny'}>
        <Modal.Header>
          <Icon name="filter" size="big" />
          {messages['brnch']}
        </Modal.Header>
        <Modal.Content>
          <Grid columns="equal" stackable>
            <Grid.Row>
              <Grid.Column width={8}>
                <List>
                  <List.Item>{messages['category']}</List.Item>
                  <List.Item>
                    <Dropdown
                      selection
                      options={categoryOptions}
                      value={categoryS}
                      onChange={(e, { value }) =>
                        onInputChange(value, 'categoryS')
                      }
                    />
                  </List.Item>
                </List>
              </Grid.Column>

              <Grid.Column width={8}>
                <List>
                  <List.Item>{messages['country']}</List.Item>
                  <List.Item>
                    <Dropdown
                      selection
                      options={countryOptions}
                      value={countryIdS}
                      onChange={(e, { value }) =>
                        onInputChange(value, 'countryIdS')
                      }
                    />
                  </List.Item>
                </List>
              </Grid.Column>
            </Grid.Row>
            <Grid.Row>
              <Grid.Column width={8}>
                <div style={{ height: '200px', overflow: 'auto' }}>
                  <ReactTableWrapper
                    filterable
                    data={filBranches}
                    columns={t1columns}
                    pageSize={filBranches.length > 0 ? filBranches.length : 5}
                    onRowClick={onRowClick}
                  />
                </div>
                <br />
                <b>#{filBranches.length}</b>
              </Grid.Column>

              <Grid.Column width={8}>
                <div style={{ height: '200px', overflow: 'auto' }}>
                  <ReactTableWrapper
                    data={selBranches}
                    columns={t2columns}
                    pageSize={selBranches.length > 0 ? selBranches.length : 5}
                    onRowClick={onRowClick}
                  />
                </div>
                <br />
                <b>#{selBranches.length}</b>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Modal.Content>
      </Modal>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    companyOptions: state.userInfo.companyOptions,
    countries: state.f4.countryList,
  };
};

export default connect(mapStateToProps, {
  f4FetchCountryList,
  f4ClearAnyObject,
})(injectIntl(BranchF4Advanced));
