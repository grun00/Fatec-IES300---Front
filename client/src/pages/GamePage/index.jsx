import React from 'react';
import './style.css';
import Countdown from 'react-countdown';
import Header from '../../components/Header/Header';
import AnswerField from '../../components/AnswerField/AnswerField';

import Placa from '../../assets/placa.svg';
import Carta from '../../assets/carta.svg';
import Univ from '../../assets/universitario.svg';


const gamepage = (props) => {
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
              <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Iusto nam culpa laborum iste rem illum ad dolorum totam deserunt, blanditiis enim corporis, amet quisquam in, nulla pariatur nesciunt? Neque, ipsa.</p> 
            </div>
            <div id="alternatives-area">          
              <AnswerField Alt="A" AltA="Alternativa 1"/> {/* A pergunta será puxada pelo AltX*/ }
              <AnswerField Alt="B" AltB="Alternativa 2"/> {/* A pergunta será puxada pelo AltX*/ }
              <AnswerField Alt="C" AltC="Alternativa 3"/> {/* A pergunta será puxada pelo AltX*/ }
              <AnswerField Alt="D" AltD="Alternativa 4"/> {/* A pergunta será puxada pelo AltX*/ }
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

export default gamepage;