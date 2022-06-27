import React, { useCallback } from "react";
import { Link } from "react-router-dom";
import { Button, ListGroup, ListGroupItem } from "reactstrap";
import QuestionItemCard from "./questionItem";

export default function ActiveQuestionList({ questionList, deleteHandler }) {
  const renderQuestionItem = useCallback((question) => {
    return (
      <div className="d-flex justify-content-between align-items-center">
        <div className="w-100 me-2">
          <QuestionItemCard key={question.id} title={question.title} />
        </div>
        <div className="d-flex">
          <Link to={`/update-question/${question.id}`}>
            <Button color="primary">Edit</Button>
          </Link>
          <Button
            className="ms-2"
            color="danger"
            onClick={() => deleteHandler(question.id)}
          >
            Delete
          </Button>
        </div>
      </div>
    );
  }, []);

  return (
    <div>
      <ListGroup>
        {questionList.map((question, idx) => {
          return (
            <ListGroupItem className="mb-1 cursor-pointer" key={question.id}>
              {renderQuestionItem(question, idx)}
            </ListGroupItem>
          );
        })}
      </ListGroup>
    </div>
  );
}
