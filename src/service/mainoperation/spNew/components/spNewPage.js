import axios from 'axios';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { doGet, doPost } from '../../../../utils/apiActions';
import moment from 'moment';
import _ from 'lodash';
import { Container } from 'semantic-ui-react';
import { notify } from '../../../../general/notification/notification_action';
import Header from './Header2';
import SparePartList from './SparePartList';
import WarrantyList from './WarrantyList';
import BonusPanel from './BonusPanel';

class SpNewPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sparePartOptions: [],
      warrantyOptions: [],
      companyOptions: [],
      countryOptions: [],
      categoryOptions: [],
      productOptions: [],
      selectedCompany: undefined,
      selectedCategory: undefined,
      selectedCountry: undefined,
      selectedProduct: undefined,
      title: '',
      description: '',
      startDate: moment(),
      totalSum: 0,
      masterBonus: 0,
      operatorBonus: 0,
      sparePartList: [],
      warrantyList: [],
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.fetchCategories = this.fetchCategories.bind(this);
    this.fetchReferenceList = this.fetchReferenceList.bind(this);
    this.saveServicePacket = this.saveServicePacket.bind(this);
  }

  componentWillMount() {
    axios
      .all([
        doGet(`reference/countries`),
        doGet(`reference/companies`),
        doGet(`reference/product-categories`),
      ])
      .then(
        axios.spread(
          (
            { data: countryList },
            { data: companyList },
            { data: categoryList },
          ) => {
            const newCountryOptions = countryList.map(item => ({
              key: item.countryId,
              text: item.country,
              value: item.countryId,
            }));

            const newCompanyOptions = companyList.map(item => ({
              key: item.id,
              value: item.id,
              text: item.name,
            }));

            const newCategoryOptions = categoryList.map(item => ({
              key: item.id,
              value: item.id,
              text: item.label,
            }));
            const countryDict = new Map(
              countryList.map(i => [i.countryId, i.currency]),
            );

            this.setState(
              {
                ...this.state,
                countryOptions: newCountryOptions,
                companyOptions: newCompanyOptions,
                categoryOptions: newCategoryOptions,
                countryDict,
              },
              () => {
                console.log('spNewPage state ', this.state);
              },
            );
          },
        ),
      )
      .catch(err => {
        console.log('Error in spNewPage', err);
      });
  }

  saveServicePacket() {
    const strVal = this.state.startDate.format('YYYY-MM-DD');
    const startDateUtc = moment.utc(strVal).format();

    // construct servicePacket
    const servicePacket = {
      name: this.state.title,
      description: this.state.description,
      country: {
        countryId: this.state.selectedCountry,
      },
      company: {
        id: this.state.selectedCompany,
      },
      startDate: startDateUtc,
      productCategory: {
        id: this.state.selectedCategory,
      },
      product: {
        id: this.state.selectedProduct,
      },
      price: this.state.totalSum,
      totalPrice: this.state.totalSum,
      masterBonus: this.state.masterBonus,
      operatorBonus: this.state.operatorBonus,
      currency: this.state.countryDict.get(this.state.selectedCountry),
      active: true,
    };

    // construct spareParts
    const spareParts = this.state.sparePartList.map(sp => {
      sp.operType = {
        operTypeId: sp.operTypeId,
      };
      return sp;
    });

    // construct sparePartsWithWarranty
    const sparePartsWithWarranty = this.state.warrantyList.map(item => ({
      id: item.id,
      code: item.code,
      description: item.description,
      warrantyMonths: item.warrantyMonths,
    }));

    // transactionCode
    // transactionId

    const newServicePacket = {
      servicePacket,
      spareParts,
      sparePartsWithWarranty,
      transactionCode: null,
      transactionId: null,
    };

    doPost(`service/packets`, { ...newServicePacket })
      .then(response => {
        this.props.notify('success', 'Сервис пакет сохранен.', 'Успешно');
      })
      .catch(err => {
        this.props.notify(
          'error',
          `Не удалось сохранить новый сервис пакет! ${err}`,
          'Ошибка',
        );
      });

    console.log('DS to Store:', newServicePacket);
  }

  handleInputChange(value, dataType) {
    let clearedFileds = {};
    switch (dataType) {
      case 'selectedCompany': {
        clearedFileds = {
          selectedCountry: undefined,
          selectedCategory: undefined,
          selectedProduct: undefined,
          productOptions: [],
        };
        break;
      }
      case 'selectedCountry': {
        clearedFileds = {
          selectedCategory: undefined,
          selectedProduct: undefined,
          productOptions: [],
        };
        break;
      }
      case 'selectedCategory': {
        clearedFileds = {
          selectedProduct: undefined,
          productOptions: [],
        };
        break;
      }
      case 'sparePartList': {
        clearedFileds = {
          totalSum: this.calculateTotalSum(value),
        };
        break;
      }
      default: {
      }
    }

    this.setState(
      {
        ...this.state,
        [dataType]: value,
        ...clearedFileds,
      },
      () => console.log('handled field ', dataType, ' state ', this.state),
    );
  }

  calculateTotalSum(list) {
    return _.sumBy(list, item => parseInt(item.totalPrice || 0, 10));
  }

  fetchCategories(companyId, categoryId) {
    doGet(`reference/products?categoryId=${categoryId}&companyId=${companyId}`)
      .then(({ data }) => {
        const newProductOptions = data.map(item => ({
          key: item.id,
          value: item.id,
          text: item.name,
        }));

        this.setState({
          ...this.state,
          productOptions: newProductOptions,
        });
      })
      .catch(err => {
        this.props.notify(
          'error',
          `Не удалось подгрузить категории ${err}`,
          'Ошибка',
        );
      });
  }

  fetchReferenceList(companyId, countryId, productId) {
    axios
      .all([
        doGet(`reference/spare-part-warranties?productId=${productId}`),
        doGet(
          `reference/spare-part-prices?companyId=${companyId}&countryId=${countryId}&productId=${productId}`,
        ),
      ])
      .then(
        axios.spread(({ data: warranties }, { data: spareParts }) => {
          this.setState({
            ...this.state,
            sparePartOptions: spareParts,
            warrantyOptions: warranties,
          });
        }),
      )
      .catch(err => {
        this.props.notify(
          'error',
          `Не удалось подгрузить справочники ${err}`,
          'Ошибка',
        );
      });
  }

  render() {
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
        <Header
          countryOpts={this.state.countryOptions}
          companyOpts={this.state.companyOptions}
          categoryOpts={this.state.categoryOptions}
          productOpts={this.state.productOptions}
          selectedCompany={this.state.selectedCompany}
          selectedCountry={this.state.selectedCountry}
          selectedCategory={this.state.selectedCategory}
          selectedProduct={this.state.selectedProduct}
          inputChange={this.handleInputChange}
          fetchCategories={this.fetchCategories}
          fetchReferenceList={this.fetchReferenceList}
          title={this.state.title}
          description={this.state.description}
          startDate={this.state.startDate}
          sparePartOptions={this.state.sparePartOptions}
          warrantyOptions={this.state.warrantyOptions}
          saveServicePacket={this.saveServicePacket}
        />
        <p>
          --
          <br />
          --
          <br />
        </p>
        <SparePartList
          data={this.state.sparePartOptions}
          saveChange={this.handleInputChange}
          totalSum={this.state.totalSum}
        />
        <p>
          --
          <br />
          --
          <br />
        </p>
        <WarrantyList
          data={this.state.warrantyOptions}
          saveChange={this.handleInputChange}
        />
        <p>
          --
          <br />
          --
          <br />
        </p>
        <BonusPanel
          masterBonus={this.state.masterBonus}
          operatorBonus={this.state.operatorBonus}
          totalSum={this.state.totalSum}
          inputChange={this.handleInputChange}
        />
      </Container>
    );
  }
}

export default connect(null, { notify })(SpNewPage);
