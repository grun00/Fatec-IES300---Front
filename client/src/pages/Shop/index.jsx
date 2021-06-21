
import React, { useContext, useState } from "react";
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
import { Link } from "react-router-dom";

import { UserContext} from "../../context/UserContext";
import api from "../../services/api";

const ShopPage = () => {

  const {user} = useContext(UserContext);
  const [item, setItem] = useState("");
  const [netW, setNetW] = useState(0);

  function buyingItem3() {
    
    const rota = "/players/" + user._id;
    var qtd = 1;
    var backp ;
    let modal = document.getElementById("modal-confirm-buy-container");
      
    backp = user.backpack;
    
    for(var i=0; i<backp.length; i++){
      
      if(backp[i].item_id == item){

        qtd = backp[i].quantity ;
        backp.splice(i,1);
        qtd = qtd + 1;
        
      }
    }

    backp.push({"item_id":item,"quantity":qtd});
    
    var net = parseInt(user.money,10) - netW;
    user.money = net;
    

    api.patch(rota,{  "backpack":backp , "money":net })


    user.backpack = backp;
    

    modal.classList.remove("show");

    modal = document.getElementById("modal-inform-buy-container");
    modal.classList.add("show");

  };

  function buyingItem(idItem,net) {

    let modal = document.getElementById("modal-confirm-buy-container");
    
    if(user.money < net){
      modal = document.getElementById("modal-confirm-pobre-container");
    }else{

      setItem(idItem);
      setNetW(net);
      
    }
    modal.classList.add("show");
    

  };

  function fechaModal1(){
    let modal = document.getElementById("modal-confirm-buy-container");
    modal.classList.remove("show");
  }

  function fechaModal2(){
    let modal = document.getElementById("modal-inform-buy-container");
    modal.classList.remove("show");
  }

  

  function fechaModal4(){
    let modal = document.getElementById("modal-confirm-pobre-container");
    modal.classList.remove("show");
  }

 

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
                  onClick={() => buyingItem("609ead9f9fc12b2ee4553793",1000)}
                />
                <PowerItems
                  loadPowerImage={Univesitario}
                  loadPowerName={"Universitarios"}
                  loadValue="1150"
                  onClick={() => buyingItem("60ba86bec6a9b11a5cb359a7",1150)}
                />
                <PowerItems
                  loadPowerImage={Placa}
                  loadPowerName={"Placa"}
                  loadValue="1200"
                  onClick={() => buyingItem("60ba86fec6a9b11a5cb359a8",1200)}
                />
                <PowerItems
                  loadPowerImage={Pular}
                  loadPowerName={"Pular"}
                  loadValue="1500"
                  onClick={() => buyingItem("60ba8736c6a9b11a5cb359a9",1500)}
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
                  onClick={() => buyingItem("60ba8761c6a9b11a5cb359aa",9999)}
                />
                <ShopItem
                  loadItemImage={Vitaozao}
                  loadItemName="Vitaozao"
                  loadValue="9999"
                  onClick={() => buyingItem("60ba8791c6a9b11a5cb359ab",9999)}
                />
                <ShopItem
                  loadItemImage={RedAvatar}
                  loadItemName="Vermelhinho"
                  loadValue="300"
                  onClick={() => buyingItem("60ba87c7c6a9b11a5cb359ac",300)}
                />
                <ShopItem
                  loadItemImage={BlackAvatar}
                  loadItemName="Pretinho"
                  loadValue="300"
                  onClick={() => buyingItem("60ba87e5c6a9b11a5cb359ad",300)}
                />
                <ShopItem
                  loadItemImage={GreenAvatar}
                  loadItemName="Verdinho"
                  loadValue="300"
                  onClick={() => buyingItem("60ba87fbc6a9b11a5cb359ae",300)}
                />
                <ShopItem
                  loadItemImage={Vitucoin}
                  loadItemName="Vitucoin"
                  loadValue="500"
                  onClick={() => buyingItem("60ba8817c6a9b11a5cb359af",500)}
                />
                <ShopItem
                  loadItemImage={LogoAvatar}
                  loadItemName="Show do Vitao"
                  loadValue="1000"
                  onClick={() => buyingItem("60ba883ec6a9b11a5cb359b0",1000)}
                />
                <ShopItem
                  loadItemImage={Boy}
                  loadItemName="Na regua"
                  loadValue="1000"
                  onClick={() => buyingItem("60ba885ec6a9b11a5cb359b1",1000)}
                />
                <ShopItem
                  loadItemImage={Boy1}
                  loadItemName="Estiloso"
                  loadValue="1000"
                  onClick={() => buyingItem("60ba888bc6a9b11a5cb359b2",1000)}
                />
                <ShopItem
                  loadItemImage={Girl}
                  loadItemName="Trancinhas"
                  loadValue="1000"
                  onClick={() => buyingItem("60ba88a6c6a9b11a5cb359b3",1000)}
                />
                <ShopItem
                  loadItemImage={Man}
                  loadItemName="Barba Branca"
                  loadValue="1000"
                  onClick={() => buyingItem("60ba88cec6a9b11a5cb359b4",1000)}
                />
                <ShopItem
                  loadItemImage={Man1}
                  loadItemName="Barbado"
                  loadValue="1000"
                  onClick={() => buyingItem("60ba88f2c6a9b11a5cb359b5",1000)}
                />
              </div>
            </div>
          </div>

          <div id="modal-confirm-buy-container" className="modal-container">
            <div id="modal-buy">
              <h3>Comprar "item"</h3>
              <p id="confirmationPhrase">
                Você tem certeza de quer comprar esse item por {netW} Vitucoins? 🤔
              </p>

              <div className="modal-buttons-area">
                <button className="button-accept" onClick={(buyingItem3.bind(this))}>
                  Sim, quero comprar! 🤩{" "}
                </button>
                <button className="button-deny" onClick={(fechaModal1.bind(this))}>Nao, agora nao. </button>
              </div>
            </div>
          </div>

          <div id="modal-confirm-pobre-container" className="modal-container">
            <div id="modal-buy">
              <h3>Saldo insuficiente</h3>
              <p id="confirmationPhrase">
                Você não possui VituCoins suficientes para comprar esse item. 🤔
              </p>

              <div className="modal-buttons-area">
                <button className="button-accept"  >
                
                  <Link to="/comprar" id="comprar" >Comprar VituCoins</Link>
                  
                </button>
                <button className="button-deny" onClick={(fechaModal4.bind(this))}>Sou pobre </button>
              </div>
            </div>
          </div>


          <div id="modal-inform-buy-container" className="modal-container">
            <div id="modal-buy">
              <h3>Compra realizada com sucesso</h3>
              <p id="confirmationPhrase">
                Parabéns, você comprou mais um item ! 🤩
              </p>

              <div className="modal-buttons-area">
                <button className="button-accept" onClick={(fechaModal2.bind(this))}>OK </button>
              </div>
            </div>
          </div>


        </div>
      </div>
    </>
  );
};

export default ShopPage;
