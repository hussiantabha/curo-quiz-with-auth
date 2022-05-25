import { createContext, useReducer, useEffect } from "react";

const QuizContext = createContext({});

const QuizContextProvider = ({ children }) => {
  const getQuiz1Data = async () => {
    const getData = await fetch(
      "https://opentdb.com/api.php?amount=6&category=30&difficulty=medium&type=multiple"
    );
    if (getData.status === 200) {
      const convertedJSON = await getData.json();
      const newArr = await convertedJSON.results.map((item, index) => {
        return {
          ...item,
          options: [...item.incorrect_answers, item.correct_answer],
          _id: index + 1,
        };
      });
      dispatch({ type: "addquiz1Data", payload: { value: newArr } });
    }
  };
  const getFilmQuizData = async () => {
    const getData = await fetch(
      "https://opentdb.com/api.php?amount=6&category=11&difficulty=medium&type=multiple"
    );
    if (getData.status === 200) {
      const convertedJSON = await getData.json();
      const newArr = await convertedJSON.results.map((item, index) => {
        return {
          ...item,
          options: [...item.incorrect_answers, item.correct_answer],
          _id: index + 1,
        };
      });
      dispatch({ type: "addFilmQuizData", payload: { value: newArr } });
    }
  };
  const getSportsQuizData = async () => {
    const getData = await fetch(
      "https://opentdb.com/api.php?amount=6&category=21&difficulty=hard&type=multiple"
    );
    if (getData.status === 200) {
      const convertedJSON = await getData.json();
      const newArr = await convertedJSON.results.map((item, index) => {
        return {
          ...item,
          options: [...item.incorrect_answers, item.correct_answer],
          _id: index + 1,
        };
      });
      dispatch({ type: "addSportsQuizData", payload: { value: newArr } });
    }
  };
  const reducerFunc = (state, action) => {
    switch (action.type) {
      case "addquiz1Data": {
        return { ...state, quiz1Data: action.payload.value };
      }
      case "gadgetQuizAnswers": {
        return { ...state, gadgetQuizAnswers: action.payload.value };
      }
      case "addFilmQuizData": {
        return { ...state, filmQuizData: action.payload.value };
      }
      case "filmQuizAnswers": {
        return { ...state, filmQuizAnswers: action.payload.value };
      }
      case "addSportsQuizData": {
        return { ...state, sportsQuizData: action.payload.value };
      }
      case "sportsQuizAnswers": {
        return { ...state, sportsQuizAnswers: action.payload.value };
      }
      default: {
        return { ...state };
      }
    }
  };
  const [quizState, dispatch] = useReducer(reducerFunc, {
    quiz1Data: [],
    gadgetQuizAnswers: [],
    filmQuizData: [],
    filmQuizAnswers: [],
    sportsQuizData: [],
    sportsQuizAnswers: [],
  });
  useEffect(() => {
    getQuiz1Data();
    getFilmQuizData();
    getSportsQuizData();
  }, []);
  return (
    <QuizContext.Provider value={{ quizState, dispatch }}>
      {children}
    </QuizContext.Provider>
  );
};

export { QuizContext, QuizContextProvider };
