import React, { useEffect, useState } from "react";
import { stationQuestion } from "../stationQuestion";
import { stnQuestion } from "../stnQuestions";
import { numberQuestion } from "../numberQuestion";
function QuestionView({ pickedQuiz }) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [score, setScore] = useState(0);
  const [answerCorrect, setAnswerCorrect] = useState(false);
  const [questions, setQuestions] = useState();
  useEffect(() => {
    switch (pickedQuiz) {
      case "stationQuestion":
        setQuestions(stationQuestion.sort(() => Math.random() - 0.5));
        break;
      case "stnQuestion":
        setQuestions(stnQuestion.sort(() => Math.random() - 0.5));
        break;
      case "numberQuestion":
        setQuestions(numberQuestion.sort(() => Math.random() - 0.5));
        break;
    }
  }, [pickedQuiz]);

  const handleanswerOptionsClick = (isCorrect) => {
    if (isCorrect) {
      setScore(score + 1);
      setAnswerCorrect(true);
    }

    const nextQuestion = currentQuestion + 1;
    if (nextQuestion < questions?.length) {
      setTimeout(function () {
        setCurrentQuestion(nextQuestion);
        setAnswerCorrect(false);
      }, 350);
    } else {
      setShowScore(true);
    }
  };

  const handleReset = () => {
    setCurrentQuestion(0);
    setShowScore(false);
    setScore(0);
  };

  useEffect(() => {}, [handleanswerOptionsClick]);
  return (
    <div className="app">
      {showScore && questions ? (
        <div className="score-section">
          <div>
            Du fick {score} av {questions?.length} rätt
          </div>
          <div style={{ fontSize: "15px" }}>You waannt? .. you liike?</div>
          <button className="resetBtn" onClick={() => handleReset()}>
            Börja Om
          </button>
        </div>
      ) : (
        <>
          <div className="question-section">
            <div className="question-count">
              <div>
                <span>Fråga {currentQuestion + 1}</span>/{questions?.length}
              </div>
              <button className="resetBtn" onClick={() => handleReset()}>
                Börja Om
              </button>
            </div>
            <div className="question-text">
              {questions?.[currentQuestion]?.questionText}
            </div>
          </div>
          <div className="answer-section">
            {questions?.[currentQuestion]?.answerOptions.map(
              (answerOptions) => (
                <button
                  className={`${
                    answerOptions.isCorrect && answerCorrect ? "correct" : ""
                  }`}
                  key={answerOptions.id}
                  onClick={() =>
                    handleanswerOptionsClick(answerOptions.isCorrect)
                  }
                >
                  {answerOptions.answerText}
                </button>
              )
            )}
          </div>
        </>
      )}
    </div>
  );
}

export default QuestionView;
