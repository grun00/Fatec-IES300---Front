import React, { useState } from "react";
import "./style.css";

//Components
import Header from "../../components/Header/Header";
import ShopItem from "../../components/CosmeticItems/CosmeticItems";
import PowerItems from "../../components/PowersItems/PowerItems";

//Others
import Carta from "../../assets/carta.svg";
import Placa from "../../assets/placa.svg";
import Univesitario from "../../assets/universitario.svg";
import Pular from "../../assets/jump.svg";
import Vitao from "../../assets/avatars/vitao.png";
import Vitaozao from "../../assets/avatars/vitaozao.png";
import LogoAvatar from "../../assets/avatars/logoAvatar.png";
import Vitucoin from "../../assets/avatars/vitucoin.png";
import RedAvatar from "../../assets/avatars/redavatar.svg";
import BlackAvatar from "../../assets/avatars/blackavatar.svg";
import GreenAvatar from "../../assets/avatars/greenavatar.svg";
import Boy from "../../assets/avatars/boy.svg";
import Boy1 from "../../assets/avatars/boy-1.svg";
import Girl from "../../assets/avatars/girl.svg";
import Man from "../../assets/avatars/man.svg";
import Man1 from "../../assets/avatars/man-1.svg";

const ShopPage = () => {
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
    <>
      <div id="pageShopArea">
        <Header />
        <div id="shopArea">
          <h1>Lojinha do Vitao</h1>
          <div id="shopItems">
            <div id="products-1">
              <h2>Poderes</h2>
              <div className="itemsField">
                <PowerItems
                  loadPowerImage={Carta}
                  loadPowerName={"Carta"}
                  loadValue="1000"
                  onClick={() => buyingItem("modal-confirm-buy-container")}
                />
                <PowerItems
                  loadPowerImage={Univesitario}
                  loadPowerName={"Universitarios"}
                  loadValue="1150"
                  onClick={() => buyingItem("modal-confirm-buy-container")}
                />
                <PowerItems
                  loadPowerImage={Placa}
                  loadPowerName={"Placa"}
                  loadValue="1200"
                  onClick={() => buyingItem("modal-confirm-buy-container")}
                />
                <PowerItems
                  loadPowerImage={Pular}
                  loadPowerName={"Pular"}
                  loadValue="1500"
                  onClick={() => buyingItem("modal-confirm-buy-container")}
                />
              </div>
            </div>
            <div id="products-2">
              <h2>Avatares</h2>
              <div className="itemsField">
                <ShopItem
                  loadItemImage={Vitao}
                  loadItemName="Vitaozin"
                  loadValue="9999"
                  onClick={() => buyingItem("modal-confirm-buy-container")}
                />
                <ShopItem
                  loadItemImage={Vitaozao}
                  loadItemName="Vitaozao"
                  loadValue="9999"
                  onClick={() => buyingItem("modal-confirm-buy-container")}
                />
                <ShopItem
                  loadItemImage={RedAvatar}
                  loadItemName="Vermelhinho"
                  loadValue="300"
                  onClick={() => buyingItem("modal-confirm-buy-container")}
                />
                <ShopItem
                  loadItemImage={BlackAvatar}
                  loadItemName="Pretinho"
                  loadValue="300"
                  onClick={() => buyingItem("modal-confirm-buy-container")}
                />
                <ShopItem
                  loadItemImage={GreenAvatar}
                  loadItemName="Verdinho"
                  loadValue="300"
                  onClick={() => buyingItem("modal-confirm-buy-container")}
                />
                <ShopItem
                  loadItemImage={Vitucoin}
                  loadItemName="Vitucoin"
                  loadValue="500"
                  onClick={() => buyingItem("modal-confirm-buy-container")}
                />
                <ShopItem
                  loadItemImage={LogoAvatar}
                  loadItemName="Show do Vitao"
                  loadValue="1000"
                  onClick={() => buyingItem("modal-confirm-buy-container")}
                />
                <ShopItem
                  loadItemImage={Boy}
                  loadItemName="Na regua"
                  loadValue="1000"
                  onClick={() => buyingItem("modal-confirm-buy-container")}
                />
                <ShopItem
                  loadItemImage={Boy1}
                  loadItemName="Estiloso"
                  loadValue="1000"
                  onClick={() => buyingItem("modal-confirm-buy-container")}
                />
                <ShopItem
                  loadItemImage={Girl}
                  loadItemName="Trancinhas"
                  loadValue="1000"
                  onClick={() => buyingItem("modal-confirm-buy-container")}
                />
                <ShopItem
                  loadItemImage={Man}
                  loadItemName="Barba Branca"
                  loadValue="1000"
                  onClick={() => buyingItem("modal-confirm-buy-container")}
                />
                <ShopItem
                  loadItemImage={Man1}
                  loadItemName="Barbado"
                  loadValue="1000"
                  onClick={() => buyingItem("modal-confirm-buy-container")}
                />
              </div>
            </div>
          </div>

          <div id="modal-confirm-buy-container" className="modal-container">
            <div id="modal-buy">
              <h3>Comprar "item"</h3>
              <p id="confirmationPhrase">
                Você tem certeza de quer comprar esse item por X Vitucoins? 🤔
              </p>

              <div className="modal-buttons-area">
                <button className="button-accept">
                  Sim, quero comprar! 🤩{" "}
                </button>
                <button className="button-deny">Nao, agora nao. </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ShopPage;
