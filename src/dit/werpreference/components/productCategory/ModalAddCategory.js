import React, { useState } from 'react';
import { Modal, Button, Icon, Header, Input, Form } from 'semantic-ui-react';

const ModalAddCategory = ({
    open,
    close,
    create,
    getList,
    clear,
    clearTempData,
    categoryList,
}) => {
    const initialCategory = {
        // id: 1,
        code: '',
        info: '',
        nameEn: '',
        nameKk: '',
        nameRu: '',
        nameTr: '',
    };

    const [category, setCategory] = useState(initialCategory);

    const [errors, setErrors] = useState([]);

    const onChangeAdd = (fieldName, value) => {
        switch (fieldName) {
            case 'code':
                setCategory({
                    ...category,
                    // id: categoryList.length + 1,
                    code: value,
                });
                break;

            case 'info':
                setCategory({
                    ...category,
                    // id: categoryList.length + 1,
                    info: value,
                });
                break;

            case 'nameEn':
                setCategory({
                    ...category,
                    // id: categoryList.length + 1,
                    nameEn: value,
                });
                break;

            case 'nameKk':
                setCategory({
                    ...category,
                    // id: categoryList.length + 1,
                    nameKk: value,
                });
                break;

            case 'nameRu':
                setCategory({
                    ...category,
                    // id: categoryList.length + 1,
                    nameRu: value,
                });
                break;

            case 'nameTr':
                setCategory({
                    ...category,
                    // id: categoryList.length + 1,
                    nameTr: value,
                });
                break;

            default:
                break;
        }
    };

    console.log(category);

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

    const saveCategory = () => {
        if (validation(category)) {
            create(category, () => {
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
                    <Form.Field error={errors.code}>
                        <label>Код</label>
                        <Input
                            label="Заполните поле"
                            error={errors.code}
                            type="number"
                            placeholder="Code"
                            value={category.code}
                            onChange={e => onChangeAdd('code', e.target.value)}
                        />
                    </Form.Field>

                    <Form.Field error={errors.info}>
                        <label>Примичание</label>
                        <Input
                            label="Заполните поле"
                            error={errors.info}
                            type="text"
                            placeholder="Info"
                            value={category.info}
                            onChange={e => onChangeAdd('info', e.target.value)}
                        />
                    </Form.Field>

                    <Form.Field error={errors.nameEn}>
                        <label>Наименование EN</label>
                        <Input
                            label="Заполните поле"
                            error={errors.nameEn}
                            type="text"
                            placeholder="nameEn"
                            value={category.nameEn}
                            onChange={e =>
                                onChangeAdd('nameEn', e.target.value)
                            }
                        />
                    </Form.Field>

                    <Form.Field error={errors.nameKk}>
                        <label>Наименование KK</label>
                        <Input
                            label="Заполните поле"
                            error={errors.nameKk}
                            type="text"
                            placeholder="nameKk"
                            value={category.nameKk}
                            onChange={e =>
                                onChangeAdd('nameKk', e.target.value)
                            }
                        />
                    </Form.Field>

                    <Form.Field error={errors.nameRu}>
                        <label>Наименование RU</label>
                        <Input
                            label="Заполните поле"
                            error={errors.nameRu}
                            type="text"
                            placeholder="nameRu"
                            value={category.nameRu}
                            onChange={e =>
                                onChangeAdd('nameRu', e.target.value)
                            }
                        />
                    </Form.Field>

                    <Form.Field error={errors.nameTr}>
                        <label>Наименование TR</label>
                        <Input
                            label="Заполните поле"
                            error={errors.nameTR}
                            type="text"
                            placeholder="nameTR"
                            value={category.nameTr}
                            onChange={e =>
                                onChangeAdd('nameTr', e.target.value)
                            }
                        />
                    </Form.Field>
                </Form>
            </Modal.Content>
            <Modal.Actions>
                <Button color="red" onClick={close}>
                    <Icon name="remove" /> No
                </Button>
                <Button color="green" onClick={() => saveCategory()}>
                    <Icon name="checkmark" /> Сохранить
                </Button>
            </Modal.Actions>
        </Modal>
    );
};

export default ModalAddCategory;
