import React from "react";
import Routes from "./routes";
import Audio from "./audio/musica-tema.mp3";

const App = () => {

  return (
    <>
      <Routes />
      <div id="song-area">
       <audio id="theme-song" autoPlay loop muted>
          <source  src={Audio} type="audio/mp3" />
        </audio>
      </div>
    </>
  );
};

export default App;