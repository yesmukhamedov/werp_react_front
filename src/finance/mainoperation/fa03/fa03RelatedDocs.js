

import React, { Component } from 'react';
import { Table, Segment, Label, Accordion, Icon } from 'semantic-ui-react';
import { moneyFormat} from '../../../utils/helpers';
import { Link } from 'react-router-dom';
import { injectIntl } from 'react-intl';
import { messages } from '../../../locales/defineMessages';


class Fa03RelatedDocs extends Component {
  state = { activeIndex: 1 }

  handleClick = (e, titleProps) => {
    const { activeIndex } = this.state
    const newIndex = activeIndex === 0 ? 1 : 0

    this.setState({ activeIndex: newIndex })
  }

  render() {
    const { activeIndex } = this.state

    if (!this.props.relatedDocs || this.props.relatedDocs.length===0){
        return "";
    }
    const {formatMessage} = this.props.intl;
    
    return (
    
    <Segment padded size="small">
      <Accordion fluid styled>
        <Accordion.Title active={activeIndex === 0} index={0} onClick={this.handleClick}>
        <Label color="yellow" ribbon>
          <Icon name='dropdown' />
                {formatMessage(messages.documents)}
            </Label>
        </Accordion.Title>
        <Accordion.Content active={activeIndex === 0}>
        <Table collapsing >                    
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell>{formatMessage(messages.belnr)}</Table.HeaderCell>
                        <Table.HeaderCell>{formatMessage(messages.gjahr)}</Table.HeaderCell>
                        <Table.HeaderCell>{formatMessage(messages.blart)}</Table.HeaderCell>
                        <Table.HeaderCell>{formatMessage(messages.budat)}</Table.HeaderCell>
                        <Table.HeaderCell>{formatMessage(messages.bldat)}</Table.HeaderCell>
                        <Table.HeaderCell>{formatMessage(messages.amount)} {formatMessage(messages.inLocalCurrency)}</Table.HeaderCell>
                        <Table.HeaderCell>{formatMessage(messages.amount)} {formatMessage(messages.inDocumentCurrency)}</Table.HeaderCell>
                        <Table.HeaderCell>{formatMessage(messages.status)}</Table.HeaderCell>
                        <Table.HeaderCell>{formatMessage(messages.tcode)}</Table.HeaderCell>
                        <Table.HeaderCell>{formatMessage(messages.user)}</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                {
                    this.props.relatedDocs.map((item,key)=>
                        {
                            return (
                                <Table.Row key={key}>                                      
                                    <Table.Cell>
                                        <Link target="_blank" to={`/finance/mainoperation/fa03?belnr=`+item.belnr+`&bukrs=`+item.bukrs+`&gjahr=`+item.gjahr}>
                                            {item.belnr}
                                        </Link>
                                    </Table.Cell>
                                    <Table.Cell>
                                        {item.gjahr}
                                    </Table.Cell>
                                    <Table.Cell>
                                        {item.blart}
                                    </Table.Cell>
                                    <Table.Cell>
                                        {item.budat}
                                    </Table.Cell> 
                                    <Table.Cell>
                                        {item.bldat}
                                    </Table.Cell>
                                    <Table.Cell>
                                        {moneyFormat(item.dmbtr)}
                                    </Table.Cell>
                                    <Table.Cell>
                                        {moneyFormat(item.wrbtr)}
                                    </Table.Cell>
                                    <Table.Cell>
                                        <font color="red">{item.storno===0?'':formatMessage(messages.canceled)}</font>                                        
                                    </Table.Cell>
                                    <Table.Cell>
                                        {item.tcode}
                                    </Table.Cell>
                                    <Table.Cell>
                                        {item.username}
                                    </Table.Cell>              
                                </Table.Row> 
                            )
                        }
                    )
                }
                </Table.Body>                     
            </Table> 
        </Accordion.Content>
        
      </Accordion>
      
      </Segment>
    )
  }
}


export default (injectIntl(Fa03RelatedDocs))