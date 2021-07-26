import React, { useState } from 'react';
import {
    Modal,
    Button,
    Icon,
    Header,
    Table,
    Input,
    Form,
} from 'semantic-ui-react';
import ReactTableWrapper from '../../../utils/ReactTableWrapper';

const ModalAddCompany = props => {
    const { open, close, setDataExample = () => {}, data = [] } = props;
    const initialTempData = {
        id: 0,
        name: '',
        spras: '',
        bukrs: 0,
        edit: false,
    };

    const [tempData, setTempData] = useState(initialTempData);

    const onChangeName = (fieldName, value) => {
        console.log('data', data.length);
        switch (fieldName) {
            case 'name':
                setTempData({ ...tempData, id: data.length + 1, name: value });
                break;
            case 'spras':
                setTempData({ ...tempData, id: data.length + 1, spras: value });
                break;
            case 'bukrs':
                setTempData({ ...tempData, id: data.length + 1, bukrs: value });
                break;

            default:
                break;
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
                            value={data.name}
                            onChange={(e, o) =>
                                onChangeName('name', e.target.value)
                            }
                        />
                    </Form.Field>
                    <Form.Field>
                        <label>Spras</label>
                        <Input
                            placeholder="Time"
                            value={data.spras}
                            onChange={(e, o) =>
                                onChangeName('spras', e.target.value)
                            }
                        />
                    </Form.Field>
                    <Form.Field>
                        <label>Bukrs</label>
                        <Input
                            type="number"
                            placeholder="Time"
                            onChange={(e, o) =>
                                onChangeName('bukrs', e.target.value)
                            }
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
                        setDataExample(tempData);
                        setTempData(initialTempData);
                        close();
                    }}
                >
                    <Icon name="checkmark" /> Сохранить
                </Button>
            </Modal.Actions>
        </Modal>
    );
};

export default ModalAddCompany;
