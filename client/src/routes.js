import React from 'react';

import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';



//Importing pages
import Login from "./pages/Login";
import RegisterScreen from "./pages/RegisterScreen";
import SocketTest from "./pages/SocketTest";

const Routes = () => (
    <BrowserRouter>
        <Switch>
            <Route exact path="/" component={ Login }/>
            <Route path="/socket" component= { SocketTest } />
            <Route exact path="/RegisterScreen" component={ RegisterScreen }>
                <RegisterScreen/>
            </Route>

        </Switch>
    </BrowserRouter>
)

export default Routes;