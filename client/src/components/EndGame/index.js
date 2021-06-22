import React, { useContext, useEffect, useState } from "react";

import api from "../../services/api";
import "./style.css";
import Header from "../../components/Header/Header";

import Trophy from "../../images/trophy.png"
import FirstPlace from "../../images/1Place.png"
import SecondPlace from "../../images/2Place.png"
import { Link } from "react-router-dom"

import {
	AuthContext,
	SocketContext,
	UserContext,
  } from "../../context/UserContext";
import { Redirect } from "react-router";

const PageLeaderBoard = (props) => {
  
  const [pontos, setPontos] = useState([0,0]);
  const [acertos, setAcertos] = useState([]);
  const [erros, setErros] = useState([]);
  const [vencedor, setVencedor] = useState(0);
  const [perdedor, setPerdedor] = useState(1);
  const {user} = useContext(UserContext);
  const {isAuth} = useContext(AuthContext);
  
  

  useEffect(() => {
	  var player1 = null;
	  var player2 = null;
	  
	  if(Object.values(Object.values(props.nome.match)).length > 1 ){

		  if( Object.values(Object.values(props.nome.match)[0]).length == 16 && Object.values(Object.values(props.nome.match)[1]).length == 16) {
			  
				player1 = Object.values(Object.values(props.nome.match)[0]);
				player2 = Object.values(Object.values(props.nome.match)[1]);

				var corretas1 = 0;
				var corretas2 = 0;
				var ponto1 =0;
				var ponto2 = 0;

				for(var i=0; i < player1.length ; i++){
					if(player1[i]["correct"] == true )  
					corretas1 +=  1;

					ponto1 += player1[i]["points"];

				}

				for(var i=0; i < player2.length ; i++){
					if(player2[i]["correct"] == true )  
					corretas2 += 1;

					ponto2 += player2[i]["points"];
				}
				
				
				setAcertos([corretas1,corretas2]);
				setErros([15 - corretas1, 15 -corretas2]);
				
				
				console.log(pontos);

				var vencedor = 0;
				var net = parseInt(user.netWorth,10);


				ponto1 = player1[15]["points"];
				ponto2 = player2[15]["points"];
				setPontos([ponto1,ponto2]);
				if(ponto1 > ponto2){
					net += ponto1;
					setVencedor(0);
					setPerdedor(1);
				}
				else{
				vencedor = 1;
				net += ponto2;
				setVencedor(1);
				setPerdedor(0);
				}

				

				if(Object.values(Object.values(props.nome.match)[vencedor])[1]["player"] == user.username){
					const rota = "/players/" + user._id;

					api.patch(rota,{  "wins":parseInt(user.wins,10)+1, "netWorth":net})
			    }
			}
		}		

  	}, [props.nome]);



  if(!user || !isAuth) {
    return <Redirect to='/' />
  }
  return (
    <>
      <div id="rankingpage-area">
        <Header />

        <div id="ranking-area">
          <div className="title-container">
            <h1>
              <img className="Trophy-image" src={Trophy} alt="Trophy"/>
              Final de Partida
              <img className="Trophy-image" src={Trophy} alt="Trophy"/>
            </h1>
          </div>
          <div className="player-list">
          <h3>
          <img src={FirstPlace} width="26"/>
            Ganhador
          </h3>
            <div className="list-header">
	            <table>
		            <tbody>
			            <tr>
				            <td>Nick</td>
				            <td>{Object.values(Object.values(props.nome.match)[vencedor])[1]["player"]}</td>
			            </tr>
			            <tr>
				            <td>Pontos</td>
				            <td>{pontos[vencedor]}</td>
			            </tr>
			            <tr>
				            <td>Total de Questões</td>
				            <td>15</td>
			            </tr>
		            	<tr>
				            <td>Acertos</td>
				            <td>{acertos[vencedor]}</td>
			            </tr>
			            <tr>
				            <td>Erros</td>
				            <td>{erros[vencedor]}</td>
		              </tr>
		            </tbody>
            	</table>
            </div>
          </div>
          <div className="player-list">
          <h3>
          <img src={SecondPlace} width="26"/>
            Perdedor
          </h3>
            <div className="list-header">
	            <table>
		            <tbody>
			            <tr>
				            <td>Nick</td>
				            <td>{Object.values(Object.values(props.nome.match)[perdedor])[1]["player"]}</td>
			            </tr>
			            <tr>
				            <td>Pontos</td>
				            <td>{pontos[perdedor]}</td>
			            </tr>
			            <tr>
				            <td>Total de Questões</td>
				            <td>15</td>
			            </tr>
		            	<tr>
				            <td>Acertos</td>
				            <td>{acertos[perdedor]}</td>
			            </tr>
			            <tr>
				            <td>Erros</td>
				            <td>{erros[perdedor]}</td>
		              </tr>
					  
		            </tbody>
            	</table>
				
            </div>
			<button className="button-accept"  >
        
		<Link to="/lobby" id="comprar" >Sair da partida</Link>
      </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default PageLeaderBoard;
