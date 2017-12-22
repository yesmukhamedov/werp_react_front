import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

export default function(ComposedComponent) {
    class AccessControl extends Component {
        static contextTypes = {
            router: PropTypes.object
        }   
        
        componentWillMount() {         
            if(!haveAccess(this.props.routes[1].path, this.props.availableRoutes)) {
                this.context.router.push('/noAccess')
            }
        }

        componentWillUpdate(nextProps) {
            if(!haveAccess(nextProps.routes[1].path, nextProps.availableRoutes)) {
                this.context.router.push('/noAccess')
            }
        }

        render() {
            return <ComposedComponent {...this.props} />
        }
        
    }

    function haveAccess(route, availableRoutes) {
        // - check access to this route
        let access = false;
        if(availableRoutes != null) {
            availableRoutes.map(item => {
                if(route === item.url) {
                    access = true;
                }
            });
        }        
        return access;
    };


    function mapStateToProps(state) {
        return {availableRoutes: state.menu.routes};
    }

    return connect(mapStateToProps)(AccessControl);
}