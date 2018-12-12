import React, { Component } from 'react';
import { Modal, Icon, Button, Header, List } from 'semantic-ui-react';
import { injectIntl } from 'react-intl';
import UploadPanelDisplay from '../../../dtskc/pages/UploadPanelDisplay';

class TaskAttachmentModal extends Component {
  constructor(props) {
    super(props);
    this.state = { uploadList: [] };
  }

  // handleUpload = upload =>
  //   this.setState({ uploadList: [...this.state.uploadList, upload] });
  // handleUploadDelete = url => {
  //   const req = DELETE(url);
  //   req
  //     .then(() => {
  //       const newUploadList = this.state.uploadList.filter(
  //         el => el.fileDownloadUri !== url,
  //       );
  //       this.setState({
  //         ...this.state,
  //         uploadList: newUploadList
  //       });
  //     })
  //     .catch(error => console.log('handleUploadDelete', error));
  // };

  render() {
    const {
      taskId,
      modalOpen,
      attachment,
      toggleModal,
      addUpload,
      deleteUpload,
      synchronizeAttachments,
      intl,
    } = this.props;
    const { messages } = intl;
    const { attachmentJson } = attachment;
    return (
      <Modal
        open={modalOpen}
        onClose={() => toggleModal(modalOpen)}
        closeOnEscape={false}
        closeOnDimmerClick={false}
        size="small"
      >
        <Header icon="browser" content={messages.H__ATTACHED_FILES} />
        <Modal.Content>
          {attachmentJson && (
            <List divided verticalAlign="middle">
              {attachmentJson.map((el, idx) => {
                const { fileName, fileDownloadUri } = el;
                return (
                  <List.Item key={idx}>
                    <List.Content floated="right">
                      {
                        <Button
                          circular
                          size="mini"
                          icon="delete"
                          onClick={() => deleteUpload(fileDownloadUri)}
                        />
                      }
                    </List.Content>
                    <List.Content as="a" target="_blank" href={fileDownloadUri}>
                      <List.Icon name="download" size="big" />
                      {fileName}
                    </List.Content>
                  </List.Item>
                );
              })}
            </List>
          )}
        </Modal.Content>
        <Modal.Actions>
          <Button.Group floated="left">
            <UploadPanelDisplay
              onUploadSuccess={upload =>
                addUpload({
                  taskId,
                  attachmentJson: upload,
                })
              }
              messages={messages}
            />
          </Button.Group>
          <Button.Group floated="right">
            <Button
              color="green"
              onClick={() => {
                synchronizeAttachments(attachment);
                toggleModal(modalOpen);
              }}
            >
              <Icon name="checkmark" />
              {messages.BTN__OK}
            </Button>
          </Button.Group>
        </Modal.Actions>
      </Modal>
    );
  }
}

export default injectIntl(TaskAttachmentModal);
