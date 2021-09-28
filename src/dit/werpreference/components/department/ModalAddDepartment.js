import React, { useState } from 'react';
import { Modal, Button, Icon, Header, Input, Form } from 'semantic-ui-react';

export default function ModalAddDepartment({
    open,
    close,
    createDepartment,
    getDepartmentList,
    departmentList,
    clearDepartmentList,
    clearTempData,
}) {
    const initialDepartment = {
        nameEn: '',
        nameKk: '',
        nameRu: '',
        nameTr: '',
    };

    const [tempDepartment, setTempDepartment] = useState(initialDepartment);

    const [errors, setErrors] = useState([]);

    const isFieldEmpty = fieldName =>
        fieldName === '' || fieldName === null || fieldName === undefined;

    const validation = item => {
        let success = true;
        setErrors(() => {
            let temporaryObj = {};
            Object.entries(item).map(keyAndValue => {
                temporaryObj = {
                    ...temporaryObj,
                    [keyAndValue[0]]: isFieldEmpty(keyAndValue[1]),
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

    const saveDepartment = () => {
        if (validation(tempDepartment)) {
            createDepartment(tempDepartment, () => {
                clearDepartmentList();
                clearTempData();
                getDepartmentList();
                close();
            });
        }
    };

    const onChangeAdd = (fieldName, value) => {
        switch (fieldName) {
            case 'nameEn':
                setTempDepartment({
                    ...tempDepartment,
                    nameEn: value,
                });
                break;

            case 'nameKk':
                setTempDepartment({
                    ...tempDepartment,
                    nameKk: value,
                });
                break;
            case 'nameRu':
                setTempDepartment({
                    ...tempDepartment,
                    nameRu: value,
                });
                break;
            case 'nameTr':
                setTempDepartment({
                    ...tempDepartment,
                    nameTr: value,
                });
                break;
            default:
                break;
        }
    };

    return (
        <div>
            <Modal closeIcon open={open} onClose={close}>
                <Header content="Добавить отдел" />

                <Modal.Content>
                    <Form>
                        <Form.Field error={errors.nameEn}>
                            <label>Наименование En</label>
                            <Input
                                label="Заполните поле"
                                error={errors.nameEn}
                                type="text"
                                onChange={(e, { value }) =>
                                    onChangeAdd('nameEn', value)
                                }
                            />
                        </Form.Field>

                        <Form.Field error={errors.nameKk}>
                            <label>Наименование Kz</label>
                            <Input
                                label="Заполните поле"
                                error={errors.nameKk}
                                type="text"
                                onChange={(e, { value }) =>
                                    onChangeAdd('nameKk', value)
                                }
                            />
                        </Form.Field>

                        <Form.Field error={errors.nameRu}>
                            <label>Наименование Ru</label>
                            <Input
                                label="Заполните поле"
                                error={errors.nameRu}
                                onChange={(e, { value }) =>
                                    onChangeAdd('nameRu', value)
                                }
                            />
                        </Form.Field>
                        <Form.Field error={errors.nameTr}>
                            <label>Наименование Tr</label>
                            <Input
                                label="Заполните поле"
                                error={errors.nameTr}
                                onChange={(e, { value }) =>
                                    onChangeAdd('nameTr', value)
                                }
                            />
                        </Form.Field>
                    </Form>
                </Modal.Content>
                <Modal.Actions>
                    <Button color="red" onClick={close}>
                        <Icon name="remove" /> No
                    </Button>
                    <Button color="green" onClick={() => saveDepartment()}>
                        <Icon name="checkmark" /> Сохранить
                    </Button>
                </Modal.Actions>
            </Modal>
        </div>
    );
}
