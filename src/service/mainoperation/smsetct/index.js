import React, { useEffect, useState } from 'react';
import 'react-table/react-table.css';
import { injectIntl } from 'react-intl';
import {
  f4FetchCountryList,
  f4FetchWerksBranchList,
} from '../../../reference/f4/f4_action';
import { addSmsetct, searchSmsetct, editSmsetct } from '../../serviceAction';
import { connect } from 'react-redux';
import List from './list';
import {
  Header,
  Icon,
  Segment,
  Button,
  Container,
  Modal,
  Grid,
  Form,
  Dropdown,
  Input,
} from 'semantic-ui-react';
import moment from 'moment';
require('moment/locale/ru');
require('moment/locale/tr');

const Smsetct = props => {
  const {
    intl: { messages },
  } = props;

  const emptySmst = {
    country: '',
    bukrs: '',
    branchId: '',
  };
  const emptySmstAdd = {
    country: '',
    bukrs: '',
    branchId: '',
    products: '',
    configureF1: '',
    configureF2: '',
    configureF3: '',
    configureF4: '',
    configureF5: '',
    configureF6: '',
    configureF7: '',
    note: '',
  };

  const [smstSmstAdd, setSmstAdd] = useState({ ...emptySmstAdd });
  const [smst, setSmst] = useState({ ...emptySmst });
  const [show, setShow] = useState(false);

  //componentDidMount
  useEffect(() => {
    if (!countryList || countryList.length === 0) props.f4FetchCountryList();
  }, []);

  const {
    companyOptions,
    branchOptions,
    countryList,
    dynamicObject,
    products,
  } = props;

  const onChangeAdd = (o, fieldName) => {
    setSmstAdd(prev => {
      const varTs = { ...prev };
      switch (fieldName) {
        case 'countryId':
          varTs.country = o.value;
          break;

        case 'bukrs':
          varTs.bukrs = o.value;
          break;

        case 'branchId':
          varTs.branchId = o.value;
          break;

        case 'products':
          varTs.products = o.value;
          break;

        case messages['configuration'] + ' F-1':
          varTs.configureF1 = o.value;
          break;

        case messages['configuration'] + ' F-2':
          varTs.configureF2 = o.value;
          break;

        case messages['configuration'] + ' F-3':
          varTs.configureF3 = o.value;
          break;

        case messages['configuration'] + ' F-4':
          varTs.configureF4 = o.value;
          break;

        case messages['configuration'] + ' F-5':
          varTs.configureF5 = o.value;
          break;

        case messages['configuration'] + ' F-6':
          varTs.configureF6 = o.value;
          break;

        case messages['configuration'] + ' F-7':
          varTs.configureF7 = o.value;
          break;

        case messages['Table.Note']:
          varTs.note = o.value;
          break;

        default:
          varTs[fieldName] = o.value;
      }
      return varTs;
    });
  };

  const onInputChange = (o, fieldName) => {
    setSmst(prev => {
      const varTs = { ...prev };
      switch (fieldName) {
        case 'countryId':
          varTs.country = o.value;
          break;
        case 'bukrs':
          varTs.bukrs = o.value;
          break;
        case 'branchId':
          varTs.branchId = o.value;
          break;
        default:
          varTs[fieldName] = o.value;
      }
      return varTs;
    });
  };

  const handleAdd = e => {
    e.preventDefault();
    props.addSmsetct(smstSmstAdd);
  };

  const handleOpen = () => {
    setShow(true);
  };

  const handleClose = () => {
    setShow(false);
  };

  return (
    <div>
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
          <Header as="h2" floated="left">
            {messages['cartrige_replace_period']}
          </Header>
          <Button color="teal" onClick={handleOpen} floated="right">
            {' '}
            <Icon name="add circle" />
            {messages['BTN__ADD']}
          </Button>
          <Modal open={show}>
            <Modal.Header>
              <h3>Добавить картридж</h3>
            </Modal.Header>
            <Modal.Content>
              <Segment>
                <Form>
                  <Form.Group widths="equal">
                    <Form.Field>
                      <label>{messages['country']}</label>
                      <Dropdown
                        fluid
                        search
                        selection
                        options={getCountryOptions(countryList)}
                        onChange={(e, o) => onChangeAdd(o, 'countryId')}
                      />
                    </Form.Field>

                    <Form.Field>
                      <label>{messages['bukrs']} </label>
                      <Dropdown
                        fluid
                        search
                        selection
                        options={getCompanyOptions(companyOptions)}
                        value={smstSmstAdd.bukrs}
                        onChange={(e, o) => onChangeAdd(o, 'bukrs')}
                      />
                    </Form.Field>
                  </Form.Group>

                  <Form.Group widths="equal">
                    <Form.Field>
                      <label>{messages['brnch']}</label>
                      <Dropdown
                        fluid
                        search
                        selection
                        options={
                          smstSmstAdd.bukrs
                            ? branchOptions[smstSmstAdd.bukrs]
                            : []
                        }
                        value={smstSmstAdd.branchId}
                        onChange={(e, o) => onChangeAdd(o, 'branchId')}
                      />
                    </Form.Field>
                    <Form.Field>
                      <label>{messages['TBL_H__PRODUCT']}</label>
                      <Dropdown
                        fluid
                        search
                        selection
                        options={getProductOptions(companyOptions)}
                        value={smstSmstAdd.products}
                        onChange={(e, o) => onChangeAdd(o, 'products')}
                      />
                    </Form.Field>
                  </Form.Group>

                  <Form.Group widths="equal">
                    <Form.Field
                      onChange={(e, o) =>
                        onChangeAdd(o, messages['configuration'] + ' F-1')
                      }
                      control={Input}
                      label={messages['configuration'] + ' F-1'}
                    />
                    <Form.Field
                      onChange={(e, o) =>
                        onChangeAdd(o, messages['configuration'] + ' F-2')
                      }
                      control={Input}
                      label={messages['configuration'] + ' F-2'}
                    />
                    <Form.Field
                      onChange={(e, o) =>
                        onChangeAdd(o, messages['configuration'] + ' F-3')
                      }
                      control={Input}
                      label={messages['configuration'] + ' F-3'}
                    />
                    <Form.Field
                      onChange={(e, o) =>
                        onChangeAdd(o, messages['configuration'] + ' F-4')
                      }
                      control={Input}
                      label={messages['configuration'] + ' F-4'}
                    />
                  </Form.Group>

                  <Form.Group widths="equal">
                    <Form.Field
                      onChange={(e, o) =>
                        onChangeAdd(o, messages['configuration'] + ' F-5')
                      }
                      control={Input}
                      label={messages['configuration'] + ' F-5'}
                    />
                    <Form.Field
                      onChange={(e, o) =>
                        onChangeAdd(o, messages['configuration'] + ' F-6')
                      }
                      control={Input}
                      label={messages['configuration'] + ' F-6'}
                    />
                    <Form.Field
                      onChange={(e, o) =>
                        onChangeAdd(o, messages['configuration'] + ' F-7')
                      }
                      control={Input}
                      label={messages['configuration'] + ' F-7'}
                    />
                  </Form.Group>

                  <Form.Group widths="equal">
                    <Form.Field
                      onChange={(e, o) =>
                        onChangeAdd(o, messages['Table.Note'])
                      }
                      control={Input}
                      label={messages['Table.Note']}
                    />
                  </Form.Group>
                </Form>
              </Segment>
            </Modal.Content>
            <Modal.Actions>
              <Button color="teal" floated="right" onClick={handleAdd}>
                <Icon name="checkmark" />
                {messages['Table.Add']}
              </Button>

              <Button
                negative
                floated="right"
                onClick={() => {
                  handleClose();
                }}
              >
                <Icon name="remove" />
                {messages['BTN__CANCEL']}
              </Button>
            </Modal.Actions>
            <br />
            <br />
            <br />
          </Modal>
        </Segment>

        <Form>
          <Grid columns={5}>
            <Grid.Column>
              <label>{messages['country']}</label>
              <Dropdown
                fluid
                search
                selection
                options={getCountryOptions(countryList)}
                value={smst.country}
                onChange={(e, o) => onInputChange(o, 'countryId')}
                placeholder={messages['all']}
              />
            </Grid.Column>

            <Grid.Column>
              <label>{messages['bukrs']} </label>
              <Dropdown
                fluid
                search
                selection
                options={getCompanyOptions(companyOptions)}
                value={smst.bukrs}
                onChange={(e, o) => onInputChange(o, 'bukrs')}
                placeholder={messages['all']}
              />
            </Grid.Column>

            <Grid.Column>
              <label>{messages['brnch']}</label>
              <Dropdown
                fluid
                search
                selection
                options={smst.bukrs ? branchOptions[smst.bukrs] : []}
                value={smst.branchId}
                onChange={(e, o) => onInputChange(o, 'branchId')}
                placeholder={messages['all']}
              />
            </Grid.Column>

            <Grid.Column verticalAlign="bottom">
              <Button color="teal" onClick={props.searchSmsetct}>
                {' '}
                <Icon name="search" />
                {messages['search']}
              </Button>
            </Grid.Column>
          </Grid>
        </Form>
        <List
          dynamicObject={dynamicObject}
          messages={messages}
          companyOptions={companyOptions}
          branchOptions={branchOptions}
          countryList={countryList}
          products={products}
          getCountryOptions={getCountryOptions}
          getCompanyOptions={getCompanyOptions}
          getProductOptions={getProductOptions}
          editSmsetct={props.editSmsetct}
        />
      </Container>
    </div>
  );
};

const getCountryOptions = countryList => {
  const countryLst = countryList;
  if (!countryLst) {
    return [];
  }
  let out = countryLst.map(c => {
    return {
      key: parseInt(c.countryId, 10),
      text: `${c.country}`,
      value: parseInt(c.countryId, 10),
    };
  });
  return out;
};

const getProductOptions = productList => {
  const productLst = productList;
  if (!productLst) {
    return [];
  }
  let out = productLst.map(c => {
    return {
      key: parseInt(c.key, 10),
      text: `${c.text}`,
      value: parseInt(c.value, 10),
    };
  });
  return out;
};

const getCompanyOptions = compOptions => {
  const companyOptions = compOptions;
  if (!companyOptions) {
    return [];
  }
  let out = companyOptions.map(c => {
    return {
      key: parseInt(c.key, 10),
      text: `${c.text}`,
      value: parseInt(c.value, 10),
    };
  });
  return out;
};

function mapStateToProps(state) {
  return {
    language: state.locales.lang,
    countryList: state.f4.countryList,
    companyOptions: state.userInfo.companyOptions,
    branchOptions: state.userInfo.branchOptionsAll,
    dynamicObject: state.hr.dynamicObject,
  };
}
export default connect(mapStateToProps, {
  f4FetchCountryList,
  f4FetchWerksBranchList,
  addSmsetct,
  searchSmsetct,
  editSmsetct,
})(injectIntl(Smsetct));
