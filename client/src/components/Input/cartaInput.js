import React from "react";
import "./styles.css";



export const CartaInput = ({ onClick, className, carta}) => {       
    return (
        <div className="containerCarta">          
            <div 
                onClick={onClick}
                className={className}            >                
                <img className="icone-carta"  src={carta} />
            </div>          
        </div>
        )
}
