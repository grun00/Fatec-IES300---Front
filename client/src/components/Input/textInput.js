import React, {useState} from "react";
import "./styles.css"


export const Input = ({ inputType="text", labelText, inputName, placeholderText, inputValue, onChange }) => {
       
    return (
        <div className="field">
            <div className="input-field">
                {labelText && <label htmlFor={inputName}>{labelText}:</label>}
                <input 
                    type={inputType} 
                    name={inputName} 
                    value={inputValue} 
                    onChange={onChange} 
                    placeholder={placeholderText} />
            </div>
        </div>)
}

export default Input;
