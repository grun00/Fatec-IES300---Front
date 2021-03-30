import React from 'react';

//Link
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';

//Importing pages
import Login from "./pages/Login";
import RegisterScreen from "./pages/RegisterScreen";
import ForgotPassword from "./pages/ForgotPassword";

const Routes = () => (
    <BrowserRouter>
        <Switch>
            <Route exact path="/" component={ Login }/>

            <Route exact path="/RegisterScreen" component={ RegisterScreen }/>

            <Route exact path="/ForgotPassword" component={ ForgotPassword }/>
    
        </Switch>
    </BrowserRouter>
)

export default Routes;