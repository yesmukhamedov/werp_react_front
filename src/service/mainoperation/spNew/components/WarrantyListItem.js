import React from 'react'
import {Table, Input, Dropdown, Button, Icon} from 'semantic-ui-react'

const WarrantyListItem = (props) => {
    const {id, desc, currency, code, warrantyPeriod} = props.data
    return (
        <Table.Row>
            <Table.Cell>{props.idx + 1}</Table.Cell>
            <Table.Cell>
                <Button icon onClick={() => props.handleOpenReference(id)}>
                    <Icon name='external square'/>
                </Button>
            </Table.Cell>
            <Table.Cell><Input fluid value={code}/>
            </Table.Cell>
            <Table.Cell><Input fluid value={desc}/>
            </Table.Cell>
            <Table.Cell><Input value={warrantyPeriod} fluid/>
            </Table.Cell>
            <Table.Cell>
                <Button icon onClick={() => props.handleRemove(id)}>
                    <Icon name='remove'/>
                </Button>
            </Table.Cell>
        </Table.Row>
    )
}

export default WarrantyListItem;