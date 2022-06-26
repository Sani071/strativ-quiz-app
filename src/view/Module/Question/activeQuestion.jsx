import React, { useCallback, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useQuizDisPatch, useQuizValue } from "../../../context/QuizContext";
import { Button, ListGroup, ListGroupItem } from "reactstrap";
import QuestionItemCard from "../../../components/question/questionItem";

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

  const renderQuestionItem = useCallback((question, index) => {
    return (
      <div className="d-flex justify-content-between align-items-center">
        <div className="w-100 me-2">
          <QuestionItemCard key={question.id} title={question.title} />
        </div>
        <Link to={`/update-question/${question.id}`}>
          <Button color="primary">Edit</Button>
        </Link>
        <div>
          {" "}
          <Button color="danger" onClick={() => deleteHandler(question.id)}>
            Delete
          </Button>
        </div>
      </div>
    );
  }, []);

  return (
    <>
      <h4 className="text-center">All questions</h4>
      <hr />
      {questionList?.length > 0 ? (
        <div>
          <ListGroup>
            {questionList.map((question, idx) => {
              return (
                <ListGroupItem
                  className="mb-1 cursor-pointer"
                  key={question.id}
                >
                  {renderQuestionItem(question, idx)}
                </ListGroupItem>
              );
            })}
          </ListGroup>
        </div>
      ) : (
        <span className="text-danger text-center d-block">
          Not found any question
        </span>
      )}
    </>
  );
}
