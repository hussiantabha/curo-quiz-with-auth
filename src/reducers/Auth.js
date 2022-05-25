import { QuizContext } from "./quizReducer";
import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const { quizState, dispatch } = useContext(QuizContext);
  console.log(quizState, "from auth");
  useEffect(() => {
    if (!quizState.userLoggedIn) {
      navigate("/login");
    }
  });
  return <>{children}</>;
};

export { AuthProvider };
