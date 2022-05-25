import React, { useState, useEffect, useContext } from "react";
import Navbar from "../components/Navbar";
import { QuizContext } from "../reducers/quizReducer";
import { useNavigate, useLocation, Navigate } from "react-router-dom";

const FilmQuiz = () => {
  const navigate = useNavigate();
  const { quizState, dispatch } = useContext(QuizContext);
  const [quizQuestion, setQuizQuestion] = useState(0);
  const [answers, setAnswers] = useState([]);
  const location = useLocation();
  const nextQuestion = (item) => {
    setQuizQuestion((prev) => prev + 1);
    setAnswers((prev) => [...prev, item]);
  };
  useEffect(() => {
    dispatch({ type: "filmQuizAnswers", payload: { value: answers } });
    if (quizQuestion === 5) {
      navigate("/results", { state: location });
    }
  }, [quizQuestion]);

  //console.log(quizState);
  return (
    <>
      <Navbar />
      <section className="quiz-question-modal">
        <div className="quiz-question-container">
          {quizState.filmQuizData.length === 0 ? (
            <h1>Loading</h1>
          ) : (
            <p>{quizState.filmQuizData[quizQuestion].question}</p>
          )}
          <div className="quiz-option-container">
            {quizState.filmQuizData.length > 1
              ? quizState.filmQuizData[quizQuestion].options.map((item) => {
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

export default FilmQuiz;

// const navigate = useNavigate();
// const { quizState, dispatch } = useContext(QuizContext);
// const [gadgetData, setGadgetData] = useState([]);
// const [quizQuestion, setQuizQuestion] = useState(0);
// const [answers, setAnswers] = useState([]);
// console.log(quizState);
// const getFilmQuizData = async () => {
//   const getData = await fetch(
//     "https://opentdb.com/api.php?amount=6&category=11&difficulty=medium&type=multiple"
//   );
//   if (getData.status === 200) {
//     const convertedJSON = await getData.json();
//     const newArr = await convertedJSON.results.map((item) => {
//       return {
//         ...item,
//         options: [...item.incorrect_answers, item.correct_answer],
//       };
//     });
//     dispatch({ type: "addFilmQuizData", payload: { value: newArr } });
//   }
// };
// useEffect(() => {
//   getFilmQuizData();
// }, []);
// const nextQuestion = (item) => {
//   setQuizQuestion((prev) => prev + 1);
//   setAnswers((prev) => [...prev, item]);
// };
// useEffect(() => {
//   dispatch({ type: "filmQuizAnswers", payload: { value: answers } });
//   if (quizQuestion === 5) {
//     navigate("/results");
//   }
// }, [quizQuestion]);
