import React, { useEffect } from "react";
import "./styles.css";

export const ButtonInput = ({ inputType="button", inputName, inputValue, onClick, className, maxLength="70", disabled}) => {   
    return (
        <div className="field">
            <input 
                type={inputType} 
                name={inputName} 
                value={inputValue} 
                onClick={onClick}
                className={className}
                disabled={disabled}
            />
        </div>)
}
