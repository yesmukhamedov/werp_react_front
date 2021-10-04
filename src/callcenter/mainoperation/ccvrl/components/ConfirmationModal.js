import React from 'react';
import { Button, Modal } from 'semantic-ui-react';

const ConfirmationModal = ({ open, messages, cancel, remove }) => {
    return (
        <Modal open={open}>
            <Modal.Header>{messages['remove_release']}</Modal.Header>
            <Modal.Actions>
                <Button
                    content={messages['BTN__NO']}
                    onClick={cancel}
                    color="black"
                />
                <Button
                    color="black"
                    onClick={remove}
                    content={messages['BTN__YES']}
                />
            </Modal.Actions>
        </Modal>
    );
};

export default ConfirmationModal;
