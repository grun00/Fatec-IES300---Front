import React, { useEffect, useState, useContext } from "react";
import { Redirect } from "react-router";

import MatchScreenComponent from "../../components/Match/MatchScreenComponent";
import EndGame from "../../components/EndGame";

import {
  AuthContext,
  SocketContext,
  UserContext,
} from "../../context/UserContext";

const MatchScreen = () => {
  // Match Data
  const [roomInfo, setRoomInfo] = useState({});
  const [questions, setQuestions] = useState(null);
  const [updateInfo, setUpdateInfo] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [questionNumber, setQuestionNumber] = useState(-2);
  const [matchData, setMatchData] = useState(null);
  const [scoreAtual, setScoreAtual] = useState(0);

  // Match Flags
  const [isReady, setIsReady] = useState(false);
  const [timeUp, setTimeUp] = useState(false);
  const [matchStart, setMatchStart] = useState(false);
  const [opponentSkipped, setOpponentSkipped] = useState(false);
  const [playerSkipped, setPlayerSkipped] = useState(false);
  const [roundMessage, setRoundMessage] = useState("");

  // Game Contexts
  const { socket } = useContext(SocketContext);
  const { user } = useContext(UserContext);
  const { isAuth } = useContext(AuthContext);
  const [fim, setFim] = useState(false);

  socket.on("opponentSkipped", () => {
    setOpponentSkipped(true);
  });

  const handleSkipQuestion = () => {
    socket.emit("skipQuestion");
    setPlayerSkipped(true);
  };

  const handlePlayerAnswer = (answer) => {

    if (playerSkipped || opponentSkipped) {
      setMatchData({
        questionNumber,
        player: user.username,
        myChosenAlternative: "skipped",
        correct: false,
        difficulty: currentQuestion.difficulty,
        points: scoreAtual,
      });
    } else {
      var scoreRodada = scoreAtual;
      switch (answer.difficulty) {
        case 0:
          scoreRodada += 10000;

          break;
        case 1:
          scoreRodada += 20000;

          break;
        case 2:
          scoreRodada += 70000;

          break;
        case 3:
          scoreRodada *= 2;

          break;

        default:
          console.log("pergunta sem nivel");
      }
      setScoreAtual(scoreRodada);

      const matchData = {
        questionNumber,
        player: user.username,
        myChosenAlternative: answer.alternative,
        correct: answer.isCorrect,
        difficulty: currentQuestion.difficulty,
        points: scoreRodada,
      };

      setMatchData(matchData);
    }

  };

  const handleTimeUp = () => {
    setTimeUp(true);
  };

  const handleScoreAtual = (score) => {
    setScoreAtual(score);
  };

  useEffect(() => {
    setUpdateInfo(true);
    return () => socket.close();
  }, []);

  useEffect(() => {
    if (matchStart || isReady) {
      console.log(questionNumber);
      setCurrentQuestion(questions[questionNumber]);
      setIsReady(false);
      setMatchData(null);
    }
  }, [questionNumber]);

  useEffect(() => {
    console.log("updateInfo");
    if (updateInfo) {
      console.log("updateInfo");
      socket.emit("getRoomInfo");
      socket.on("roomInfo", (data) => {
        setRoomInfo(data);
        if (!questions) {
          setQuestions(data.questions);
        }
      });
    }
  }, [updateInfo]);

  useEffect(() => {
    console.log("roomInfo");
    if (roomInfo.playerCount > 1) {
      setMatchStart(true);
      if (questionNumber === -2) {
        setQuestionNumber(0);
        setRoundMessage("");
      }
      if (Object.values(Object.values(roomInfo.match)).length > 1) {
        if (
          Object.values(Object.values(roomInfo.match)[0]).length === 16 &&
          Object.values(Object.values(roomInfo.match)[1]).length === 16
        ) {
          setFim(true);
        }
      }
      setRoundMessage("Jogo Encerrado! Aguardando respostas do adversário.");
    } else {
      setRoundMessage("Aguardando adversario");
    }
  }, [roomInfo]);

  useEffect(() => {
    if (timeUp) {
      if (!matchData) {
        const timeUpData = {
          questionNumber,
          player: user.username,
          myChosenAlternative: "timeUp",
          correct: false,
          points: scoreAtual,
        };
        socket.emit("recordAnswer", timeUpData);
      } else {
        socket.emit("recordAnswer", matchData);
      }
    }
    setTimeUp(false);
    setMatchData(null);
    setPlayerSkipped(false);
    setOpponentSkipped(false);
    setIsReady(true);
  }, [timeUp]);

  /* Acrescentei esse mas n deu certo, sem esse até que uma das telas tinha dado certo, agr nenhuma deu. */

  const handleNextQuestion = () => {
    if (questionNumber < questions?.length) {
      setIsReady(false);
      setQuestionNumber((prev) => (prev += 1));

      socket.emit("getRoomInfo");
      socket.on("roomInfo", (data) => {
        setRoomInfo(data);
        if (!questions) {
          setQuestions(data.questions);
        }
      });
      console.log(roomInfo);
    } else if (questionNumber > questions?.length) {
    
      setRoundMessage("Jogo Encerrado!");

      setQuestionNumber(15);
      setCurrentQuestion(false);
      setMatchStart(false);

      socket.emit("getRoomInfo");
      socket.on("roomInfo", (data) => {
        setRoomInfo(data);
        if (!questions) {
          setQuestions(data.questions);
        }
      });
      console.log(roomInfo);
      setUpdateInfo(true);
    }
  };

  if (!user || !isAuth) {
    return <Redirect to="/" />;
  }
  return (
    <>
      {questionNumber > -2 && currentQuestion ? (
        <MatchScreenComponent
          players={roomInfo.players}
          currentQuestion={currentQuestion}
          handlePlayerAnswer={handlePlayerAnswer}
          handleTimeUp={handleTimeUp}
          handleNextQuestion={handleNextQuestion}
          handleScoreAtual={handleScoreAtual}
          handleSkipQuestion={handleSkipQuestion}
          skipMessage={opponentSkipped ? "Adversário Pulou" : null}
        />
      ) : fim ? (
        <EndGame nome={roomInfo} scoreAtual={scoreAtual} />
      ) : (
        <div id="waitingPlayer">
          <span id="roundMessage">{roundMessage}</span>
          <div id="jumpingDots">
            <span className="circleWaiting"></span>
            <span className="circleWaiting"></span>
            <span className="circleWaiting"></span>
          </div>
        </div>
      )}
    </>
  );
};

export default MatchScreen;
