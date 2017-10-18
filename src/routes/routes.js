import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from '../App';
import MainPanel from '../components/MainPanel/MainPanel';
import Settings from '../components/UserSettings/Settings';
import RequireAuth from '../components/Auth/require_auth';
import Signin from '../components/Auth/Signin';
import Signout from '../components/Auth/Signout';
import AssignUserBranch from '../dit/userBranch/components/assign_user_branch';
import NewServicePacketComponent from '../service/mainoperation/testTransaction/components/testComponent';

const getComponent = {
    'NewServicePacketComponent': NewServicePacketComponent
}

export default (data) => {
    return (
        <Route path="/" component={App}>
            <IndexRoute component={RequireAuth(MainPanel)} />
            <Route path="settings" component={RequireAuth(Settings)} />
            <Route path="signin" component={Signin} />
            <Route path="signout" component={Signout} />
            <Route path="dit/userBranch" component={AssignUserBranch} />
            {/* dynamically generated URLs */} 
            {data.map((el) => {
                return <Route path={`${el.url}`} component={getComponent[el.component]} key={el.url}/>
            })}            
        </Route>
    )
};
