import React, { useEffect, useState } from 'react';
import ModalCreate from './ModalCreate';
import { Button, Divider, Input, Popup, Table } from 'semantic-ui-react';
import ModalConfirmDelete from './ModalConfirmDelete';
//
const TabCategory = props => {
    const { crudData, create, update, get, deleteCategory, data = [] } = props;
    const { headerText } = crudData;
    const initialTempData = {
        name: '',
        nameEn: '',
        nameTr: '',
    };
    const initialTempFormErrors = {
        nameError: false,
        nameEnError: false,
        nameTrError: false,
        dropdownError: false,
    };
    const [tempData, setTempData] = useState(initialTempData);
    const [modalOpen, setModalOpen] = useState(false);
    const [dataList, setDataList] = useState([]);
    const [openComfirmModal, setOpenConfirmModal] = useState(false);
    const [rowItem, setRowItem] = useState();
    const [createFormErrors, setCreateFormErrors] = useState({
        ...initialTempFormErrors,
    });

    useEffect(() => {
        if (data.length > 0) {
            setDataList(
                data.map(el => {
                    return { ...el, editStatus: false };
                }),
            );
        } else {
            setDataList([]);
        }
    }, [data]);

    const createFormData = (fieldName, value) => {
        let hasError = value === null || value === undefined || value === '';
        switch (fieldName) {
            case 'name':
                setCreateFormErrors({
                    ...createFormErrors,
                    nameError: hasError,
                });
                setTempData({ ...tempData, name: value });
                break;
            case 'nameEn':
                setCreateFormErrors({
                    ...createFormErrors,
                    nameEnError: hasError,
                });
                setTempData({ ...tempData, nameEn: value });
                break;
            case 'nameTr':
                setCreateFormErrors({
                    ...createFormErrors,
                    nameTrError: hasError,
                });
                setTempData({ ...tempData, nameTr: value });
                break;
        }
    };

    const updateFormData = (fieldName, value, id) => {
        switch (fieldName) {
            case 'name':
                setDataList(
                    dataList.map(el => {
                        if (el.id === id) {
                            return value === null ||
                                value === undefined ||
                                value === ''
                                ? {
                                      ...el,
                                      name: value,
                                      errorName: true,
                                  }
                                : {
                                      ...el,
                                      name: value,
                                      errorName: false,
                                  };
                        } else {
                            return el;
                        }
                    }),
                );

                break;
            case 'nameEn':
                setDataList(
                    dataList.map(el => {
                        if (el.id === id) {
                            return value === null ||
                                value === undefined ||
                                value === ''
                                ? {
                                      ...el,
                                      nameEn: value,
                                      errorNameEn: true,
                                  }
                                : {
                                      ...el,
                                      nameEn: value,
                                      errorNameEn: false,
                                  };
                        } else {
                            return el;
                        }
                    }),
                );

                break;
            case 'nameTr':
                setDataList(
                    dataList.map(el => {
                        if (el.id === id) {
                            return value === null ||
                                value === undefined ||
                                value === ''
                                ? {
                                      ...el,
                                      nameTr: value,
                                      errorNameTr: true,
                                  }
                                : {
                                      ...el,
                                      nameTr: value,
                                      errorNameTr: false,
                                  };
                        } else {
                            return el;
                        }
                    }),
                );

                break;
        }
    };

    const saveCrudModal = () => {
        const hasError = createFormErrors;
        for (const [key, val] of Object.entries(tempData)) {
            if (val === null || val === undefined || val === '') {
                switch (key) {
                    case 'name':
                        hasError.nameError = true;
                        break;
                    case 'nameEn':
                        hasError.nameEnError = true;
                        break;
                    case 'nameTr':
                        hasError.nameTrError = true;
                        break;
                }
            }
        }
        setCreateFormErrors({ ...hasError });
        if (
            !(
                createFormErrors.nameError ||
                createFormErrors.nameEnError ||
                createFormErrors.nameTrError
            )
        ) {
            create(tempData, () => {
                get();
                setModalOpen(false);
            });
            setTempData({ ...initialTempData });
        }
    };
    const editRow = data => {
        setDataList(
            dataList.map(el =>
                el.id === data.id
                    ? {
                          ...el,
                          editStatus: el.editStatus === false,
                      }
                    : el,
            ),
        );
    };
    const saveEditRow = id => {
        let filterData = dataList
            .filter(item => item.id === id)
            .map(el => {
                return {
                    id: el.id,
                    name: el.name,
                    nameEn: el.nameEn,
                    nameTr: el.nameTr,
                };
            });
        update(filterData[0], () => {
            get();
        });
    };
    const deleteRow = () => {
        deleteCategory(rowItem.id, () => get());
        setOpenConfirmModal(false);
    };
    return (
        <div>
            <ModalCreate
                open={modalOpen}
                closeCrudModal={() => setModalOpen(false)}
                crudData={crudData}
                saveCrudModal={saveCrudModal}
                createFormData={createFormData}
                createFormErrors={createFormErrors}
            />

            <ModalConfirmDelete
                openModal={openComfirmModal}
                closeModal={() => setOpenConfirmModal(false)}
                yesAction={deleteRow}
            />
            <div className="tab-header">
                <h5>{headerText}</h5>
                <Button color="green" onClick={() => setModalOpen(true)}>
                    Добавить
                </Button>
            </div>

            <Divider />
            <Table celled size="small">
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell width={1}>ID</Table.HeaderCell>
                        <Table.HeaderCell>Наименование</Table.HeaderCell>
                        <Table.HeaderCell>English</Table.HeaderCell>
                        <Table.HeaderCell>Türk</Table.HeaderCell>
                        <Table.HeaderCell>Редактирование</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    {dataList.map((item, index) => (
                        <Table.Row key={index}>
                            <Table.Cell width={1}>{item.id}</Table.Cell>
                            <Table.Cell width={3}>
                                <Input
                                    readOnly={item.editStatus === false}
                                    value={item.name}
                                    onChange={(e, { value }) =>
                                        updateFormData('name', value, item.id)
                                    }
                                />
                            </Table.Cell>
                            <Table.Cell width={3}>
                                <Input
                                    readOnly={item.editStatus === false}
                                    value={item.nameEn}
                                    onChange={(e, { value }) =>
                                        updateFormData('nameEn', value, item.id)
                                    }
                                />
                            </Table.Cell>
                            <Table.Cell width={3}>
                                <Input
                                    readOnly={item.editStatus === false}
                                    value={item.nameTr}
                                    onChange={(e, { value }) =>
                                        updateFormData('nameTr', value, item.id)
                                    }
                                />
                            </Table.Cell>
                            <Table.Cell width={2}>
                                {item.editStatus === true ? (
                                    <Popup
                                        content="Сохранить"
                                        trigger={
                                            <Button
                                                circular
                                                color="blue"
                                                onClick={() =>
                                                    saveEditRow(item.id)
                                                }
                                                icon="save"
                                            />
                                        }
                                    />
                                ) : (
                                    <Popup
                                        content="Редактировать"
                                        trigger={
                                            <Button
                                                circular
                                                color="yellow"
                                                onClick={() => editRow(item)}
                                                icon="pencil"
                                            />
                                        }
                                    />
                                )}
                                <Popup
                                    content="Удалить"
                                    trigger={
                                        <Button
                                            circular
                                            color="red"
                                            onClick={() => {
                                                setOpenConfirmModal(true);
                                                setRowItem(item);
                                            }}
                                            icon="delete"
                                        />
                                    }
                                />
                            </Table.Cell>
                        </Table.Row>
                    ))}
                </Table.Body>
            </Table>
        </div>
    );
};
export default TabCategory;
