import React from "react";
import "./index.css";
import Logo from "../../images/logo.png";

//Components
import ForgotPassword from "../../components/Login/ForgotPassword";

//Link
import { Link } from "react-router-dom";

const PageForgotPassword = () => (
  <React.Fragment>
    <div id="forgot-password-page">
      <Link to="/"><img id="logo" src={Logo} alt="Show do Vitão - Homepage" /></Link>
        <div id="form-area">
          <h1>Esqueci minha senha</h1>
          <ForgotPassword />
      </div>
    </div>
  </React.Fragment>
);

export default PageForgotPassword;
