import React, {
  useEffect,
  useState,
  useContext,
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
  // Match Data
  const [roomInfo, setRoomInfo] = useState({});
  const [questions, setQuestions] = useState(null);
  const [updateInfo, setUpdateInfo] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [questionNumber, setQuestionNumber] = useState(-1);
  const [matchData, setMatchData] = useState(null);
  const [skips, setSkips] = useState(1);
  
  // Match Flags
  const [isReady, setIsReady] = useState(false);
  const [timeUp, setTimeUp] = useState(false);
  const [matchStart, setMatchStart] = useState(false);
  const [opponentSkipped, setOpponentSkipped] = useState(false);
  const [playerSkipped, setPlayerSkipped] = useState(false);
  const [correct, setCorrect] = useState(false);
  
  // Timer States
  const [maxTime, setMaxTime] = useState(15);
  const [roundMessage, setRoundMessage] = useState('')
  
  // Game Contexts
  const { socket } = useContext(SocketContext);
  const { user } = useContext(UserContext);
  const { isAuth } = useContext(AuthContext);

  socket.on("opponentSkipped", () => {
      const matchData = {
        questionNumber,
        player: user.username,
        myChosenAlternative: "skipped",
        correct: false,
        currentTime: 0,
      };
      setMatchData(matchData);
      setOpponentSkipped(true);
  })

  const handleSkipQuestion = (e) => {
    e.preventDefault();
    if(skips){
      const matchData = {
        questionNumber,
        player: user.username,
        myChosenAlternative: "skipped",
        correct: false,
        currentTime: 0,
      };
      socket.emit('skipQuestion');
      setMatchData(matchData);
      setSkips(prev => prev -= 1);
      setPlayerSkipped(true);
    }
  } 

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
      setMatchData(null);
    }
  }, [questionNumber]);

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
    if (isReady && (questionNumber < questions.length)) {
      setIsReady(false);
      setQuestionNumber((prev) => (prev += 1));
      console.log(questionNumber);
    } else if(isReady && (questionNumber >=  questions.length)) {
      setRoundMessage("Jogo Encerrado!");
      setMatchStart(false);
    }
  }, [isReady]);

  useEffect(() => {
    if (timeUp) {
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
    setPlayerSkipped(false);
    setOpponentSkipped(false);
  }, [timeUp]);

  const timerZeroed = () => {
    if(!roundMessage) {
      if(opponentSkipped || playerSkipped){
        setRoundMessage('A questão foi pulada!');
        setMatchData({...matchData, myChosenAlternative: "skipped", correct:false});
      }else{
        setRoundMessage(correct ?'Você Acertou!' : 'Você Errou!');
      }
    }
    setTimeout(() => {
      setOpponentSkipped(false);
      setPlayerSkipped(false);
      setRoundMessage('')
      setTimeUp(true);
      setIsReady(true);
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
            <h3 className="question-number"> {questionNumber != -1 && (questionNumber <= questions.length - 1) 
                ? `Pergunta nº ${questionNumber + 1}`
                : null}
            </h3>
                <span className="message">{roundMessage}</span>
            <div id="countdown">
              {matchStart && (-1 < questionNumber && questionNumber <= (questions.length -1)) && !roundMessage ? (
                <Timer maxTime={maxTime} onComplete={timerZeroed} />
              ) : 
                null
              }
            </div>
            {currentQuestion && (15 >= questionNumber && questionNumber > -1) && !roundMessage 
              ? Questionaire(currentQuestion, handleChosenAlternative, opponentSkipped)
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
                  Universitários
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
              <span className='skip-counter'>Você ainda pode pular: {skips} questão!</span>
              <button id="jump-button-id" onClick={handleSkipQuestion} disabled={skips ? false : true}>Pular</button>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default PageGamepage;
