import React from "react";
import "./styles.css";

export const UniversitarioInput = ({className, id, x, y, d, resposta, classNameResposta}) => {       
    return (
        <React.Fragment>
            <g className={classNameResposta}>
                <path fill="#f9f9f9" stroke="#000000" strokeWidth="0.783745px" strokeLinecap="butt"
                    strokeLinejoin="miter" strokeOpacity="1" d={d}
                />
                <text
                    x={x}
                    y={y}
                    transform="scale(0.91189133,1.0966219)">
                    <tspan
                        fill="#ff0000"                   
                        x={x}
                        y={y}
                        id={id}
                        className={className}
                    >{resposta}</tspan>
                </text>
            </g>
        </React.Fragment>
    )
}
