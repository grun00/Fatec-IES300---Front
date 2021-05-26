import React, { useEffect, useState, useContext } from "react";
import Countdown from "react-countdown";
import _ from "lodash";

<<<<<<< Updated upstream
import "./style.css";
import Header from "../../components/Header/Header";
import AnswerField from "../../components/AnswerField/AnswerField";
import Placa from "../../assets/placa.svg";
import Carta from "../../assets/carta.svg";
import Univ from "../../assets/universitario.svg";
=======
import './style.css';
import Header from '../../components/HeaderInGame/HeaderInGame';
import AnswerField from '../../components/AnswerField/AnswerField';
import Placa from '../../assets/placa.svg';
import Carta from '../../assets/carta.svg';
import Univ from '../../assets/universitario.svg';
>>>>>>> Stashed changes

import { AuthContext, SocketContext } from "../../context/UserContext";

const PageGamepage = (props) => {
  const [roomInfo, setRoomInfo] = useState({});
  const [questions, setQuestions] = useState(null);
  const [updateInfo, setUpdateInfo] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [questionNumber, setQuestionNumber] = useState(-1);
  const [isReady, setIsReady] = useState(false);
  const [matchOn, setMatchOn] = useState(false);

  const { socket } = useContext(SocketContext);
  const { authorized } = useContext(AuthContext);

  const Questionaire = ({ question, randomAlternatives } = questions) => {
    return (
      <>
        <div id="question">
          <p>{question}</p>
        </div>
        <div id="alternatives-area">
          <AnswerField Alt="A" AltA={randomAlternatives[0]} />
          <AnswerField Alt="B" AltB={randomAlternatives[1]} />
          <AnswerField Alt="C" AltC={randomAlternatives[2]} />
          <AnswerField Alt="D" AltD={randomAlternatives[3]} />
        </div>
      </>
    );
  };

  useEffect(() => {
    setUpdateInfo(true);
  }, []);

  useEffect(() => {
    console.log("set CurrentQuestion", isReady)
    if (isReady) {
      console.log(isReady, questions[setQuestionNumber]);
      setCurrentQuestion(questions[questionNumber]);
    }
    console.log(currentQuestion)
  }, [questionNumber]);

  useEffect(() => {
    if (updateInfo) {
      socket.emit("getRoomInfo");
      socket.on("roomInfo", (data) => {
        setRoomInfo(data);
        if (!questions) {
          setQuestions(data.questions);
        }
      });
    }
    return () => setUpdateInfo(false);
  }, [updateInfo]);

  useEffect(() => {
    if (roomInfo.playerCount > 1) {
      setIsReady(true);
      if (questionNumber < 0) {
        console.log("setting questionNumber.");
        setQuestionNumber(0);
      }
    }
    console.log("Room Info", isReady)
  }, [roomInfo]);

  const IsComplete = () => <span id="IsComplete">Esgotado!</span>;
  const renderer = ({ minutes, seconds, completed }) => {
    if (completed) {
      return <IsComplete />;
    } else {
      if (minutes < 10) minutes = "0" + minutes;
      if (seconds < 10) seconds = "0" + seconds;

      return (
        <span id="span-countdown">
          {minutes}:{seconds}
        </span>
      );
    }
  };

  return (
    <React.Fragment>
      <div id="gamepage-area">
        <Header />
        <div id="game-area">
          <div id="question-area">
            <div id="countdown">
              {isReady ? (
                <Countdown date={Date.now() + 20000} renderer={renderer} />
              ) : (
                <span id="IsComplete">Aguardando Adversário...</span>
              )}
            </div>
            {isReady && currentQuestion ? Questionaire(currentQuestion) : null}
          </div>
          <div id="powers-area">
            <div id="powers">
              <span id="powers-title">Ajudas</span>
            </div>

            <div id="power-buttons">
              <div className="hability">
                <label htmlFor="universitarios">
                  <img src={Univ} className="img-button" alt="Botão Univ" />
                </label>
                <button id="universitarios" className="hability-button">
                  Universitarios
                </button>
              </div>

              <div className="hability">
                <label htmlFor="cartas">
                  <img src={Carta} className="img-button" alt="Botão Carta" />
                </label>
                <button id="cartas" className="hability-button">
                  Cartas
                </button>
              </div>

              <div className="hability">
                <label htmlFor="placas">
                  <img src={Placa} className="img-button" alt="Botão Placa" />
                </label>
                <button id="placas" className="hability-button">
                  Placas
                </button>
              </div>
            </div>
            <div id="jump-button">
              <span>Voce ainda pode pular: {"1"} questao!</span>
              <button id="jump-button-id">Pular</button>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default PageGamepage;
