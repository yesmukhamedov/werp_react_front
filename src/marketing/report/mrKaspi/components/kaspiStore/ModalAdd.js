import React, { useState } from 'react';

import {
    Button,
    Dropdown,
    Header,
    Icon,
    Modal,
    Table,
    Form,
    Input,
} from 'semantic-ui-react';

export default function ModalAdd(props) {
    const { open, close, creatStore, fetchStoreList, clearStoreList } = props;

    const initialStore = {
        id: '',
        name: '',
    };

    const [tempStore, setTempStore] = useState(initialStore);
    const [errors, setErrors] = useState([]);

    const onChangeAdd = (fieldName, value) => {
        switch (fieldName) {
            case 'id':
                setTempStore({
                    ...tempStore,
                    id: value,
                });
                break;
            case 'name':
                setTempStore({
                    ...tempStore,
                    name: value,
                });
                break;

            default:
                break;
        }
    };

    const isFieldEmpty = val => val === '' || val === null || val === undefined;

    const validation = item => {
        let success = true;
        setErrors(() => {
            let tempObj = {};
            Object.entries(item).map(keyAndVal => {
                tempObj = {
                    ...tempObj,
                    [keyAndVal[0]]: isFieldEmpty(keyAndVal[1]),
                };
            });
            return tempObj;
        });

        const arr = Object.values(item);
        arr.map(val => {
            if (isFieldEmpty(val)) {
                success = false;
            }
        });
        return success;
    };

    const saveStore = () => {
        if (validation(tempStore)) {
            creatStore(tempStore, () => {
                fetchStoreList();
                clearStoreList();
                close();
            });
        }
    };

    return (
        <Modal closeIcon open={open} onClose={close}>
            <Header content="Добавление" />
            <Modal.Content>
                <Form>
                    <Form.Field error={errors.id}>
                        <label>ID</label>
                        <Input
                            type="text"
                            error={errors.id}
                            onChange={e => {
                                onChangeAdd('id', e.target.value);
                            }}
                        />
                    </Form.Field>
                    <Form.Field error={errors.name}>
                        <label>Адрес</label>
                        <Input
                            type="text"
                            error={errors.name}
                            onChange={e => {
                                onChangeAdd('name', e.target.value);
                            }}
                        />
                    </Form.Field>
                </Form>
            </Modal.Content>
            <Modal.Actions>
                <Button color="red" onClick={close}>
                    <Icon name="remove" /> Отмена
                </Button>
                <Button color="green" onClick={() => saveStore()}>
                    <Icon name="checkmark" /> Сохранить
                </Button>
            </Modal.Actions>
        </Modal>
    );
}
