import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import "./style.css";
import Logo from "../../../images/logo.png";
import Avatar from "../../../assets/avatar.svg";

const MatchHeader = (props) => {
  const buyingItem = (confirmModal) => {
    let modal = document.getElementById(confirmModal);
    modal.classList.add("show");
    modal.addEventListener("click", (e) => {
      if (
        e.target.id === confirmModal ||
        e.target.className === "button-deny"
      ) {
        modal.classList.remove("show");
      }
    });
  };

  return (
    <React.Fragment>
      <nav id="header-match">
        <img id="logo-header" src={Logo} alt="Logo Header" />

        <div id="info-players-match">
          <div className="player-match">
            <img className="player-image-match" src={Avatar} alt="" />
            <span className="player-name-match">{props.players[0].username}</span>
          </div>

          <span id="vsSpan">VS.</span>

          <div className="player-match">
            <span className="player-name-match">{props.players[1].username}</span>
            <img className="player-image-match" src={Avatar} alt="" />
          </div>
        </div>

        <input id="hamburguer-checkbox" type="checkbox" />
        <label
          htmlFor="hamburguer-checkbox-match"
          className="label-hamburguer-match"
        >
          <div
            className="menu-match"
            onClick={() => buyingItem("modal-confirm-forfeit")}
          >
            <span className="hamburguer-match"></span>
          </div>
        </label>
      </nav>

      <div id="modal-confirm-forfeit" className="modal-container">
        <div id="modal-forfeit">
          <h3>Janelinha da derrota</h3>
          <p id="confirmationPhrase">Você vai mesmo arregar? 🤔</p>

          <div className="modal-buttons-area">
            <Link to="/lobby">
              <button className="button-accept" onClick="">
                Sim, quero arregar! 🥺{" "}
              </button>
            </Link>
            <button className="button-deny">
              Nao, confio no meu potencial! 😎
            </button>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default MatchHeader;
