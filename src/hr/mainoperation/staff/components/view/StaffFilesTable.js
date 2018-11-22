import React from 'react';
import { Table, Button } from 'semantic-ui-react'
import Upload from 'rc-upload';
import { ROOT_URL } from '../../../../../utils/constants'
import {Link} from 'react-router-dom'

export default function StaffFilesTable(props){

    const {files,onUploadSuccess,staffId} = props
    const uploaderProps = {
        action: `${ROOT_URL}/api/hr/file/upload/` + staffId,
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

    const deleteConfirm = (fileId) => {
        if(!window.confirm('Действительно хотите удалить файл?')){
            return
        }

        props.deleteFile(staffId,fileId)
    }


    let tempContent = files.map((file,idx) => {
        return (
            <Table.Row key={file.id}>
                <Table.Cell>{idx+1}</Table.Cell>
                <Table.Cell>{file.file_name}</Table.Cell>
                <Table.Cell>{file.file_size}</Table.Cell>
                <Table.Cell>{file.created_date}</Table.Cell>
                <Table.Cell>
                    <a href={`${ROOT_URL}/hr/file/download/` + file.id} className={'ui icon button mini right floated'}>
                        Скачать
                    </a>
                    {file.image ? <Button>Просмотр</Button>:''}
                    <Button onClick={() => deleteConfirm(file.id)}>Удалить</Button>
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
                        <Table.HeaderCell>№</Table.HeaderCell>
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