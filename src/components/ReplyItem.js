// import React from "react";
// import ReplyList from "./ReplyList";
// import TextAreaForm from "./TextAreaForm";

// const ReplyItem = () => {
//   return (
//     <div>
//       <TextAreaForm />
//       <ReplyList />
//     </div>
//   );
// };

// export default ReplyItem;

import React, { useContext, useState } from "react";
import { formatDistance } from "date-fns";
import PostContext from "../context/PostContext";
import { createOneReply } from "../libs/reply";
import TextAreaForm from "./TextAreaForm";
// import { createOneNotification } from "../libs/notification";
import { Link } from "react-router-dom";

const ReplyItem = ({ reply, commentId }) => {
  const [openReplyForm, setOpenReplyForm] = useState(false);
  const { post } = useContext(PostContext);
  const postId = post.id;
  const { content, photoURL, displayName, createdAt, uid } = reply;
  const handleReplySubmit = (content) => {
    // Test
    // console.log(content);
    createOneReply({ content, postId, commentId });

    // Create notification
    // createOneNotification({
    //   postId,
    //   postSlugify: post.slugify,
    //   receiverId: reply.uid,
    //   type: "reply",
    // });

    setOpenReplyForm(false);
  };
  return (
    <div className="comment-container">
      <div className="avatar-comment">
        <div className="avatar-wrapper">
          <Link to={`/dashboard/user-profile/${uid}/${displayName}`}>
            <img src={photoURL} alt="avatar" className="avatar" />
          </Link>
          <span className="tool-tip">{displayName}</span>
        </div>
        <div>
          <p>
            {content.split("\n").map((text, i) => (
              <span key={i}>
                {text}
                <br />
              </span>
            ))}
          </p>
        </div>
      </div>
      <div className="time-reply">
        <span className="time">
          {" "}
          {createdAt &&
            formatDistance(createdAt.toDate(), new Date(), {
              addSuffix: true,
            })}
        </span>
        <label
          className="reply-btn"
          htmlFor={reply.id}
          onClick={() => setOpenReplyForm(true)}
        >
          Reply
        </label>
      </div>
      <div className="reply-form">
        {openReplyForm && (
          <TextAreaForm handleFormSubmit={handleReplySubmit} id={reply.id} />
        )}
      </div>
    </div>
  );
};

export default ReplyItem;
