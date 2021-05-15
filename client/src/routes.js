import React from "react";

//Link
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

//Importing pages
import Login from "./pages/Login";
import RegisterScreen from "./pages/RegisterScreen";
import ForgotPassword from "./pages/ForgotPassword";
import SocketTest from "./pages/SocketTest";
import LeaderBoard from "./pages/LeaderBoard";
import ChangePassword from "./pages/ChangePassword";
import GamePage from "./pages/GamePage";
import Lobby from "./pages/Lobby";

const Routes = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={Login} />
      <Route exact path="/RegisterScreen" component={RegisterScreen} />
      <Route exact path="/ForgotPassword" component={ForgotPassword} />
      <Route exact path="/socket" component={SocketTest} />
      <Route exact path="/ranking" component={LeaderBoard} />
      <Route exact path="/changepassword" component={ChangePassword} />
      <Route exact path="/gamepage" component={GamePage} />
      <Route exact path="/lobby" component={Lobby} />

    </Switch>
  </BrowserRouter>
);

export default Routes;
