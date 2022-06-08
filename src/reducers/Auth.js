import { QuizContext } from "./quizReducer";
import { useContext, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const { quizState, dispatch } = useContext(QuizContext);
  useEffect(() => {
    if (!quizState.userLoggedIn) {
      navigate("/login");
    }
  });
  return <>{children}</>;
};

export { AuthProvider };
