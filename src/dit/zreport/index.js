import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import {
    fetchZreports,
    uploadZReport,
    deleteFile,
    updateZreport,
    clearDynObj,
} from '../ditAction';
import { excelDownload } from '../../utils/helpers';
import {
    Header,
    Icon,
    Segment,
    Button,
    Container,
    Input,
} from 'semantic-ui-react';
import { injectIntl } from 'react-intl';
import ListZReport from './listZReport';

function Zreport(props) {
    const {
        intl: { messages },
    } = props;

    //componentDidMount
    useEffect(() => {
        if (!fetchZreports || fetchZreports.length === 0) props.fetchZreports();
        //unmount
        return () => {
            props.clearDynObj();
            console.log('props ', props.dynObjTrLst);
        };
    }, []);

    const [file, setFile] = useState(null);
    const [fileData, setFileData] = useState(null);

    const onChange = e => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('file', e.target.files[0]);
        setFile(formData);

        const item = {};
        item['name'] = e.target.files[0].name;
        item['id'] = Math.floor(Math.random() * 10);
        setFileData(item);
    };

    const uploadZRep = e => {
        e.preventDefault();
        props.uploadZReport(file, fileData);
    };

    const download = fileId => {
        excelDownload(
            `dit/zreport/download/${fileId.id}`,
            fileId.name,
            'outputTable',
            [],
            [],
        );
    };

    const updateFile = (rowId, e) => {
        const data = new FormData();
        data.append('file', e);
        props.updateZreport(rowId, data, e.name);
    };

    const delFile = id => {
        props.deleteFile(id);
    };
    return (
        <Container
            fluid
            style={{
                marginTop: '2em',
                marginBottom: '2em',
                paddingLeft: '2em',
                paddingRight: '2em',
            }}
        >
            <Segment clearing>
                <Header as="h2" floated="left">
                    {messages['report_uploads']}
                </Header>

                <Button color="twitter" floated="right" onClick={uploadZRep}>
                    <Icon name="upload" />
                    {messages['Form.Save']}
                </Button>
                <Input
                    style={{ float: 'right' }}
                    type="file"
                    name="file"
                    onChange={onChange}
                />
            </Segment>
            <div style={{ paddingLeft: '4em', paddingRight: '4em' }}>
                <ListZReport
                    messages={messages}
                    dynObjTrLst={props.dynObjTrLst}
                    download={download}
                    updateFile={updateFile}
                    deleteFile={delFile}
                    updateProps={updateFile}
                />
            </div>
        </Container>
    );
}

function mapStateToProps(state) {
    return {
        dynObjTrLst: state.ditReducer.dynObjTrLst,
    };
}

export default connect(mapStateToProps, {
    fetchZreports,
    uploadZReport,
    deleteFile,
    updateZreport,
    clearDynObj,
})(injectIntl(Zreport));
