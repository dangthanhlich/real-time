import React, { useContext } from "react";
import PostContext from "../context/PostContext";
import { GetComments } from "../hooks/comment";
import CommentItem from "./CommentItem";

const CommentList = () => {
  const { post } = useContext(PostContext);
  const postId = post.id;
  const [comments] = GetComments(postId);
  // console.log(comments);
  if (!comments) {
    return null;
  }

  return (
    <div className="comment-list">
      {comments.map((comment) => (
        <CommentItem key={comment.id} comment={comment} />
      ))}
    </div>
  );
};

export default CommentList;
