import React, { useState } from "react";
import AuthFrom from "../../../components/auth/authFrom";
import { useAuthDisPatch } from "../../../context/AuthContext";
import "./auth.css";

export default function AuthPage() {
  const [authType, setAuthType] = useState(1);
  const { doSignUp, signInHandler } = useAuthDisPatch();

  return (
    <div className="d-flex justify-content-center">
      <div className="auth-container">
        <header>
          <div
            className={
              "header-headings " + (authType === 1 ? "sign-in" : "sign-up")
            }
          >
            <span>Sign in to your account</span>
            <span>Create an account</span>
          </div>
        </header>
        <ul className="options">
          <li
            className={authType === 1 ? "active" : ""}
            onClick={() => setAuthType(1)}
          >
            Sign in
          </li>
          <li
            className={authType === 2 ? "active" : ""}
            onClick={() => setAuthType(2)}
          >
            Sign up
          </li>
        </ul>

        <AuthFrom
          authType={authType}
          signUpHandler={doSignUp}
          signInHandler={signInHandler}
          setAuthType={setAuthType}
        />
      </div>
    </div>
  );
}
