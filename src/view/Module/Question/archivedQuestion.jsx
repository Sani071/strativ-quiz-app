import React, { useEffect } from "react";
import { useQuizDisPatch, useQuizValue } from "../../../context/QuizContext";
import { Button } from "reactstrap";
import ArchivedQuestionList from "../../../components/question/archivedQuestionList";

export default function ArchivedQuestion() {
  const { getArchivedQuestions, restoreArchivedQuestion } = useQuizDisPatch();
  const { archivedQuestions } = useQuizValue();

  useEffect(() => {
    getArchivedQuestions();
  }, []);

  const restoreHandler = (id) => {
    restoreArchivedQuestion(id, getArchivedQuestions);
  };
  const restoreAllArchivedQuestions = () => {
    archivedQuestions.forEach((archivedQuestion, idx) => {
      restoreArchivedQuestion(archivedQuestion.id);
      if (archivedQuestions.length - 1 === idx) {
        getArchivedQuestions();
      }
    });
  };
  return (
    <>
      <h4 className="text-center">All archived questions</h4>
      {archivedQuestions.length ? (
        <div className="text-end">
          <Button onClick={restoreAllArchivedQuestions}>Restore all</Button>
        </div>
      ) : (
        <></>
      )}
      <hr />
      <ArchivedQuestionList
        questions={archivedQuestions}
        restoreHandler={restoreHandler}
      />
    </>
  );
}
