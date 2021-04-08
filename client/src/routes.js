import React from "react";

//Link
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

//Importing pages
import Login from "./pages/Login";
import RegisterScreen from "./pages/RegisterScreen";
import ForgotPassword from "./pages/ForgotPassword";
import SocketTest from "./pages/SocketTest";
import LeaderBoard from "./pages/LeaderBoard";

const Routes = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={Login} />
      <Route exact path="/RegisterScreen" component={RegisterScreen} />
      <Route exact path="/ForgotPassword" component={ForgotPassword} />
      <Route path="/socket" component={SocketTest} />
      <Route path="/ranking" component={LeaderBoard} />

    </Switch>
  </BrowserRouter>
);

export default Routes;
