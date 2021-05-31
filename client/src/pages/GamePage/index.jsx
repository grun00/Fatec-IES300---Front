import React, {
  useEffect,
  useState,
  useContext,
  useRef,
  useCallback,
} from "react";
import Countdown, { zeroPad } from "react-countdown";
import _ from "lodash";

import "./style.css";
import Header from "../../components/Header/Header";
import Questionaire from "../../components/Questions/index";
import Timer from "../../components/Timer";
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
  const [timeUp, setTimeUp] = useState(false);
  const [matchStart, setMatchStart] = useState(false);
  const [matchData, setMatchData] = useState(null);
  const [startTimer, setStartTimer] = useState(false);
  const [maxTime, setMaxTime] = useState(15);
  const [correct, setCorrect] = useState(true);

  const { socket } = useContext(SocketContext);
  const { authorized } = useContext(AuthContext);
  const { user } = useContext(UserContext);

  const timerRef = useRef();

  const handleChosenAlternative = (e) => {
    e.preventDefault();
    const chosen = e.currentTarget.attributes.index.value;
    const correct =
      currentQuestion.answerIndex === Number(chosen) ? true : false;
    setCorrect(correct);
    const matchData = {
      questionNumber,
      player: user.username,
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
      setIsReady(false);
    }
  }, [questionNumber]);

  useEffect(() => {
    if (currentQuestion) {
      console.log("currentQuestion");
    }
  }, [currentQuestion]);

  useEffect(() => {
    if (updateInfo) {
      console.log("updateInfo");
      socket.emit("getRoomInfo");
      socket.on("roomInfo", (data) => {
        setRoomInfo(data);
        console.log("getting new roomData");
        if (!questions) {
          setQuestions(data.questions);
        }
      });
    }
  }, [updateInfo]);

  useEffect(() => {
    if (roomInfo.playerCount > 1) {
      console.log("roomInfo");
      setMatchStart(true);
      if (questionNumber < 0) {
        setQuestionNumber(0);
      }
    }
  }, [roomInfo]);

  useEffect(() => {
    if (isReady && questionNumber < questions.length - 1) {
      setIsReady(false);
      setQuestionNumber((prev) => (prev += 1));
    }
  }, [isReady]);

  useEffect(() => {
    if (timeUp) {
      console.log("timeUp");
      if (!matchData) {
        const timeUpData = {
          questionNumber,
          player: user.username,
          myChosenAlternative: "timeUp",
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
  }, [timeUp]);

  const timerZeroed = () => {
    setIsReady(true);
    setTimeUp(true);
    
  };

  return (
    <React.Fragment>
      <div id="gamepage-area">
        <Header />
        <div id="game-area">
          <div id="question-area">
            <h1>
              {user.username}{" "}
              {questionNumber != -1 && questionNumber < 15
                ? `Question Number ${questionNumber + 1}`
                : null}
            </h1>
            <div id="countdown">
              {matchStart && currentQuestion ? (
                <Timer maxTime={maxTime} onComplete={timerZeroed} />
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
              <span>Voce ainda pode pular: {"1"} questão!</span>
              <button id="jump-button-id">Pular</button>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default PageGamepage;
