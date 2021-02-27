
import React from 'react';

import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import Main from "./pages/Main"
const Routes = () => (
    <BrowserRouter>
        <Switch>
            <Route exact path="" component={Main}/>
        </Switch>
    </BrowserRouter>
)

export default Routes;