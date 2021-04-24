import React from 'react';
import './style.css';

const AnswerField = (props) => {
    return (
        <React.Fragment>
            <button className="answer-button">
                {props.Alt}. <span id="answer">{props.AltA || props.AltB || props.AltC || props.AltD }</span>
            </button>

        </React.Fragment>
    )
}

export default AnswerField;