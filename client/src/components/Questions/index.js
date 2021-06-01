import AnswerField from "../AnswerField/AnswerField";

const Questionaire = (
    questions,
    handleChosenAlternative,
    opponentSkipped
  ) => {
    const { question, randomAlternatives } = questions
    return (
      <>
        <div id="question">
          <p>{question}</p>
        </div>
        <div id="alternatives-area">
          {randomAlternatives.map((alternative, index) => {
            return (
              <AnswerField
                key={index}
                index={index}
                alternative={alternative}
                handleClick={handleChosenAlternative}
                disabled={opponentSkipped}
              />
            );
          })}
        </div>
      </>
    );
  };

  export default Questionaire;