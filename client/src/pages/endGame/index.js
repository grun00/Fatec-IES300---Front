import React, { useContext, useEffect, useState } from "react";

import api from "../../services/api";
import "./style.css";
import Header from "../../components/Header/Header";

import Trophy from "../../images/trophy.png"
import FirstPlace from "../../images/1Place.png"
import SecondPlace from "../../images/2Place.png"

import { AuthContext, UserContext } from "../../context/UserContext";
import { Redirect } from "react-router";

const PageLeaderBoard = () => {
  const [players, setPlayers] = useState([]);
  const {user} = useContext(UserContext);
  const {isAuth} = useContext(AuthContext);
  useEffect(() => {
    api.get("/players").then((response) => {
      response.data.sort((a, b) => (a.netWorth < b.netWorth ? 1 : -1));
      setPlayers(response.data);
    });
  }, []);

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
				            <td>GabrielPG2</td>
			            </tr>
			            <tr>
				            <td>Pontos</td>
				            <td>6500</td>
			            </tr>
			            <tr>
				            <td>Total de Questões</td>
				            <td>10</td>
			            </tr>
		            	<tr>
				            <td>Acertos</td>
				            <td>10</td>
			            </tr>
			            <tr>
				            <td>Erros</td>
				            <td>0</td>
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
				            <td>LucasPG1</td>
			            </tr>
			            <tr>
				            <td>Pontos</td>
				            <td>5900</td>
			            </tr>
			            <tr>
				            <td>Total de Questões</td>
				            <td>10</td>
			            </tr>
		            	<tr>
				            <td>Acertps</td>
				            <td>7</td>
			            </tr>
			            <tr>
				            <td>Erros</td>
				            <td>3</td>
		              </tr>
		            </tbody>
            	</table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PageLeaderBoard;
