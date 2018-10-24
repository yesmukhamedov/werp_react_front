

import React, { Component } from 'react';
import { Table, Segment, Label, Accordion, Icon } from 'semantic-ui-react';
import { moneyFormat} from '../../../utils/helpers';
import { Link } from 'react-router-dom';


export default class Fa03RelatedDocs extends Component {
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
    
    return (
    
    <Segment padded size="small">
      <Accordion fluid styled>
        <Accordion.Title active={activeIndex === 0} index={0} onClick={this.handleClick}>
        <Label color="yellow" ribbon>
          <Icon name='dropdown' />
                Документы
            </Label>
        </Accordion.Title>
        <Accordion.Content active={activeIndex === 0}>
        <Table collapsing >                    
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell>Номер документа</Table.HeaderCell>
                        <Table.HeaderCell>Год</Table.HeaderCell>
                        <Table.HeaderCell>Вид документа</Table.HeaderCell>
                        <Table.HeaderCell>Дата проводки</Table.HeaderCell>
                        <Table.HeaderCell>Дата документа</Table.HeaderCell>
                        <Table.HeaderCell>Сумма вв</Table.HeaderCell>
                        <Table.HeaderCell>Сумма в</Table.HeaderCell>
                        <Table.HeaderCell>Статус</Table.HeaderCell>
                        <Table.HeaderCell>Код</Table.HeaderCell>
                        <Table.HeaderCell>Пользователь</Table.HeaderCell>
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
                                        <font color="red">{item.storno===0?'':'отменен'}</font>                                        
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
