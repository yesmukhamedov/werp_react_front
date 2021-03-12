import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import {
  Icon,
  Container,
  Segment,
  Form,
  Dropdown,
  Popup,
  Button,
  Modal,
  Header,
  Label,
} from 'semantic-ui-react';
import { injectIntl } from 'react-intl';
import './index.css';
import DropdownClearable from '../../utils/DropdownClearable';
import ReactTableWrapperFixedColumns from '../../utils/ReactTableWrapperFixedColumns';

const TaxiExpence = props => {
  const {
    data: data,
    intl: { messages },
  } = props;

  const [priceModal, setPriceModal] = useState(false);

  const handleOpen = () => {
    setPriceModal(true);
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
      <Segment clearing>
        <Header as="h2" floated="left" className="title">
          {messages['marketingTaxiExpence']}
        </Header>
        <Button
          primary
          floated="right"
          icon
          onClick={handleOpen}
          labelPosition="left"
        >
          <Icon name="add circle" />
          {messages['BTN__ADD']}
        </Button>

        <Modal
          closeIcon
          open={priceModal}
          onClose={() => setPriceModal(false)}
          size={'mini'}
        >
          <Modal.Header>
            <h2 align="center">{messages['marketingTaxiExpence']}</h2>
          </Modal.Header>
          <Modal.Content>
            <Segment>
              <Form>
                <Form.Field required>
                  <label>{messages['bukrs']} </label>
                  <DropdownClearable
                    selection
                    // options={masterListOptions}
                    // value={tempMaster.masterId ? tempMaster.masterId : ''}
                    placeholder={messages['bukrs']}
                    //onChange={(e, { value }) => onChange(value, 'changeModalMasterId')}
                    // handleClear={() => setTempMaster({ ...tempMaster, masterId: null })}
                  />
                </Form.Field>

                <Form.Field required>
                  <label>{messages['Task.Branch']} </label>
                  <DropdownClearable
                    selection
                    // options={masterListOptions}
                    // value={tempMaster.masterId ? tempMaster.masterId : ''}
                    placeholder={messages['Task.Branch']}
                    //onChange={(e, { value }) => onChange(value, 'changeModalMasterId')}
                    // handleClear={() => setTempMaster({ ...tempMaster, masterId: null })}
                  />
                </Form.Field>

                <Form.Field>
                  <Form.Input
                    fluid
                    required
                    label="Цена за км (без машины)"
                    placeholder="Цена за км (без машины)"
                  />
                </Form.Field>

                <Form.Field required>
                  <Form.Input
                    fluid
                    required
                    label="Цена за км (с машиной)"
                    placeholder="Цена за км (с машиной)"
                  />
                </Form.Field>

                <Form.Field required>
                  <label>{messages['waers']} </label>
                  <DropdownClearable
                    selection
                    // options={masterListOptions}
                    // value={tempMaster.masterId ? tempMaster.masterId : ''}
                    placeholder={messages['waers']}
                    //onChange={(e, { value }) => onChange(value, 'changeModalMasterId')}
                    // handleClear={() => setTempMaster({ ...tempMaster, masterId: null })}
                  />
                </Form.Field>
              </Form>
            </Segment>
          </Modal.Content>
          <Modal.Actions>
            <Button color="red" onClick={() => setPriceModal(false)}>
              <Icon name="remove" /> {messages['Button.No']}
            </Button>
            <Button color="green">
              <Icon name="checkmark" /> {messages['Form.Save']}
            </Button>
          </Modal.Actions>
        </Modal>
      </Segment>

      <Form>
        <Form.Group widths={5}>
          <Form.Field required>
            <label>{messages['bukrs']}</label>
            <DropdownClearable
              clearable="true"
              selection
              fluid
              multiple
              //options={companyOptions ? companyOptions : []}
              // value={param.bukrs}
              placeholder={messages['bukrs']}
              // onChange={(e, { value }) => onChange(value, 'bukrs')}
              //handleClear={() =>setParam({ ...param, bukrs: null, branchId: null }) }
            />
          </Form.Field>

          <Form.Field required>
            <label>{messages['Task.Branch']}</label>
            <DropdownClearable
              clearable="true"
              selection
              fluid
              multiple
              //options={param.bukrs ? branchOptionsService[param.bukrs] : []}
              //value={param.branchId}
              placeholder={messages['Task.Branch']}
              //onChange={(e, { value }) => onChange(value, 'branchId')}
              //handleClear={() => setParam({ ...param, branchId: null })}
            />
          </Form.Field>
          <Form.Field>
            <label>
              <br />
            </label>
            <Button primary icon labelPosition="left" className="alignBottom">
              <Icon name="search" />
              {messages['Button.Search']}
            </Button>
          </Form.Field>
        </Form.Group>
      </Form>

      <ReactTableWrapperFixedColumns
        data={data}
        filterable={true}
        columns={[
          {
            Header: () => (
              <div style={{ textAlign: 'center' }}>{messages['bukrs']}</div>
            ),
            accessor: 'bukrsName',
            Cell: row => <div style={{ textAlign: 'center' }}>{row.value}</div>,
          },

          {
            Header: () => (
              <div style={{ textAlign: 'center' }}>
                {messages['Task.Branch']}
              </div>
            ),
            accessor: 'branchName',
            filterable: false,
            Cell: row => (
              <div style={{ textAlign: 'center' }}> {row.value} </div>
            ),
          },
          {
            Header: () => (
              <div style={{ textAlign: 'center' }}>Цена за км (без машины)</div>
            ),
            accessor: 'kmPriceNoCar',
            filterable: false,
            Cell: row => <div style={{ textAlign: 'center' }}>{row.value}</div>,
          },
          {
            Header: () => (
              <div style={{ textAlign: 'center' }}>Цена за км (c машиной)</div>
            ),
            accessor: 'kmPriceWithCar',
            filterable: false,
            Cell: row => <div style={{ textAlign: 'center' }}>{row.value}</div>,
          },
          {
            Header: () => <div style={{ textAlign: 'center' }}>Валюта</div>,
            accessor: 'currency',
            filterable: false,
            Cell: row => <div style={{ textAlign: 'center' }}>{row.value}</div>,
          },
          {
            Header: () => (
              <div style={{ textAlign: 'center' }}>Редактировать</div>
            ),
            filterable: false,
            Cell: row => <div style={{ textAlign: 'center' }}>{row.value}</div>,
          },
        ]}
        defaultPageSize={20}
        showPagination={true}
        pageSizeOptions={[10, 20, 30, 40]}
      />
    </Container>
  );
};

function mapStateToProps(state) {
  return {
    data: [
      {
        bukrs: '1000',
        bukrsName: 'AURA',
        branchId: '77',
        branchName: 'ALM',
        kmPriceNoCar: '100',
        kmPriceWithCar: '50',
        currency: 'kzt',
      },
    ],
  };
}

export default connect(mapStateToProps, {})(injectIntl(TaxiExpence));
