import React, { useEffect, useState } from "react";
import { stationQuestion } from "../stationQuestion";
import { stnQuestion } from "../stnQuestions";
import { numberQuestion } from "../numberQuestion";
function QuestionView({ pickedQuiz }) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [score, setScore] = useState(0);
  const [answerCorrect, setAnswerCorrect] = useState(false);
  const [questions, setQuestions] = useState(stationQuestion);
  useEffect(() => {
    switch (pickedQuiz) {
      case "stationQuestions":
        setQuestions(stationQuestion);
      case "stnQuestion":
        setQuestions(stnQuestion);
      case "numberQuestion":
        setQuestions(numberQuestion);
      default:
        stationQuestion;
    }
  }, [pickedQuiz]);

  console.log(questions);

  const handleanswerOptionsClick = (isCorrect) => {
    if (isCorrect) {
      setScore(score + 1);
      setAnswerCorrect(true);
    }

    const nextQuestion = currentQuestion + 1;
    if (nextQuestion < questions?.length) {
      setTimeout(function () {
        setCurrentQuestion(nextQuestion);
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
      {showScore ? (
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
              {questions[currentQuestion].questionText}
            </div>
          </div>
          <div className="answer-section">
            {questions[currentQuestion].answerOptions.map((answerOptions) => (
              <button
                key={answerOptions.id}
                onClick={() =>
                  handleanswerOptionsClick(answerOptions.isCorrect)
                }
              >
                {answerOptions.answerText}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default QuestionView;
