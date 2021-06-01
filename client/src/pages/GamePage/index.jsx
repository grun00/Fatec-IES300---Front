import React, {
  useEffect,
  useState,
  useContext,
  useRef,
} from "react";

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
import { Redirect } from "react-router";

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
  const [correct, setCorrect] = useState(false);
  const [roundMessage, setRoundMessage] = useState('')

  const { socket } = useContext(SocketContext);
  const { user } = useContext(UserContext);
  const { isAuth } = useContext(AuthContext);


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
    return () => socket.close();
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
      setMatchStart(true);
      if (questionNumber < 0) {
        setQuestionNumber(0);
        setRoundMessage('');
      }
    } else {
      setRoundMessage("Aguardando adversário...")
    }
  }, [roomInfo]);

  useEffect(() => {
    if (isReady && (questionNumber < questions.length - 1)) {
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
        setCorrect(false);
        socket.emit("recordAnswer", timeUpData);
      } else {
        socket.emit("recordAnswer", matchData);
      }
    }
    setTimeUp(false);
    setMatchData(null);
  }, [timeUp]);

  const timerZeroed = () => {
    setRoundMessage(correct ?'Você Acertou!' : 'Você Errou!');
    setTimeout(() => {
      setIsReady(true);
      setTimeUp(true);
      setRoundMessage('')
    }, 3000)
    
  };
  
  
  if(!socket || !user || !isAuth) {
    return (<Redirect to="/" />)
  }

  return (
    <React.Fragment>
      <div id="gamepage-area">
        <Header />
        <div id="game-area">
          <div id="question-area">
            <h1 className="username">Jogador: {user.username} </h1>
            <h3 className="question-number"> {questionNumber != -1 && questionNumber < questions.length -1
                ? `Pergunta nº ${questionNumber + 1}`
                : null}
            </h3>
                <span className="message">{roundMessage}</span>
            <div id="countdown">
              {matchStart && (-1 > questionNumber < (questions.length - 1)) && !roundMessage ? (
                <Timer maxTime={maxTime} onComplete={timerZeroed} />
              ) : 
                null
              }
            </div>
            {currentQuestion && 15 > questionNumber > -1 && !roundMessage 
              ? Questionaire(currentQuestion, handleChosenAlternative, timeUp)
              : null}
          </div>
          <div id="powers-area">
            <div id="powers">
              <span id="powers-title">Ajudas</span>
            </div>

            <div id="power-buttons">
              <div className="ability">
                <label htmlFor="universitarios">
                  <img src={Univ} className="img-button" alt="Botão Univ" />
                </label>
                <button id="universitarios" className="ability-button">
                  Universitarios
                </button>
              </div>

              <div className="ability">
                <label htmlFor="cartas">
                  <img src={Carta} className="img-button" alt="Botão Carta" />
                </label>
                <button id="cartas" className="ability-button">
                  Cartas
                </button>
              </div>

              <div className="ability">
                <label htmlFor="placas">
                  <img src={Placa} className="img-button" alt="Botão Placa" />
                </label>
                <button id="placas" className="ability-button">
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
