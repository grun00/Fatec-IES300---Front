import React from "react";
import "./styles.css";

export const ConvidadoInput = ({className, transform, transformMaoEsq, transformMaoDir, id, x, y, xRect, yRect, dMaoEsq, dMaoDir, resposta, classNameResposta}) => {       
    return (
        <React.Fragment>
            <svg width="723.88" height="519.01" version="1.1" viewBox="0 0 723.88 519.01" xmlns="http://www.w3.org/2000/svg">
                <g className={classNameResposta}>  
                    <linearGradient id={id} x1="-300.78" x2="-379.75" y1="138.22" y2="87.171" gradientTransform="matrix(1.5983 0 0 1.073 993.94 127.93)" gradientUnits="userSpaceOnUse">
                        <stop offset="0"/>
                        <stop stopOpacity="0" offset="1"/>
                    </linearGradient>          
                    <g transform={transform} >
                        <rect x={xRect} y={yRect} width="131.25" height="90.758" fill="#fff6d5" stopColor="#000000" stroke={"url(#"+id+")"} strokeLinejoin="round" strokeWidth="4.4526" />
                        <g transform={transformMaoEsq} fillRule="evenodd">
                            <path d={dMaoEsq} fill="#e6ad83"/>
                            <g transform="translate(-349.39 -7.3288)" fill="#d7766d" >
                            <path d="m342.5 445.59a0.448 0.448 0 0 1-0.481 0.755c-2.6-1.652-4.512-2.921-5.976-3.89-4.207-2.786-4.41-2.919-5.059-1.946a0.44848 0.44848 0 1 1-0.748-0.495c1.147-1.72 1.384-1.562 6.3 1.694 1.492 0.991 3.44 2.277 5.964 3.882z" />
                            <path d="m344.64 441.31a0.44802 0.44802 0 0 1-0.481 0.756l-2.281-1.454c-8.381-5.348-11.11-7.089-11.964-5.808a0.44986 0.44986 0 1 1-0.748-0.5c1.34-2.013 4.252-0.153 13.192 5.551z" />
                            <path d="m319.88 442.78a0.44827 0.44827 0 0 1 0.848 0.291l-4.035 10.02a0.44938 0.44938 0 0 1-0.85-0.292z" />
                            </g>
                        </g>
                        <g transform={transformMaoDir} fillRule="evenodd">
                            <path d={dMaoDir} fill="#e6ad83" />
                            <g transform="translate(-349.39 -7.3288)" fill="#d7766d" >
                            <path d="m342.5 445.59a0.448 0.448 0 0 1-0.481 0.755c-2.6-1.652-4.512-2.921-5.976-3.89-4.207-2.786-4.41-2.919-5.059-1.946a0.44848 0.44848 0 1 1-0.748-0.495c1.147-1.72 1.384-1.562 6.3 1.694 1.492 0.991 3.44 2.277 5.964 3.882z" />
                            <path d="m344.64 441.31a0.44802 0.44802 0 0 1-0.481 0.756l-2.281-1.454c-8.381-5.348-11.11-7.089-11.964-5.808a0.44986 0.44986 0 1 1-0.748-0.5c1.34-2.013 4.252-0.153 13.192 5.551z"/>
                            <path d="m319.88 442.78a0.44827 0.44827 0 0 1 0.848 0.291l-4.035 10.02a0.44938 0.44938 0 0 1-0.85-0.292z" />
                            </g>
                        </g>
                    </g>
                    <text x={x} y={y}>
                        <tspan 
                        fill="#ff0000" 
                        x={x}
                        y={y}
                        className={className}
                        >{resposta}</tspan>
                    </text>
                </g>
            </svg>
        </React.Fragment>
    )
}
