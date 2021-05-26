import React from "react";
import "./index.css";
import Logo from "../../images/logo.png";

//Components
import ChangePassword from "../../components/Login/ChangePassword";

//Link
import { Link } from "react-router-dom";

const PageChangePassword = () => (
  <React.Fragment>
    <div id="change-password-page">
      <Link to="/"><img id="logo" src={Logo} alt="Show do Vitão - Homepage" /></Link>
        <div id="form-area">
          <h1>Crie sua nova senha</h1>
          <ChangePassword />
      </div>
    </div>
  </React.Fragment>
);

export default PageChangePassword;
