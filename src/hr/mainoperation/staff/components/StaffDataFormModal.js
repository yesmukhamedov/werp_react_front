import React from 'react'
import {Modal, Button } from 'semantic-ui-react'

/**
 * Модальное окно для формы
 */

export default function StaffDataFormModal(props) {
    const {content,header,opened} = props

    return <Modal size={'small'} open={opened}>
        <Modal.Header>{header}</Modal.Header>
        <Modal.Content>
            {content}
        </Modal.Content>
        <Modal.Actions>
            <Button negative onClick={props.onCancel}>Отмена</Button>
            <Button positive
                    icon='checkmark'
                    onClick={props.onSubmit}
                    labelPosition='right' content='Сохранить' />
        </Modal.Actions>
    </Modal>
}