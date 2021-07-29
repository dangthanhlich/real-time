import React from "react";
import { Link } from "react-router-dom";
import { useParams} from "react-router";
import {GetOnePost} from "../hooks/post";
import PostItem from "./PostItem";
import SkeletonComponent from "./Skeleton";
import CommentSection from "./CommentSection";
import PostContext from "../context/PostContext";

const PostDetail = () => {
    let { postId } = useParams();
    const [post] = GetOnePost(postId);

    if (!post) {
      return <SkeletonComponent />;
    }
    if (!post.title || !post.content) {
      return (
        <div style={{ padding: "1rem", backgroundColor: "var(--light-gray)" }}>
          <h1>Ooops!!! This post is not found.</h1>
          <Link to="/dashboard">
            <span>Go back to Dash Board</span>
          </Link>
        </div>
      );
    }
  
    return (
      <div>
       <PostItem post = {post}  isDetail={true}/>
        <PostContext.Provider value={{post}}>
          <CommentSection />
        </PostContext.Provider>
      </div>
    );
  };


export default PostDetail
