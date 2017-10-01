import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from '../App';
import MainPanel from '../components/MainPanel/MainPanel';
import Settings from '../components/UserSettings/Settings';
import RequireAuth from '../components/Auth/require_auth';
import Signin from '../components/Auth/Signin';
import Signout from '../components/Auth/Signout';
import AssignUserBranch from '../components/dit/userBranch/assign_user_branch';

export default (
    <Route path="/" component={App}>
        <IndexRoute component={MainPanel} />
        <Route path="settings" component={RequireAuth(Settings)} />
        <Route path="signin" component={Signin} />
        <Route path="signout" component={Signout} />
        <Route path="dit/userBranch" component={AssignUserBranch} />
    </Route>
);
