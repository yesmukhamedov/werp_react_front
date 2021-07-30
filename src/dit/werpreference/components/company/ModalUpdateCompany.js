import React from 'react';
import { Modal, Button, Icon, Header, Input, Form } from 'semantic-ui-react';

function ModalUpdateCompany(props) {
    const { open, close, data } = props;

    return (
        <Modal closeIcon open={open} onClose={close}>
            <Header content="Изменить компанию" />
            <Modal.Content>
                <Form>
                    <Form.Field>
                        <label>Наименование</label>
                        <Input
                            placeholder="Name"
                            // value={data[0].name}
                            // onChange={e => onChangeCell('name', e.target.value)}
                        />
                    </Form.Field>
                    <Form.Field>
                        <label>Spras</label>
                        <Input
                            placeholder="Spras"
                            // value={data[0].spras}
                            // onChange={e =>
                            //     onChangeCell('spras', e.target.value)
                            // }
                        />
                    </Form.Field>
                    <Form.Field>
                        <label>Bukrs</label>
                        <Input
                            type="number"
                            placeholder="Bukrs"
                            // value={data[0].bukrs}
                            // onChange={e =>
                            //     onChangeCell('bukrs', e.target.value)
                            // }
                        />
                    </Form.Field>
                </Form>
            </Modal.Content>
            <Modal.Actions>
                <Button color="red" onClick={close}>
                    <Icon name="remove" /> No
                </Button>
                <Button
                    color="green"
                    onClick={() => {
                        // setDataExample(tempData);
                        // setTempData(initialTempData);
                    }}
                >
                    <Icon name="checkmark" /> Сохранить
                </Button>
            </Modal.Actions>
        </Modal>
    );
}

export default ModalUpdateCompany;
