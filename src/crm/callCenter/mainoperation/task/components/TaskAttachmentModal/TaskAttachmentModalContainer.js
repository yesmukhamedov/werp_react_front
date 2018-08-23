import { connect } from 'react-redux';
import TaskAttachmentModal from './TaskAttachmentModal';
import {
  toggleModal,
  addUpload,
  deleteUpload,
  synchronizeAttachments,
} from '../../actions/TaskAction';

const mapStateToProps = state => ({
  modalOpen: state.gtskeditTransaction.modalAttachment,
  attachment: state.gtskeditTransaction.attachment,
});

export default connect(mapStateToProps, {
  toggleModal,
  addUpload,
  deleteUpload,
  synchronizeAttachments,
})(TaskAttachmentModal);
