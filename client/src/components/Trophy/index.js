import React, { useState } from "react";
import { ReactComponent as Trophy } from "../../assets/trophy.svg";
import "./style.css"

const TrophyIcon = (props) => {
  const [color, setColor] = useState("current");
  const [rank, setRank] = useState(props.rank);

  useState(() => {
    setRank(props.rank);
    switch (rank) {
      case 1:
        setColor("goldenrod");
        break;
      case 2:
        setColor("silver");
        break;
      case 3:
        setColor("#b87333");
        break;
      default:
        setColor("current");
        break;
    }
  }, []);

  return (
    <>
      {rank === 1 || rank === 2 || rank === 3 ? (
        <Trophy className={props.className} width={props.width} fill={color} />
      ) : (
        <span className="player-position">{rank}º</span>
      )}
    </>
  );
};

export default TrophyIcon;
