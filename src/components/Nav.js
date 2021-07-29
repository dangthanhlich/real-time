import React,  { useContext } from 'react'
import { Link, useHistory } from "react-router-dom";
import AppContext from "../context/AppContext";
import "../Css/nav.css";
import Notification from "./Notification";
const Nav = () => {
    const { user, signOut } = useContext(AppContext);
    let history = useHistory();
    const signOutOnClick = async () => {
        await signOut();
        history.push("/");
    };
    return (
        <header className="header">
          <h1 className="logo">
            <Link to="/dashboard">
              <img src="/images/logo.svg" alt="logo" />
            </Link>
          </h1>
          <div className="nav-container">
            <Notification/>
            <div className="avatar-nav">
              <img src={user.photo} alt="avatar" className="avatar" />
              <nav>
                <ul className="main-nav">
                  <li>
                    <Link
                      to={`/dashboard/user-profile/${user.userId}/${user.name}`}
                    >
                      My Profile
                    </Link>
                  </li>
                  <li>
                    <Link to="/dashboard/add-post">Add New Post</Link>
                  </li>
                  <li>
                    <span className="signOut" onClick={signOutOnClick}>
                      Sign Out
                    </span>
                  </li>
                </ul>
              </nav>
            </div>
          </div>
        </header>
      );
}

export default Nav
