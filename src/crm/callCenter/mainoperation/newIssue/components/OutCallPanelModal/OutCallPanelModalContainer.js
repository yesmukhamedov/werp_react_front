import { connect } from 'react-redux';
import OutCallPanelModalComponent from './OutCallPanelModalComponent';
import { updateOutCall } from '../../actions/index';

const mapStateToProps = state => {
    const initialData = {
        status: state.outCalls.newIssuePage.outCallInfo.status.id,
    };

    return {
        outCallId: state.outCalls.newIssuePage.outCallId,
        initialValues: initialData,
    };
};

export default connect(mapStateToProps, { updateOutCall })(
    OutCallPanelModalComponent,
);
