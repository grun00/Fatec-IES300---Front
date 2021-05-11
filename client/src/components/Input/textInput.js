import React, { useState } from "react";
import "./styles.css";

export const Input = ({
  inputId,
  inputType = "text",
  labelText,
  inputName,
  placeholderText,
  inputValue,
  onChange,
  maxLength,
}) => {
  return (
    <div className="input-field">
      {labelText && <label htmlFor={inputName}>{labelText}:</label>}
      <input
        id={inputId}
        type={inputType}
        name={inputName}
        value={inputValue}
        onChange={onChange}
        placeholder={placeholderText}
        maxLength={maxLength}
      />
      <div className="underline"></div>
    </div>
  );
};

export default Input;
