import React, { useContext } from "react";
import TextAreaForm from "./TextAreaForm";
import ReplyList from "./ReplyList";
import PostContext from "./../context/PostContext";
import { createOneReply } from "../libs/reply";
import { createOneNotification } from "../libs/notification";
const ReplySection = ({
  openReplyForm,
  setOpenReplyForm,
  commentId,
  comment,
}) => {
  const { post } = useContext(PostContext);
  const postId = post.id;
  const handleReplySubmit = (content) => {
    console.log(content);
    createOneReply({ content, postId, commentId });

    // Create notification
    createOneNotification({
      postId,
      postSlugify: post.slugify,
      receiverId: comment.uid,
      type: "reply",
    });

    setOpenReplyForm(false);
  };
  return (
    <div>
      <div className="reply-form">
        {openReplyForm && (
          <TextAreaForm handleFormSubmit={handleReplySubmit} id={commentId} />
        )}
      </div>
      <ReplyList commentId={commentId} />
    </div>
  );
};

export default ReplySection;
