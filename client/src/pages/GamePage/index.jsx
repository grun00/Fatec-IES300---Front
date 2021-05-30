import React, { useEffect, useState, useContext, useRef } from "react";
import Countdown, { zeroPad } from "react-countdown";
import _ from "lodash";

import "./style.css";
import Header from "../../components/Header/Header";
import Questionaire from "../../components/Questions/index";
import Placa from "../../assets/placa.svg";
import Carta from "../../assets/carta.svg";
import Univ from "../../assets/universitario.svg";

import {
  AuthContext,
  SocketContext,
  UserContext,
} from "../../context/UserContext";

const PageGamepage = () => {
  const [roomInfo, setRoomInfo] = useState({});
  const [questions, setQuestions] = useState(null);
  const [updateInfo, setUpdateInfo] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [questionNumber, setQuestionNumber] = useState(-1);
  const [isReady, setIsReady] = useState(false);
  const [currentTime, setCurrentTime] = useState(false);
  const [timeUp, setTimeUp] = useState(false);
  const [matchStart, setMatchStart] = useState(false);
  const [matchData, setMatchData] = useState(null);

  const { socket } = useContext(SocketContext);
  const { authorized } = useContext(AuthContext);
  const { user } = useContext(UserContext);

  const timerRef = useRef();


  // socket.on("opponentReady", () => {
    // setOpponentReady(true);
  // });

  const handleChosenAlternative = (e) => {
    e.preventDefault();
    const chosen = e.currentTarget.attributes.index.value;
    const correct =
      currentQuestion.answerIndex === Number(chosen)
        ? true
        : false;
    const matchData = {
      questionNumber,
      player: user.name,
      myChosenAlternative: chosen,
      correct,
      currentTime: 0,
    };
    setMatchData(matchData);
  };

  useEffect(() => {
    setUpdateInfo(true);
  }, []);
  
  useEffect(() => {
    if (matchStart || isReady) {
      setCurrentQuestion(questions[questionNumber]);
      timerRef.current.start();
      setIsReady(false);
    }
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
      setMatchStart(true);
      if (questionNumber < 0) {
        setQuestionNumber(0);
      }
    }
  }, [roomInfo]);

  useEffect(() => {
    if (isReady && (questionNumber < (questions.length - 1))) {
      setIsReady(false);
      setQuestionNumber((prev) => prev += 1);
    }
  }, [isReady]);

  useEffect(() => {
    if(timeUp) {
      if(!matchData){
          const timeUpData = {
          questionNumber,
          player: user.name,
          myChosenAlternative: 'timeUp', 
          correct: false,
          currentTime: 0,
        };
        socket.emit("recordAnswer", timeUpData);
      } else {
        socket.emit("recordAnswer", matchData);
      }
    }
    setTimeUp(false);
    setMatchData(null);
  }, [timeUp])

  const IsComplete = () => <span id="IsComplete">Esgotado!</span>;
  const renderer = ({ minutes, seconds, completed }) => {
    if (completed) {
      return <IsComplete />;
    } else {
      return (
        <span id="span-countdown">
          {zeroPad(minutes)}:{zeroPad(seconds)}
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
            <h1>
              {user.name} Question Number {questionNumber}
            </h1>
            <div id="countdown">
              {matchStart ? (
                <Countdown
                  date={Date.now() + 20000}
                  renderer={renderer}
                  ref={timerRef}
                  autoStart={false}
                  onComplete={() => {
                    setTimeUp(true);
                    setIsReady(true);
                  }}
                />
              ) : (
                <span id="IsComplete">Aguardando Adversário...</span>
              )}
            </div>
            {currentQuestion
              ? Questionaire(currentQuestion, handleChosenAlternative, timeUp)
              : null}
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
