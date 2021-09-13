import React, { useEffect } from 'react';
import { Button, Header, Icon, Modal } from 'semantic-ui-react';

const ModalConfirmDelete = props => {
    const { openModal, closeModal, yesAction } = props;
    const [open, setOpen] = React.useState(openModal);
    return (
        <Modal
            closeIcon
            size="tiny"
            open={openModal}
            //trigger={<Button>Show Modal</Button>}
            onClose={() => closeModal()}
            onOpen={() => setOpen(true)}
        >
            <Modal.Content>
                <h4 align="center">
                    Вы действительно хотите удалить эту запись?
                </h4>
            </Modal.Content>
            <Modal.Actions>
                <Button align="center" color="red" onClick={() => closeModal()}>
                    <Icon name="remove" /> Нет
                </Button>
                <Button
                    align="center"
                    color="green"
                    onClick={() => yesAction()}
                >
                    <Icon name="checkmark" /> Да
                </Button>
            </Modal.Actions>
        </Modal>
    );
};

export default ModalConfirmDelete;
