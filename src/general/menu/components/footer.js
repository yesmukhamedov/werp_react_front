import React, { Component } from 'react';
import { connect } from 'react-redux';
import '../css/footer.css';

class Footer extends Component {

    render() {
        return (
        <div  className="fixedFooter" >
                
        </div>
        )
    }
}
// compact  fixed="bottom" width="16" tabular borderless fluid

  
function mapStateToProps(state) {
    return {
    };
}

  
export default connect(mapStateToProps, {})(Footer);