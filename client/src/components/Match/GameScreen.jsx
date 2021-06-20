import React from "react";
import "../../global.css";
import { ButtonInput } from "../Input/buttonInput.js";
import { AjudaInput } from "../Input/ajudaInput.js";
import Universitarios from "../../assets/universitario.svg";
import Cartas from "../../assets/carta.svg";
import Convidados from "../../assets/placa.svg";
import { ReactSVG } from "react-svg";
import Vitinho from "../../images/vitinho.svg";

const Alter = (props) => {
  
 const renderAlternativa = (i, val) => {
    return (
      <ButtonInput
        key={i}
        inputName={"alternativa" + i}
        inputValue={val}
        className={"alternativa " + props.statusAlternativa(i)}
        onClick={() => props.onClick(i)}
        disabled={props.disabled}
      />
    );
  };
  const itensAjuda = ["Universitarios", "Cartas", "Convidados"];
  const iconesAjuda = [Universitarios, Cartas, Convidados];

  const optionAjuda = (i) => {
    return (
      <AjudaInput
        inputName={itensAjuda[i]}
        className="opcaoAjuda"
        onClick={props.onClickAjuda(i)}
        disabled={props.disabled}
        iconeAjuda={iconesAjuda[i]}
        labelText={itensAjuda[i]}
      />
    );
  };

  // const opcaoPular = () => {
  //   return (
  //     <ButtonInput
  //       inputName="opcaoPular"
  //       inputValue={"Pular " + props.pulos + "/3"}
  //       className="opcaoPular"
  //       onClick={() => props.onClickPular()}
  //       disabled={props.disabled}
  //     />
  //   );
  // };
  const opcaoPular = () => {
    return (
      <ButtonInput
        inputName="opcaoParar"
        inputValue={"Pular questao"}
        className="opcaoParar"
        onClick={(e) => props.onClickPular(e)}
        disabled={props.disabled}
      />
    );
  };

  return (
    <React.Fragment>
      <div className="perguntaSection">
        <div id="tempo">{props.tempo}</div>
        <p id="pergunta" className={props.statusPergunta}>
          {props.pergunta}
        </p>
        {!props.alternativas ? null : props.alternativas.map((alt, ind) => {
          return renderAlternativa(ind, alt);
        })}
        <ReactSVG id="vitinho" className={props.statusVitinho} src={Vitinho} />
      </div>
      <div className="ajudaSection">
        <div className="iconesAjuda">
          {optionAjuda(0)}
          {optionAjuda(1)}
          {optionAjuda(2)}
        </div>
        {opcaoPular()}
      </div>
    </React.Fragment>
  );
};

export default Alter;
