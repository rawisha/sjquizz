import React, { useState } from "react";
import QuestionView from "./component/QuestionView";

function App() {
  const [pickedQuiz, setPickedQuiz] = useState("");
  return (
    <>
      {!pickedQuiz ? (
        <div className="quizApp">
          <h1>Pick your Quiz</h1>
          <button
            className="btnStation"
            onClick={() => setPickedQuiz("stationQuestion")}
          >
            Station
          </button>
          <button
            className="btnStn"
            onClick={() => setPickedQuiz("stnQuestion")}
          >
            Stn
          </button>
          <button
            className="btnNumber"
            onClick={() => setPickedQuiz("numberQuestion")}
          >
            Number
          </button>
          <button
            className="btnNato"
            onClick={() => setPickedQuiz("natoQuestion")}
          >
            Nato Questions
          </button>
        </div>
      ) : (
        <QuestionView pickedQuiz={pickedQuiz} />
      )}
    </>
  );
}

export default App;
