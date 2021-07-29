import React, { useContext } from "react";
import PostContext from "../context/PostContext";
import TextAreaForm from "./TextAreaForm";
import "../Css/comment.css";
import { createOneComment } from "../libs/comment";
import CommentList from "./CommentList";
import { createOneNotification } from "../libs/notification";

const CommentSection = () => {
  const { post } = useContext(PostContext);
  const postId = post.id;
  const handleCommentSubmit = (content) => {
    createOneComment({ postId, content });

    createOneNotification({
      postId,
      postSlugify: post.slugify,
      receiverId: post.uid,
      type: "comment",
    });
  };
  return (
    <div className="comment-section">
      <h2 style={{ color: "white", marginTop: "2rem" }}>Comments</h2>
      <TextAreaForm handleFormSubmit={handleCommentSubmit} />
      <CommentList />
    </div>
  );
};

export default CommentSection;
