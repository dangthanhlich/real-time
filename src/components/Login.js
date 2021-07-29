import React, { useContext,useEffect } from "react";
import "../Css/login.css";
import { useHistory } from "react-router";
import AppContext from "../context/AppContext";
export const Login = () => {
    let history = useHistory();
    const { signInWithGoogle, user} = useContext(AppContext);
    const signIn = async()=>{
        await signInWithGoogle();
        history.push("/dashboard");
    };

    useEffect(() => {
        if (user) {
          history.push("/dashboard");
        }
      }, [user, history]);
    
    return (
        <div>
            <div className="login-section">
                <h1 className="logo">
                <img src="/images/logo.svg" alt="logo" />
                </h1>
                <h2 className="heading">Let's Join In Our App</h2>

                <button className="btn" onClick={signIn}>
                <i className="fab fa-google"></i>
                &emsp; Login with Google
                </button>
            </div>
    </div>
    )
}


export default Login;