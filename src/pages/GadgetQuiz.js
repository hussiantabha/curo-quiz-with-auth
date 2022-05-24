import React, { useEffect, useState, useContext } from "react";
import Navbar from "../components/Navbar";
import { QuizContext } from "../reducers/quizReducer";
import { useNavigate, useLocation, Navigate } from "react-router-dom";
const GadgetQuiz = () => {
  const navigate = useNavigate();
  const { quizState, dispatch } = useContext(QuizContext);
  const [gadgetData, setGadgetData] = useState([]);
  const [quizQuestion, setQuizQuestion] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState(
    gadgetData[quizQuestion]
  );
  const [answers, setAnswers] = useState([]);
  const getQuizData = async () => {
    const getData = await fetch(
      "https://opentdb.com/api.php?amount=6&category=30&difficulty=medium&type=multiple"
    );
    if (getData.status === 200) {
      const convertedJSON = await getData.json();
      const newArr = await convertedJSON.results.map((item) => {
        return {
          ...item,
          options: [...item.incorrect_answers, item.correct_answer],
        };
      });
      dispatch({ type: "addquiz1Data", payload: { value: newArr } });
      setCurrentQuestion(newArr[quizQuestion]);
      setGadgetData(newArr);
    }
  };

  // useEffect(() => {
  //   getQuizData();
  // }, []);
  const nextQuestion = (item) => {
    setQuizQuestion((prev) => prev + 1);
    setAnswers((prev) => [...prev, item]);
  };
  useEffect(() => {
    dispatch({ type: "gadgetQuizAnswers", payload: { value: answers } });
    if (quizQuestion === 5) {
      navigate("/results");
    }
  }, [quizQuestion]);
  console.log(quizState);
  return (
    <>
      <Navbar />
      <button onClick={() => nextQuestion("hi")}>Next</button>
      <section className="quiz-question-modal">
        <div className="quiz-question-container">
          {quizState.quiz1Data.length === 0 ? (
            <h1>Loading</h1>
          ) : (
            <p>{quizState.quiz1Data[quizQuestion].question}</p>
          )}
          <div className="quiz-option-container">
            {quizState.quiz1Data.length > 1
              ? quizState.quiz1Data[quizQuestion].options.map((item) => {
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

export default GadgetQuiz;
{
  /* <section className="quiz-question-modal">
  <div className="quiz-question-container">
    <p className="quiz-question">{currentQuestion.question}</p>
    <div className="quiz-option-container">
      {currentQuestion.options.map((item) => {
        return (
          <button
            key={item}
            className="btn btn-primary-outline"
            onClick={() => nextQuestion(item)}
          >
            {item}
          </button>
        );
      })}
    </div>
    <button
      className="btn btn-primary"
      onClick={() => setQuizQuestion((prev) => prev + 1)}
    >
      Skip
    </button>
  </div>
</section>; */
}

// const { quizState, dispatch } = useContext(QuizContext);
// const [quizQuestion, setQuizQuestion] = useState(0);
// const [gadgetData, setGadgetData] = useState(quizState.quiz1Data);
// const [currentQuestion, setCurrentQuestion] = useState(
//   gadgetData[quizQuestion]
// );

// const [answers, setAnswers] = useState([]);
// const navigate = useNavigate();
// const location = useLocation();

// const nextQuestion = () => {
//   //setAnswers((prevState) => [...prevState, item]);
//   // setQuizQuestion((prev) => prev + 1);
//   setQuizQuestion((prev) => prev + 1);
//   setCurrentQuestion(gadgetData[quizQuestion]);
// };

{
  /* <section className="quiz-question-modal">
  <div className="quiz-question-container">
    <p className="quiz-question">{currentQuestion.question}</p>
    <div className="quiz-option-container">
      {currentQuestion.options === undefined ? (
        <h1>Loading</h1>
      ) : (
        currentQuestion.options.map((item) => {
          return (
            <button
              key={item}
              className="btn btn-primary-outline"
              onClick={() => nextQuestion(item)}
            >
              {item}
            </button>
          );
        })
      )}
    </div>
  </div>
</section>; */
}
