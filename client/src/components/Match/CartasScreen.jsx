import React from 'react';
import '../../global.css'
import {CartaInput} from '../Input/cartaInput';
import CartaVirada from '../../images/cartaVirada.png';
import CartaReis from '../../images/cartaReis.png';
import CartaAs from '../../images/cartaAs.svg';
import Carta2 from '../../images/cartaDois.svg';
import Carta3 from '../../images/cartaTres.svg';

export default (props) => {  
  const cartas = [CartaReis, CartaAs, Carta2, Carta3, CartaVirada]; 
  const optionCartas = (i) => {  
    return (
      <CartaInput
        carta={cartas[props.opcaoCarta(i)]}
        className="opcaoCarta"
        onClick={() => props.onClickCarta(i)}
      />
    )
  }

    return (
      <React.Fragment>        
        <div className="iconesCartas">
          {optionCartas(0)}
          {optionCartas(1)}
          {optionCartas(2)}
          {optionCartas(3)}
        </div>            
      </React.Fragment>
    )
}

