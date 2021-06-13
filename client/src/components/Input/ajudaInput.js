import React from "react";
import "./styles.css";

export const AjudaInput = ({ inputName, onClick, className, disabled, iconeAjuda, labelText}) => {       
    return (
        <div className="containerAjuda">          
            <div 
                name={inputName} 
                onClick={onClick}
                className={className+" "+disabled+"OpcaoAjuda"}
            >                
                <img className="icone-ajuda" src={iconeAjuda} />
            </div>
            <span id="ajudaName">{labelText}</span>           
        </div>
        )
}
