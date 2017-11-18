import React from 'react'
import {Input, Dropdown, Button, Icon, Table} from 'semantic-ui-react'

const SparePartListItem = (props) => {
    let { id, type, desc, price, quantity, total} = props.data
    return (
        <Table.Row>
            <Table.Cell>{props.idx+1}</Table.Cell>
            <Table.Cell>
                <Dropdown
                    fluid
                    selection
                    value={type}
                    options={[
                    {
                        text: 'Продажа запчастей',
                        value: 0
                    }, {
                        text: 'Услуга',
                        value: 1
                    }]}
                    onChange={(e, data) => props.handleCellChange(props.idx, 'type', data.value)}
                    />
            </Table.Cell>
            <Table.Cell>
                <Button disabled={type !== 0} icon onClick={() => props.handleOpenReference(id)}>
                    <Icon name='external square'/>
                </Button>
            </Table.Cell>
            <Table.Cell><Input 
                    fluid 
                    value={desc} 
                    onChange={(e, data) => props.handleCellChange(props.idx, 'desc', data.value)} />
            </Table.Cell>
            <Table.Cell><Input
                    value={price}
                    fluid
                    label={{
                            basic: true,
                            content: 'KZT'
                        }}
                    labelPosition='right'
                    type='number'
                    onChange={(e, data) => props.handleCellChange(props.idx, 'price', data.value)} />
            </Table.Cell>
            <Table.Cell><Input
                    value={quantity}
                    fluid
                    label={{
                        basic: true,
                        content: 'шт'
                    }}
                    labelPosition='right' />
            </Table.Cell>
            <Table.Cell><Input 
                    value={total} 
                    fluid />
            </Table.Cell>
            <Table.Cell>
                <Button icon onClick={() => props.handleRemove(id)}>
                    <Icon name='remove'/>
                </Button>
            </Table.Cell>
        </Table.Row>
    )
}

export default SparePartListItem;