import React, {useEffect, useState} from "react";

import api from "../../services/api";
import "./style.css";
import TrophyIcon from "../../components/Trophy"


const LeaderBoard = () => {
    const [players, setPlayers] = useState([])

    useEffect( () => {
        api.get("/players")
        .then(response => {
            response.data.sort((a,b) => (a.netWorth < b.netWorth) ? 1 : -1)
            setPlayers(response.data)})
    }, [])

    return (
    <>
    <div className="title-container">
        <h1>Leader Board</h1>
    </div>
    <div className="player-list">
        <div className="list-header">
            <h3>Jogadores</h3>
            <h3>Pontuação</h3> 
        </div>
        {players ? players.map((player, id) => {
            return (
            <div className="player-rank" key={id}>
                <div className="trophy-area"><TrophyIcon rank={id + 1} width={30} fill="goldenrod"/><p className="player-name" key={player.name}>{player.name}</p></div>
                <small className="player-networth" key={id}>{player.netWorth}</small>
            </div>
            )
        }) : null}
    </div>
    </>
    )
}

export default LeaderBoard;