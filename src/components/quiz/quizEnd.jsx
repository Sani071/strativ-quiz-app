import React from "react";

export default function QuizEndScreen({ point }) {
  return (
    <div className="text-center">
      <hr />
      <h3>The Quiz has been Ended</h3>
      <p>
        Your point is <b>{point}</b>
      </p>
    </div>
  );
}
