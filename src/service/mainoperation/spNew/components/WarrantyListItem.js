import React from 'react'
import { Table, Input, Dropdown, Button, Icon } from 'semantic-ui-react'

const WarrantyListItem = (props) => {
    let { id, type, desc, price, currency, quantity, total } = props.data
    return (
        <tr className="sp-sparepart-list-item">
            <td>{id}</td>
            <td>
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
            </td>
            <td>
                <Button icon onClick={() => props.handleOpenReference(id)}>
                    <Icon name='external square'/>
                </Button>
            </td>
            <td><Input 
                    fluid 
                    value={desc} 
                    onChange={(e, data) => props.handleCellChange(props.idx, 'desc', data.value)} />
            </td>
            <td><Input
                    value={price}
                    fluid
                    label={{
                            basic: true,
                            content: 'KZT'
                        }}
                    labelPosition='right'
                    type='number'
                    onChange={(e, data) => props.handleCellChange(props.idx, 'price', parseFloat(data.value))} />
            </td>
            <td><Input
                    value={quantity}
                    fluid
                    label={{
                        basic: true,
                        content: 'шт'
                    }}
                    labelPosition='right' />
            </td>
            <td><Input 
                    value={total} 
                    fluid />
            </td>
            <td>
                <Button icon onClick={() => props.handleRemove(id)}>
                    <Icon name='remove'/>
                </Button>
            </td>
        </tr>
    )
}

export default WarrantyListItem;