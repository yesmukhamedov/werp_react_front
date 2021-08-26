import React, { useState } from 'react';
import { Modal, Button, Icon, Header, Input, Form } from 'semantic-ui-react';

const ModalAddCompany = props => {
    const { open, close, create, getList, clear, clearTempData } = props;

    const initialCompany = {
        name: '',
        spras: '',
        bukrs: 0,
    };
    const [company, setCompany] = useState(initialCompany);

    const onChangeAdd = (fieldName, value) => {
        switch (fieldName) {
            case 'name':
                setCompany({ ...company, name: value });
                break;

            case 'spras':
                setCompany({ ...company, spras: value });
                break;

            case 'bukrs':
                setCompany({ ...company, bukrs: value });
                break;

            default:
                break;
        }
    };

    const saveCompany = () => {
        if (company.name && company.spras && company.bukrs) {
            create(company, () => {
                clear();
                clearTempData();
                getList();
                close();
            });
        }
    };

    return (
        <Modal closeIcon open={open} onClose={close}>
            <Header content="Добавить компанию" />
            <Modal.Content>
                <Form>
                    <Form.Field>
                        <label>Наименование</label>
                        <Input
                            placeholder="Name"
                            value={company.name}
                            onChange={e => onChangeAdd('name', e.target.value)}
                        />
                    </Form.Field>
                    <Form.Field>
                        <label>Spras</label>
                        <Input
                            placeholder="Spras"
                            value={company.spras}
                            onChange={e => onChangeAdd('spras', e.target.value)}
                        />
                    </Form.Field>
                    <Form.Field>
                        <label>Bukrs</label>
                        <Input
                            type="number"
                            placeholder="Bukrs"
                            value={company.bukrs}
                            onChange={e => onChangeAdd('bukrs', e.target.value)}
                        />
                    </Form.Field>
                </Form>
            </Modal.Content>
            <Modal.Actions>
                <Button color="red" onClick={close}>
                    <Icon name="remove" /> No
                </Button>
                <Button color="green" onClick={() => saveCompany()}>
                    <Icon name="checkmark" /> Сохранить
                </Button>
            </Modal.Actions>
        </Modal>
    );
};

export default ModalAddCompany;
