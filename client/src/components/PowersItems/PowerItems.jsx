import React from "react";
import "./style.css";

//Others
import Vitucoin from "../../images/bitcoin.png";

const PowerItem = ({loadPowerImage, loadPowerName, loadValue, onClick}) => {

  return (
    <>
      <div className="cardBall" onClick={onClick}>
        <img className="powerImage" 
            src={loadPowerImage}
            alt="Imagem do Item"
        />
        <h3 className="powerItem">{loadPowerName}</h3>
        <div className="powerValueArea">
          <img
            className="powerValueVitucoin"
            src={Vitucoin}
            alt="Moeda vitucoin"
          />
          <span className="powerValue">{loadValue}</span>
        </div>
      </div>
    </>
    );
};

export default PowerItem;
