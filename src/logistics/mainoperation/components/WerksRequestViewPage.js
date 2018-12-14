import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  Header,
  Container,
  Icon,
  Segment,
  Divider,
  Tab,
  Loader,
  Menu,
  Dropdown,
  Button,
  Form,
  Grid,
  Table,
} from 'semantic-ui-react';
import ReactTable from 'react-table';
import {
  f4FetchCountryList,
  f4FetchDepartmentList,
  f4FetchBranchesByBukrs,
} from '../../../reference/f4/f4_action';
import 'react-table/react-table.css';
import { fetchWerksRequest } from '../actions/logisticsActions';
import EnumFormField from './fields/EnumFormField';
import MatnrsModalField from './fields/MatnrsModalField';
import MatnrsGridModal from './MatnrsGridModal';
import { injectIntl } from 'react-intl';
import { messages } from '../../../locales/defineMessages';
import _ from 'lodash';

class WerksRequestViewPage extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  componentWillMount() {
    const id = parseInt(this.props.match.params.id, 10);
    this.props.fetchWerksRequest(id);
  }

  renderItems = () => {
    const { model } = this.props;
    const matnrs = model.matnrs || [];
    return (
      <Table celled striped>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell colSpan="2">Список товаров</Table.HeaderCell>
          </Table.Row>

          <Table.Row>
            <Table.HeaderCell>Наименование товара</Table.HeaderCell>
            <Table.HeaderCell>Количество</Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {matnrs.map((m, idx) => {
            let key = 'matnrs[' + idx + '].';
            return (
              <Table.Row key={idx}>
                <Table.Cell>{m.matnrName}</Table.Cell>
                <Table.Cell>{m.quantity}</Table.Cell>
              </Table.Row>
            );
          })}
        </Table.Body>
      </Table>
    );
  };

  render() {
    const { model } = this.props;
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
                <Table basic="very" celled collapsing>
                  <Table.Body>
                    <Table.Row>
                      <Table.Cell>
                        <strong>Номер документа</strong>
                      </Table.Cell>
                      <Table.Cell>№{model['id']}</Table.Cell>
                    </Table.Row>

                    <Table.Row>
                      <Table.Cell>
                        <strong>Компания</strong>
                      </Table.Cell>
                      <Table.Cell>{model['bukrsName']}</Table.Cell>
                    </Table.Row>

                    <Table.Row>
                      <Table.Cell>
                        <strong>Филиал заявитель</strong>
                      </Table.Cell>
                      <Table.Cell>{model['branchName']}</Table.Cell>
                    </Table.Row>

                    <Table.Row>
                      <Table.Cell>
                        <strong>Филиал исполнитель</strong>
                      </Table.Cell>
                      <Table.Cell>{model['resBranchName']}</Table.Cell>
                    </Table.Row>

                    <Table.Row>
                      <Table.Cell>
                        <strong>Департамент</strong>
                      </Table.Cell>
                      <Table.Cell>{model['departmentName']}</Table.Cell>
                    </Table.Row>

                    <Table.Row>
                      <Table.Cell>
                        <strong>Дата создания</strong>
                      </Table.Cell>
                      <Table.Cell>{model['createdAt']}</Table.Cell>
                    </Table.Row>

                    <Table.Row>
                      <Table.Cell>
                        <strong>Автор</strong>
                      </Table.Cell>
                      <Table.Cell>{model['creatorName']}</Table.Cell>
                    </Table.Row>
                  </Table.Body>
                </Table>
              </Grid.Column>

              <Grid.Column width={10}>{this.renderItems()}</Grid.Column>
            </Grid.Row>
          </Grid>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    model: state.logisticsReducer.werksRequestModel,
    pageLoading: state.documentReducer.pageLoading,
  };
}

export default connect(
  mapStateToProps,
  {
    fetchWerksRequest,
  },
)(injectIntl(WerksRequestViewPage));
