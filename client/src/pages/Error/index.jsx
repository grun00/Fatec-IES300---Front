import React from "react";
import "./style.css";
import Header from "../../components/Header/Header";
import Errorimg from "../../images/error404.png"

const PageError404 = () => {
  return (
    <>
      <div id="Error404page-area">
        <Header />
        <div id="Error-area">
            <img src={Errorimg} alt="Error 404 page"/>
            <h1>Oh, Oh! Parece que algo de errado nao esta certo.</h1>
            <h2>Nao encontramos a pagina que voce esta procurando.</h2>
            <span id="not-found">Pagina nao encontrada.</span>
        </div>
      </div>
    </>
  );
};

export default PageError404;