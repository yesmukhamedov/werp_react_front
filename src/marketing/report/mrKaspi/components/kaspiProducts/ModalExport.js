import React, { useState } from 'react';
import { Modal, Form, Dropdown, Header, Button, Icon } from 'semantic-ui-react';
import { doGet } from '../../../../../utils/apiActions';

const ModalExport = props => {
    const { open, close, companyListOptions } = props;

    const initialStore = {
        // id: '',
        companyName: '',
    };

    const [tempData, setTempData] = useState(initialStore);
    const [error, setError] = useState(false);

    const onClickDownload = () => {
        if (tempData.companyName !== '') {
            let url = `core/marketing/kaspi/xml/${tempData.companyName}`;
            doGet(url).then(({ data }) => {
                const url = window.URL.createObjectURL(new Blob([data]));
                const link = document.createElement('a');
                link.href = url;
                link.setAttribute('download', `kaspi.xml`);
                // Append to html link element page
                document.body.appendChild(link);
                // Start download
                link.click();
                // Clean up and remove the link
                link.parentNode.removeChild(link);
            });
        } else {
            setError(true);
        }
    };

    const onChangeAdd = val => {
        setTempData({
            companyName: val,
        });
    };

    return (
        <Modal closeIcon open={open} onClose={close}>
            <Header content="Выберите компанию" />
            <Modal.Content>
                <Form>
                    <Form.Field error={error}>
                        <Dropdown
                            options={companyListOptions}
                            selection
                            error={error}
                            onChange={(e, { value }) => {
                                onChangeAdd(value);
                            }}
                            // defaultValue={companyListOptions}
                        />
                    </Form.Field>
                </Form>
            </Modal.Content>
            <Modal.Actions>
                <Button color="red" onClick={close}>
                    <Icon name="remove" /> Отмена
                </Button>
                <Button color="green" onClick={() => onClickDownload()}>
                    <Icon name="checkmark" />
                    Скачать
                </Button>
            </Modal.Actions>
        </Modal>
    );
};

export default ModalExport;
