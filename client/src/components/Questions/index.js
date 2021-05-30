import AnswerField from "../AnswerField/AnswerField";

const Questionaire = (
    questions,
    handleChosenAlternative,
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
                onClick={handleChosenAlternative}
              />
            );
          })}
        </div>
      </>
    );
  };

  export default Questionaire;