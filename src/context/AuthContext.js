import React, { createContext, useContext, useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { doSignUp, doSignIn } from "../DB/useQuizIDB";
const AuthContext = createContext(undefined);
const AuthDispatchContext = createContext(undefined);

function AuthProvider({ children }) {
    const navigate = useNavigate();
    const location = useLocation();

    const [authInfo, setAuthInfo] = useState({
        loggedIn: false,
        role: "",
        email: "",
    });

    const signInHandler = (email, password) => {
        doSignIn(email, password, (isSuccess, role, msg) => {
            if (isSuccess) {
                setAuthInfo({ loggedIn: true, role: role, email });
                localStorage.setItem(
                    "authInfo",
                    window.btoa(JSON.stringify({ loggedIn: true, role: role, email }))
                );
                if (role === "admin") {
                    navigate("/dashboard");
                } else {
                    navigate("/quiz");
                }
            } else {
                alert(msg);
            }
        });
    };

    useEffect(() => {
        const authInfoFromLS = localStorage.getItem("authInfo");
        if (authInfoFromLS) {
            const parsedAuthInfo = JSON.parse(window.atob(authInfoFromLS));
            setAuthInfo(parsedAuthInfo);
            if (parsedAuthInfo.loggedIn && parsedAuthInfo.role) {
                navigate(parsedAuthInfo.role === "admin" ? "/dashboard" : "/quiz");
            }
        }
    }, []);

    const signOutHandler = () => {
        localStorage.removeItem("authInfo");
        navigate("/auth");
        setAuthInfo({
            loggedIn: false,
            role: "",
            email: "",
        });
    };

    return (
        <AuthContext.Provider value={{ authInfo }}>
            <AuthDispatchContext.Provider
                value={{
                    doSignUp,
                    signInHandler,
                    signOutHandler,
                }}
            >
                {children}
            </AuthDispatchContext.Provider>
        </AuthContext.Provider>
    );
}

const useAuthDisPatch = () => useContext(AuthDispatchContext);
const useAuthValue = () => useContext(AuthContext);
export { AuthProvider, useAuthDisPatch, useAuthValue };
