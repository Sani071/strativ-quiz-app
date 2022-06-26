import React, { createContext, useContext, useEffect, useState } from "react";
import {
  getQuiz,
  addQuiz,
  addQuestion,
  fetchQuestionById,
  fetchQuestionByQuizId,
  countQuestionByQuizId,
  updateQuestionById,
  fetchQuizLayoutById,
  archiveQuestionById,
  fetchArchivedQuestion,
  restoreArchivedQuestion,
} from "../DB/useQuizIDB";

// Create two context:
// QuizContext: to query the context state
// QuizDispatchContext: to mutate the context state
const QuizContext = createContext(undefined);
const QuizDispatchContext = createContext(undefined);

// A "provider" is used to encapsulate only the
// components that needs the state in this context
function QuizProvider({ children }) {
  const [quizList, setQuizList] = useState([]);
  const [questionList, setQuestionList] = useState([]);
  const [archivedQuestions, setArchivedQuestions] = useState([]);

  const setQuizHandler = (quiz, cb) => {
    setQuizList([quiz, ...quizList]);
    addQuiz(quiz, cb);
  };

  const getQuestionByQuiz = (quizId) => {
    fetchQuestionByQuizId(quizId, setQuestionList);
  };

  useEffect(() => {
    getQuiz((quiz) => setQuizList(quiz));
  }, []);

  const getArchivedQuestions = () => {
    fetchArchivedQuestion(setArchivedQuestions);
  };

  return (
    <QuizContext.Provider value={{ quizList, questionList, archivedQuestions }}>
      <QuizDispatchContext.Provider
        value={{
          setQuizHandler,
          setQuestionHandler: addQuestion,
          updateQuestionById,
          getQuestionByQuiz,
          countQuestionByQuizId,
          archiveQuestionById,
          fetchQuestionById,
          fetchQuizLayoutById,
          getArchivedQuestions,
          restoreArchivedQuestion,
        }}
      >
        {children}
      </QuizDispatchContext.Provider>
    </QuizContext.Provider>
  );
}

const useQuizDisPatch = () => useContext(QuizDispatchContext);
const useQuizValue = () => useContext(QuizContext);
export { QuizProvider, useQuizDisPatch, useQuizValue };
