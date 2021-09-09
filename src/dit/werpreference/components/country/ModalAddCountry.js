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

const ModalAddCategory = ({
    open,
    close,
    create,
    getCountryList,
    clearCountryList,
    clearTempData,
    countryList,
    currencyOptions,
}) => {
    const initialCountry = {
        countryId: 1,
        code: '',
        country: '',
        currency: '',
        currencyId: '',
        phoneCode: '',
        telPattern: '',
    };

    const [country, setCountry] = useState(initialCountry);

    const [errors, setErrors] = useState([]);

    const onChangeAdd = (fieldName, value) => {
        switch (fieldName) {
            case 'code':
                setCountry({
                    ...country,
                    countryId: countryList.length + 1,
                    code: value,
                });
                break;

            case 'country':
                setCountry({
                    ...country,
                    countryId: countryList.length + 1,
                    country: value,
                });
                break;

            case 'currency':
                setCountry({
                    ...country,
                    countryId: countryList.length + 1,
                    currency: getCurrency(value),
                    currencyId: value,
                });
                break;

            case 'phoneCode':
                setCountry({
                    ...country,
                    countryId: countryList.length + 1,
                    phoneCode: value,
                });
                break;

            case 'telPattern':
                setCountry({
                    ...country,
                    countryId: countryList.length + 1,
                    telPattern: value,
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

    const saveCountry = () => {
        if (validation(country)) {
            create(country, () => {
                clearCountryList();
                clearTempData();
                getCountryList();
                close();
            });
        }
    };

    const getCurrency = value => {
        let currencyName = '';
        currencyOptionsForDropdown.map(item => {
            if (item.key == value) {
                currencyName = item.text;
            }
        });
        return currencyName;
    };

    const currencyOptionsForDropdown = currencyOptions.map(item => {
        return {
            key: item.key,
            text: item.text,
            value: item.key,
        };
    });

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
                            type="text"
                            placeholder="Code"
                            value={country.code}
                            onChange={e => onChangeAdd('code', e.target.value)}
                        />
                    </Form.Field>

                    <Form.Field error={errors.country}>
                        <label>Страна</label>
                        <Input
                            label="Заполните поле"
                            error={errors.country}
                            type="text"
                            placeholder="country"
                            value={country.country}
                            onChange={e =>
                                onChangeAdd('country', e.target.value)
                            }
                        />
                    </Form.Field>

                    <Form.Field error={errors.currency}>
                        <label>Валюта</label>
                        <Dropdown
                            options={currencyOptionsForDropdown}
                            selection
                            value={currencyOptionsForDropdown.value}
                            onChange={(e, { value }) =>
                                onChangeAdd('currency', value)
                            }
                        />
                    </Form.Field>

                    <Form.Field error={errors.phoneCode}>
                        <label>Код телефон</label>
                        <Input
                            label="Заполните поле"
                            error={errors.phoneCode}
                            type="number"
                            placeholder="phoneCode"
                            value={country.phoneCode}
                            onChange={e =>
                                onChangeAdd('phoneCode', e.target.value)
                            }
                        />
                    </Form.Field>

                    <Form.Field error={errors.telPattern}>
                        <label>Тел</label>
                        <Input
                            label="Заполните поле"
                            error={errors.telPattern}
                            type="number"
                            placeholder="telPattern"
                            value={country.telPattern}
                            onChange={e =>
                                onChangeAdd('telPattern', e.target.value)
                            }
                        />
                    </Form.Field>
                </Form>
            </Modal.Content>
            <Modal.Actions>
                <Button color="red" onClick={close}>
                    <Icon name="remove" /> No
                </Button>
                <Button color="green" onClick={() => saveCountry()}>
                    <Icon name="checkmark" /> Сохранить
                </Button>
            </Modal.Actions>
        </Modal>
    );
};

export default ModalAddCategory;
