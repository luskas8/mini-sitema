import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Login from './pages/login';
import Dashboard from './pages/dashboard';
import Singin from './pages/singin';

export default function Routes() {
    return (
        <BrowserRouter>
            <Switch>
                <Route exact path="/" component={Login} />
                <Route path="/dashboard" component={Dashboard} />
                <Route path="/singin" component={Singin} />
            </Switch>
        </BrowserRouter>
    );
}