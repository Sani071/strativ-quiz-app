import React, { useState } from "react";
import { genUniqId } from "../../helper";

export default function AuthFrom({
  authType,
  setAuthType,
  signUpHandler,
  signInHandler,
}) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [role, setRole] = useState("admin");
  const submitHandler = (evt) => {
    evt.preventDefault();
    if (authType === 1) {
      signInHandler(email, password);
    } else {
      signUpHandler({ id: genUniqId(), email, password, role }, (msg) => {
        if (msg) {
          alert(msg);
        } else {
          setPassword("");
          setConfirmPassword("");
          setAuthType(1);
        }
      });
    }
  };
  const inputChangeHandler = (evt, cb) => {
    cb(evt.target.value);
  };
  return (
    <>
      <form className="auth-form" onSubmit={(evt) => submitHandler(evt)}>
        <div
          className={
            "auth-form-fields " +
            (authType === 1 ? "sign-in" : authType === 2 ? "sign-up" : "forgot")
          }
        >
          <input
            id="email"
            className="form-control my-2"
            name="email"
            type="email"
            placeholder="E-mail"
            value={email}
            onChange={(evt) => inputChangeHandler(evt, setEmail)}
            required
          />
          <input
            id="password"
            className="form-control my-2"
            name="password"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(evt) => inputChangeHandler(evt, setPassword)}
            required={authType === 1}
            disabled={authType === 3}
          />

          <div className={`mb-2 ${authType === 1 ? `d-none` : ""}`}>
            <input
              id="confirm-password"
              className="form-control my-2"
              name="confirm-password"
              type="password"
              value={confirmPassword}
              onChange={(evt) => inputChangeHandler(evt, setConfirmPassword)}
              placeholder="Confirm password"
              required={authType === 2 ? true : false}
            />

            <span>Role: </span>
            <input
              id="admin"
              className="form-check-input mx-2"
              name="role"
              type="radio"
              value="admin"
              checked={role === "admin"}
              onChange={(evt) => inputChangeHandler(evt, setRole)}
            />
            <label htmlFor="admin">Admin</label>
            <input
              id="user"
              className="form-check-input mx-2"
              name="role"
              type="radio"
              value="user"
              checked={role === "user"}
              onChange={(evt) => inputChangeHandler(evt, setRole)}
            />
            <label htmlFor="user">User</label>
          </div>
        </div>
        <button
          disabled={
            email && password && authType === 2 && password !== confirmPassword
          }
          className="btn btn-primary"
          type="submit"
        >
          {authType === 1 ? "Sign in" : "Sign up"}
        </button>
      </form>{" "}
    </>
  );
}
