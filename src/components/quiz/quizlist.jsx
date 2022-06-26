import React from "react";
import { Button } from "reactstrap";
import { Link } from "react-router-dom";

export default function QuizList({ preview, user, admin, quizList }) {
  return (
    <>
      {admin && (
        <>
          <div className="d-flex justify-content-between">
            <Link to="/archived">
              <Button color="primary">See Archived</Button>
            </Link>
            <h4>Quiz List</h4>
            <Link to="/create-quiz">
              <Button color="primary">Create New</Button>
            </Link>
          </div>
          <hr />
        </>
      )}
      {user && (
        <>
          <h4>Play quiz by quiz category</h4>
          <hr />
        </>
      )}

      {quizList?.length ? (
        <ol>
          {quizList.map((quiz) => (
            <li className="px-2 h5" key={quiz.id}>
              <div className="d-flex justify-content-between m-0 mb-2">
                <p className="text-truncate m-0">{quiz.title}</p>

                {admin && (
                  <div>
                    <Link to={`/question/${quiz.id}`}>
                      <Button color="info">Edit/View</Button>
                    </Link>
                  </div>
                )}

                {user && (
                  <div>
                    <Link to={`/quiz/${quiz.id}`}>
                      <Button color="info">Play</Button>
                    </Link>
                  </div>
                )}
              </div>
            </li>
          ))}
        </ol>
      ) : !preview ? (
        <h3 className="text-center">Not found any quiz</h3>
      ) : (
        ""
      )}
    </>
  );
}
