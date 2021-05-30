import React, {useState} from 'react';
import './style.css';

const AnswerField = (props) => {
    const [altLetters, setAltLetters] = useState({
        0: "A",
        1: "B",
        2: "C",
        3: "D",
        4: "E"
    })

    return (
        <React.Fragment>
            <button className="answer-button" index={props.index} onClick={e => props.onClick(e)} >
                {altLetters[props.index]}. <span id="answer" >{props.alternative}</span>
            </button>
        </React.Fragment>
    )
}

export default AnswerField;