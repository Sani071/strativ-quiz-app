import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useQuizDisPatch, useQuizValue } from "../../../context/QuizContext";
import ActiveQuestionList from "../../../components/question/activeQuestionList";

export default function ActiveQuestion() {
  const { id } = useParams();
  const { questionList } = useQuizValue();
  const { getQuestionByQuiz, archiveQuestionById } = useQuizDisPatch();

  useEffect(() => {
    getQuestionByQuiz(id);
  }, [id]);

  const deleteHandler = (questionId) => {
    archiveQuestionById(questionId, () => getQuestionByQuiz(id));
  };

  return (
    <>
      <h4 className="text-center">All questions</h4>
      <hr />
      {questionList?.length > 0 ? (
        <ActiveQuestionList
          questionList={questionList}
          deleted={deleteHandler}
        />
      ) : (
        <span className="text-danger text-center d-block">
          Not found any question
        </span>
      )}
    </>
  );
}
