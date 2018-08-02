import React from 'react';
import { Button } from 'semantic-ui-react';
import { ROOT_URL } from '../../../utils/constants';
import Upload from 'rc-upload';

const UploadPanelDisplay = (props) => {
  const { onUploadSuccess } = props;
  const uploaderProps = {
    action: `${ROOT_URL}/api/attachment/upload-file`,
    // type: 'drag',
    accept: '.pdf',
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

  return (
    <Upload
      {...uploaderProps}
      component="div"
      style={{ display: 'inline-block', marginBottom: '10px' }}
    >
      <Button content="Upload file" icon="upload" labelPosition="left" />
    </Upload>
  );
};

export default UploadPanelDisplay;
