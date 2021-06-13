import React from 'react';
import '../../global.css'
import { ReactSVG } from 'react-svg'
import ConvidadosFila1 from '../../images/convidadosFila1.svg';
import ConvidadosFila2 from '../../images/convidadosFila2.svg';
import {ConvidadoInput} from '../Input/convidadoInput.js';

export default (props) => {  
  const optionConvidados = (i) => {  
    const ids = ["convidado1", "convidado2", "convidado3", "convidado4", "convidado5"];
    const transform = ["translate(-13.273 28.28)",
                       "translate(-11.49 24.371)",
                       "translate(-13.061,-13.992)", "", ""];
    const transformMaoEsq = ["rotate(180,96.125,443.65)",
                             "rotate(180,216.43,450.64)",
                             "rotate(180,330.35,469.65)","",""
  ];
    const transformMaoDir = ["matrix(1,0,0,-1,101.79,887.31)",
                             "matrix(1,0,0,-1,342.4,901.28)",
                             "matrix(1,0,0,-1,570.25,939.31)","",""
    ];

    const x = ["107.521706","350.76733","576.17682","212.15009","460.31335"];
    const y = ["469.95068","480.21005","486.10425","284.12958","275.47806"];
    const xRect = ["79.677","320.28","548.13","178.39","424.18"];
    const yRect = ["365.44","379.41","423.44","214.99","205.36"];
    const dMaoEsq = ["m-34.861 447.64c3.2741 9.8961 7.2907 29.521 8.0462 33.615 0.89726 4.8621 3.2371-1.8858 6.4544-17.539 0.77848-3.7874-1.8707-9.8357-0.46005-14.359 3.3356-10.696 4.28-11.294 4.28-11.294s4.874 3.092 7.489 3.566 2.97-1.783 2.375-2.733 2.5 0.594 3.091-0.951-1.3-3.685-1.3-3.685 2.259-1.9 1.426-3.448-16.288-11.769-18.9-9.273-8.916 19.5-8.916 19.5z",
    "m-37.94 452.57c7.61 6.182 13.792 7.488 17.12-3.21s4.28-11.294 4.28-11.294 4.874 3.092 7.489 3.566 2.97-1.783 2.375-2.733 2.5 0.594 3.091-0.951-1.3-3.685-1.3-3.685 2.259-1.9 1.426-3.448-16.288-11.769-18.9-9.273-8.916 19.5-8.916 19.5z",
    "m-33.585 442.99c7.61 6.182 15.298 31.302 12.765 6.371-1.1323-11.146 4.28-11.294 4.28-11.294s4.874 3.092 7.489 3.566 2.97-1.783 2.375-2.733 2.5 0.594 3.091-0.951-1.3-3.685-1.3-3.685 2.259-1.9 1.426-3.448-16.288-11.769-18.9-9.273-8.916 19.5-8.916 19.5z",
    "",""];
    const dMaoDir = ["m-42.044 453.08c11.091 29.02 7.2229 56.162 20.9 9.0985 1.1686-4.021-0.9113-7.3843 0.32319-12.821 2.4806-10.926 4.28-11.294 4.28-11.294s4.874 3.092 7.489 3.566 2.97-1.783 2.375-2.733 2.5 0.594 3.091-0.951-1.3-3.685-1.3-3.685 2.259-1.9 1.426-3.448-16.288-11.769-18.9-9.273-8.916 19.5-8.916 19.5z",
    "m-37.94 452.57c7.61 6.182 13.792 7.488 17.12-3.21s4.28-11.294 4.28-11.294 4.874 3.092 7.489 3.566 2.97-1.783 2.375-2.733 2.5 0.594 3.091-0.951-1.3-3.685-1.3-3.685 2.259-1.9 1.426-3.448-16.288-11.769-18.9-9.273-8.916 19.5-8.916 19.5z",
    "m-33.005 443.57c7.6365 6.2548 12.544 18.152 11.604 13.049l4.8607-18.552s4.874 3.092 7.489 3.566 2.97-1.783 2.375-2.733 2.5 0.594 3.091-0.951-1.3-3.685-1.3-3.685 2.259-1.9 1.426-3.448-16.288-11.769-18.9-9.273-8.916 19.5-8.916 19.5z",
    "",""];
    return (
      <ConvidadoInput
        id={ids[i]}
        className="respostaConvidados"
        classNameResposta={props.statusRespConvidado(i)}
        transform={transform[i]}
        transformMaoEsq={transformMaoEsq[i]}
        transformMaoDir={transformMaoDir[i]}
        x={x[i]}
        y={y[i]}
        xRect={xRect[i]}
        yRect={yRect[i]}
        dMaoEsq={dMaoEsq[i]}
        dMaoDir={dMaoDir[i]}
        resposta={props.respostaConvidado(i)}
      />
    )
  }

    return (
      <React.Fragment>        
        <ReactSVG className="convidados"
          src={ConvidadosFila2} />
         <div className="convidados">       
             {optionConvidados(3)}
             {optionConvidados(4)}  
        </div>  
        <ReactSVG className="convidados"
          src={ConvidadosFila1} />
        <div className="convidados">           
             {optionConvidados(0)}
             {optionConvidados(1)}
             {optionConvidados(2)}        
        </div>              
      </React.Fragment>
    )
}