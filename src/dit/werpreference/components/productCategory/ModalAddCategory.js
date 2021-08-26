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
        id: 1,
        code: '',
        info: '',
        nameEn: '',
        nameKk: '',
        nameRu: '',
        nameTr: '',
    };

    const [category, setCategory] = useState(initialCategory);

    const onChangeAdd = (fieldName, value) => {
        switch (fieldName) {
            case 'code':
                setCategory({
                    ...category,
                    id: categoryList.length + 1,
                    code: value,
                });
                break;

            case 'info':
                setCategory({
                    ...category,
                    id: categoryList.length + 1,
                    info: value,
                });
                break;

            case 'nameEn':
                setCategory({
                    ...category,
                    id: categoryList.length + 1,
                    nameEn: value,
                });
                break;

            case 'nameKk':
                setCategory({
                    ...category,
                    id: categoryList.length + 1,
                    nameKk: value,
                });
                break;

            case 'nameRu':
                setCategory({
                    ...category,
                    id: categoryList.length + 1,
                    nameRu: value,
                });
                break;

            case 'nameTr':
                setCategory({
                    ...category,
                    id: categoryList.length + 1,
                    nameTr: value,
                });
                break;

            default:
                break;
        }
    };

    const saveCategory = () => {
        if (
            category.code &&
            category.info &&
            category.nameEn &&
            category.nameKk &&
            category.nameRu &&
            category.nameTr
        ) {
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
                    <Form.Field>
                        <label>Код</label>
                        <Input
                            type="number"
                            placeholder="Code"
                            value={category.code}
                            onChange={e => onChangeAdd('code', e.target.value)}
                        />
                    </Form.Field>

                    <Form.Field>
                        <label>Примичание</label>
                        <Input
                            type="text"
                            placeholder="Info"
                            value={category.info}
                            onChange={e => onChangeAdd('info', e.target.value)}
                        />
                    </Form.Field>

                    <Form.Field>
                        <label>Наименование EN</label>
                        <Input
                            type="text"
                            placeholder="nameEn"
                            value={category.nameEn}
                            onChange={e =>
                                onChangeAdd('nameEn', e.target.value)
                            }
                        />
                    </Form.Field>

                    <Form.Field>
                        <label>Наименование KK</label>
                        <Input
                            type="text"
                            placeholder="nameKk"
                            value={category.nameKk}
                            onChange={e =>
                                onChangeAdd('nameKk', e.target.value)
                            }
                        />
                    </Form.Field>

                    <Form.Field>
                        <label>Наименование RU</label>
                        <Input
                            type="text"
                            placeholder="nameRu"
                            value={category.nameRu}
                            onChange={e =>
                                onChangeAdd('nameRu', e.target.value)
                            }
                        />
                    </Form.Field>

                    <Form.Field>
                        <label>Наименование TR</label>
                        <Input
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
