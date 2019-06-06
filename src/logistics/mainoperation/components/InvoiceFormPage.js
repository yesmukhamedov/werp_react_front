import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  Header,
  Container,
  Segment,
  Divider,
  Tab,
  Loader,
  Icon,
  Form,
  Input,
  Button,
  Label,
  Grid,
} from 'semantic-ui-react';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import { Link } from 'react-router-dom';
import { fetchInvoices } from '../actions/logisticsActions';
import { formatDMYMS } from '../../../utils/helpers';
import BukrsF4 from '../../../reference/f4/bukrs/BukrsF4';
import BranchF4 from '../../../reference/f4/branch/BranchF4';
import moment from 'moment';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import {
  WERKS_REQUEST_STATUS_NEW,
  WERKS_REQUEST_STATUS_CLOSED,
  Doctype,
  getDoctypeByUri,
} from '../../logUtil';
import { injectIntl } from 'react-intl';
import EnumFormField from './fields/EnumFormField';
import MatnrsGridModal from './MatnrsGridModal';

require('moment/locale/ru');

const TYPE_IN = 'in';
const TYPE_OUT = 'out';

class InvoiceFormPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      doctype: null,
      model: {
        isNew: false,
      },
    };

    this.loadItems = this.loadItems.bind(this);
    this.handleChangeDate = this.handleChangeDate.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    this.setState({
      ...this.state,
      doctype: getDoctypeByUri(this.props.match.doctype),
    });
  }

  loadItems() {
    let params = Object.assign({}, this.state.queryParams);
    params['doctype'] = this.state.doctype;
    this.props.fetchInvoices(params);
  }

  onTabChange = (e, data) => {
    if (data.activeIndex === 0) {
      this.loadItems(WERKS_REQUEST_STATUS_NEW);
    } else {
      this.loadItems(WERKS_REQUEST_STATUS_CLOSED);
    }
  };

  getDocViewLink() {
    return '';
  }

  handleChangeDate(fieldName, v) {
    let queryParams = Object.assign({}, this.state.queryParams);
    queryParams[fieldName] = v;
    this.setState({
      ...this.state,
      queryParams: queryParams,
    });
  }

  handleChange(data) {
    const { name, value } = data;
    let model = Object.assign({}, this.state.model);
    model[name] = value;
    if (name === 'bukrs') {
      model['branchId'] = null;
      if (value.length > 0) {
        this.props.f4FetchBranchesByBukrs(model['bukrs']);
      } else {
        this.props.f4ClearBranchesByBukrs();
      }
    }
    this.setState({
      ...this.state,
      model: model,
    });
  }

  render() {
    const { messages } = this.props.intl;
    const { model } = this.state;
    let errors = {};
    return (
      <div className="ui segments">
        <div className="ui segment">
          <h3>
            Внутренние заявки / {model.new ? 'Создание' : 'Редактирование'}
          </h3>
        </div>
        <div className="ui secondary segment">
          <Grid celled>
            <Grid.Row>
              <Grid.Column width={6}>
                <Form>
                  <EnumFormField
                    error={errors['bukrs']}
                    label="Компания"
                    fieldName="bukrs"
                    value={model['bukrs']}
                    handleChange={this.handleChange}
                    options={this.props.companyOptions}
                  />

                  <EnumFormField
                    error={errors['branchId']}
                    label="Филиал заявитель"
                    fieldName="branchId"
                    search={true}
                    handleChange={this.handleChange}
                    value={model['branchId']}
                    options={this.branchOptions(model['bukrs'])}
                  />

                  <EnumFormField
                    error={errors['resBranchId']}
                    label="Филиал исполнитель"
                    fieldName="resBranchId"
                    search={true}
                    handleChange={this.handleChange}
                    value={model['resBranchId']}
                    options={this.prepareResBranchOptions() || []}
                  />

                  <EnumFormField
                    label="Департамент"
                    fieldName="departmentId"
                    search={true}
                    error={errors['departmentId']}
                    handleChange={this.handleChange}
                    value={model['departmentId']}
                    options={this.props.departmentOptions || []}
                  />
                  <Button
                    disabled={this.state.saveBtnDisabled}
                    onClick={this.submitForm}
                    type="submit"
                  >
                    {this.state.saveBtnDisabled ? 'Ждемс...' : 'Сохранить'}
                  </Button>
                </Form>
              </Grid.Column>

              <Grid.Column width={10}>
                <div style={{ color: 'red' }}>{errors['matnrs']}</div>
                {this.renderItems()}
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </div>
        <MatnrsGridModal
          matnrs={this.props.matnrs}
          messages={messages}
          formatMessage={this.props.intl.formatMessage}
          open={this.state.matnrsModalOpen}
          cancel={() =>
            this.setState({ ...this.state, matnrsModalOpen: false })
          }
          matnrsLoading={this.props.matnrsLoading}
          searchData={() =>
            this.props.fetchMatnrs(this.state.matnrsSearchModel)
          }
          handleChange={this.handleMatnrsSearchFormHandle}
          handleSelected={this.handleSelectedMatnr}
          selectedIdx={this.state.selectedMatnrIdx}
          onRowClick={rowInfo =>
            this.setState({
              ...this.state,
              selectedMatnr: rowInfo.original,
              selectedMatnrIdx: rowInfo.index,
            })
          }
        />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {};
}

export default connect(
  mapStateToProps,
  {
    fetchInvoices,
  },
)(injectIntl(InvoiceFormPage));
