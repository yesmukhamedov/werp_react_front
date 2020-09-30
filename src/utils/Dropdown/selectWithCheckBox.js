import React, { useState, useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';
import './selectWithCheckBox.css';

import { Icon, Table, Checkbox } from 'semantic-ui-react';

import matchSorter, { rankings } from 'match-sorter';
export const SelectWithCheckBox = props => {
  const [listItem, setListItem] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [displayBlock, setDisplayBlock] = useState(false);
  const [isSelectedAll, setIsSelectedAll] = useState(false);

  const {
    intl: { messages },
    selection = 'multiple',
    onSelectDone = () => {},
    // rfgRfg = [],
  } = props;
  ///////////////////////////////////////////////////////////////////////////
  //create ref to detect click outside the div
  const wrapperRef = useRef(null);
  const useOutsideAlerter = ref => {
    useEffect(() => {
      /**
       * Alert if clicked on outside of element
       */
      const handleClickOutside = event => {
        if (ref.current && !ref.current.contains(event.target)) {
          setDisplayBlock(false);
        }
      };

      // Bind the event listener
      document.addEventListener('mousedown', handleClickOutside);
      return () => {
        // Unbind the event listener on clean up
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }, [ref]);
  };
  useOutsideAlerter(wrapperRef);
  ///////////////////////////////////////////////////////////////////////////

  //componentWillRecieveProps
  useEffect(() => {
    // console.log('useEffect 1');
    setIsSelectedAll(false);

    if (props.listItem && props.listItem.length > 0) {
      let countSelected = 0;
      let arr = props.listItem.map(item => {
        //if isSelected has a value before start from props
        let isSelectedTemp = item.isSelected ? item.isSelected : false;

        //count selected
        let selected = isSelectedTemp ? 1 : 0;
        countSelected = countSelected + selected;

        //if selection type is single, make the first one selected others not
        if (selection === 'single' && countSelected > 1) {
          isSelectedTemp = false;
        }

        return {
          ...item,
          isSelected: isSelectedTemp,
        };
      });

      setListItem(arr);
      setIsSelectedAll(checkIfAllSelected(arr));
      returnAllSelected(arr);

      // console.log('useEffect 2');
    } else {
      setListItem([]);
      setIsSelectedAll(false);

      // console.log('useEffect 3');
    }
  }, [props.listItem]);

  const onClickItem = item => {
    let wa = { ...item };

    setListItem(prev => {
      let newItem = { ...wa, isSelected: !wa.isSelected };
      let newItemList = [...prev];
      let index = newItemList.findIndex(element => element.key === wa.key);

      if (selection === 'single') {
        let newItemList2 = prev.map(mitem => {
          let temp = { ...mitem };
          temp.isSelected = false;
          return temp;
        });
        newItemList = [...newItemList2];
      }

      newItemList[index] = newItem;
      setIsSelectedAll(checkIfAllSelected(newItemList));
      returnAllSelected(newItemList);
      return newItemList;
    });
  };

  const onSelectAll = () => {
    let newVal = !isSelectedAll;

    setIsSelectedAll(newVal);
    setListItem(prev => {
      let newItemList = [...prev];

      newItemList.forEach(element => {
        element.isSelected = newVal;
      });
      returnAllSelected(newItemList);
      return newItemList;
    });
  };

  const returnAllSelected = listItem => {
    let selectedList = listItem
      .filter(filterEl => filterEl.isSelected)
      .map(mapEl => {
        return { ...mapEl };
      });

    onSelectDone(selectedList);
  };

  const checkIfAllSelected = items => {
    //check if all selected
    let countSelected = 0;
    items.forEach(element => {
      let selected = element.isSelected ? 1 : 0;
      countSelected = countSelected + selected;
    });
    if (countSelected > 0) return items.length === countSelected ? true : false;

    return false;
  };

  let listItemFiltered = [];
  listItemFiltered = matchSorter(listItem, searchText, {
    keys: [{ threshold: rankings.CONTAINS, key: 'text' }],
  });

  let countSelected = 0;
  listItem.forEach(element => {
    //count selected
    let selected = element.isSelected ? 1 : 0;
    countSelected = countSelected + selected;
  });
  /////////////////////////////////////////////////////////////////////////
  const printOutSelectedText = (countSelected, isSelectedAll) => {
    let text = '';
    if (selection === 'single') {
      listItem.forEach(wa => {
        if (wa.isSelected) text = wa.text;
      });
      return text;
    }
    if (countSelected > 0 && isSelectedAll) return messages['all'];
    else if (countSelected > 0 && isSelectedAll === false)
      return '#' + countSelected;
    else return messages['select'];
  };

  return (
    <div className="dropdown" ref={wrapperRef}>
      <button
        //   className="dropbtn"
        className={displayBlock ? 'dropbtn-active' : 'dropbtn'}
        onClick={() =>
          setDisplayBlock(prev => {
            return !prev;
          })
        }
      >
        {printOutSelectedText(countSelected, isSelectedAll)}
      </button>
      <div
        className={
          displayBlock
            ? 'dropdown-content-display-block'
            : 'dropdown-content-display-none'
        }
      >
        <Table>
          <Table.Body>
            <Table.Row>
              <Table.Cell>
                {selection === 'single' ? (
                  ''
                ) : (
                  <Checkbox
                    checked={isSelectedAll}
                    onChange={() => onSelectAll()}
                  />

                  //   <input
                  //     type="checkbox"
                  //     id="checkedAll"
                  //     checked={isSelectedAll}
                  //     onChange={() => onSelectAll()}
                  //     className="clickable"
                  //   />
                )}
              </Table.Cell>
              <Table.Cell>
                <input
                  type="text"
                  onChange={e => setSearchText(e.target.value)}
                  value={searchText}
                  placeholder={messages['search']}
                />
              </Table.Cell>
              <Table.Cell>
                <Icon
                  link
                  name="window close"
                  onClick={() => setDisplayBlock(false)}
                  color="red"
                />
              </Table.Cell>
            </Table.Row>
          </Table.Body>
        </Table>

        <div style={{ height: '200px', overflow: 'auto' }}>
          <Table compact>
            <Table.Body>
              {listItemFiltered.map((item, index) => (
                <Table.Row
                  key={index}
                  className="clickableRow"
                  onClick={() => onClickItem(item)}
                >
                  <Table.Cell>
                    <Checkbox
                      label={item.text}
                      checked={item.isSelected}
                      className="clickable"
                      onChange={() => {}}
                    />
                  </Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table>

          {/* <List>
            {listItemFiltered.map((item, index) => (
              <List.Item
                key={index}
                className="clickableRow"
                onClick={() => onClickItem(item)}
              >
                <Checkbox
                  label={item.text}
                  checked={item.isSelected}
                  className="clickable"
                  onChange={() => {}}
                />
              </List.Item>
            ))}
          </List> */}
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = state => {
  return {};
};

export default connect(mapStateToProps, {})(injectIntl(SelectWithCheckBox));
