
import React, { useContext } from "react";
import { Route, Switch, useRouteMatch } from "react-router";
import Nav from "../components/Nav";
import PostFeeds from "../components/PostFeeds";
import PostDetail from "../components/PostDetail";
import UserProfile from "../components/UserProfile";
import EditPost from "../components/EditPost";
import AddPost from "../components/AddPost";
import Footer from "../components/Footer";
import AppContext from "../context/AppContext";
import { Link } from "react-router-dom";
 const DashBoard = () => {
    //đường dẫn 
 let { path } = useRouteMatch();
  const { user } = useContext(AppContext);
  //if user khong ton tai
  if (!user) {
    return (
      <div
        style={{
          backgroundColor: "var(--light-gray",
          marginTop: "10rem",
          padding: "2rem",
        }}
      >
        <h1>Oops!! You need to sign in </h1>
        <Link to="/">
          <span style={{ textDecoration: "underline" }}>Go to Login Page</span>
        </Link>
      </div>
    );
  }
    
    return (
        <div>
            
            <Nav />
      <Switch>
        <Route exact path={path}>
          <PostFeeds />
        </Route>
        <Route exact path={`${path}/posts/:postId/:slugify`}>
          <PostDetail />
        </Route>
        <Route exact path={`${path}/user-profile/:userId/:userName`}>
          <UserProfile />
        </Route>
        <Route exact path={`${path}/edit-post/:postId`}>
          <EditPost />
        </Route>
        <Route exact path={`${path}/add-post`}>
          <AddPost />
        </Route>
        <Route>
          <div>Not Found: 404</div>
        </Route>
      </Switch>
      <Footer />
        </div>
    )
}

export default DashBoard;