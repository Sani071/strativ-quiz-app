import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import CreateQuizForm from "./view/Module/Quiz/createQuizForm.jsx";
import AuthPage from "./view/Module/Auth/authPage.jsx";
import ActiveQuestion from "./view/Module/Question/activeQuestion.jsx";
import ArchivedQuestion from "./view/Module/Question/archivedQuestion.jsx";
import QuizBoard from "./view/Module/Quiz/playQuiz.jsx";
import AllQuiz from "./view/Module/Quiz/allQuiz.jsx";
import PrivateRouteHOC from "./view/Module/Auth/privateRouteHOC.jsx";

const routes = [
  { path: "/create-quiz", element: <CreateQuizForm /> },
  { path: "/update-question/:id", element: <CreateQuizForm update /> },
  { path: "/question/:id", element: <ActiveQuestion /> },
  { path: "/dashboard", element: <AllQuiz admin /> },
  { path: "/quiz", element: <AllQuiz user /> },
  { path: "/quiz/:id", element: <QuizBoard /> },
  { path: "/archived", element: <ArchivedQuestion /> },
];

function App() {
  const routeComponents = routes.map((route) => (
    <Route
      key={route.path}
      path={route.path}
      element={<PrivateRouteHOC>{route.element}</PrivateRouteHOC>}
    />
  ));
  return (
    <div className="App">
      <Routes>
        <Route path="/auth" element={<AuthPage />} />
        <Route path="/" element={<Navigate replace to="/auth" />} />
        <Route path="*" element={<Navigate to="/" replace />} />
        {routeComponents}
      </Routes>
    </div>
  );
}

export default App;
