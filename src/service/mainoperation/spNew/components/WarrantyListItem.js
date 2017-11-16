import React from 'react'
import { Table, Input, Dropdown, Button, Icon } from 'semantic-ui-react'

const WarrantyListItem = (props) => {
    const { id, desc, currency, code, warrantyPeriod } = props.data
    return (
        <tr className="sp-sparepart-list-item">
            <td>{id}</td>
            <td>
                <Button icon onClick={() => props.handleOpenReference(id)}>
                    <Icon name='external square'/>
                </Button>
            </td>
            <td><Input 
                    fluid 
                    value={code} 
                    />
            </td>
            
            <td><Input 
                    fluid 
                    value={desc} 
                     />
            </td>
            <td><Input 
                    value={warrantyPeriod} 
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