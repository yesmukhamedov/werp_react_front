//Finance report 8
//frep8
import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';
import {
  Table,
  Button,
  Dropdown,
  Icon,
  Container,
  Header,
  Grid,
  Segment,
  Menu,
  Checkbox,
  List,
} from 'semantic-ui-react';
import { modifyLoader } from '../../../general/loader/loader_action';
import OutputErrors from '../../../general/error/outputErrors';
import BranchF4Advanced from '../../../reference/f4/branch/BranchF4Advanced';

const Frep8 = props => {
  const {
    companyOptions = [],
    branchOptions = [],
    intl: { messages },
    language,
  } = props;
  const [bukrs, setBukrs] = useState('');
  const [branchList, setBranchList] = useState([]);
  const [budatFrom, setBudatFrom] = useState('');
  const [budatTo, setBudatTo] = useState('');
  const [activeIndex, setActiveIndex] = useState(0);
  const [f4BranchIsOpen, setF4BranchIsOpen] = useState(false);

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
      <Header as="h2" block>
        {messages['transNameFrep7']}
      </Header>

      <Menu pointing stackable>
        <Menu.Item
          name={messages['searchParameters']}
          active={activeIndex === 0}
          onClick={() => {
            setActiveIndex(0);
          }}
          icon="search"
        />
        <Menu.Item
          name={messages['result']}
          active={activeIndex === 1}
          onClick={() => {
            setActiveIndex(1);
          }}
          icon="bar chart"
        />
        <Menu.Item
          name={messages['details']}
          active={activeIndex === 2}
          onClick={() => {
            setActiveIndex(2);
          }}
          icon="list layout"
        />
      </Menu>

      <Segment className={activeIndex === 0 ? 'show' : 'hide'}>
        {/* <OutputErrors errors={this.state.errors} /> */}
        {/* {this.renderSearchTab()} */}
        <Grid>
          <Grid.Row>
            <Grid.Column mobile={16} tablet={16} computer={4}>
              <Table compact>
                <Table.Body>
                  <Table.Row>
                    <Table.Cell collapsing>
                      <Icon name="folder" />
                      {messages['bukrs']}
                    </Table.Cell>
                    <Table.Cell colSpan="2">
                      <Dropdown
                        fluid
                        placeholder={messages['bukrs']}
                        selection
                        options={companyOptions || []}
                        value={bukrs}
                        onChange={(e, { value }) => setBukrs(value)}
                      />
                    </Table.Cell>
                  </Table.Row>
                  <Table.Row>
                    <Table.Cell collapsing>
                      <Icon name="browser" />
                      {messages['brnch']}
                    </Table.Cell>
                    <Table.Cell colSpan="2">
                      <Icon
                        link
                        name="clone"
                        onClick={() => setF4BranchIsOpen(true)}
                      />
                    </Table.Cell>
                  </Table.Row>

                  <Table.Row>
                    <Table.Cell />
                    <Table.Cell colSpan="2">
                      <Button
                        icon
                        labelPosition="left"
                        primary
                        size="small"
                        onClick={() => this.searchFrep7()}
                      >
                        <Icon name="search" size="large" />
                        {messages['search']}
                      </Button>
                    </Table.Cell>
                  </Table.Row>
                </Table.Body>
              </Table>
              <BranchF4Advanced
                branches={bukrs ? branchOptions[bukrs] : []}
                isOpen={f4BranchIsOpen}
                onClose={() => setF4BranchIsOpen(false)}
                selection={'multiple'}
              />
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Segment>
      <Segment className={activeIndex === 1 ? 'show' : 'hide'}>
        {/* {outputTable && outputTable.length > 0 && (
      <Menu stackable size="small">
        <Menu.Item>
          <img
            className="clickableItem"
            src="/assets/img/xlsx_export_icon.png"
            onClick={() => this.exportExcel('total')}
          />
        </Menu.Item>
      </Menu>
    )}
    {this.renderTotal()} */}
      </Segment>
      <Segment className={activeIndex === 2 ? 'show' : 'hide'}></Segment>
    </Container>
  );
};

function mapStateToProps(state) {
  console.log(state, 'state.userInfo.branchOptionsMarketing');

  return {
    language: state.locales.lang,
    companyOptions: state.userInfo.companyOptions,
    branchOptions: state.userInfo.branchOptionsMarketing,
  };
}

export default connect(mapStateToProps, {})(injectIntl(Frep8));
