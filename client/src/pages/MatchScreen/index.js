import React, { useEffect, useState, useContext } from "react";
import { Redirect } from "react-router";

import MatchScreenComponent from "../../components/Match/MatchScreenComponent";

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
  const [questionNumber, setQuestionNumber] = useState(-1);
  const [matchData, setMatchData] = useState(null);
  const [skips, setSkips] = useState(1);

  // Match Flags
  const [isReady, setIsReady] = useState(false);
  const [timeUp, setTimeUp] = useState(false);
  const [matchStart, setMatchStart] = useState(false);
  const [opponentSkipped, setOpponentSkipped] = useState(false);
  const [playerSkipped, setPlayerSkipped] = useState(false);
  const [questionScreen, setQuestionScreen] = useState(null);

  const [roundMessage, setRoundMessage] = useState("");

  // Game Contexts
  const { socket } = useContext(SocketContext);
  const { user } = useContext(UserContext);
  const { isAuth } = useContext(AuthContext);

  const handlePlayerAnswer = (answer) => {
    const matchData = {
      questionNumber,
      player: user.username,
      myChosenAlternative: answer.alternative,
      correct: answer.isCorrect,
      difficulty: currentQuestion.difficulty,
    };
    setMatchData(matchData);
  };

  const handleTimeUp = () => {
    setTimeUp(true);
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
        if (!questions) {
          setQuestions(data.questions);
        }
      });
    }
  }, [updateInfo]);

  useEffect(() => {
    if (roomInfo.playerCount > 1) {
      setMatchStart(true);
      if (questionNumber === -1) {
        setQuestionNumber(0);
        setRoundMessage("");
      }
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
          currentTime: 0,
        };
        socket.emit("recordAnswer", timeUpData);
      } else {
        socket.emit("recordAnswer", matchData);
      }
    }
    setTimeUp(false);
    setMatchData(null);
    setIsReady(true);
  }, [timeUp]);

  const handleNextQuestion = () => {
    if (questionNumber < questions?.length) {
      setIsReady(false);
      setQuestionNumber((prev) => (prev += 1));
    } else if (questionNumber > questions?.length) {
      setRoundMessage("Jogo Encerrado!");
      setMatchStart(false);
    }
  };
  return (
    <>
      {questionNumber > -1 && currentQuestion ? (
        <MatchScreenComponent
          currentQuestion={currentQuestion}
          handlePlayerAnswer={handlePlayerAnswer}
          handleTimeUp={handleTimeUp}
          handleNextQuestion={handleNextQuestion}
        />
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
