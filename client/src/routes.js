import React, { useState, useMemo } from "react";

//Link
import { BrowserRouter, Route, Switch } from "react-router-dom";

//Context
import { UserContext, AuthContext, SocketContext } from "./context/UserContext";

//Importing pages
import Login from "./pages/Login";
import RegisterScreen from "./pages/RegisterScreen";
import ForgotPassword from "./pages/ForgotPassword";
import LeaderBoard from "./pages/LeaderBoard";
import ChangePassword from "./pages/ChangePassword";
import Lobby from "./pages/Lobby";
import BuyCoins from "./pages/BuyCoins";
import Error404 from "./pages/Error";
import MyProfile from "./pages/MyProfile";

import EndGame from "./pages/endGame"

import Shop from "./pages/Shop"
import Rules from "./pages/Rules"
import MatchScreen from "./pages/MatchScreen"; 


const Routes = () => {
  const [user, setUser] = useState(null);
  const [socket, setSocket] = useState(null);
  const [isAuth, setAuthorized] = useState(false);
  const userObject = useMemo(() => ({ user, setUser }), [user, setUser]);
  const authObject = useMemo(
    () => ({ isAuth, setAuthorized }),
    [isAuth, setAuthorized]
  );
  const socketObject = useMemo(
    () => ({ socket, setSocket }), [socket, setSocket]
  );
  
  return (
    <BrowserRouter>
      <Switch>
        <SocketContext.Provider value={socketObject}>
          <AuthContext.Provider value={authObject}>
            <UserContext.Provider value={userObject}>
              <Route exact path="/" component={Login}> 
              </Route>
              <Route exact path="/RegisterScreen" component={RegisterScreen} />
              <Route exact path="/ForgotPassword" component={ForgotPassword} />
              <Route exact path="/ranking" component={LeaderBoard} />
              <Route exact path="/changepassword" component={ChangePassword} />
              <Route exact path="/lobby" component={Lobby} />
              <Route exact path="/comprar" component={BuyCoins} />
              <Route exact path="/meuperfil" component={MyProfile} />

              <Route exact path="/final-do-jogo" component={EndGame} />

              <Route exact path="/loja" component={Shop} />
              <Route exact path="/regras" component={Rules} />
              <Route exact path="/match" component={MatchScreen} />

            </UserContext.Provider>
          </AuthContext.Provider>
        </SocketContext.Provider>
        <Route path="*" component={Error404} />
      </Switch>
    </BrowserRouter>
  );
};

export default Routes;
