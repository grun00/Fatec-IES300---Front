import React, {useEffect, useState} from 'react';
import Countdown from 'react-countdown';
import _ from 'lodash';

import './style.css';
import Header from '../../components/Header/Header';
import AnswerField from '../../components/AnswerField/AnswerField';
import Placa from '../../assets/placa.svg';
import Carta from '../../assets/carta.svg';
import Univ from '../../assets/universitario.svg';

import api from '../../services/api';

const PageGamepage = (props) => {
  const [questions, setQuestions] = useState([]);
  const [alternatives, setAlternatives] = useState([]);
  useEffect( ()=>{
    const fetchQuestions = async () => {
      const response = await api.get("/questions?search=match&nivel1=5&nivel2=5&nivel3=5&nivel4=1")
            setQuestions(response.data)
            return 'done'
    }
    fetchQuestions()
    questions.forEach((item) =>{
      const alts = item.alternatives
      alts.push(item.response)
      setAlternatives(_.shuffle(alts))
  }
  )
  }, [])
  const IsComplete = () => <span id="IsComplete">Esgotado!</span>;
  const renderer = ({ minutes, seconds, completed }) => {
    if (completed) {
      return <IsComplete />;
    } else {
      if (minutes < 10)
        minutes = "0" + minutes;
      if (seconds < 10)
        seconds = "0" + seconds;

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
        <Header/>
        <div id="game-area">
          <div id="question-area">
            <div id="countdown">
              <Countdown date={Date.now() + 90000} renderer={renderer} />
            </div>
            <div id="question">
              <p>
                {questions[0]?questions[0].question:null}
              </p> 
            </div>
            <div id="alternatives-area">   
              <AnswerField 
                Alt="A" 
                AltA={alternatives[0]?alternatives[0]:null} /> 
              <AnswerField Alt="B" AltB={alternatives[1]?alternatives[1]:null}/> 
              <AnswerField Alt="C" AltC={alternatives[2]?alternatives[2]:null}/> 
              <AnswerField Alt="D" AltD={alternatives[3]?alternatives[3]:null}/> 
            </div>
          </div>
          <div id="powers-area">
            <div id="powers">
              <span id="powers-title">Ajudas</span>
            </div>

            <div id="power-buttons">

              <div className="hability">
                <label htmlFor="universitarios">
                  <img src={ Univ } className="img-button" alt="Botão Univ"/>
                </label>
                <button id="universitarios" className="hability-button">Universitarios</button>
              </div>

              <div className="hability">
                <label htmlFor="cartas">
                  <img src={ Carta } className="img-button" alt="Botão Carta"/>
                </label>
                <button id="cartas" className="hability-button">Cartas</button>
              </div>

              <div className="hability">
                <label htmlFor="placas">
                  <img src={ Placa } className="img-button"  alt="Botão Placa"/>
                </label>
                <button id="placas" className="hability-button">Placas</button>
              </div>

            </div>
            <div id="jump-button">
              <span>Voce ainda pode pular: {'1'} questao!</span>
              <button id="jump-button-id">Pular</button>
            </div>
          </div>
        </div>
      </div>
  </React.Fragment>
    );

}

export default PageGamepage;