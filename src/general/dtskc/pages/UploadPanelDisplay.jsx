import React from 'react';
import { Button } from 'semantic-ui-react';
import { ROOT_URL } from '../../../utils/constants';
import Upload from 'rc-upload';

const UploadPanelDisplay = (props) => {
  const { onUploadSuccess, messages } = props;
  const uploaderProps = {
    action: `${ROOT_URL}/api/attachment/upload-file`,
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
      <Button
        content={messages.BTN__ATTACH_FILE}
        icon="upload"
        size="small"
        color="twitter"
      />
    </Upload>
  );
};

export default UploadPanelDisplay;
