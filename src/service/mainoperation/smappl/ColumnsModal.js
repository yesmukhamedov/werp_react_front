import React, { useState, useEffect, Fragment } from 'react';
import {
  Button,
  Header,
  Icon,
  Modal,
  Checkbox,
  Table,
} from 'semantic-ui-react';
import { injectIntl } from 'react-intl';
import { connect } from 'react-redux';

const ColumnsModal = props => {
  const {
    intl: { messages },
    tableHeaderCols = [],
    tableThings,
  } = props;
  const [columns, setColumns] = useState([]);

  useEffect(() => {
    setColumns(tableHeaderCols);
  }, [tableHeaderCols]);

  const checkColumns = e => {
    let cls = [...columns];
    cls.map(el => {
      if (el.accessor === e.accessor) {
        el.show = !el.show;
      }
    });

    return tableThings(cls);
  };

  return (
    <Fragment>
      <Modal
        trigger={<Button color="pink">{messages['columns']}</Button>}
        size="small"
      >
        <Header content={messages['columns']} />
        <Modal.Content>
          <Table singleLine>
            <Table.Body>
              {columns.length === 0
                ? null
                : columns.map((item, id) => (
                    <Table.Row key={id}>
                      <Table.Cell>{item.Header}</Table.Cell>
                      <Table.Cell>
                        <Checkbox
                          onChange={() => {
                            checkColumns(item);
                          }}
                          checked={item.show}
                          style={{ float: 'right' }}
                        />
                      </Table.Cell>
                    </Table.Row>
                  ))}
            </Table.Body>
          </Table>
        </Modal.Content>
      </Modal>
    </Fragment>
  );
};

const mapStateToProps = state => {
  return {
    appMasterList: state.serviceReducer.appMasterList,
  };
};

export default connect(mapStateToProps, {})(injectIntl(ColumnsModal));
