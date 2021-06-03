import React from "react";
import "./style.css";

//Others
import Vitucoin from "../../images/bitcoin.png";

const ShopItem = ({ loadItemImage, loadItemName, loadValue, onClick}) => {
  return (
    <>
      <div className="card" onClick={onClick}>
        <img 
            className="itemImage" 
            src={loadItemImage} 
            alt="Imagem do Item" 
        />
        <h3 className="nameItem">{loadItemName}</h3>
        <div className="itemValueArea">
          <img
            className="shopValueVitucoin"
            src={Vitucoin}
            alt="Moeda vitucoin"
          />
          <span className="itemValue">{loadValue}</span>
        </div>
      </div>
    </>
  );
};

export default ShopItem;
