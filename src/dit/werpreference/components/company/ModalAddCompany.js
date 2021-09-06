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

    const [errors, setErrors] = useState([]);

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

    const isFieldEmpty = val => val === '' || val === null || val === undefined;

    const validation = item => {
        let success = true;
        setErrors(() => {
            let temporaryObj = {};
            Object.entries(item).map(keyAndVal => {
                temporaryObj = {
                    ...temporaryObj,
                    [keyAndVal[0]]: isFieldEmpty(keyAndVal[1]),
                };
            });
            return temporaryObj;
        });
        const arr = Object.values(item);
        arr.map(val => {
            if (isFieldEmpty(val)) {
                success = false;
            }
        });

        return success;
    };

    const saveCompany = () => {
        if (validation(company)) {
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
                    <Form.Field error={errors.name}>
                        <label>Наименование</label>
                        <Input
                            label="Заполните поле"
                            error={errors.name}
                            placeholder="Name"
                            value={company.name}
                            onChange={e => onChangeAdd('name', e.target.value)}
                            type="text"
                        />
                    </Form.Field>
                    <Form.Field error={errors.spras}>
                        <label>Spras</label>
                        <Input
                            label="Заполните поле"
                            error={errors.spras}
                            placeholder="Spras"
                            value={company.spras}
                            onChange={e => onChangeAdd('spras', e.target.value)}
                            type="text"
                        />
                    </Form.Field>
                    <Form.Field error={errors.bukrs}>
                        <label>Bukrs</label>
                        <Input
                            label="Заполните поле"
                            error={errors.bukrs}
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
