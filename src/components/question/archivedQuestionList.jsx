import React from "react";
import QuestionItemCard from "./questionItem";
import { Button, ListGroup, ListGroupItem } from "reactstrap";

export default function ArchivedQuestionList({ questions, restoreHandler }) {
  return (
    <>
      {questions?.length > 0 ? (
        <div>
          <ListGroup>
            {questions.map((question) => {
              return (
                <ListGroupItem
                  className="mb-1 cursor-pointer d-flex justify-content-between"
                  key={question.id}
                >
                  <QuestionItemCard title={question.title} />
                  <Button
                    color="danger"
                    onClick={() => restoreHandler(question.id)}
                  >
                    restore
                    <span> ⟳ </span>
                  </Button>
                </ListGroupItem>
              );
            })}
          </ListGroup>
        </div>
      ) : (
        <span className="text-danger text-center d-block">
          Not found any archived question
        </span>
      )}
    </>
  );
}
