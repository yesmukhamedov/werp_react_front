import React from 'react';
import { Button, Modal, Icon, Input, Form } from 'semantic-ui-react';

const LedgerAccount = props => {
    const {
        messages = {},
        general = [],
        setModalDetalOpen,
        modalDetalOpen,
    } = props;

    console.log('list for modal=>', general);
    return (
        <Modal
            closeIcon
            onClose={() => setModalDetalOpen(false)}
            open={modalDetalOpen}
            size="mini"
        >
            <Modal.Header>{`${messages['fullHtonk']}`}</Modal.Header>
            <Modal.Content>
                <Form></Form>
                <table class="ui compact table">
                    <thead>
                        <tr>
                            <th>{messages['belnr']}</th>
                            <th>{messages['brnch']}</th>
                            <th>{messages['name']}</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* {general.map((item, index) => (
                            <tr key={index}>
                                {item.map((item, index) => (
                                    <td key={index}>{item}</td>
                                ))}
                            </tr> 
                        ))} */}
                    </tbody>
                </table>
            </Modal.Content>
            <Modal.Actions>
                <Button color="blue" onClick={() => setModalDetalOpen(false)}>
                    Ok
                </Button>
            </Modal.Actions>
        </Modal>
    );
};

export default LedgerAccount;
