import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { QuizContext } from "../reducers/quizReducer";

const SportsQuiz = () => {
  const navigate = useNavigate();
  const { quizState, dispatch } = useContext(QuizContext);
  const [quizQuestion, setQuizQuestion] = useState(0);
  const [answers, setAnswers] = useState([]);
  const getSportsQuizData = async () => {
    const getData = await fetch(
      "https://opentdb.com/api.php?amount=6&category=21&difficulty=hard&type=multiple"
    );
    if (getData.status === 200) {
      const convertedJSON = await getData.json();
      const newArr = await convertedJSON.results.map((item) => {
        return {
          ...item,
          options: [...item.incorrect_answers, item.correct_answer],
        };
      });
      dispatch({ type: "addSportsQuizData", payload: { value: newArr } });
    }
  };
  useEffect(() => {
    getSportsQuizData();
  }, []);
  const nextQuestion = (item) => {
    setQuizQuestion((prev) => prev + 1);
    setAnswers((prev) => [...prev, item]);
  };
  useEffect(() => {
    dispatch({ type: "sportsQuizAnswers", payload: { value: answers } });
    if (quizQuestion === 5) {
      navigate("/results");
    }
  }, [quizQuestion]);
  console.log(quizState);
  return (
    <>
      <Navbar />
      <section className="quiz-question-modal">
        <div className="quiz-question-container">
          {quizState.sportsQuizData.length === 0 ? (
            <h1>Loading</h1>
          ) : (
            <p>{quizState.sportsQuizData[quizQuestion].question}</p>
          )}
          <div className="quiz-option-container">
            {quizState.sportsQuizData.length > 1
              ? quizState.sportsQuizData[quizQuestion].options.map((item) => {
                  return (
                    <button
                      key={item}
                      onClick={() => nextQuestion(item)}
                      className="btn btn-primary-outline"
                    >
                      {item}
                    </button>
                  );
                })
              : ""}
          </div>
          <button className="btn btn-primary" onClick={() => nextQuestion("")}>
            Skip
          </button>
        </div>
      </section>
    </>
  );
};

export default SportsQuiz;
