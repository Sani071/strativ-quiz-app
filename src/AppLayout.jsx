import React from "react";
import { Link } from "react-router-dom";
import { Container, Card } from "reactstrap";
import { useAuthValue, useAuthDisPatch } from "./context/AuthContext";

export default function AppLayout({ children }) {
  const { authInfo } = useAuthValue();
  const { signOutHandler } = useAuthDisPatch();

  const userCard = () => {
    return (
      <div className="user-card text-center">
        <p className="m-0">
          <b>{`${authInfo?.email}`}</b> as
          <b> {authInfo.role}</b>
        </p>
        <span onClick={signOutHandler} className="nav-link cursor-pointer m-0">
          Sign out
        </span>
      </div>
    );
  };
  return (
    <>
      <Container>
        <Card className="mt-3 shadow p-3 appCard">
          {authInfo.loggedIn ? userCard() : <></>}
          <div className="appLogoContainer mb-4">
            <Link
              to={
                authInfo.loggedIn
                  ? authInfo.role === "admin"
                    ? "/dashboard"
                    : "/quiz"
                  : "/"
              }
            >
              <img
                className="appLogo"
                src=" https://images.g2crowd.com/uploads/product/image/social_landscape/social_landscape_cc23c306f0259fa0a699453822c23fae/quizizz.png"
                alt="quiz logo"
              />
            </Link>
          </div>

          {children}
        </Card>
      </Container>
    </>
  );
}
