import React from 'react';
import { Table, Button } from 'semantic-ui-react'
import Upload from 'rc-upload';
import { ROOT_URL } from '../../../../../utils/constants'

export default function StaffFilesTable(props){

    const {files,onUploadSuccess,staffId} = props
    const uploaderProps = {
        action: `${ROOT_URL}/api/hr/file/upload`,
        accept: '.*',
        multiple: true,
        headers: {
            Authorization: localStorage.getItem('token'),
        },
        onSuccess(file) {
            onUploadSuccess(file);
        },
        onError(err) {
            console.log('onError', err);
        },
    };


    let tempContent = files.map(file => {
        return (
            <Table.Row key={file.id}>
                <Table.Cell>{file.file_name}</Table.Cell>
                <Table.Cell>{file.file_size}</Table.Cell>
                <Table.Cell>{file.created_date}</Table.Cell>
                <Table.Cell>
                    <Button onClick={() => props.downloadFile(file.id)}>Скачать</Button>
                    {file.image ? <Button>Просмотр</Button>:''}
                    <Button>Удалить</Button>
                </Table.Cell>
            </Table.Row>
        )
    })
    return <div className="ui grid" style={{marginTop:'10px'}}>
        <div className="sixteen wide">
            <Upload
                {...uploaderProps}
                component="div"
                style={{ display: 'inline-block', marginBottom: '10px' }}
            >
                <Button
                    content={'Upload file'}
                    icon="upload"
                    size="small"
                    color="twitter"
                />
            </Upload>
        </div>
        <div className="sixteen wide">
            <Table celled>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell>Название файла</Table.HeaderCell>
                        <Table.HeaderCell>Размер</Table.HeaderCell>
                        <Table.HeaderCell>Дата загрузки</Table.HeaderCell>
                        <Table.HeaderCell>Действия</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>

                <Table.Body>{tempContent}</Table.Body>
            </Table>
        </div>
    </div>
}