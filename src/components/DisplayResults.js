import React, { useContext } from "react";
import { QuizContext } from "../reducers/quizReducer";

const DisplayResults = ({ data }) => {
  const { quizState, dispatch } = useContext(QuizContext);
  const filtered = data.filter((item) => item._id <= 5);
  return (
    <>
      <section className="results-container">
        {filtered.map(({ question, correct_answer, options }) => {
          return (
            <div key={question} className="result-quiz-answer-container-card">
              <p>{question}</p>
              <div className="result-quiz-answer-option-container">
                {options.map((item) => {
                  return (
                    <button
                      key={item}
                      className={
                        correct_answer.includes(item)
                          ? " btn btn-success"
                          : data === quizState.quiz1Data
                          ? quizState.gadgetQuizAnswers.includes(item)
                            ? correct_answer.includes(item)
                              ? "btn btn-success"
                              : "btn btn-danger"
                            : "btn btn-primary-outline"
                          : data === quizState.sportsQuizData
                          ? quizState.sportsQuizAnswers.includes(item)
                            ? correct_answer.includes(item)
                              ? "btn btn-success"
                              : "btn btn-danger"
                            : "btn btn-primary-outline"
                          : quizState.filmQuizAnswers.includes(item)
                          ? correct_answer.includes(item)
                            ? "btn btn-success"
                            : "btn btn-danger"
                          : "btn btn-primary-outline"
                      }
                    >
                      {item}
                    </button>
                  );
                })}
              </div>
            </div>
          );
        })}
      </section>
    </>
  );
};

export default DisplayResults;
