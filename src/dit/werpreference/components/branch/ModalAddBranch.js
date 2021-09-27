import React, { useState } from 'react';
import {
    Modal,
    Button,
    Icon,
    Header,
    Input,
    Form,
    Dropdown,
} from 'semantic-ui-react';

function ModalAddBranch({
    open,
    close,
    createBranch,
    getBranchList,
    branchList,
    clearBranchList,
    clearTempData,
    companyOptions,
    countryOptionsForDropdown,
    categoryOptionsForDropdown,
    businessAreaOptionsForDropdown,
    stateOptionsForDropdown,
}) {
    const initialBranch = {
        // branchId: "",
        bukrs: '',
        text45: '',
        countryId: '',
        type: '',
        tovarCategory: '',
        businessAreaId: '',
        stateId: '',
    };
    const [tempBranches, setTempBranches] = useState(initialBranch);

    const [errors, setErrors] = useState([]);

    const onChangeAdd = (fieldName, value) => {
        switch (fieldName) {
            // case 'branchId':
            //     setTempBranches({
            //         ...tempBranches,
            //         // branchId: branchList.length + 1,
            //         branchId: value,
            //     });
            //     break;
            case 'bukrs':
                setTempBranches({
                    ...tempBranches,
                    // branchId: branchList.length + 1,
                    bukrs: value,
                });
                break;

            case 'text45':
                setTempBranches({
                    ...tempBranches,
                    // branchId: branchList.length + 1,
                    text45: value,
                });
                break;

            case 'countryId':
                setTempBranches({
                    ...tempBranches,
                    // branchId: branchList.length + 1,
                    countryId: value,
                });
                break;

            case 'type':
                setTempBranches({
                    ...tempBranches,
                    // branchId: branchList.length + 1,
                    type: value,
                });
                break;

            case 'tovarCategory':
                setTempBranches({
                    ...tempBranches,
                    // branchId: branchList.length + 1,
                    tovarCategory: value,
                });
                break;

            case 'businessAreaId':
                setTempBranches({
                    ...tempBranches,
                    // branchId: branchList.length + 1,
                    businessAreaId: value,
                });
                break;

            case 'stateId':
                setTempBranches({
                    ...tempBranches,
                    // branchId: branchList.length + 1,
                    stateId: value,
                });
                break;

            default:
                break;
        }
    };

    const isFieldEmpty = val => val === '' || val === null || val === undefined;

    const validate = item => {
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

    const saveBranch = () => {
        if (validate(tempBranches)) {
            createBranch(tempBranches, () => {
                clearBranchList();
                clearTempData();
                getBranchList();
                close();
            });
        }
    };

    return (
        <Modal closeIcon open={open} onClose={close}>
            <Header content="Добавить филиал" />
            <Modal.Content>
                <Form>
                    <Form.Field>
                        <label>ID</label>
                        <Input
                            label="ID не должен повториться"
                            type="number"
                            onChange={(e, { value }) =>
                                onChangeAdd('branchId', value)
                            }
                        />
                    </Form.Field>
                    <Form.Field error={errors.bukrs}>
                        <label>Компания</label>
                        <Dropdown
                            options={companyOptions}
                            selection
                            onChange={(e, { value }) =>
                                onChangeAdd('bukrs', value)
                            }
                        />
                    </Form.Field>
                    <Form.Field error={errors.text45}>
                        <label>Наименование</label>
                        <Input
                            label="Заполните поле"
                            type="text"
                            onChange={(e, { value }) =>
                                onChangeAdd('text45', value)
                            }
                        />
                    </Form.Field>
                    <Form.Field error={errors.countryId}>
                        <label>Страна</label>
                        <Dropdown
                            options={countryOptionsForDropdown}
                            selection
                            onChange={(e, { value }) =>
                                onChangeAdd('countryId', value)
                            }
                        />
                    </Form.Field>
                    <Form.Field error={errors.type}>
                        <label>Тип</label>
                        <Input
                            label="Заполните поле"
                            type="text"
                            onChange={(e, { value }) =>
                                onChangeAdd('type', value)
                            }
                        />
                    </Form.Field>
                    <Form.Field error={errors.tovarCategory}>
                        <label>Котегория товара</label>
                        <Dropdown
                            options={categoryOptionsForDropdown}
                            selection
                            onChange={(e, { value }) =>
                                onChangeAdd('tovarCategory', value)
                            }
                        />
                    </Form.Field>
                    <Form.Field error={errors.businessAreaId}>
                        <label>Сфера бизнеса</label>
                        <Dropdown
                            options={businessAreaOptionsForDropdown}
                            selection
                            // value={businessAreaOptionsForDropdown.value}
                            onChange={(e, { value }) =>
                                onChangeAdd('businessAreaId', value)
                            }
                        />
                    </Form.Field>
                    <Form.Field error={errors.stateId}>
                        <label>Область</label>
                        <Dropdown
                            options={stateOptionsForDropdown}
                            selection
                            // value={businessAreaOptionsForDropdown.value}
                            onChange={(e, { value }) =>
                                onChangeAdd('stateId', value)
                            }
                        />
                    </Form.Field>
                </Form>
            </Modal.Content>
            <Modal.Actions>
                <Button color="red" onClick={close}>
                    <Icon name="remove" /> No
                </Button>
                <Button color="green" onClick={() => saveBranch()}>
                    <Icon name="checkmark" />
                    Сохранить
                </Button>
            </Modal.Actions>
        </Modal>
    );
}

export default ModalAddBranch;
