import React, { PureComponent } from 'react';
import {
  Segment,
  Item,
  Grid,
  Icon,
  Button,
  Header,
  Label,
} from 'semantic-ui-react';
import { OutCallPanelModalContainer } from '../OutCallPanelModal';
import { formatDateTime } from '../../../../../utils/helpers';

const headerStyle = {
  fontSize: '14px',
};

class OutCallPanelDisplay extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      modalOpen: false,
    };
    this.open = this.open.bind(this);
    this.close = this.close.bind(this);
  }

  open() {
    this.setState({ modalOpen: true });
  }

  close() {
    this.setState({ modalOpen: false });
  }

  render() {
    const {
      outCallId,
      outCallInfo = {},
      statusOptions,
      createOutCallFromContract,
      lang,
    } = this.props;
    const {
      status = {},
      operator = {},
      createdAt,
      modifiedAt,
      contractNumber,
    } = outCallInfo;
    return (
      <div>
        <Segment.Group>
          <Segment clearing>
            <Header as="h3" floated="left">
              Заявка #&nbsp;
              <Label as="a" basic size="big">
                {outCallInfo.outCallId}
              </Label>
            </Header>
            <Header as="h4" floated="right">
              {
                status.id &&
                (status.id === 1000 ?
                  <Button
                    style={{ background: 'rgba(84,170,169, 1)', color: 'white' }}
                    onClick={() => createOutCallFromContract({ contractNumber })}
                  >
                    <Icon name="add" />Привязать мне
                  </Button>
                  :
                  <Button
                    style={{ background: 'rgba(84,170,169, 1)', color: 'white' }}
                    onClick={this.open}
                  >
                    <Icon name="edit" />Редактировать
                  </Button>
                )
              }
            </Header>
          </Segment>
          <Segment padded color="grey">
            <Grid columns={3} stackable>
              <Grid.Row>
                <Grid.Column>
                  <Item.Group>
                    <Item>
                      <Item.Content verticalAlign="middle">
                        <Item.Header style={headerStyle}>
                          Дата создания:
                        </Item.Header>
                        <Item.Description>{formatDateTime(createdAt)}</Item.Description>
                      </Item.Content>
                    </Item>
                    <Item>
                      <Item.Content verticalAlign="middle">
                        <Item.Header style={headerStyle}>
                          Дата обновления:
                        </Item.Header>
                        <Item.Description>{formatDateTime(modifiedAt)}</Item.Description>
                      </Item.Content>
                    </Item>
                  </Item.Group>
                </Grid.Column>
                <Grid.Column>
                  <Item.Group>
                    <Item>
                      <Item.Content verticalAlign="middle">
                        <Item.Header style={headerStyle}>Открыл:</Item.Header>
                        <Item.Description>
                          {(status.id !== 1000 ? `${operator.lastName} ${operator.firstName} ${operator.patronymic}` : '')}
                        </Item.Description>
                      </Item.Content>
                    </Item>
                    {/* <Item>
                      <Item.Content verticalAlign="middle">
                        <Item.Header style={headerStyle}>Закрыл:</Item.Header>
                        <Item.Description>{}</Item.Description>
                      </Item.Content>
                    </Item> */}
                  </Item.Group>
                </Grid.Column>
                <Grid.Column>
                  <Item.Group>
                    <Item>
                      <Item.Content verticalAlign="middle">
                        <Item.Header style={headerStyle}>
                          Статус заявки:
                        </Item.Header>
                        <Item.Description>
                          <Label color="blue">
                            {status && status[lang]}
                          </Label>
                        </Item.Description>
                      </Item.Content>
                    </Item>
                  </Item.Group>
                </Grid.Column>
              </Grid.Row>
            </Grid>
          </Segment>
        </Segment.Group>
        <OutCallPanelModalContainer
          isOpen={this.state.modalOpen}
          open={this.open}
          close={this.close}
          statusOptions={statusOptions}
          contractNumber={contractNumber}
        />
      </div>
    );
  }
}

export default OutCallPanelDisplay;
