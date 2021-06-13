import React from 'react';
import '../../global.css'
import { ReactSVG } from 'react-svg'
import Universitarios from '../../images/universitarios.svg';
import {UniversitarioInput} from '../Input/universitarioInput.js';

export default (props) => {  
  const optionUniversitarios = (i) => {  
    const ids = ["universitario1", "universitario2", "universitario3"];  
    const x = ["653.9978", "94.086174", "40.109383"];
    const y = ["218.51199", "75.310005", "195.66249"];
    const d = [
    "m 554.76188,203.42846 -51.43643,-15.55054 48.03671,37.39687 c 111.95374,80.95678 113.39983,-12.80321 113.39983,-12.80321 0,0 -5.2117,-105.29035 -110.00011,-9.04312 z",
    "m 170.40331,59.946481 66.95574,1.788 -73.66253,-30.811692 C 36.543264,-48.866809 53.394797,89.544269 56.702236,84.092348 c 0,0 23.721027,58.224552 113.701074,-24.145867 0,0 -5.07897,5.70341 0,0 z",
    "M 116.4257,181.89229 154.0353,168.82856 105.93,210.02959 C 12.617468,286.46761 2.6840002,198.92578 14.052801,176.4209 c 0,0 15.242706,-34.31036 37.134158,-43.16958 13.264179,-5.36786 49.668671,-13.78287 65.238741,48.64097 z"
    ];
    return (
      <UniversitarioInput
        id={ids[i]}
        className="respostaUniversitarios"
        classNameResposta={props.statusRespUniversitario(i)}
        x={x[i]}
        y={y[i]}
        d={d[i]}
        resposta={props.respostaUniversitario(i)}
      />
    )
  }

    return (
      <React.Fragment>        
        <ReactSVG className="universitarios"
          src={Universitarios}
        />
        <div className="universitarios">
          <svg   
            xmlns="http://www.w3.org/2000/svg"
            width="723.879"
            height="450.008"
            viewBox="0 0 723.879 450.008"
            version="1.1">  
            <g>    
              {optionUniversitarios(0)}
              {optionUniversitarios(1)}
              {optionUniversitarios(2)}
            </g>
          </svg>  
        </div>        
      </React.Fragment>
    )
}