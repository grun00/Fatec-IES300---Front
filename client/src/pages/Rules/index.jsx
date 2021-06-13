import React from "react";
import "./style.css";

//Components
import Header from "../../components/Header/Header";

const RulesPage = () => {
  return (
    <>
      <div id="rulePageArea">
        <Header />
        <div id="rulesArea">
          <h1>Regras do Jogo</h1>
          <div className="rule">
            <h2 className="rule-title">1.1 Como Jogar</h2>
            <p className="rule-explanation">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Odio
              facilisis mauris sit amet massa vitae tortor condimentum. Augue
              mauris augue neque gravida in fermentum et sollicitudin.
            </p>
          </div>
          <div className="rule">
            <h2 className="rule-title">1.2 Como nao fazer uma pagina de regras</h2>
            <p className="rule-explanation">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Odio
              facilisis mauris sit amet massa vitae tortor condimentum. Augue
              mauris augue neque gravida in fermentum et sollicitudin.
            </p>
          </div>
          <div className="rule">
            <h2 className="rule-title">1.3 Como usar aquilo ali</h2>
            <p className="rule-explanation">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Odio
              facilisis mauris sit amet massa vitae tortor condimentum. Augue
              mauris augue neque gravida in fermentum et sollicitudin.
            </p>
          </div>
          <div className="rule">
            <h2 className="rule-title">1.4 Como fazer aquilo ali</h2>
            <p className="rule-explanation">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Odio
              facilisis mauris sit amet massa vitae tortor condimentum. Augue
              mauris augue neque gravida in fermentum et sollicitudin.
            </p>
          </div>
          <div className="rule">
            <h2 className="rule-title">2.1 Como tirar 10 em IES-300</h2>
            <p className="rule-explanation">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Odio
              facilisis mauris sit amet massa vitae tortor condimentum. Augue
              mauris augue neque gravida in fermentum et sollicitudin.
            </p>
          </div>
          <div className="rule">
            <h2 className="rule-title">2.2 O que fazer caso a gente nao tire 10 em IES-300</h2>
            <p className="rule-explanation">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Odio
              facilisis mauris sit amet massa vitae tortor condimentum. Augue
              mauris augue neque gravida in fermentum et sollicitudin.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default RulesPage;
