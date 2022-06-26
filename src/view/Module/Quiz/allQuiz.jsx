import React from "react";
import QuizList from "../../../components/quiz/quizlist.jsx";
import { useQuizValue } from "../../../context/QuizContext";

export default function AllQuiz({ admin, preview, user }) {
  const { quizList } = useQuizValue();
  return (
    <>
      <QuizList
        admin={admin}
        preview={preview}
        user={user}
        quizList={quizList}
      />
    </>
  );
}
