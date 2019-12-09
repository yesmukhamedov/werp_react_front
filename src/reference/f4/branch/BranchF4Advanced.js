import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';
import { Modal, Icon, Checkbox, Table, Dropdown } from 'semantic-ui-react';
import ReactTableWrapper from '../../../utils/ReactTableWrapper';
const categoryOptions = [
  { key: 1, text: 'Уборочная система', value: 1 },
  { key: 2, text: 'Система очистки воды', value: 2 },
  { key: 0, text: 'Сервис', value: 0 },
];

const BranchF4Advanced = props => {
  const {
    intl: { messages },
    selection = 'single',
    isOpen = false,
    companyOptions = [],
  } = props;

  console.log('called');

  const [categoryS, setCategoryS] = useState('');
  const [branches, setBranches] = useState([]);
  const [filteredBranches, setFilteredBranches] = useState([]);
  const [selectedBranches, setSelectedBranches] = useState([]);

  //componentDidMount
  useEffect(() => {
    let arr = props.branches.map(item => {
      return { ...item, isSelected: false };
    });

    setBranches(arr);
    setFilteredBranches(arr);
    setCategoryS('');
    console.log(arr, 'arr');
    console.log('called UseEffect');
  }, [props.branches]);

  let t1columns = [];
  let t1r1c1 = {},
    t1r1c2 = {};
  t1r1c1 = {
    Header: ({ value }) => <b></b>,
    width: 40,
    id: 'selected',
    accessor: d => d.selected,
    className: 'clickableItem',
    Cell: obj => <Checkbox checked={obj.original.selected} />,
    filterable: false,
  };
  t1r1c2 = {
    Header: ({ value }) => <b>{messages['brnch']}</b>,
    width: 120,
    id: 'text',
    accessor: d => d.text,
    className: 'clickableItem',
  };

  let t2columns = [];

  let t2r1c1 = {},
    t2r1c2 = {};
  t2r1c1 = {
    Header: ({ value }) => <b></b>,
    width: 40,
    id: 'selected',
    accessor: d => d.selected,
    className: 'clickableItem',
    Cell: obj => <Icon link name="close" />,
    filterable: false,
  };
  t2r1c2 = {
    Header: ({ value }) => <b>{messages['brnch']}</b>,
    width: 120,
    id: 'text',
    accessor: d => d.text,
    className: 'clickableItem',
  };

  t1columns.push(t1r1c1);
  t1columns.push(t1r1c2);
  t2columns.push(t2r1c1);
  t2columns.push(t2r1c2);

  const onRowClick = (row, idx) => {
    let isSelected = !row.selected;

    if (selection === 'multiple') {
      setSelectedBranches(prevSel => {
        if (isSelected) {
          return [...prevSel, { ...row, selected: true }];
        } else {
          return prevSel
            .filter(fitem => fitem.key !== row.key)
            .map(mitem => {
              return { ...mitem };
            });
        }
      });

      setBranches(prev => {
        let arr = prev.map(mitem => {
          let temp = { ...mitem };
          if (row.key === mitem.key) {
            temp.selected = isSelected;
          }
          return temp;
        });

        return arr;
      });

      setFilteredBranches(prev => {
        return prev.map(mitem => {
          let temp = { ...mitem };
          if (row.key === mitem.key) {
            temp.selected = isSelected;
          }
          return temp;
        });
      });
    }

    if (selection === 'single') {
      setSelectedBranches(prevSel => {
        if (isSelected) {
          return [{ ...row, selected: true }];
        } else {
          return [];
        }
      });

      setBranches(prev => {
        let arr = prev.map(mitem => {
          let temp = { ...mitem };
          if (row.key === mitem.key) {
            temp.selected = isSelected;
          } else {
            temp.selected = false;
          }
          return temp;
        });

        return arr;
      });

      setFilteredBranches(prev => {
        return prev.map(mitem => {
          let temp = { ...mitem };
          if (row.key === mitem.key) {
            temp.selected = isSelected;
          } else {
            temp.selected = false;
          }
          return temp;
        });
      });
    }
  };

  const onClose = () => {
    props.onClose();
  };
  const onInputChange = (value, fieldName) => {
    if (fieldName === 'category') {
      setCategoryS(value);

      let arr = branches
        .filter(fitem => value === 0 || fitem.tovarcategory === value)
        .map(mitem => {
          return { ...mitem };
        });
      setFilteredBranches(arr);
    }
  };
  console.log(branches, 'branches');
  return (
    <div>
      <Modal open={isOpen} onClose={onClose} dimmer={'inverted'} size="small">
        <Modal.Header>
          <Icon name="filter" size="big" />
          Должности
        </Modal.Header>
        <Modal.Content>
          <Table>
            <Table.Body>
              <Table.Row>
                <Table.Cell>
                  <Table collapsing>
                    <Table.Body>
                      <Table.Row>
                        {/* <Table.Cell>
                          <Icon name="folder" />
                          Компания
                        </Table.Cell>
                        <Table.Cell>
                          <Dropdown
                            placeholder="Компания"
                            selection
                            options={companyOptions}
                            value={sbukrs}
                            onChange={(e, { value }) => setSbukrs(value)}
                          />
                        </Table.Cell> */}
                        <Table.Cell>
                          <Icon name="browser" />
                          Категория
                        </Table.Cell>
                        <Table.Cell>
                          <Dropdown
                            selection
                            options={categoryOptions}
                            value={categoryS}
                            onChange={(e, { value }) =>
                              onInputChange(value, 'category')
                            }
                          />
                        </Table.Cell>
                      </Table.Row>
                    </Table.Body>
                  </Table>
                </Table.Cell>
                <Table.Cell>
                  <ReactTableWrapper
                    filterable
                    data={filteredBranches}
                    columns={t1columns}
                    defaultPageSize={20}
                    onRowClick={onRowClick}
                  />
                </Table.Cell>
                <Table.Cell>
                  <ReactTableWrapper
                    data={selectedBranches}
                    columns={t2columns}
                    defaultPageSize={20}
                    onRowClick={onRowClick}
                  />
                </Table.Cell>
              </Table.Row>
            </Table.Body>
          </Table>
        </Modal.Content>
      </Modal>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    companyOptions: state.userInfo.companyOptions,
  };
};

export default connect(mapStateToProps, {})(injectIntl(BranchF4Advanced));
