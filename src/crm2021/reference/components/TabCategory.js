import React, { useEffect, useState } from 'react';
import ModalCreate from './ModalCreate';
import { Button, Divider, Input, Table } from 'semantic-ui-react';

//
const TabCategory = props => {
  const { crudData, create, update, get, data = [] } = props;
  const { headerText } = crudData;
  const initialTempData = {
    name: '',
    nameEn: '',
    nameTr: '',
  };
  const [tempData, setTempData] = useState(initialTempData);
  const [modalOpen, setModalOpen] = useState(false);
  const [dataList, setDataList] = useState([]);

  useEffect(() => {
    if (data.length > 0) {
      setDataList(
        data.map(el => {
          return { ...el, editStatus: false };
        }),
      );
    }
  }, [data]);

  const createFormData = (fieldName, value) => {
    switch (fieldName) {
      case 'name':
        setTempData({ ...tempData, name: value });
        break;
      case 'nameEn':
        setTempData({ ...tempData, nameEn: value });
        break;
      case 'nameTr':
        setTempData({ ...tempData, nameTr: value });
        break;
    }
  };

  const updateFormData = (fieldName, value, id) => {
    switch (fieldName) {
      case 'name':
        setDataList(
          dataList.map(el =>
            el.id === id
              ? {
                  ...el,
                  name: value,
                }
              : el,
          ),
        );

        break;
      case 'nameEn':
        setDataList(
          dataList.map(el =>
            el.id === id
              ? {
                  ...el,
                  nameEn: value,
                }
              : el,
          ),
        );

        break;
      case 'nameTr':
        setDataList(
          dataList.map(el =>
            el.id === id
              ? {
                  ...el,
                  nameTr: value,
                }
              : el,
          ),
        );

        break;
    }
  };

  const saveCrudModal = () => {
    create(tempData, () => {
      get();
      setModalOpen(false);
    });
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
  return (
    <div>
      <ModalCreate
        open={modalOpen}
        closeCrudModal={() => setModalOpen(false)}
        crudData={crudData}
        saveCrudModal={saveCrudModal}
        createFormData={createFormData}
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
                  <Button color="blue" onClick={() => saveEditRow(item.id)}>
                    Сохранить
                  </Button>
                ) : (
                  <Button color="yellow" onClick={() => editRow(item)}>
                    Редактировать
                  </Button>
                )}
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </div>
  );
};
export default TabCategory;
