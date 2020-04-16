import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';
import {
  Segment,
  Grid,
  Form,
  Button,
  Table,
  Input,
  Icon,
  Divider,
  Dropdown,
} from 'semantic-ui-react';
import {
  f4fetchCategory,
  f4FetchConTypeList,
} from '../../../../reference/f4/f4_action';

const TabSmcsWithoutContract = props => {
  const { companyOptions, branches, category = [], productList = [] } = props;

  // bukrs: '',
  // branchId: '',
  // categoryId: '',
  // matnr: '',

  const emptyState = {
    address: '',
    applicationNumber: '',
    awkey: '',
    branchId: '',
    branchName: '',
    bukrs: '',
    bukrsName: '',
    categoryId: '',
    categoryName: '',
    contractDate: '',
    contractId: '',
    contractNumber: '',
    countryId: '',
    countryName: '',
    currencyId: '',
    currencyName: '',
    customerFullName: '',
    customerId: '',
    discount: '',
    id: '',
    masterFullName: '',
    masterId: '',
    masterPremium: '',
    operatorFullName: '',
    operatorId: '',
    operatorPremium: '',
    paid: '',
    positions: [],
    serviceDate: '',
    serviceStatusId: '',
    serviceStatusName: '',
    sumForPay: '',
    sumTotal: '',
    tovarId: '',
    tovarName: '',
    tovarSn: '',
    warrantyPeriodDate: '',
    warrantyPeriodInMonth: '',
  };

  const [state, setState] = useState({ ...emptyState });

  console.log('STATE', state, 'category', category, 'productList', productList);

  const tovarCategoryOptions = category.map(item => {
    return {
      key: item.id,
      text: item.name,
      value: item.id,
    };
  });

  const productOptions = productList.map(item => {
    return {
      key: item.contract_type_id,
      text: item.name,
      value: item.matnr,
    };
  });

  console.log('productOptions', productOptions);

  const servBranch = branches.filter(
    item =>
      item.business_area_id == 5 ||
      item.business_area_id == 6 ||
      item.business_area_id == 9,
  );

  const servBranchOptions =
    state.bukrs === ''
      ? servBranch.map(item => {
          return {
            key: item.branch_id,
            text: item.text45,
            value: item.branch_id,
          };
        })
      : servBranch
          .filter(item => item.bukrs === state.bukrs)
          .map(item => {
            return {
              key: item.branch_id,
              text: item.text45,
              value: item.branch_id,
            };
          });

  useEffect(() => {
    props.f4fetchCategory();
    props.f4FetchConTypeList();
  }, []);

  const onInputChange = (o, fieldName) => {
    setState(prev => {
      const prevState = { ...prev };
      switch (fieldName) {
        case 'bukrs':
          prevState.bukrs = o.value;
          break;
        case 'branchId':
          prevState.branchId = o.value;
          break;

        case 'categoryId':
          prevState.categoryId = o.value;
          break;
        case 'matnr':
          prevState.matnr = o.value;
          break;

        default:
          prevState[fieldName] = o.value;
      }
      return prevState;
    });
  };
  return (
    <Form>
      <Grid>
        <Grid.Row>
          {/*BASIC INFO*/}
          <Grid.Column width={5}>
            <Table collapsing className="borderLess">
              <Table.Body>
                <Table.Row>
                  <Table.Cell>№ Заявки</Table.Cell>
                  <Table.Cell>
                    <Input fluid disabled />
                  </Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell>Компания</Table.Cell>
                  <Table.Cell>
                    <Dropdown
                      fluid
                      selection
                      placeholder="Компания"
                      options={companyOptions}
                      onChange={(e, o) => onInputChange(o, 'bukrs')}
                    />
                  </Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell>Филиал</Table.Cell>
                  <Table.Cell>
                    <Dropdown
                      fluid
                      selection
                      placeholder="Филиал"
                      options={servBranchOptions}
                      onChange={(e, o) => onInputChange(o, 'branchId')}
                    />
                  </Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell>Клиент</Table.Cell>
                  <Table.Cell>
                    <Input fluid disabled />
                  </Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell width={4}>Заводской номер</Table.Cell>
                  <Table.Cell width={12}>
                    <Input fluid disabled />
                  </Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell>Категория</Table.Cell>
                  <Table.Cell>
                    <Dropdown
                      fluid
                      selection
                      placeholder="Категория товара"
                      options={tovarCategoryOptions}
                      onChange={(e, o) => onInputChange(o, 'categoryId')}
                    />
                  </Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell>Продукт</Table.Cell>
                  <Table.Cell>
                    <Dropdown
                      fluid
                      selection
                      placeholder="Продукт"
                      options={productOptions}
                      onChange={(e, o) => onInputChange(o, 'matnr')}
                    />
                  </Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell>CN</Table.Cell>
                  <Table.Cell>
                    <Input fluid disabled />
                  </Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell>Адрес</Table.Cell>
                  <Table.Cell>
                    <Input fluid disabled />
                  </Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell>Дата покупки</Table.Cell>
                  <Table.Cell>
                    <Input fluid disabled />
                  </Table.Cell>
                </Table.Row>

                <Table.Row>
                  <Table.Cell>Мастер</Table.Cell>
                  <Table.Cell>
                    <Dropdown fluid />
                  </Table.Cell>
                </Table.Row>

                <Table.Row>
                  <Table.Cell>Оператор</Table.Cell>
                  <Table.Cell>
                    <Dropdown fluid />
                  </Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell>Дата сервиса</Table.Cell>
                  <Table.Cell>
                    <Input fluid disabled />
                  </Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell>Срок гарантии</Table.Cell>
                  <Table.Cell>
                    <Input disabled />
                    <Input disabled />
                  </Table.Cell>
                </Table.Row>
              </Table.Body>
            </Table>
          </Grid.Column>
          {/*RIGHT*/}
          <Grid.Column width={11}>
            <Segment>
              <Segment>
                <h3>Услуга</h3>
                <Divider />
                <Button icon labelPosition="left" color="green" size="small">
                  <Icon name="plus" size="small" /> Добавить услугу
                </Button>
              </Segment>

              <Segment>
                <h3>Продажа запчастей</h3>
                <Divider />
                <Button icon labelPosition="left" color="green" size="small">
                  <Icon name="plus" size="small" /> Добавить запчасти
                </Button>
              </Segment>

              <Segment>
                <h3>Продажа картриджи</h3>
                <Divider />
                <Button icon labelPosition="left" color="green" size="small">
                  <Icon name="plus" size="small" /> Добавить картриджи
                </Button>
              </Segment>

              <Segment>
                <h3>Сервис пакет</h3>
                <Divider />
                <Button icon labelPosition="left" color="green" size="small">
                  <Icon name="plus" size="small" /> Добавить сервис
                </Button>
              </Segment>

              <Segment>
                <h3>Услуга</h3>
                <Divider />
                <Button icon labelPosition="left" color="green" size="small">
                  <Icon name="plus" size="small" /> Добавить услугу
                </Button>
              </Segment>

              <Table celled>
                <Table.Body>
                  <Table.Row>
                    <Table.Cell>Общая Сумма</Table.Cell>
                    <Table.Cell>0</Table.Cell>
                  </Table.Row>
                  <Table.Row>
                    <Table.Cell>Скидка</Table.Cell>
                    <Table.Cell>0</Table.Cell>
                  </Table.Row>
                  <Table.Row>
                    <Table.Cell>Сумма к оплате</Table.Cell>
                    <Table.Cell>0</Table.Cell>
                  </Table.Row>
                  <Table.Row>
                    <Table.Cell>Оплачено</Table.Cell>
                    <Table.Cell>0</Table.Cell>
                  </Table.Row>
                  <Table.Row>
                    <Table.Cell>Премия мастера</Table.Cell>
                    <Table.Cell>0</Table.Cell>
                  </Table.Row>
                  <Table.Row>
                    <Table.Cell width={6}>Премия оператора</Table.Cell>
                    <Table.Cell width={10}>0</Table.Cell>
                  </Table.Row>
                </Table.Body>
              </Table>
              <Button type="submit" primary>
                <Icon name="save" size="large" />
                Сохранить
              </Button>
            </Segment>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Form>
  );
};

function mapStateToProps(state) {
  return {
    language: state.locales.lang,
    branches: state.f4.branches,
    companyOptions: state.userInfo.companyOptions,
    category: state.f4.category,
    productList: state.f4.contractTypeList,
  };
}

export default connect(mapStateToProps, {
  f4fetchCategory,
  f4FetchConTypeList,
})(injectIntl(TabSmcsWithoutContract));
