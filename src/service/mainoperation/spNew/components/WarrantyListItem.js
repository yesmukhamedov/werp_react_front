import React from 'react'
import {Table, Input, Button, Icon} from 'semantic-ui-react'

const WarrantyListItem = (props) => {
    const {uuid, description, code, warrantyMonths} = props.data
    return (
        <Table.Row>
            <Table.Cell>{props.idx + 1}</Table.Cell>
            <Table.Cell>
                <Button icon onClick={() => props.handleOpenReference(uuid)}>
                    <Icon name='external square'/>
                </Button>
            </Table.Cell>
            <Table.Cell><Input fluid value={code}/>
            </Table.Cell>
            <Table.Cell><Input fluid value={description}/>
            </Table.Cell>
            <Table.Cell>
                <Input value={warrantyMonths} 
                    fluid
                    type='number'
                    min='1'
                    onChange={(e, data) => props.handleCellChange(props.idx, 'warrantyMonths', data.value)}/>
            </Table.Cell>
            <Table.Cell>
                <Button icon onClick={() => props.handleRemove(uuid)}>
                    <Icon name='remove'/>
                </Button>
            </Table.Cell>
        </Table.Row>
    )
}

export default WarrantyListItem;