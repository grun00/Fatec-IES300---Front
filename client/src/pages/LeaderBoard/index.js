import React, { useContext, useEffect, useState } from "react";

import api from "../../services/api";
import "./style.css";
import Header from "../../components/Header/Header";

import TrophyIcon from "../../components/Trophy";
import Bitcoin from "../../images/bitcoin.png"
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
              <img className="Bitcoin-image" src={Bitcoin} alt="Bitcoin"/>
              Ranking dos Milionarios
              <img className="Bitcoin-image" src={Bitcoin} alt="Bitcoin"/>
            </h1>
          </div>
          <div className="player-list">
            <div className="list-header">
              <h3>Jogador</h3>
              <h3>Pontuacao</h3>
            </div>
            {players
              ? players.map((player, id) => {
                  return (
                    <div className={player.username === user.username ? "player-rank current-player" : "player-rank"} key={id}>
                      <div className="trophy-area">
                        <TrophyIcon rank={id + 1} width={30} fill="goldenrod" />
                        <p className="player-name" key={player.username}>
                        {player.username}
                        </p>
                      </div>
                      <span className="player-networth" key={id}>
                        {player.netWorth}
                      </span>
                    </div>
                  );
                })
              : null}
          </div>
        </div>
      </div>
    </>
  );
};

export default PageLeaderBoard;
