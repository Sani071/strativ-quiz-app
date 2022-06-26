import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useQuizDisPatch, useQuizValue } from "../../../context/QuizContext";
import QuizEndScreen from "../../../components/quiz/quizEnd";
import QuizBoard from "../../../components/quiz/quizLayout";

export default function PlayQuiz() {
  let { id } = useParams();
  const { questionList } = useQuizValue();
  const { getQuestionByQuiz, fetchQuizLayoutById } = useQuizDisPatch();

  const [point, setPoint] = useState(0);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [hasQuizEnd, setQuizEnd] = useState(false);
  const [layout, setLayout] = useState("");
  const [total, setTotal] = useState(0);

  const onNextHandler = () => {
    if (questionList.length - 1 > currentQuestionIndex) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  useEffect(() => {
    questionList?.length &&
      setCurrentQuestion(questionList[currentQuestionIndex]);
  }, [currentQuestionIndex, questionList]);

  useEffect(() => {
    getQuestionByQuiz(id);
    fetchQuizLayoutById(id, (value) => setLayout(value));
  }, [id]);

  const checkQuizEnd = () => {
    setQuizEnd(
      questionList.length - 1 === currentQuestionIndex ||
        questionList.length === total
    );
  };

  return (
    <>
      {hasQuizEnd ? (
        <QuizEndScreen point={point} />
      ) : (
        <>
          <h5 className="text-end pe-3 m-0">
            Your Point
            <b className="text-info h4 m-0"> {point} </b>
          </h5>

          {layout && layout === "single" && currentQuestion ? (
            <QuizBoard
              currentQuestion={currentQuestion}
              setPoint={setPoint}
              setQuizEnd={setQuizEnd}
              point={point}
              handleNext={onNextHandler}
              checkQuizEnd={checkQuizEnd}
            />
          ) : layout === "multiple" ? (
            questionList?.map((question) => (
              <QuizBoard
                isMulti
                key={question.id}
                currentQuestion={question}
                setPoint={setPoint}
                setQuizEnd={setQuizEnd}
                point={point}
                handleNext={onNextHandler}
                checkQuizEnd={checkQuizEnd}
                setTotal={() => setTotal(total + 1)}
              />
            ))
          ) : (
            <h4>Loading...</h4>
          )}
        </>
      )}
    </>
  );
}
